import { NextRequest, NextResponse } from "next/server"

const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN

export async function POST(request: NextRequest) {
  try {
    // Validar token
    if (!MERCADO_PAGO_ACCESS_TOKEN) {
      console.error("Token do Mercado Pago não configurado")
      return NextResponse.json(
        { error: "Configuração de pagamento inválida" },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { plan } = body

    // Definir valores dos planos
    const planPrices: Record<string, { title: string; price: number; description: string }> = {
      "premium-monthly": {
        title: "Harmoni Premium - Mensal",
        price: 19.90,
        description: "Assinatura mensal do Harmoni Premium com todos os recursos"
      },
      "premium-yearly": {
        title: "Harmoni Premium - Anual",
        price: 118.80,
        description: "Assinatura anual do Harmoni Premium com 50% de desconto"
      }
    }

    const selectedPlan = planPrices[plan]
    if (!selectedPlan) {
      return NextResponse.json(
        { error: "Plano inválido" },
        { status: 400 }
      )
    }

    // Obter URL base
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                    request.headers.get("origin") || 
                    "http://localhost:3000"

    // Criar preferência de pagamento no Mercado Pago
    const preference = {
      items: [
        {
          title: selectedPlan.title,
          description: selectedPlan.description,
          quantity: 1,
          unit_price: selectedPlan.price,
          currency_id: "BRL"
        }
      ],
      back_urls: {
        success: `${baseUrl}/payment/success`,
        failure: `${baseUrl}/payment/failure`,
        pending: `${baseUrl}/payment/pending`
      },
      auto_return: "approved",
      external_reference: plan,
      metadata: {
        plan: plan,
        timestamp: new Date().toISOString()
      },
      statement_descriptor: "HARMONI PREMIUM",
      payment_methods: {
        excluded_payment_types: [],
        installments: 12
      }
    }

    console.log("Criando preferência com:", JSON.stringify(preference, null, 2))

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`
      },
      body: JSON.stringify(preference)
    })

    const responseText = await response.text()
    console.log("Resposta do Mercado Pago:", responseText)

    if (!response.ok) {
      let errorData
      try {
        errorData = JSON.parse(responseText)
      } catch {
        errorData = { message: responseText }
      }
      
      console.error("Erro ao criar preferência:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      })

      return NextResponse.json(
        { 
          error: "Erro ao criar preferência de pagamento", 
          details: errorData,
          message: errorData.message || "Erro desconhecido"
        },
        { status: response.status }
      )
    }

    const data = JSON.parse(responseText)

    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point
    })
  } catch (error) {
    console.error("Erro ao processar requisição:", error)
    return NextResponse.json(
      { 
        error: "Erro interno do servidor",
        message: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    )
  }
}
