import { supabase, User, Transaction, PaymentStatus, TransactionStatus } from './supabase'

// ============================================
// FUNÇÕES DE USUÁRIO
// ============================================

/**
 * Criar novo usuário
 */
export async function createUser(email: string, name?: string) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, name, payment_status: 'pending' }])
    .select()
    .single()

  if (error) throw error
  return data as User
}

/**
 * Buscar usuário por email
 */
export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error) throw error
  return data as User
}

/**
 * Buscar usuário por ID
 */
export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as User
}

/**
 * Atualizar status de pagamento do usuário
 */
export async function updatePaymentStatus(userId: string, status: PaymentStatus) {
  const { data, error } = await supabase
    .from('users')
    .update({ payment_status: status })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data as User
}

/**
 * Verificar se usuário tem acesso completo
 */
export async function hasFullAccess(userId: string): Promise<boolean> {
  const user = await getUserById(userId)
  return user.payment_status === 'paid'
}

// ============================================
// FUNÇÕES DE TRANSAÇÃO
// ============================================

/**
 * Criar nova transação
 */
export async function createTransaction(
  userId: string,
  amount: number,
  paymentMethod?: string
) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([
      {
        user_id: userId,
        amount,
        payment_method: paymentMethod,
        status: 'pending',
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data as Transaction
}

/**
 * Atualizar status da transação
 */
export async function updateTransactionStatus(
  transactionId: string,
  status: TransactionStatus
) {
  const { data, error } = await supabase
    .from('transactions')
    .update({ status })
    .eq('id', transactionId)
    .select()
    .single()

  if (error) throw error
  return data as Transaction
}

/**
 * Buscar transações de um usuário
 */
export async function getUserTransactions(userId: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('transaction_date', { ascending: false })

  if (error) throw error
  return data as Transaction[]
}

/**
 * Processar pagamento completo (atualiza usuário e transação)
 */
export async function processPayment(userId: string, transactionId: string) {
  // Atualizar status da transação
  await updateTransactionStatus(transactionId, 'completed')

  // Atualizar status de pagamento do usuário
  await updatePaymentStatus(userId, 'paid')

  return { success: true }
}
