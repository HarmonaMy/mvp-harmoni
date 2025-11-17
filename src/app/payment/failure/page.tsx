"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function PaymentFailurePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-2 border-red-500 shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-3xl mb-2">Pagamento Não Aprovado</CardTitle>
          <CardDescription className="text-base">
            Não foi possível processar seu pagamento
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">
              O que pode ter acontecido?
            </p>
            <ul className="text-sm text-red-700 dark:text-red-400 space-y-1 ml-4">
              <li>• Saldo insuficiente</li>
              <li>• Dados do cartão incorretos</li>
              <li>• Pagamento recusado pelo banco</li>
              <li>• Limite de crédito excedido</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/subscription")}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            >
              Tentar Novamente
            </Button>

            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full h-12 text-base font-semibold"
            >
              Voltar ao Início
            </Button>
          </div>

          <p className="text-xs text-center text-gray-600 dark:text-gray-400">
            Se o problema persistir, entre em contato com nosso suporte
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
