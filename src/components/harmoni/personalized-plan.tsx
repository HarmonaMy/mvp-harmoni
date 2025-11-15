"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Brain, Moon, Sparkles, CheckCircle2, Clock, Target, ArrowLeft, Play, Pause, Camera, Upload, Utensils, Flame, Apple } from "lucide-react"
import type { UserProfile, DailyEntry } from "@/app/page"
import type { HealthProfile } from "./health-profile"
import { WorkoutPlan } from "./workout-plan"

type PersonalizedPlanProps = {
  profile: UserProfile
  entries: DailyEntry[]
  healthProfile: HealthProfile | null
}

type NutritionAnalysis = {
  foodName: string
  calories: number
  protein: number
  carbs: number
  fats: number
  fiber: number
  portions: string
}

export function PersonalizedPlan({ profile, entries, healthProfile }: PersonalizedPlanProps) {
  const [showWorkoutPlan, setShowWorkoutPlan] = useState<"yoga" | "cardio" | "strength" | "hiit" | null>(null)
  const [showNightRelaxation, setShowNightRelaxation] = useState(false)
  const [showMindfulnessDaily, setShowMindfulnessDaily] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showNutritionGuide, setShowNutritionGuide] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [nutritionResult, setNutritionResult] = useState<NutritionAnalysis | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  // Função para analisar foto de comida
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Criar preview da imagem
    const reader = new FileReader()
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Simular análise (em produção, isso seria uma chamada para API de IA)
    setIsAnalyzing(true)
    
    // Simulação de análise com delay
    setTimeout(() => {
      // Análise simulada - em produção, usar API de visão computacional
      const mockAnalysis: NutritionAnalysis = {
        foodName: "Prato Misto",
        calories: 650,
        protein: 35,
        carbs: 75,
        fats: 18,
        fiber: 8,
        portions: "1 porção média"
      }
      
      setNutritionResult(mockAnalysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleCameraCapture = () => {
    // Trigger file input para abrir câmera
    const input = document.getElementById('camera-input') as HTMLInputElement
    if (input) {
      input.click()
    }
  }

  const resetAnalysis = () => {
    setNutritionResult(null)
    setPhotoPreview(null)
  }

  // Se está mostrando guia de nutrição
  if (showNutritionGuide) {
    return (
      <div className="space-y-6">
        <Button
          onClick={() => {
            setShowNutritionGuide(false)
            resetAnalysis()
          }}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Plano
        </Button>

        <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-500/20 dark:via-emerald-500/20 dark:to-teal-500/20">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4">
              <Utensils className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl">Guia de Nutrição Premium</CardTitle>
            <CardDescription className="text-base">Contador de calorias inteligente com análise por foto</CardDescription>
            <Badge className="mx-auto mt-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              Exclusivo Premium
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Área de Upload/Captura */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-green-500" />
                Tire uma foto do seu prato
              </h3>
              
              {!photoPreview ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-8 text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-green-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Tire uma foto do seu prato em tempo real ou faça upload de uma imagem
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={handleCameraCapture}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Abrir Câmera
                      </Button>
                      <Button
                        onClick={() => document.getElementById('file-input')?.click()}
                        variant="outline"
                        className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Fazer Upload
                      </Button>
                    </div>
                    <input
                      id="camera-input"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Preview da foto */}
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={photoPreview}
                      alt="Preview do prato"
                      className="w-full h-64 object-cover"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-3"></div>
                          <p className="text-sm">Analisando sua refeição...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {!isAnalyzing && !nutritionResult && (
                    <Button
                      onClick={resetAnalysis}
                      variant="outline"
                      className="w-full"
                    >
                      Tirar outra foto
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Resultado da Análise */}
            {nutritionResult && (
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <Apple className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{nutritionResult.foodName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{nutritionResult.portions}</p>
                    </div>
                  </div>

                  {/* Calorias Destaque */}
                  <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="w-6 h-6 text-orange-500" />
                        <span className="font-semibold">Calorias Totais</span>
                      </div>
                      <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        {nutritionResult.calories}
                      </span>
                    </div>
                  </div>

                  {/* Macronutrientes */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Proteínas</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{nutritionResult.protein}g</p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Carboidratos</p>
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{nutritionResult.carbs}g</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Gorduras</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{nutritionResult.fats}g</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Fibras</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{nutritionResult.fiber}g</p>
                    </div>
                  </div>

                  {/* Distribuição Visual */}
                  <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                    <p className="text-sm font-semibold mb-3">Distribuição de Macronutrientes</p>
                    <div className="flex gap-1 h-4 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500" 
                        style={{ width: `${(nutritionResult.protein * 4 / nutritionResult.calories) * 100}%` }}
                        title="Proteínas"
                      />
                      <div 
                        className="bg-amber-500" 
                        style={{ width: `${(nutritionResult.carbs * 4 / nutritionResult.calories) * 100}%` }}
                        title="Carboidratos"
                      />
                      <div 
                        className="bg-purple-500" 
                        style={{ width: `${(nutritionResult.fats * 9 / nutritionResult.calories) * 100}%` }}
                        title="Gorduras"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        Proteínas
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        Carboidratos
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        Gorduras
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={resetAnalysis}
                    className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    Analisar Outra Refeição
                  </Button>
                </div>

                {/* Dicas Nutricionais */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    Dicas Personalizadas
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Boa quantidade de proteínas para recuperação muscular</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Carboidratos adequados para energia durante o dia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Considere adicionar mais vegetais para aumentar fibras</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Beba pelo menos 500ml de água com esta refeição</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Informações sobre o recurso */}
            {!nutritionResult && !isAnalyzing && (
              <div className="p-6 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Como funciona?
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">1.</span>
                    <span>Tire uma foto do seu prato em tempo real ou faça upload</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">2.</span>
                    <span>Nossa IA analisa os alimentos e porções automaticamente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">3.</span>
                    <span>Receba análise completa de calorias e macronutrientes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">4.</span>
                    <span>Obtenha dicas personalizadas para otimizar sua nutrição</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Benefícios Premium */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Benefícios Premium
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Análise ilimitada:</strong> Escaneie quantas refeições quiser por dia</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Histórico completo:</strong> Acompanhe sua ingestão calórica ao longo do tempo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Metas personalizadas:</strong> Defina objetivos de calorias e macros</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Sugestões inteligentes:</strong> Receba recomendações baseadas em seus objetivos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Integração com treinos:</strong> Ajuste nutrição baseado em seus exercícios</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Se está mostrando mindfulness diário
  if (showMindfulnessDaily) {
    return (
      <div className="space-y-6">
        <Button
          onClick={() => {
            setShowMindfulnessDaily(false)
            setIsPlaying(false)
          }}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Plano
        </Button>

        <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-orange-500/20">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-4">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl">Mindfulness Diário</CardTitle>
            <CardDescription className="text-base">Prática de atenção plena para reduzir estresse e aumentar autoconsciência</CardDescription>
            <div className="flex gap-2 justify-center mt-4">
              <Badge variant="secondary" className="text-sm">
                <Clock className="w-4 h-4 mr-1" />
                15 minutos
              </Badge>
              <Badge variant="outline" className="text-sm">
                Mindfulness
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Controle de Play/Pause */}
            <div className="flex justify-center">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                size="lg"
                className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-2xl"
              >
                {isPlaying ? (
                  <Pause className="w-12 h-12" />
                ) : (
                  <Play className="w-12 h-12 ml-1" />
                )}
              </Button>
            </div>

            {isPlaying && (
              <div className="text-center">
                <p className="text-sm text-purple-600 dark:text-purple-400 animate-pulse">
                  Sessão em andamento...
                </p>
              </div>
            )}

            {/* Preparação */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
              <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                <span className="break-words">Preparação para a Sessão</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                  <span className="break-words">Encontre um lugar tranquilo onde não será interrompido por 15 minutos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                  <span className="break-words">Sente-se confortavelmente com a coluna ereta (cadeira, almofada ou chão)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                  <span className="break-words">Silencie todas as notificações do celular</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                  <span className="break-words">Use roupas confortáveis que não apertem</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                  <span className="break-words">Pode fechar os olhos ou manter olhar suave para baixo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                  <span className="break-words">Mantenha as mãos relaxadas sobre as coxas ou em posição de meditação</span>
                </li>
              </ul>
            </div>

            {/* Etapas da Meditação */}
            <div className="space-y-4">
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                <span className="break-words">Etapas da Prática (15 minutos)</span>
              </h3>

              {/* Etapa 1 */}
              <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border-l-4 border-purple-500">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-purple-500 text-xs sm:text-sm">Etapa 1</Badge>
                  <span className="text-xs sm:text-sm font-semibold break-words">Ancoragem na Respiração (5 min)</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 break-words">
                  Estabeleça uma conexão profunda com sua respiração natural.
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="font-medium">Como praticar:</p>
                  <ol className="space-y-2 ml-4">
                    <li className="break-words">1. <strong>Observe sua respiração natural</strong> - não tente controlá-la, apenas observe</li>
                    <li className="break-words">2. <strong>Sinta o ar entrando</strong> pelas narinas - está frio ou quente? Rápido ou lento?</li>
                    <li className="break-words">3. <strong>Acompanhe o movimento do abdômen</strong> - subindo na inspiração, descendo na expiração</li>
                    <li className="break-words">4. <strong>Note as pausas naturais</strong> entre inspiração e expiração</li>
                    <li className="break-words">5. <strong>Quando a mente vagar</strong> (e ela vai!), gentilmente traga a atenção de volta à respiração</li>
                    <li className="break-words">6. <strong>Não julgue</strong> - não há respiração "certa" ou "errada", apenas observe</li>
                    <li className="break-words">7. <strong>Conte as respirações</strong> se ajudar: inspire (1), expire (2), até 10, depois recomeçe</li>
                  </ol>
                  <div className="mt-3 p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-xs italic break-words">
                      <strong>Dica importante:</strong> É completamente normal a mente vagar 100 vezes em 5 minutos. 
                      Cada vez que você percebe e retorna à respiração, você está praticando mindfulness com sucesso!
                    </p>
                  </div>
                </div>
              </div>

              {/* Etapa 2 */}
              <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border-l-4 border-pink-500">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-pink-500 text-xs sm:text-sm">Etapa 2</Badge>
                  <span className="text-xs sm:text-sm font-semibold break-words">Escaneamento Corporal Consciente (5 min)</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 break-words">
                  Traga consciência para cada parte do corpo, observando sensações sem julgamento.
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="font-medium">Sequência de atenção:</p>
                  <ol className="space-y-2 ml-4">
                    <li className="break-words">1. <strong>Pés:</strong> Sinta o contato com o chão ou sapato. Há calor, frio, formigamento, pressão? Apenas observe</li>
                    <li className="break-words">2. <strong>Pernas:</strong> Note o peso das pernas. Há tensão nos músculos? Relaxamento? Sem tentar mudar nada</li>
                    <li className="break-words">3. <strong>Quadris e abdômen:</strong> Observe o movimento da respiração no abdômen. Há aperto ou expansão?</li>
                    <li className="break-words">4. <strong>Peito e costas:</strong> Sinta a expansão do peito ao respirar. Note a postura da coluna</li>
                    <li className="break-words">5. <strong>Mãos e braços:</strong> Observe temperatura, formigamento, peso. As mãos estão relaxadas ou tensas?</li>
                    <li className="break-words">6. <strong>Ombros e pescoço:</strong> Área comum de tensão. Apenas observe, sem tentar relaxar forçadamente</li>
                    <li className="break-words">7. <strong>Rosto e cabeça:</strong> Note a expressão facial. Mandíbula relaxada? Testa suave? Olhos descansados?</li>
                    <li className="break-words">8. <strong>Corpo inteiro:</strong> Expanda a consciência para todo o corpo simultaneamente por 30 segundos</li>
                  </ol>
                  <div className="mt-3 p-2 sm:p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                    <p className="text-xs italic break-words">
                      <strong>Princípio fundamental:</strong> Não tente mudar ou relaxar nada. Apenas observe com curiosidade. 
                      O relaxamento acontece naturalmente quando trazemos consciência sem julgamento.
                    </p>
                  </div>
                </div>
              </div>

              {/* Etapa 3 */}
              <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border-l-4 border-orange-500">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-orange-500 text-xs sm:text-sm">Etapa 3</Badge>
                  <span className="text-xs sm:text-sm font-semibold break-words">Observação de Pensamentos e Emoções (3 min)</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 break-words">
                  Pratique observar pensamentos e emoções como nuvens passando no céu da consciência.
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="font-medium">Como observar a mente:</p>
                  <ol className="space-y-2 ml-4">
                    <li className="break-words">1. <strong>Expanda a consciência</strong> - além da respiração e corpo, inclua pensamentos e emoções</li>
                    <li className="break-words">2. <strong>Note quando um pensamento surge</strong> - "Ah, estou pensando sobre..."</li>
                    <li className="break-words">3. <strong>Não se envolva com o pensamento</strong> - não analise, não julgue, não continue a história</li>
                    <li className="break-words">4. <strong>Observe como nuvens no céu</strong> - pensamentos vêm e vão naturalmente</li>
                    <li className="break-words">5. <strong>Note emoções presentes</strong> - ansiedade, calma, tédio, curiosidade? Apenas nomeie e observe</li>
                    <li className="break-words">6. <strong>Onde sente a emoção no corpo?</strong> - aperto no peito, borboletas no estômago, calor no rosto?</li>
                    <li className="break-words">7. <strong>Retorne à respiração</strong> como âncora sempre que se perder em pensamentos</li>
                  </ol>
                  <div className="mt-3 p-2 sm:p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-xs break-words">
                      <strong>Metáfora útil:</strong> Você não é seus pensamentos. Você é o céu, e pensamentos são nuvens passageiras. 
                      O céu permanece vasto e tranquilo, independente das nuvens que passam.
                    </p>
                  </div>
                </div>
              </div>

              {/* Etapa 4 */}
              <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border-l-4 border-purple-400">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-purple-400 text-xs sm:text-sm">Etapa 4</Badge>
                  <span className="text-xs sm:text-sm font-semibold break-words">Aceitação e Gratidão (2 min)</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 break-words">
                  Cultive aceitação do momento presente e gratidão pela prática.
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <ol className="space-y-2 ml-4">
                    <li className="break-words">1. <strong>Aceite este momento exatamente como ele é</strong> - com todos os pensamentos, sensações e emoções</li>
                    <li className="break-words">2. <strong>Não precisa ser perfeito</strong> - a mente vagou 50 vezes? Perfeito! Você praticou retornar 50 vezes</li>
                    <li className="break-words">3. <strong>Agradeça a si mesmo</strong> por dedicar este tempo ao autocuidado</li>
                    <li className="break-words">4. <strong>Reconheça o esforço</strong> - em um mundo cheio de distrações, você escolheu estar presente</li>
                    <li className="break-words">5. <strong>Estabeleça uma intenção</strong> - como levar esta consciência para o resto do dia?</li>
                    <li className="break-words">6. <strong>Lentamente, abra os olhos</strong> (se estavam fechados) e retorne ao ambiente</li>
                    <li className="break-words">7. <strong>Mova-se gentilmente</strong> - alongue-se suavemente antes de retomar atividades</li>
                  </ol>
                  <div className="mt-3 p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-xs italic break-words">
                      <strong>Leve consigo:</strong> Mindfulness não termina quando a prática acaba. 
                      Tente trazer esta mesma qualidade de atenção para atividades cotidianas - comer, caminhar, conversar.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Técnicas Complementares */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30">
              <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                <span className="break-words">Técnicas Complementares para Aprofundar a Prática</span>
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 break-words">🎯 Técnica da Âncora</h4>
                  <p className="break-words">Escolha uma "âncora" para retornar quando a mente vagar: respiração, sons ambientes, sensações nos pés. 
                  Sempre que perceber que se distraiu, gentilmente retorne à âncora.</p>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 break-words">🏷️ Técnica da Rotulação</h4>
                  <p className="break-words">Quando pensamentos surgirem, rotule-os mentalmente: "planejamento", "preocupação", "memória", "fantasia". 
                  Isso cria distância saudável entre você e seus pensamentos.</p>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 break-words">🌊 Técnica da Onda</h4>
                  <p className="break-words">Quando emoções intensas surgirem, imagine-as como ondas do oceano. Observe a onda crescer, atingir o pico 
                  e naturalmente diminuir. Todas as emoções são temporárias.</p>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 break-words">🔍 Técnica RAIN</h4>
                  <p className="break-words"><strong>R</strong>econheça o que está acontecendo | <strong>A</strong>ceite a experiência | 
                  <strong>I</strong>nvestigue com gentileza | <strong>N</strong>ão se identifique (você não é a emoção)</p>
                </div>
              </div>
            </div>

            {/* Benefícios Científicos */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30">
              <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                <span className="break-words">Benefícios Científicos Comprovados</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Reduz estresse e ansiedade:</strong> Diminui cortisol e ativa sistema nervoso parassimpático</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Melhora foco e concentração:</strong> Aumenta densidade de massa cinzenta no córtex pré-frontal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Aumenta autoconsciência:</strong> Fortalece conexões entre áreas cerebrais de autoconhecimento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Melhora regulação emocional:</strong> Reduz reatividade da amígdala (centro do medo)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Aumenta empatia e compaixão:</strong> Ativa áreas cerebrais relacionadas à conexão social</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Melhora qualidade do sono:</strong> Reduz ruminação mental e promove relaxamento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Fortalece sistema imunológico:</strong> Reduz inflamação e aumenta anticorpos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Reduz dor crônica:</strong> Altera percepção da dor e aumenta tolerância</span>
                </li>
              </ul>
            </div>

            {/* Desafios Comuns */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30">
              <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
                <span className="break-words">Desafios Comuns e Como Superá-los</span>
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-400 break-words">😴 "Fico com sono durante a prática"</h4>
                  <p className="break-words"><strong>Solução:</strong> Pratique em horários de maior energia (manhã), mantenha olhos abertos com olhar suave, 
                  sente-se ereto (não deite), faça respirações mais energizantes antes de começar.</p>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-400 break-words">🌪️ "Minha mente não para de pensar"</h4>
                  <p className="break-words"><strong>Solução:</strong> Isso é completamente normal! A mente pensa - é o que ela faz. O objetivo não é parar 
                  pensamentos, mas mudar sua relação com eles. Cada vez que percebe e retorna, você está praticando corretamente.</p>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-400 break-words">⏰ "Não tenho tempo para 15 minutos"</h4>
                  <p className="break-words"><strong>Solução:</strong> Comece com 3-5 minutos. Melhor praticar pouco todos os dias do que muito uma vez por semana. 
                  Você pode até praticar 1 minuto de respiração consciente várias vezes ao dia.</p>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-400 break-words">😣 "Sinto desconforto físico"</h4>
                  <p className="break-words"><strong>Solução:</strong> Ajuste sua posição! Mindfulness não é sobre sofrer. Use almofadas, apoie as costas, 
                  mude de posição se necessário. Conforto físico facilita a prática mental.</p>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-400 break-words">🤔 "Não sei se estou fazendo certo"</h4>
                  <p className="break-words"><strong>Solução:</strong> Se você está prestando atenção ao momento presente (mesmo que por 2 segundos), 
                  você está fazendo certo! Não existe "perfeição" em mindfulness. A prática é o processo, não o resultado.</p>
                </div>
              </div>
            </div>

            {/* Dicas para Integrar no Dia a Dia */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
              <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                <span className="break-words">Mindfulness no Dia a Dia - Micro-práticas</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words"><strong>Ao acordar:</strong> Antes de pegar o celular, faça 3 respirações conscientes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words"><strong>Comendo:</strong> Coma a primeira mordida de cada refeição com atenção total - sabor, textura, temperatura</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words"><strong>Caminhando:</strong> Sinta os pés tocando o chão a cada passo por 1 minuto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words"><strong>Esperando:</strong> Em filas ou trânsito, observe sua respiração em vez de pegar o celular</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words"><strong>Conversando:</strong> Pratique escuta ativa - ouça completamente antes de formular resposta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words"><strong>Trabalhando:</strong> A cada hora, pause 30 segundos para observar sua postura e respiração</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words"><strong>Antes de dormir:</strong> Faça body scan rápido de 2 minutos deitado na cama</span>
                </li>
              </ul>
            </div>

            {/* Progressão da Prática */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30">
              <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 flex-shrink-0" />
                <span className="break-words">Progressão da Prática - Próximos Passos</span>
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-indigo-300">
                  <h4 className="font-semibold mb-1 break-words">📅 Semana 1-2: Estabelecer Hábito</h4>
                  <p className="break-words">Pratique 5-10 minutos diariamente, mesmo horário. Foque apenas em respiração. Não se cobre perfeição.</p>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-indigo-400">
                  <h4 className="font-semibold mb-1 break-words">📅 Semana 3-4: Expandir Consciência</h4>
                  <p className="break-words">Aumente para 15 minutos. Adicione body scan. Comece a observar pensamentos sem se envolver.</p>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-indigo-500">
                  <h4 className="font-semibold mb-1 break-words">📅 Mês 2+: Aprofundar e Integrar</h4>
                  <p className="break-words">Pratique 20-30 minutos. Integre mindfulness em atividades diárias. Explore meditações guiadas variadas.</p>
                </div>
                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-indigo-600">
                  <h4 className="font-semibold mb-1 break-words">📅 Longo Prazo: Estilo de Vida</h4>
                  <p className="break-words">Mindfulness se torna natural. Você responde em vez de reagir. Maior equanimidade diante de desafios.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Se está mostrando relaxamento noturno
  if (showNightRelaxation) {
    return (
      <div className="space-y-6">
        <Button
          onClick={() => {
            setShowNightRelaxation(false)
            setIsPlaying(false)
          }}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Plano
        </Button>

        <Card className="border-0 shadow-2xl bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:via-blue-500/20 dark:to-purple-500/20">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center mb-4">
              <Moon className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl">Relaxamento Noturno</CardTitle>
            <CardDescription className="text-base">Meditação guiada para um sono profundo e reparador</CardDescription>
            <div className="flex gap-2 justify-center mt-4">
              <Badge variant="secondary" className="text-sm">
                <Clock className="w-4 h-4 mr-1" />
                20 minutos
              </Badge>
              <Badge variant="outline" className="text-sm">
                Sono Profundo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Controle de Play/Pause */}
            <div className="flex justify-center">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                size="lg"
                className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-2xl"
              >
                {isPlaying ? (
                  <Pause className="w-12 h-12" />
                ) : (
                  <Play className="w-12 h-12 ml-1" />
                )}
              </Button>
            </div>

            {isPlaying && (
              <div className="text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400 animate-pulse">
                  Sessão em andamento...
                </p>
              </div>
            )}

            {/* Preparação */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30">
              <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 flex-shrink-0" />
                <span className="break-words">Preparação para a Sessão</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1 flex-shrink-0">•</span>
                  <span className="break-words">Deite-se confortavelmente na cama, de costas ou na posição que preferir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1 flex-shrink-0">•</span>
                  <span className="break-words">Ajuste a temperatura do quarto para 18-22°C (ideal para o sono)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1 flex-shrink-0">•</span>
                  <span className="break-words">Diminua as luzes ou apague-as completamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1 flex-shrink-0">•</span>
                  <span className="break-words">Coloque fones de ouvido ou deixe o som ambiente baixo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1 flex-shrink-0">•</span>
                  <span className="break-words">Silencie todas as notificações do celular</span>
                </li>
              </ul>
            </div>

            {/* Etapas da Meditação */}
            <div className="space-y-4">
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                <span className="break-words">Etapas da Meditação (20 minutos)</span>
              </h3>

              {/* Etapa 1 */}
              <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border-l-4 border-indigo-500">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-indigo-500 text-xs sm:text-sm">Etapa 1</Badge>
                  <span className="text-xs sm:text-sm font-semibold break-words">Respiração Consciente (5 min)</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 break-words">
                  Comece a desacelerar o corpo e a mente através da respiração controlada.
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="font-medium">Como fazer:</p>
                  <ol className="space-y-1 ml-4">
                    <li className="break-words">1. Inspire profundamente pelo nariz contando até 4</li>
                    <li className="break-words">2. Segure o ar por 7 segundos</li>
                    <li className="break-words">3. Expire lentamente pela boca contando até 8</li>
                    <li className="break-words">4. Repita este ciclo 10 vezes, mantendo o ritmo constante</li>
                    <li className="break-words">5. Sinta seu corpo relaxando a cada expiração</li>
                  </ol>
                </div>
              </div>

              {/* Etapa 2 */}
              <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border-l-4 border-blue-500">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-blue-500 text-xs sm:text-sm">Etapa 2</Badge>
                  <span className="text-xs sm:text-sm font-semibold break-words">Body Scan Progressivo (7 min)</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 break-words">
                  Libere toda a tensão acumulada no corpo, parte por parte.
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="font-medium">Sequência de relaxamento:</p>
                  <ol className="space-y-1 ml-4">
                    <li className="break-words">1. <strong>Pés e pernas:</strong> Contraia por 5 segundos, depois relaxe completamente. Sinta o peso das pernas afundando no colchão</li>
                    <li className="break-words">2. <strong>Abdômen e quadris:</strong> Tensione os músculos, depois solte. Permita que a respiração flua naturalmente</li>
                    <li className="break-words">3. <strong>Peito e costas:</strong> Inspire profundamente expandindo o peito, depois expire soltando toda a tensão</li>
                    <li className="break-words">4. <strong>Braços e mãos:</strong> Feche os punhos com força, depois abra e relaxe. Sinta os braços pesados</li>
                    <li className="break-words">5. <strong>Pescoço e ombros:</strong> Eleve os ombros até as orelhas, depois deixe-os cair. Gire o pescoço suavemente</li>
                    <li className="break-words">6. <strong>Rosto e cabeça:</strong> Franza a testa, depois relaxe. Solte a mandíbula, deixe a língua descansar</li>
                  </ol>
                </div>
              </div>

              {/* Etapa 3 */}
              <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border-l-4 border-purple-500">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-purple-500 text-xs sm:text-sm">Etapa 3</Badge>
                  <span className="text-xs sm:text-sm font-semibold break-words">Visualização Guiada (5 min)</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 break-words">
                  Transporte sua mente para um lugar de paz e tranquilidade absoluta.
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="font-medium">Cenário de visualização:</p>
                  <div className="p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="italic break-words">
                      "Imagine-se em uma praia tranquila ao entardecer. A areia é macia e quente sob seu corpo. 
                      Você ouve o som suave das ondas quebrando na costa, em um ritmo constante e relaxante. 
                      O céu está pintado com tons de laranja, rosa e roxo. Uma brisa leve e fresca toca sua pele. 
                      Você está completamente seguro, em paz, sem preocupações. Cada onda que quebra leva embora 
                      qualquer tensão restante. Você está afundando mais e mais profundamente no relaxamento..."
                    </p>
                  </div>
                  <p className="mt-2 break-words">
                    <strong>Dica:</strong> Envolva todos os sentidos - visualize as cores, ouça os sons, sinta as sensações, 
                    cheire o ar do mar. Quanto mais vívida a imagem, mais profundo o relaxamento.
                  </p>
                </div>
              </div>

              {/* Etapa 4 */}
              <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border-l-4 border-indigo-400">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-indigo-400 text-xs sm:text-sm">Etapa 4</Badge>
                  <span className="text-xs sm:text-sm font-semibold break-words">Transição para o Sono (3 min)</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 break-words">
                  Permita-se deslizar naturalmente para o sono profundo.
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <ol className="space-y-1 ml-4">
                    <li className="break-words">1. Continue respirando de forma lenta e natural</li>
                    <li className="break-words">2. Não se preocupe se sua mente vagar - é normal e esperado</li>
                    <li className="break-words">3. Simplesmente observe os pensamentos passarem como nuvens no céu</li>
                    <li className="break-words">4. Sinta seu corpo ficando cada vez mais pesado e relaxado</li>
                    <li className="break-words">5. Permita-se adormecer naturalmente, sem esforço</li>
                  </ol>
                  <p className="mt-3 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded break-words">
                    <strong>Importante:</strong> Se não adormecer imediatamente, não se preocupe. 
                    O relaxamento profundo já está beneficiando seu corpo e mente. Continue respirando 
                    calmamente e o sono virá naturalmente.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefícios Científicos */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30">
              <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                <span className="break-words">Benefícios Científicos Comprovados</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Reduz cortisol:</strong> Diminui o hormônio do estresse em até 30%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Melhora qualidade do sono:</strong> Aumenta o tempo em sono profundo (REM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Reduz insônia:</strong> 75% dos praticantes relatam adormecer mais rápido</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Diminui ansiedade:</strong> Ativa o sistema nervoso parassimpático (relaxamento)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span className="break-words"><strong>Melhora recuperação:</strong> Corpo se regenera melhor durante o sono profundo</span>
                </li>
              </ul>
            </div>

            {/* Dicas Extras */}
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30">
              <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
                <span className="break-words">Dicas para Potencializar os Resultados</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words">Pratique todos os dias no mesmo horário para criar um ritual de sono</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words">Evite cafeína após 14h e refeições pesadas 3 horas antes de dormir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words">Mantenha o quarto escuro, silencioso e fresco (18-22°C)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words">Use óleos essenciais de lavanda ou camomila para potencializar o relaxamento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1 flex-shrink-0">💡</span>
                  <span className="break-words">Combine com um banho morno 1 hora antes para relaxar os músculos</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Se está mostrando plano de treino, renderizar componente
  if (showWorkoutPlan && healthProfile) {
    return (
      <WorkoutPlan
        healthProfile={healthProfile}
        workoutType={showWorkoutPlan}
        onClose={() => setShowWorkoutPlan(null)}
      />
    )
  }

  // Gerar plano baseado nos objetivos
  const generateWorkouts = () => {
    const workouts = []
    
    if (profile.goals.energy >= 7) {
      workouts.push({
        title: "HIIT Energizante",
        duration: "20 min",
        intensity: "Alta",
        description: "Treino intervalado de alta intensidade para aumentar energia e disposição",
        icon: Activity,
        color: "from-orange-400 to-pink-500",
        type: "hiit" as const
      })
    }
    
    if (profile.preferences.includes("cardio")) {
      workouts.push({
        title: "Cardio Personalizado",
        duration: "30 min",
        intensity: "Moderada",
        description: "Treino cardiovascular adaptado ao seu perfil físico",
        icon: Activity,
        color: "from-green-400 to-emerald-500",
        type: "cardio" as const
      })
    }
    
    if (profile.preferences.includes("strength")) {
      workouts.push({
        title: "Treino de Força",
        duration: "45 min",
        intensity: "Alta",
        description: "Exercícios de musculação personalizados para seu nível",
        icon: Activity,
        color: "from-red-400 to-orange-500",
        type: "strength" as const
      })
    }
    
    if (profile.preferences.includes("yoga")) {
      workouts.push({
        title: "Yoga Personalizado",
        duration: "30 min",
        intensity: "Baixa",
        description: "Sequências de yoga adaptadas ao seu corpo e objetivos",
        icon: Activity,
        color: "from-purple-400 to-pink-500",
        type: "yoga" as const
      })
    }
    
    return workouts.slice(0, 4)
  }

  const generateMeditations = () => {
    const meditations = []
    
    if (profile.goals.focus >= 7) {
      meditations.push({
        title: "Meditação para Foco",
        duration: "15 min",
        type: "Concentração",
        description: "Técnicas de mindfulness para melhorar concentração",
        icon: Brain,
        color: "from-blue-400 to-purple-500",
        relatedWorkout: "yoga" as const,
        hasDetailedContent: false
      })
    }
    
    if (profile.goals.sleep >= 7) {
      meditations.push({
        title: "Relaxamento Noturno",
        duration: "20 min",
        type: "Sono",
        description: "Meditação guiada para preparar o corpo para dormir",
        icon: Moon,
        color: "from-indigo-400 to-blue-500",
        relatedWorkout: "yoga" as const,
        hasDetailedContent: true
      })
    }
    
    if (profile.preferences.includes("meditation")) {
      meditations.push({
        title: "Mindfulness Diário",
        duration: "15 min",
        type: "Mindfulness",
        description: "Prática diária de atenção plena para reduzir estresse e aumentar autoconsciência",
        icon: Brain,
        color: "from-purple-400 to-pink-500",
        relatedWorkout: "yoga" as const,
        hasDetailedContent: true
      })
    }
    
    return meditations.slice(0, 3)
  }

  const generateTips = () => {
    const tips = []
    
    if (profile.goals.energy >= 7) {
      tips.push("💧 Beba pelo menos 2L de água hoje para manter energia")
      tips.push("🥗 Inclua proteínas em todas as refeições")
    }
    
    if (profile.goals.focus >= 7) {
      tips.push("📱 Faça pausas de 5 minutos a cada hora de trabalho")
      tips.push("🎯 Use a técnica Pomodoro para manter o foco")
    }
    
    if (profile.goals.sleep >= 7) {
      tips.push("🌙 Evite telas 1 hora antes de dormir")
      tips.push("☕ Limite cafeína após 14h")
    }
    
    tips.push("🧘 Reserve 10 minutos para meditação")
    tips.push("🚶 Faça uma caminhada de 15 minutos ao ar livre")
    
    return tips.slice(0, 4)
  }

  const workouts = generateWorkouts()
  const meditations = generateMeditations()
  const tips = generateTips()

  // Função para iniciar meditação
  const handleStartMeditation = (title: string, hasDetailedContent: boolean, relatedWorkout: "yoga" | "cardio" | "strength" | "hiit") => {
    if (healthProfile) {
      if (title === "Relaxamento Noturno") {
        setShowNightRelaxation(true)
      } else if (title === "Mindfulness Diário") {
        setShowMindfulnessDaily(true)
      } else if (hasDetailedContent) {
        setShowNightRelaxation(true)
      } else {
        setShowWorkoutPlan(relatedWorkout)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Objetivos */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            <CardTitle>Seus Objetivos</CardTitle>
          </div>
          <CardDescription>Foco principal da sua jornada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.goals.energy >= 7 && (
              <Badge className="bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0">
                <Activity className="w-3 h-3 mr-1" />
                Aumentar Energia
              </Badge>
            )}
            {profile.goals.focus >= 7 && (
              <Badge className="bg-gradient-to-r from-blue-400 to-purple-500 text-white border-0">
                <Brain className="w-3 h-3 mr-1" />
                Melhorar Foco
              </Badge>
            )}
            {profile.goals.sleep >= 7 && (
              <Badge className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white border-0">
                <Moon className="w-3 h-3 mr-1" />
                Qualidade do Sono
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alert se não tem perfil de saúde */}
      {!healthProfile && (
        <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Configure seu Perfil de Saúde</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Para receber planos de treino personalizados baseados em sua altura, peso e frequência, 
                  configure seu perfil de saúde na aba "Saúde".
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Treinos */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold">Treinos Recomendados</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workouts.map((workout, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${workout.color} flex items-center justify-center mb-3`}>
                  <workout.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{workout.title}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {workout.duration}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {workout.intensity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {workout.description}
                </p>
                
                <Button 
                  onClick={() => healthProfile ? setShowWorkoutPlan(workout.type) : null}
                  disabled={!healthProfile}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  {healthProfile ? "Ver Plano Semanal" : "Configure Perfil de Saúde"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Meditações */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-bold">Meditações Personalizadas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meditations.map((meditation, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${meditation.color} flex items-center justify-center mb-3`}>
                  <meditation.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{meditation.title}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {meditation.duration}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {meditation.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {meditation.description}
                </p>
                
                <Button 
                  onClick={() => healthProfile ? handleStartMeditation(meditation.title, meditation.hasDetailedContent, meditation.relatedWorkout) : null}
                  disabled={!healthProfile}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  {healthProfile ? "Iniciar" : "Configure Perfil de Saúde"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dicas Diárias */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <CardTitle>Dicas do Dia</CardTitle>
          </div>
          <CardDescription>Pequenas ações para grandes resultados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guia de Nutrição Premium - NOVO */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-green-500" />
              <CardTitle>Guia de Nutrição</CardTitle>
            </div>
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
          <CardDescription>Contador de calorias inteligente com análise por foto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-gray-800">
              <Camera className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Análise Nutricional por Foto</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Tire uma foto do seu prato e receba instantaneamente a contagem de calorias, 
                  macronutrientes e dicas personalizadas para otimizar sua alimentação.
                </p>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Contagem automática de calorias
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Análise de macronutrientes (proteínas, carboidratos, gorduras)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Dicas personalizadas baseadas em seus objetivos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Histórico completo de refeições
                  </li>
                </ul>
                <Button
                  onClick={() => setShowNutritionGuide(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Abrir Guia de Nutrição
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
