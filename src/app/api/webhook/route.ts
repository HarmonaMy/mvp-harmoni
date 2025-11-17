import { NextRequest, NextResponse } from "next/server"

const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || "APP_USR-6551701599266573-111714-63cc6893695dac4a2587f3b82fa06eb3-2998106248"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log("Webhook recebido:", body)

    // Verificar se é uma notificação de pagamento
    if (body.type === "payment") {
      const paymentId = body.data.id

      // Buscar informações do pagamento
      const paymentResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            "Authorization": `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`
          }
        }
      )

      if (!paymentResponse.ok) {
        console.error("Erro ao buscar pagamento")
        return NextResponse.json({ error: "Erro ao buscar pagamento" }, { status: 500 })
      }

      const payment = await paymentResponse.json()
      
      console.log("Pagamento:", payment)

      // Verificar se o pagamento foi aprovado
      if (payment.status === "approved") {
        const plan = payment.external_reference
        const userId = payment.metadata?.user_id || "guest"

        console.log(`Pagamento aprovado! Plano: ${plan}, Usuário: ${userId}`)

        // Aqui você pode salvar no banco de dados que o usuário tem acesso premium
        // Por enquanto, vamos apenas logar
        // Em produção, você salvaria isso em um banco de dados (Supabase, MongoDB, etc)
        
        // Exemplo de estrutura que você salvaria:
        // await supabase.from('subscriptions').insert({
        //   user_id: userId,
        //   plan: plan,
        //   status: 'active',
        //   payment_id: paymentId,
        //   started_at: new Date().toISOString()
        // })

        return NextResponse.json({ 
          success: true, 
          message: "Pagamento processado com sucesso" 
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Erro ao processar webhook:", error)
    return NextResponse.json(
      { error: "Erro ao processar webhook" },
      { status: 500 }
    )
  }
}

// Permitir GET para verificação do Mercado Pago
export async function GET() {
  return NextResponse.json({ status: "Webhook ativo" })
}
