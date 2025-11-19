import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // Páginas públicas que não precisam de autenticação
  const publicPages = ['/auth']
  const isPublicPage = publicPages.includes(pathname)

  // Página de assinatura (precisa estar autenticado mas não precisa ser premium)
  const isSubscriptionPage = pathname === '/subscription'

  try {
    // Obter token de autenticação dos cookies
    const token = request.cookies.get('sb-access-token')?.value

    // Se não tem token e não está em página pública, redirecionar para auth
    if (!token && !isPublicPage) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    // Se tem token e está na página de auth, redirecionar para home
    if (token && isPublicPage) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // 🔒 CONTROLE DE ACESSO BASEADO EM PAGAMENTO
    if (token && !isPublicPage && !isSubscriptionPage) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (supabaseUrl && supabaseAnonKey) {
        // Criar cliente Supabase
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        })

        // Verificar sessão
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          // Buscar dados do usuário
          const { data: userData, error } = await supabase
            .from('users')
            .select('payment_status')
            .eq('id', user.id)
            .single()

          // Se não encontrou dados ou status não é 'paid', redirecionar para assinatura
          if (error || !userData || userData.payment_status !== 'paid') {
            return NextResponse.redirect(new URL('/subscription', request.url))
          }
        }
      }
    }

    return res
  } catch (error) {
    console.error('Erro no middleware:', error)
    // Em caso de erro, permitir acesso (fail-safe)
    return res
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}
