"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function PaymentPendingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-yellow-900/20 dark:to-orange-900/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-2 border-yellow-500 shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
            <Clock className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-3xl mb-2">Pagamento Pendente</CardTitle>
          <CardDescription className="text-base">
            Seu pagamento está sendo processado
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
              ⏳ Aguardando confirmação
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Seu pagamento está sendo processado. Isso pode levar alguns minutos.
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Você receberá um email assim que o pagamento for confirmado.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
              Métodos que podem demorar:
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 ml-4">
              <li>• Boleto bancário (1-3 dias úteis)</li>
              <li>• PIX (alguns minutos)</li>
              <li>• Transferência bancária (1-2 dias úteis)</li>
            </ul>
          </div>

          <Button
            onClick={() => router.push("/")}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90"
          >
            Voltar ao Início
          </Button>

          <p className="text-xs text-center text-gray-600 dark:text-gray-400">
            Acompanhe o status do seu pagamento por email
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
