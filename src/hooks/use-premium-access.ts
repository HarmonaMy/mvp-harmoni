import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

/**
 * Hook para verificar se o usuário tem acesso premium (pagamento confirmado)
 * Redireciona automaticamente para /subscription se não tiver acesso
 */
export function usePremiumAccess() {
  const router = useRouter()
  const { userData, isLoading } = useAuth()
  const [isPremium, setIsPremium] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (isLoading) return

    // Verificar se o usuário tem pagamento confirmado
    const hasPremium = userData?.payment_status === 'paid'
    setIsPremium(hasPremium)

    // Se não for premium, redirecionar para página de assinatura
    if (!hasPremium) {
      router.push('/subscription')
    }

    setIsChecking(false)
  }, [userData, isLoading, router])

  return {
    isPremium,
    isChecking: isChecking || isLoading,
    paymentStatus: userData?.payment_status || 'pending'
  }
}

/**
 * Hook para verificar acesso a funcionalidades específicas
 * Retorna se o usuário pode acessar determinada feature
 */
export function useFeatureAccess(feature: 'check-in' | 'progress' | 'health' | 'journal' | 'all') {
  const { userData } = useAuth()
  const isPremium = userData?.payment_status === 'paid'

  // Mapa de features que requerem premium
  const premiumFeatures = {
    'check-in': true,
    'progress': true,
    'health': true,
    'journal': true,
    'all': true
  }

  const hasAccess = isPremium || !premiumFeatures[feature]

  return {
    hasAccess,
    isPremium,
    requiresUpgrade: !hasAccess
  }
}
