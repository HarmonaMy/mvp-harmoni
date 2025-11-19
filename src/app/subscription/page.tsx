"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Crown, Check, Sparkles, Lock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

export default function SubscriptionPage() {
  const router = useRouter()
  const { user, userData, isLoading: authLoading, refreshUserData } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth")
    }
  }, [user, authLoading, router])

  // Redirecionar se já for premium
  useEffect(() => {
    if (userData?.payment_status === 'paid') {
      router.push("/")
    }
  }, [userData, router])

  const handleSubscribe = async () => {
    if (!isSupabaseConfigured() || !user) {
      alert("Configure o Supabase para continuar")
      return
    }

    setIsLoading(true)

    try {
      // Simular processamento de pagamento
      // Em produção, aqui você integraria com Stripe, PayPal, etc.
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Atualizar status de pagamento no banco
      const { error } = await supabase
        .from('users')
        .update({ payment_status: 'paid' })
        .eq('id', user.id)

      if (error) throw error

      // Atualizar dados do usuário
      await refreshUserData()

      // Atualizar localStorage
      localStorage.setItem("harmoni-premium", JSON.stringify(true))

      // Redirecionar para o app
      router.push("/")
    } catch (error) {
      console.error("Erro ao processar assinatura:", error)
      alert("Erro ao processar assinatura. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="text-center">
          <Sparkles className="w-12 h-12 mx-auto text-purple-500 animate-pulse mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Harmoni Premium
            </h1>
          </div>
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Desbloqueie Todo o Potencial
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Acesse funcionalidades exclusivas e transforme sua jornada de bem-estar com o Harmoni Premium
          </p>
        </div>

        {/* Pricing Card */}
        <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800 mb-8">
          <CardHeader className="text-center pb-8 pt-8">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-purple-500" />
              <CardTitle className="text-3xl">Plano Premium</CardTitle>
            </div>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                R$ 29,90
              </span>
              <span className="text-gray-600 dark:text-gray-400">/mês</span>
            </div>
            <CardDescription className="text-base">
              Cancele quando quiser, sem compromisso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Check-ins Diários Ilimitados</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Registre seu humor, energia e sono todos os dias
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Plano Personalizado</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Recomendações baseadas nos seus objetivos e progresso
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Gráficos de Progresso</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Visualize sua evolução com gráficos detalhados
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Perfil de Saúde Completo</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cálculos de IMC, calorias, água e proteínas personalizados
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Diário de Desabafo</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Escreva suas reflexões e acompanhe sua jornada emocional
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Suporte Prioritário</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Atendimento rápido e personalizado quando precisar
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleSubscribe}
              disabled={isLoading || !isSupabaseConfigured()}
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Crown className="w-5 h-5 mr-2" />
                  Assinar Agora
                </>
              )}
            </Button>

            {!isSupabaseConfigured() && (
              <p className="text-sm text-center text-amber-600 dark:text-amber-400">
                ⚠️ Configure o Supabase para habilitar assinaturas
              </p>
            )}

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Ao assinar, você concorda com nossos Termos de Serviço e Política de Privacidade
            </p>
          </CardContent>
        </Card>

        {/* Free Version Info */}
        <Card className="border-0 shadow-lg bg-gray-50 dark:bg-gray-800/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-400" />
              Versão Gratuita (Limitada)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              A versão gratuita permite apenas completar o onboarding inicial. 
              Para acessar todas as funcionalidades e começar sua jornada de bem-estar, 
              assine o Harmoni Premium.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                Sem acesso aos check-ins diários
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                Sem gráficos de progresso
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                Sem perfil de saúde personalizado
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                Sem diário de desabafo
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
