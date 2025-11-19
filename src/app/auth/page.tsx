"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Mail, Lock, User, AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [configured, setConfigured] = useState(true)

  // Estados para login
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Estados para registro
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")

  useEffect(() => {
    setConfigured(isSupabaseConfigured())
    
    // Verificar se já está autenticado
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.replace("/")
        }
      } catch (err) {
        // Silenciar erro de verificação inicial
      }
    }
    
    if (isSupabaseConfigured()) {
      checkAuth()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!configured) {
      setError("Supabase não está configurado. Configure as variáveis de ambiente.")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      })

      if (signInError) {
        // Mensagens de erro mais amigáveis com soluções
        if (signInError.message === "Invalid login credentials") {
          throw new Error("Email ou senha incorretos. Verifique suas credenciais.")
        }
        if (signInError.message === "Email not confirmed") {
          throw new Error("Email não confirmado. Veja as instruções abaixo para desabilitar a confirmação de email.")
        }
        throw new Error(signInError.message || "Erro ao fazer login")
      }

      if (data.user && data.session) {
        setSuccess("Login realizado com sucesso! Redirecionando...")
        
        // Forçar redirecionamento
        setTimeout(() => {
          window.location.href = "/"
        }, 500)
      } else {
        throw new Error("Login realizado mas sessão não foi criada.")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Erro desconhecido ao fazer login")
      }
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!configured) {
      setError("Supabase não está configurado. Configure as variáveis de ambiente.")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    // Validações
    if (registerPassword !== registerConfirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    if (registerPassword.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setIsLoading(false)
      return
    }

    try {
      // Criar usuário no Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: registerEmail.trim(),
        password: registerPassword,
        options: {
          data: {
            name: registerName,
            payment_status: 'pending'
          },
          emailRedirectTo: `${window.location.origin}/auth`
        },
      })

      if (signUpError) {
        if (signUpError.message.includes("User already registered")) {
          throw new Error("Este email já está cadastrado. Tente fazer login.")
        }
        if (signUpError.message.includes("Invalid email")) {
          throw new Error("Email inválido. Verifique o formato.")
        }
        if (signUpError.message.includes("Password should be at least")) {
          throw new Error("A senha deve ter pelo menos 6 caracteres.")
        }
        
        throw new Error(signUpError.message || "Erro ao criar conta")
      }

      if (!data || !data.user) {
        throw new Error("Erro ao criar conta: nenhum usuário foi criado")
      }

      // Verificar se o email precisa ser confirmado
      const needsEmailConfirmation = !data.session
      
      if (needsEmailConfirmation) {
        setSuccess("Conta criada! Verifique seu email para confirmar o cadastro.")
        setError("Para desabilitar a confirmação de email, veja as instruções abaixo.")
      } else {
        setSuccess("Conta criada e login realizado com sucesso! Redirecionando...")
        
        setTimeout(() => {
          window.location.href = "/"
        }, 500)
      }
      
      // Limpar formulário
      setRegisterName("")
      setRegisterEmail("")
      setRegisterPassword("")
      setRegisterConfirmPassword("")
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Erro desconhecido ao criar conta.")
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Card de Instruções do Supabase */}
        <Card className="border-2 border-blue-500 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
              <AlertCircle className="w-6 h-6" />
              Configure o Supabase para o Login Funcionar
            </CardTitle>
            <CardDescription>
              Siga estes passos no Supabase Dashboard para resolver problemas de login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Passo 1 */}
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-700 dark:text-green-400 font-semibold">
                Passo 1: Desabilitar Confirmação de Email
              </AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-300 space-y-2 mt-2">
                <p className="font-medium">No Supabase Dashboard:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Vá em <strong>Authentication</strong> → <strong>Providers</strong></li>
                  <li>Clique em <strong>Email</strong></li>
                  <li>Desmarque <strong>"Confirm email"</strong></li>
                  <li>Clique em <strong>Save</strong></li>
                </ol>
                <p className="text-sm italic mt-2">✅ Isso permite login imediato sem confirmação de email</p>
              </AlertDescription>
            </Alert>

            {/* Passo 2 */}
            <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <AlertTitle className="text-blue-700 dark:text-blue-400 font-semibold">
                Passo 2: Configurar Site URL
              </AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-300 space-y-2 mt-2">
                <p className="font-medium">No Supabase Dashboard:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Vá em <strong>Authentication</strong> → <strong>URL Configuration</strong></li>
                  <li>Em <strong>Site URL</strong>, coloque: <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">http://localhost:3000</code></li>
                  <li>Clique em <strong>Save</strong></li>
                </ol>
                <p className="text-sm italic mt-2">✅ Define para onde redirecionar após login</p>
              </AlertDescription>
            </Alert>

            {/* Passo 3 */}
            <Alert className="border-purple-500 bg-purple-50 dark:bg-purple-950/20">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <AlertTitle className="text-purple-700 dark:text-purple-400 font-semibold">
                Passo 3: Adicionar Redirect URLs
              </AlertTitle>
              <AlertDescription className="text-purple-700 dark:text-purple-300 space-y-2 mt-2">
                <p className="font-medium">No Supabase Dashboard:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Na mesma página <strong>URL Configuration</strong></li>
                  <li>Em <strong>Redirect URLs</strong>, adicione:</li>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">http://localhost:3000</code></li>
                    <li><code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">http://localhost:3000/auth</code></li>
                  </ul>
                  <li>Clique em <strong>Save</strong></li>
                </ol>
                <p className="text-sm italic mt-2">✅ Permite redirecionamentos após autenticação</p>
              </AlertDescription>
            </Alert>

            {/* Resumo */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-950/30 dark:to-blue-950/30 p-4 rounded-lg border-2 border-green-500">
              <p className="font-semibold text-green-800 dark:text-green-300 mb-2">
                ✨ Após fazer essas 3 configurações:
              </p>
              <ul className="space-y-1 text-green-700 dark:text-green-400 text-sm">
                <li>✅ Você poderá criar contas sem confirmar email</li>
                <li>✅ O login funcionará imediatamente</li>
                <li>✅ O redirecionamento após login funcionará corretamente</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Card de Login/Registro */}
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-2">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Harmoni
            </CardTitle>
            <CardDescription>
              Seu bem-estar em equilíbrio
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!configured && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Supabase não configurado!</strong><br />
                  Configure as variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.
                </AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Criar Conta</TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 border-green-500 bg-green-50 dark:bg-green-950/20">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700 dark:text-green-400">{success}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading || !configured}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading || !configured}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    disabled={isLoading || !configured}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nome</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Seu nome"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading || !configured}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading || !configured}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading || !configured}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading || !configured}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    disabled={isLoading || !configured}
                  >
                    {isLoading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
