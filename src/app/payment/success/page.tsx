"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Marcar usuário como premium no localStorage
    const externalReference = searchParams.get("external_reference")
    
    if (externalReference) {
      localStorage.setItem("harmoni-premium", "true")
      localStorage.setItem("harmoni-plan", externalReference)
      localStorage.setItem("harmoni-payment-date", new Date().toISOString())
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-2 border-green-500 shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-3xl mb-2">Pagamento Aprovado!</CardTitle>
          <CardDescription className="text-base">
            Seu acesso premium foi liberado com sucesso
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-green-800 dark:text-green-300">
              ✨ Bem-vindo ao Harmoni Premium!
            </p>
            <p className="text-sm text-green-700 dark:text-green-400">
              Agora você tem acesso a todos os recursos premium, incluindo:
            </p>
            <ul className="text-sm text-green-700 dark:text-green-400 space-y-1 ml-4">
              <li>• Check-in diário ilimitado</li>
              <li>• Planos de treino personalizados</li>
              <li>• Notas de desabafo ilimitadas</li>
              <li>• Gráficos de progresso avançados</li>
              <li>• Meditações guiadas premium</li>
            </ul>
          </div>

          <Button
            onClick={() => router.push("/")}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
          >
            Começar a Usar
          </Button>

          <p className="text-xs text-center text-gray-600 dark:text-gray-400">
            Você receberá um email de confirmação em breve
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
