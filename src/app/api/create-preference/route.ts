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

    // Obter URL base - SEMPRE usar NEXT_PUBLIC_APP_URL se disponível
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL
    
    // Fallback para headers apenas se NEXT_PUBLIC_APP_URL não estiver definida
    if (!baseUrl) {
      const origin = request.headers.get("origin")
      const host = request.headers.get("host")
      const protocol = request.headers.get("x-forwarded-proto") || "http"
      
      if (origin) {
        baseUrl = origin
      } else if (host) {
        baseUrl = `${protocol}://${host}`
      } else {
        baseUrl = "http://localhost:3000"
      }
    }

    // Garantir que baseUrl não termine com /
    baseUrl = baseUrl.replace(/\/$/, "")

    // Criar URLs completas e válidas
    const successUrl = `${baseUrl}/payment/success`
    const failureUrl = `${baseUrl}/payment/failure`
    const pendingUrl = `${baseUrl}/payment/pending`

    // Validar que as URLs são válidas antes de enviar
    try {
      new URL(successUrl)
      new URL(failureUrl)
      new URL(pendingUrl)
    } catch (urlError) {
      console.error("URLs inválidas:", { successUrl, failureUrl, pendingUrl })
      return NextResponse.json(
        { error: "Configuração de URLs inválida" },
        { status: 500 }
      )
    }

    console.log("URLs de retorno configuradas:", {
      success: successUrl,
      failure: failureUrl,
      pending: pendingUrl
    })

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
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl
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

    console.log("Criando preferência no Mercado Pago...")
    console.log("Preference payload:", JSON.stringify(preference, null, 2))

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`
      },
      body: JSON.stringify(preference)
    })

    const responseText = await response.text()
    console.log("Status da resposta:", response.status)
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
    console.log("Preferência criada com sucesso:", data.id)

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
