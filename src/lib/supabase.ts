import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Criar cliente com valores padrão seguros se não configurado
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
)

// Função para verificar se o Supabase está configurado
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key')
}

// Tipos para o banco de dados
export type PaymentStatus = 'pending' | 'paid' | 'expired'
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface User {
  id: string
  email: string
  name?: string
  payment_status: PaymentStatus
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  status: TransactionStatus
  payment_method?: string
  transaction_date: string
  created_at: string
}
