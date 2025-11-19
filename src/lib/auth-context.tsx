"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import type { User } from "@/lib/supabase"

interface AuthContextType {
  user: SupabaseUser | null
  userData: User | null
  isLoading: boolean
  isConfigured: boolean
  signOut: () => Promise<void>
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConfigured] = useState(isSupabaseConfigured())

  const fetchUserData = async (authUser: SupabaseUser) => {
    if (!isConfigured) {
      console.warn("Supabase não configurado, pulando busca de dados do usuário")
      return
    }
    
    try {
      console.log("Buscando dados do usuário:", authUser.id)
      
      // Buscar explicitamente na tabela public.users
      const { data, error } = await supabase
        .from('users')
        .select('id, email, name, payment_status, created_at, updated_at')
        .eq('id', authUser.id)
        .maybeSingle()

      if (error) {
        console.error("Erro ao buscar dados do usuário:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        
        // Se erro de permissão RLS, criar dados mock do usuário autenticado
        if (error.code === '42501' || error.message.includes('permission')) {
          console.warn("Erro de permissão RLS detectado. Usando dados do auth.user")
          setUserData({
            id: authUser.id,
            email: authUser.email || '',
            name: authUser.user_metadata?.name || authUser.user_metadata?.full_name || '',
            payment_status: 'pending',
            created_at: authUser.created_at,
            updated_at: authUser.updated_at || authUser.created_at
          })
          return
        }
        
        // Se usuário não encontrado, tentar criar
        if (error.code === 'PGRST116' || error.message.includes('no rows')) {
          console.log("Usuário não encontrado, tentando criar...")
          await createUserRecord(authUser)
        }
        return
      }

      if (data) {
        console.log("Dados do usuário encontrados:", data)
        setUserData(data)
      } else {
        console.log("Usuário não encontrado na tabela, tentando criar...")
        await createUserRecord(authUser)
      }
    } catch (error) {
      console.error("Erro inesperado ao buscar dados do usuário:", {
        error,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined
      })
      
      // Fallback: usar dados do auth.user
      console.warn("Usando dados do auth.user como fallback")
      setUserData({
        id: authUser.id,
        email: authUser.email || '',
        name: authUser.user_metadata?.name || authUser.user_metadata?.full_name || '',
        payment_status: 'pending',
        created_at: authUser.created_at,
        updated_at: authUser.updated_at || authUser.created_at
      })
    }
  }

  const createUserRecord = async (authUser: SupabaseUser) => {
    if (!isConfigured) return
    
    try {
      const newUserData = {
        id: authUser.id,
        email: authUser.email || '',
        name: authUser.user_metadata?.name || authUser.user_metadata?.full_name || '',
        payment_status: 'pending' as const
      }

      console.log("Criando novo registro de usuário:", newUserData)

      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert(newUserData)
        .select()
        .single()

      if (insertError) {
        console.error("Erro ao criar usuário:", {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code
        })
        
        // Se erro de permissão, usar dados do auth.user
        if (insertError.code === '42501' || insertError.message.includes('permission')) {
          console.warn("Erro de permissão ao criar usuário. Usando dados do auth.user")
          setUserData({
            id: authUser.id,
            email: authUser.email || '',
            name: authUser.user_metadata?.name || authUser.user_metadata?.full_name || '',
            payment_status: 'pending',
            created_at: authUser.created_at,
            updated_at: authUser.updated_at || authUser.created_at
          })
          return
        }
        
        // Tentar buscar novamente (pode ter sido criado por outro processo)
        const { data: existingUser } = await supabase
          .from('users')
          .select('id, email, name, payment_status, created_at, updated_at')
          .eq('id', authUser.id)
          .maybeSingle()
        
        if (existingUser) {
          console.log("Usuário já existia:", existingUser)
          setUserData(existingUser)
        } else {
          // Último fallback: usar dados do auth.user
          console.warn("Não foi possível criar/buscar usuário. Usando dados do auth.user")
          setUserData({
            id: authUser.id,
            email: authUser.email || '',
            name: authUser.user_metadata?.name || authUser.user_metadata?.full_name || '',
            payment_status: 'pending',
            created_at: authUser.created_at,
            updated_at: authUser.updated_at || authUser.created_at
          })
        }
      } else if (newUser) {
        console.log("Usuário criado com sucesso:", newUser)
        setUserData(newUser)
      }
    } catch (error) {
      console.error("Erro ao criar registro de usuário:", {
        error,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined
      })
      
      // Fallback final: usar dados do auth.user
      console.warn("Usando dados do auth.user como fallback após erro")
      setUserData({
        id: authUser.id,
        email: authUser.email || '',
        name: authUser.user_metadata?.name || authUser.user_metadata?.full_name || '',
        payment_status: 'pending',
        created_at: authUser.created_at,
        updated_at: authUser.updated_at || authUser.created_at
      })
    }
  }

  const refreshUserData = async () => {
    if (user && isConfigured) {
      await fetchUserData(user)
    }
  }

  useEffect(() => {
    // Se Supabase não está configurado, finalizar loading imediatamente
    if (!isConfigured) {
      console.warn("⚠️ Supabase não configurado. Configure as variáveis de ambiente:")
      console.warn("NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY")
      setIsLoading(false)
      setUser(null)
      setUserData(null)
      return
    }

    // Verificar sessão inicial
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Erro ao verificar sessão:", {
          message: error.message,
          status: error.status
        })
        setIsLoading(false)
        return
      }
      
      console.log("Sessão inicial:", session?.user?.id || 'Nenhuma sessão')
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserData(session.user)
      }
      setIsLoading(false)
    }).catch((error) => {
      console.error("Erro crítico ao verificar sessão:", {
        error,
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      })
      setIsLoading(false)
    })

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.id || 'Nenhum usuário')
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserData(session.user)
      } else {
        setUserData(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [isConfigured])

  const signOut = async () => {
    if (!isConfigured) return
    
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Erro ao fazer logout:", {
          message: error.message,
          status: error.status
        })
        return
      }
      
      setUser(null)
      setUserData(null)
      router.push("/auth")
    } catch (error) {
      console.error("Erro crítico ao fazer logout:", {
        error,
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, userData, isLoading, isConfigured, signOut, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
