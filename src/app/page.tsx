"use client"

import { useState, useEffect } from "react"
import { Activity, Brain, Moon, TrendingUp, Plus, Calendar, Sparkles, User, MessageSquare, Crown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

// Importações diretas dos componentes
import { OnboardingFlow } from "@/components/harmoni/onboarding-flow"
import { DailyCheckIn } from "@/components/harmoni/daily-check-in"
import { ProgressCharts } from "@/components/harmoni/progress-charts"
import { PersonalizedPlan } from "@/components/harmoni/personalized-plan"
import { HealthProfileEditor } from "@/components/harmoni/health-profile"
import { JournalNotes } from "@/components/harmoni/journal-notes"

export type UserProfile = {
  name: string
  goals: {
    energy: number
    focus: number
    sleep: number
  }
  preferences: string[]
}

export type DailyEntry = {
  date: string
  mood: number
  energy: number
  sleep: number
  workout: boolean
  meditation: boolean
}

export type HealthProfile = {
  weight: number
  height: number
  age: number
  gender: "male" | "female"
  targetWeight: number
}

export type JournalNote = {
  id: string
  date: string
  mood: "great" | "good" | "okay" | "bad" | "terrible"
  title: string
  content: string
  tags: string[]
}

export default function HarmoniApp() {
  const router = useRouter()
  const { user, userData, isLoading: authLoading, isConfigured, signOut } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null)
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([])
  const [journalNotes, setJournalNotes] = useState<JournalNote[]>([])
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [showHealthProfile, setShowHealthProfile] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Garantir que o componente só renderize no cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirecionar para login se não estiver autenticado E Supabase estiver configurado
  useEffect(() => {
    if (!authLoading && !user && isConfigured) {
      router.push("/auth")
    }
  }, [user, authLoading, isConfigured, router])

  // Carregar dados do localStorage
  useEffect(() => {
    if (!mounted) return

    try {
      const savedProfile = localStorage.getItem("harmoni-profile")
      const savedHealthProfile = localStorage.getItem("harmoni-health-profile")
      const savedEntries = localStorage.getItem("harmoni-entries")
      const savedNotes = localStorage.getItem("harmoni-journal-notes")
      const savedPremium = localStorage.getItem("harmoni-premium")
      
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile))
        setHasProfile(true)
      }
      
      if (savedHealthProfile) {
        setHealthProfile(JSON.parse(savedHealthProfile))
      }
      
      if (savedEntries) {
        setDailyEntries(JSON.parse(savedEntries))
      }

      if (savedNotes) {
        setJournalNotes(JSON.parse(savedNotes))
      }

      if (savedPremium) {
        setIsPremium(JSON.parse(savedPremium))
      }

      // Verificar status de pagamento do usuário
      if (userData?.payment_status === 'paid') {
        setIsPremium(true)
        localStorage.setItem("harmoni-premium", JSON.stringify(true))
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setIsLoading(false)
    }
  }, [mounted, userData])

  // 🔒 PROTEÇÃO: Redirecionar para assinatura se não for premium
  useEffect(() => {
    if (!mounted || isLoading || authLoading) return
    
    // Só redireciona se tiver Supabase configurado E usuário autenticado
    if (hasProfile && !isPremium && isConfigured && user) {
      router.push("/subscription")
    }
  }, [hasProfile, isPremium, router, isLoading, mounted, authLoading, isConfigured, user])

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    setHasProfile(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem("harmoni-profile", JSON.stringify(profile))
    }
    
    // Redirecionar para página de assinatura após completar o onboarding (se Supabase configurado)
    if (isConfigured && user) {
      router.push("/subscription")
    }
  }

  const handleHealthProfileSave = (profile: HealthProfile) => {
    setHealthProfile(profile)
    if (typeof window !== 'undefined') {
      localStorage.setItem("harmoni-health-profile", JSON.stringify(profile))
    }
    setShowHealthProfile(false)
  }

  const handleDailyEntry = (entry: DailyEntry) => {
    const updatedEntries = [...dailyEntries, entry]
    setDailyEntries(updatedEntries)
    if (typeof window !== 'undefined') {
      localStorage.setItem("harmoni-entries", JSON.stringify(updatedEntries))
    }
    setShowCheckIn(false)
  }

  const handleAddNote = (note: Omit<JournalNote, "id">) => {
    const newNote: JournalNote = {
      ...note,
      id: Date.now().toString()
    }
    const updatedNotes = [...journalNotes, newNote]
    setJournalNotes(updatedNotes)
    if (typeof window !== 'undefined') {
      localStorage.setItem("harmoni-journal-notes", JSON.stringify(updatedNotes))
    }
  }

  const handleDeleteNote = (id: string) => {
    const updatedNotes = journalNotes.filter(note => note.id !== id)
    setJournalNotes(updatedNotes)
    if (typeof window !== 'undefined') {
      localStorage.setItem("harmoni-journal-notes", JSON.stringify(updatedNotes))
    }
  }

  const handleSignOut = async () => {
    await signOut()
    // Limpar dados locais
    localStorage.removeItem("harmoni-profile")
    localStorage.removeItem("harmoni-health-profile")
    localStorage.removeItem("harmoni-entries")
    localStorage.removeItem("harmoni-journal-notes")
    localStorage.removeItem("harmoni-premium")
  }

  // Verificar se já fez check-in hoje
  const today = new Date().toISOString().split("T")[0]
  const hasCheckedInToday = dailyEntries.some(entry => entry.date === today)

  // Calcular streak (dias consecutivos)
  const calculateStreak = () => {
    if (dailyEntries.length === 0) return 0
    
    const sortedEntries = [...dailyEntries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    let streak = 0
    let currentDate = new Date()
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date)
      const diffDays = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (diffDays === streak) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }

  const streak = calculateStreak()

  // Calcular média dos últimos 7 dias
  const getRecentAverage = (key: keyof Pick<DailyEntry, "mood" | "energy" | "sleep">) => {
    const recent = dailyEntries.slice(-7)
    if (recent.length === 0) return 0
    const sum = recent.reduce((acc, entry) => acc + entry[key], 0)
    return Math.round((sum / recent.length) * 10)
  }

  // Não renderizar nada até estar montado no cliente
  if (!mounted || isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="text-center">
          <Sparkles className="w-12 h-12 mx-auto text-purple-500 animate-pulse mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  // Se Supabase não está configurado, mostrar aviso
  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-4">
        <Card className="max-w-md w-full border-0 shadow-2xl">
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-center text-2xl">Configuração Necessária</CardTitle>
            <CardDescription className="text-center">
              Configure o Supabase para usar o Harmoni
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                <strong>Passo 1:</strong> Vá em <strong>Configurações do Projeto</strong> → <strong>Integrações</strong>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                <strong>Passo 2:</strong> Clique em <strong>Conectar Supabase</strong>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Passo 3:</strong> Autorize a conexão e volte aqui!
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Após conectar, recarregue esta página
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Se não estiver autenticado, não renderizar nada (useEffect já redireciona)
  if (!user) {
    return null
  }

  if (!hasProfile) {
    return <OnboardingFlow onComplete={handleProfileComplete} />
  }

  // 🔒 BLOQUEIO: Se não for premium, não mostra o app
  if (!isPremium) {
    return null // O useEffect já redireciona para /subscription
  }

  if (showCheckIn) {
    return <DailyCheckIn onComplete={handleDailyEntry} onCancel={() => setShowCheckIn(false)} />
  }

  if (showHealthProfile) {
    return (
      <HealthProfileEditor 
        onSave={handleHealthProfileSave} 
        onCancel={() => setShowHealthProfile(false)}
        initialProfile={healthProfile || undefined}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Harmoni
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Olá, {userProfile?.name}!</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href="/subscription">
              <Button 
                variant="outline"
                className="gap-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">{isPremium ? "Premium" : "Assinar"}</span>
              </Button>
            </Link>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="icon"
              className="border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
            </Button>
            {!hasCheckedInToday && (
              <Button 
                onClick={() => setShowCheckIn(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Check-in Diário</span>
                <span className="sm:hidden">Check-in</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-400 to-pink-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Sequência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{streak} dias</div>
              <p className="text-xs opacity-90 mt-1">Continue assim! 🔥</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Energia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{getRecentAverage("energy")}%</div>
              <p className="text-xs opacity-90 mt-1">Média 7 dias</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-400 to-purple-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Humor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{getRecentAverage("mood")}%</div>
              <p className="text-xs opacity-90 mt-1">Média 7 dias</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-400 to-blue-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Moon className="w-4 h-4" />
                Sono
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{getRecentAverage("sleep")}%</div>
              <p className="text-xs opacity-90 mt-1">Qualidade média</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="plan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto lg:inline-grid bg-white dark:bg-gray-800 shadow-md h-16">
            <TabsTrigger value="plan" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              Seu Plano
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              Progresso
            </TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Saúde
            </TabsTrigger>
            <TabsTrigger value="journal" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Desabafo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="space-y-6">
            <PersonalizedPlan profile={userProfile!} entries={dailyEntries} healthProfile={healthProfile} />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressCharts entries={dailyEntries} />
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            {healthProfile ? (
              <div className="space-y-6">
                {/* Resumo do Perfil de Saúde */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">Seu Perfil de Saúde</CardTitle>
                        <CardDescription>Recomendações personalizadas para seus objetivos</CardDescription>
                      </div>
                      <Button
                        onClick={() => setShowHealthProfile(true)}
                        variant="outline"
                      >
                        Editar Perfil
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">IMC</p>
                        <p className="text-2xl font-bold">
                          {((healthProfile.weight / Math.pow(healthProfile.height / 100, 2)).toFixed(1))}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Calorias/dia</p>
                        <p className="text-2xl font-bold">
                          {Math.round(
                            (healthProfile.gender === "male" 
                              ? 88.362 + (13.397 * healthProfile.weight) + (4.799 * healthProfile.height) - (5.677 * healthProfile.age)
                              : 447.593 + (9.247 * healthProfile.weight) + (3.098 * healthProfile.height) - (4.330 * healthProfile.age)
                            ) * 1.55
                          )}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Água/dia</p>
                        <p className="text-2xl font-bold">
                          {(healthProfile.weight * 35 / 1000).toFixed(1)}L
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Proteína/dia</p>
                        <p className="text-2xl font-bold">
                          {Math.round(healthProfile.weight * 1.2)}g
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dicas Personalizadas */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Dicas para Emagrecer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <Activity className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Exercícios Recomendados</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Pratique 30-45 minutos de atividade física 4-5 vezes por semana. 
                          Combine cardio com treino de força para melhores resultados.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <Activity className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Alimentação Balanceada</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Crie um déficit calórico de 300-500 kcal/dia. Priorize proteínas magras, 
                          vegetais e carboidratos complexos. Evite alimentos ultraprocessados.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                      <Activity className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Hidratação</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Beba pelo menos {(healthProfile.weight * 35 / 1000).toFixed(1)}L de água por dia. 
                          A hidratação adequada acelera o metabolismo e reduz a retenção de líquidos.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-12 pb-12 text-center">
                  <User className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Configure seu Perfil de Saúde</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Adicione seus dados físicos para receber recomendações personalizadas de água, 
                    calorias e exercícios para emagrecer de forma saudável.
                  </p>
                  <Button
                    onClick={() => setShowHealthProfile(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Perfil de Saúde
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="journal" className="space-y-6">
            <JournalNotes
              notes={journalNotes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              isPremium={isPremium}
            />
          </TabsContent>
        </Tabs>

        {/* Motivational Message */}
        {dailyEntries.length > 0 && (
          <Card className="mt-6 border-0 shadow-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Continue evoluindo!</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Você está no caminho certo. Cada pequeno passo conta para alcançar seus objetivos de bem-estar.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
