"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Crown, ArrowLeft, Zap, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SubscriptionPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium-monthly" | "premium-yearly" | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (plan: "free" | "premium-monthly" | "premium-yearly") => {
    setSelectedPlan(plan)
    setError(null)
    
    // Se for plano gratuito, apenas salvar no localStorage
    if (plan === "free") {
      localStorage.setItem("harmoni-premium", "false")
      localStorage.setItem("harmoni-plan", plan)
      
      setTimeout(() => {
        router.push("/")
      }, 1500)
      return
    }

    // Para plano Premium Anual, redirecionar diretamente para o link de assinatura
    if (plan === "premium-yearly") {
      localStorage.setItem("harmoni-pending-plan", plan)
      window.location.href = "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=4e9fbe10cd8845fda21d7db1af72ccee"
      return
    }

    // Para plano mensal, usar a API de criação de preferência
    setLoading(true)
    
    try {
      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ plan })
      })

      if (!response.ok) {
        const data = await response.json()
        console.error("Erro da API:", data)
        throw new Error(data.message || data.error || "Erro ao criar preferência de pagamento")
      }

      const data = await response.json()
      
      // Salvar informação do plano antes de redirecionar
      localStorage.setItem("harmoni-pending-plan", plan)
      
      // Redirecionar para o checkout do Mercado Pago
      window.location.href = data.init_point
    } catch (error) {
      console.error("Erro ao processar pagamento:", error)
      const errorMessage = error instanceof Error ? error.message : "Erro ao processar pagamento. Tente novamente."
      setError(errorMessage)
      setSelectedPlan(null)
      setLoading(false)
    }
  }

  const plans = [
    {
      id: "free",
      name: "Plano Gratuito",
      price: "R$ 0",
      period: "para sempre",
      description: "Comece sua jornada de bem-estar",
      icon: Sparkles,
      color: "from-gray-400 to-gray-600",
      features: [
        "3 planos de treino",
        "3 meditações guiadas",
        "Até 3 notas de desabafo",
        "Perfil de saúde básico"
      ],
      limitations: [
        "Planos de treino limitados",
        "Notas de desabafo limitadas (máx 3)",
        "Sem acesso a conteúdo premium",
        "Check-in diário limitado",
        "Gráficos de progresso limitados"
      ]
    },
    {
      id: "premium-monthly",
      name: "Premium Mensal",
      price: "R$ 19,90",
      period: "por mês",
      badge: "Sem Fidelidade",
      description: "Flexibilidade total para seu bem-estar",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      features: [
        "Tudo do plano gratuito",
        "Check-in diário ilimitado",
        "Gráficos de progresso avançados",
        "Planos de treino personalizados ilimitados",
        "Notas de desabafo ilimitadas",
        "Meditações guiadas premium",
        "Análises avançadas de progresso",
        "Dicas personalizadas diárias",
        "Suporte prioritário",
        "Novos recursos em primeira mão"
      ],
      popular: true
    },
    {
      id: "premium-yearly",
      name: "Premium Anual",
      price: "R$ 9,90",
      period: "por mês",
      badge: "Economize 50%",
      description: "Melhor custo-benefício para resultados duradouros",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      originalPrice: "R$ 19,90",
      yearlyTotal: "R$ 118,80/ano",
      features: [
        "Tudo do Premium Mensal",
        "50% de desconto (R$ 118,80/ano)",
        "Compromisso de 12 meses",
        "Acesso vitalício a recursos lançados no período",
        "Bônus: Guia de nutrição exclusivo",
        "Bônus: Plano de 90 dias personalizado"
      ],
      bestValue: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Escolha Seu Plano
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Invista no seu bem-estar com planos flexíveis que se adaptam às suas necessidades
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6 max-w-3xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isSelected = selectedPlan === plan.id
            
            return (
              <Card
                key={plan.id}
                className={`relative border-2 transition-all duration-300 ${
                  plan.popular || plan.bestValue
                    ? "border-purple-500 shadow-2xl scale-105"
                    : "border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl"
                } ${isSelected ? "ring-4 ring-purple-500 ring-opacity-50" : ""}`}
              >
                {/* Badge */}
                {(plan.popular || plan.bestValue || plan.badge) && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className={`bg-gradient-to-r ${plan.color} text-white border-0 px-4 py-1 text-sm font-semibold`}>
                      {plan.bestValue ? "Melhor Custo-Benefício" : plan.popular ? "Mais Popular" : plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="space-y-1">
                    {plan.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">{plan.originalPrice}/mês</p>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                    </div>
                    {plan.yearlyTotal && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{plan.yearlyTotal}</p>
                    )}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations (only for free plan) */}
                  {plan.limitations && (
                    <div className="pt-4 border-t space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Limitações</p>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSubscribe(plan.id as any)}
                    disabled={isSelected || loading}
                    className={`w-full h-12 text-base font-semibold ${
                      plan.popular || plan.bestValue
                        ? `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`
                        : ""
                    }`}
                    variant={plan.popular || plan.bestValue ? "default" : "outline"}
                  >
                    {isSelected || loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : plan.id === "free" ? "Começar Grátis" : "Assinar Agora"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <Card className="border-0 shadow-lg max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Posso cancelar a qualquer momento?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sim! O plano mensal pode ser cancelado a qualquer momento sem taxas. O plano anual tem compromisso de 12 meses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Como funciona o período de teste?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Você pode começar com o plano gratuito e fazer upgrade quando quiser. Seus dados serão mantidos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Posso mudar de plano depois?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento nas configurações.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Qual a diferença entre os planos Premium?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                O plano anual oferece 50% de desconto (R$ 9,90/mês vs R$ 19,90/mês) com compromisso de 12 meses. 
                O mensal oferece flexibilidade total sem fidelidade.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">O pagamento é seguro?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sim! Utilizamos o Mercado Pago, uma das plataformas de pagamento mais seguras do Brasil. 
                Seus dados são protegidos com criptografia de ponta.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trust Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            🔒 Pagamento seguro via Mercado Pago • ✨ Sem taxas ocultas • 💯 Satisfação garantida
          </p>
        </div>
      </main>
    </div>
  )
}
