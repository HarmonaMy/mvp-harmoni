"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Dumbbell, Heart, Zap, Clock, Target, TrendingUp, CheckCircle2, Info, Camera, Upload, Loader2, Lock } from "lucide-react"
import type { HealthProfile } from "./health-profile"

type WorkoutPlanProps = {
  healthProfile: HealthProfile
  workoutType: "yoga" | "cardio" | "strength" | "hiit"
  onClose: () => void
  isPremium?: boolean
}

type Exercise = {
  name: string
  sets?: string
  reps?: string
  duration?: string
  rest?: string
  description: string
  howTo: string[]
  variations: string[]
  week: number // Semana em que o exercício aparece
}

type WorkoutDay = {
  day: string
  focus: string
  exercises: Exercise[]
  week: number // Semana do treino
}

type NutritionAnalysis = {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  tips: string[]
}

export function WorkoutPlan({ healthProfile, workoutType, onClose, isPremium = false }: WorkoutPlanProps) {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [showNutrition, setShowNutrition] = useState(false)
  const [nutritionImage, setNutritionImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [nutritionAnalysis, setNutritionAnalysis] = useState<NutritionAnalysis | null>(null)

  // Calcular IMC para ajustar intensidade
  const bmi = healthProfile.weight / Math.pow(healthProfile.height / 100, 2)
  const isOverweight = bmi > 25
  
  // Determinar frequência semanal baseada no nível de atividade
  const getWeeklyFrequency = () => {
    switch (healthProfile.activityLevel) {
      case "sedentary": return 2
      case "light": return 3
      case "moderate": return 4
      case "active": return 5
      case "very-active": return 6
      default: return 3
    }
  }

  const weeklyFrequency = getWeeklyFrequency()

  // Função para completar exercício
  const completeExercise = (exerciseName: string) => {
    const exerciseId = `${workoutType}-${exerciseName}-week${currentWeek}`
    
    if (!completedExercises.has(exerciseId)) {
      const newCompleted = new Set(completedExercises)
      newCompleted.add(exerciseId)
      setCompletedExercises(newCompleted)
    }
  }

  // Função para capturar foto
  const handleCameraCapture = async () => {
    if (!isPremium) {
      alert("Este recurso é exclusivo para assinantes Premium! Faça upgrade para desbloquear.")
      return
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      // Implementação simplificada - em produção, usar canvas para capturar frame
      alert("Funcionalidade de câmera em desenvolvimento. Use o upload de imagem por enquanto.")
      stream.getTracks().forEach(track => track.stop())
    } catch (error) {
      alert("Erro ao acessar câmera. Verifique as permissões.")
    }
  }

  // Função para upload de imagem
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPremium) {
      alert("Este recurso é exclusivo para assinantes Premium! Faça upgrade para desbloquear.")
      event.target.value = ""
      return
    }

    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNutritionImage(e.target?.result as string)
        analyzeNutrition(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Função para analisar nutrição (simulada)
  const analyzeNutrition = async (imageData: string) => {
    setIsAnalyzing(true)
    
    // Simulação de análise - em produção, usar API de visão computacional
    setTimeout(() => {
      const mockAnalysis: NutritionAnalysis = {
        calories: Math.floor(Math.random() * 400) + 300,
        protein: Math.floor(Math.random() * 30) + 20,
        carbs: Math.floor(Math.random() * 50) + 30,
        fat: Math.floor(Math.random() * 20) + 10,
        fiber: Math.floor(Math.random() * 10) + 5,
        tips: [
          "Ótima escolha de proteínas! Continue assim.",
          "Considere adicionar mais vegetais para fibras.",
          "Hidrate-se bem durante as refeições.",
          "Evite consumir carboidratos simples em excesso."
        ]
      }
      setNutritionAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  // Gerar plano de yoga com progressão semanal
  const generateYogaPlan = (): WorkoutDay[] => {
    return [
      {
        day: "Dia 1 - Fundamentos",
        focus: "Flexibilidade e Equilíbrio Básico",
        week: 1,
        exercises: [
          { 
            name: "Saudação ao Sol (Básica)", 
            duration: "5 min", 
            description: "Aquecimento completo do corpo - versão iniciante",
            week: 1,
            howTo: [
              "Comece em pé com os pés juntos e mãos em prece no peito",
              "Inspire e eleve os braços acima da cabeça, arqueando suavemente para trás",
              "Expire e dobre para frente, tocando o chão ao lado dos pés",
              "Inspire e dê um passo para trás com a perna direita em posição de estocada",
              "Expire e leve a outra perna para trás, formando uma prancha",
              "Desça o corpo até o chão, mantendo cotovelos próximos ao corpo",
              "Inspire e empurre o peito para frente (cobra ou cachorro olhando para cima)",
              "Expire e eleve os quadris para o cachorro olhando para baixo",
              "Mantenha por 5 respirações e retorne à posição inicial"
            ],
            variations: [
              "Semana 1-2: Mantenha joelhos no chão durante a prancha",
              "Semana 3-4: Execute em ritmo moderado, 5-8 repetições",
              "Semana 5+: Adicione saltos entre as transições para maior intensidade"
            ]
          },
          { 
            name: "Postura da Árvore", 
            duration: "2 min cada lado", 
            description: "Equilíbrio e concentração",
            week: 1,
            howTo: [
              "Fique em pé com os pés juntos e peso distribuído igualmente",
              "Transfira o peso para o pé esquerdo",
              "Dobre o joelho direito e coloque a planta do pé na parte interna da coxa esquerda",
              "Mantenha os quadris nivelados e voltados para frente",
              "Una as mãos em prece no peito ou estenda os braços acima da cabeça",
              "Fixe o olhar em um ponto à frente para manter o equilíbrio",
              "Respire profundamente e mantenha por 1-2 minutos",
              "Repita do outro lado"
            ],
            variations: [
              "Semana 1-2: Apoie o pé na panturrilha ou tornozelo (evite o joelho)",
              "Semana 3-4: Mãos em prece acima da cabeça, olhos fechados",
              "Semana 5+: Feche os olhos e balance suavemente de um lado para o outro"
            ]
          },
          { 
            name: "Guerreiro I", 
            duration: "3 min cada lado", 
            description: "Força nas pernas e abertura do quadril",
            week: 2,
            howTo: [
              "Pé direito à frente, joelho dobrado a 90°, pé esquerdo atrás a 45°",
              "Quadris voltados para frente, braços estendidos acima da cabeça",
              "Mantenha o joelho alinhado com o tornozelo, não ultrapassando os dedos",
              "Peito aberto, olhar para cima",
              "Mantenha por 1-2 minutos e troque de lado"
            ],
            variations: [
              "Semana 2-3: Reduza a profundidade do agachamento, use parede para apoio",
              "Semana 4-5: Alterne entre Guerreiro I, II e III em sequência",
              "Semana 6+: Adicione Guerreiro Reverso e transições fluidas entre posturas"
            ]
          },
          { 
            name: "Prancha com Variações", 
            duration: "3x 60s", 
            rest: "30s", 
            description: "Core intenso com progressão",
            week: 3,
            howTo: [
              "Posição de prancha alta, corpo em linha reta",
              "Alterne levantando um braço e a perna oposta",
              "Mantenha quadris estáveis durante todo o movimento",
              "Execute por 60 segundos, descanse 30s, repita 3 vezes"
            ],
            variations: [
              "Semana 3-4: Prancha estática com joelhos apoiados",
              "Semana 5-6: Prancha com toque nos ombros alternados",
              "Semana 7+: Prancha com movimento lateral e rotação"
            ]
          },
          { 
            name: "Postura do Corvo (Crow Pose)", 
            duration: "5 tentativas de 10-30s", 
            description: "Equilíbrio de braços avançado",
            week: 4,
            howTo: [
              "Agache com os pés próximos, mãos no chão à frente",
              "Dobre os cotovelos levemente",
              "Coloque os joelhos na parte externa dos braços",
              "Incline-se para frente, transferindo peso para as mãos",
              "Levante um pé do chão, depois o outro",
              "Olhe para frente, não para baixo",
              "Mantenha o equilíbrio por 10-30 segundos"
            ],
            variations: [
              "Semana 4-5: Pratique o posicionamento sem levantar os pés",
              "Semana 6-7: Levante um pé de cada vez",
              "Semana 8+: Mantenha ambos os pés no ar, estenda os braços (Crane Pose)"
            ]
          },
          { 
            name: "Headstand (Parada de Cabeça)", 
            duration: "3-5 min de prática", 
            description: "Inversão completa - progressão avançada",
            week: 5,
            howTo: [
              "⚠️ ATENÇÃO: Pratique próximo a uma parede inicialmente",
              "Ajoelhe-se, entrelace os dedos e coloque os antebraços no chão",
              "Coloque o topo da cabeça no chão, apoiada nas mãos",
              "Levante os quadris, caminhe com os pés em direção ao rosto",
              "Quando quadris estiverem sobre os ombros, dobre os joelhos ao peito",
              "Lentamente estenda as pernas para cima",
              "Mantenha core ativado, respiração constante",
              "Para sair, dobre os joelhos e desça controladamente"
            ],
            variations: [
              "Semana 5-6: Pratique Dolphin Pose (preparação)",
              "Semana 7-8: Headstand com pernas dobradas",
              "Semana 9+: Headstand completo com variações de pernas"
            ]
          }
        ]
      },
      {
        day: "Dia 2 - Força e Resistência",
        focus: "Desenvolvimento de Força Progressiva",
        week: 1,
        exercises: [
          { 
            name: "Prancha Básica", 
            duration: "3x 30s", 
            rest: "30s", 
            description: "Fortalecimento do core - fundamento essencial",
            week: 1,
            howTo: [
              "Posicione-se em quatro apoios no chão",
              "Estenda as pernas para trás, apoiando-se nos antebraços e dedos dos pés",
              "Cotovelos alinhados diretamente sob os ombros",
              "Corpo formando uma linha reta da cabeça aos calcanhares",
              "Contraia o abdômen, glúteos e pernas",
              "Olhar para o chão, pescoço neutro",
              "Mantenha a respiração constante",
              "Segure por 30 segundos, descanse 30s, repita 3 vezes"
            ],
            variations: [
              "Semana 1-2: Apoie os joelhos no chão, mantendo o core ativado",
              "Semana 3-4: Alterne levantando um braço ou uma perna",
              "Semana 5+: Prancha com toque nos ombros alternados ou com movimento lateral"
            ]
          },
          { 
            name: "Chaturanga (Flexão Yogi)", 
            sets: "3", 
            reps: "8-12", 
            description: "Força nos braços, peito e core",
            week: 1,
            howTo: [
              "Comece em posição de prancha alta (mãos no chão)",
              "Mãos ligeiramente mais largas que os ombros",
              "Dobre os cotovelos mantendo-os próximos ao corpo",
              "Desça o corpo em linha reta até os cotovelos formarem 90°",
              "Mantenha o core contraído e corpo alinhado",
              "Empurre de volta à posição inicial",
              "Execute 8-12 repetições, descanse, repita 3 vezes"
            ],
            variations: [
              "Semana 1-2: Faça com os joelhos apoiados no chão",
              "Semana 3-4: Pause por 2 segundos na posição baixa",
              "Semana 5+: Adicione um salto explosivo ao subir (flexão pliométrica)"
            ]
          }
        ]
      },
      {
        day: "Dia 3 - Flexibilidade Avançada",
        focus: "Alongamentos Profundos e Mobilidade",
        week: 2,
        exercises: [
          { 
            name: "Sequência de Alongamento Completo", 
            duration: "15 min", 
            description: "Mobilidade de corpo inteiro",
            week: 2,
            howTo: [
              "Gato-Vaca (2 min)",
              "Cachorro olhando para baixo (2 min)",
              "Pombo em ambos os lados (3 min cada)",
              "Torções sentadas (2 min cada lado)",
              "Ponte (3x 45s)"
            ],
            variations: [
              "Semana 2-3: Versões suaves de cada postura",
              "Semana 4-5: Mantenha cada postura por tempo completo",
              "Semana 6+: Adicione variações e transições fluidas"
            ]
          }
        ]
      },
      {
        day: "Dia 4 - Flow Avançado",
        focus: "Sequências Dinâmicas e Criativas",
        week: 3,
        exercises: [
          { 
            name: "Vinyasa Flow Criativo", 
            duration: "20 min", 
            description: "Sequência fluida progressiva",
            week: 3,
            howTo: [
              "Saudação ao Sol A e B (5 min)",
              "Sequência de Guerreiros com transições (5 min)",
              "Equilíbrios de braços e inversões (5 min)",
              "Backbends e torções (3 min)",
              "Savasana (2 min)"
            ],
            variations: [
              "Semana 3-4: Flow básico com pausas",
              "Semana 5-6: Flow contínuo com transições suaves",
              "Semana 7+: Flow rápido com posturas desafiadoras"
            ]
          }
        ]
      }
    ]
  }

  // Gerar plano de cardio com progressão semanal
  const generateCardioPlan = (): WorkoutDay[] => {
    const intensity = isOverweight ? "moderada" : "alta"
    
    return [
      {
        day: "Dia 1 - Fundação Cardio",
        focus: "Construindo Base Aeróbica",
        week: 1,
        exercises: [
          { 
            name: "Caminhada/Corrida Iniciante", 
            duration: "20 min", 
            description: `Cardio contínuo em intensidade ${intensity}`,
            week: 1,
            howTo: [
              isOverweight ? "Mantenha um ritmo de caminhada rápida e constante" : "Mantenha um ritmo de corrida leve e sustentável",
              "Postura ereta, ombros relaxados",
              "Braços dobrados a 90°, balançando naturalmente",
              "Respiração rítmica (inspire pelo nariz, expire pela boca)",
              "Mantenha conversação possível (teste do falar)",
              "Hidrate-se a cada 10 minutos"
            ],
            variations: [
              "Semana 1-2: 15 minutos de caminhada moderada",
              "Semana 3-4: 20 minutos alternando caminhada e corrida",
              "Semana 5+: 25 minutos de corrida contínua"
            ]
          },
          { 
            name: "Intervalos Básicos", 
            duration: "15 min", 
            description: "Introdução ao treino intervalado",
            week: 2,
            howTo: [
              "1 min intenso / 2 min recuperação",
              "Repita 5 vezes",
              "Fase intensa: 70-75% do esforço máximo",
              "Fase recuperação: caminhada leve"
            ],
            variations: [
              "Semana 2-3: 30s intenso / 2min leve",
              "Semana 4-5: 1min intenso / 1.5min leve",
              "Semana 6+: 1.5min intenso / 1min leve"
            ]
          },
          { 
            name: "HIIT Cardio", 
            duration: "20 min", 
            description: "Alta intensidade intervalada",
            week: 3,
            howTo: [
              "30s sprint máximo / 30s descanso",
              "Repita 10-12 vezes",
              "Mantenha forma perfeita mesmo em fadiga",
              "Hidratação constante"
            ],
            variations: [
              "Semana 3-4: 20s intenso / 40s leve",
              "Semana 5-6: 30s intenso / 30s leve",
              "Semana 7+: 40s intenso / 20s leve"
            ]
          },
          { 
            name: "Corrida de Resistência", 
            duration: "45 min", 
            description: "Cardio longo e sustentado",
            week: 4,
            howTo: [
              "Mantenha ritmo constante por 45 minutos",
              "Zona aeróbica (60-70% FC máxima)",
              "Foque na eficiência do movimento",
              "Respiração controlada e rítmica"
            ],
            variations: [
              "Semana 4-5: 30 minutos em ritmo confortável",
              "Semana 6-7: 40 minutos com pequenas variações",
              "Semana 8+: 50-60 minutos, adicione inclinações"
            ]
          }
        ]
      },
      {
        day: "Dia 2 - Cardio Intervalado",
        focus: "Queima Máxima de Calorias",
        week: 1,
        exercises: [
          { 
            name: "Intervalos Progressivos", 
            duration: "25 min", 
            description: "Treino intervalado estruturado",
            week: 1,
            howTo: [
              "Aquecimento: 5 min leve",
              "Intervalos: 1 min rápido / 2 min leve (6 repetições)",
              "Desaquecimento: 5 min leve",
              "Mantenha postura correta durante todo treino"
            ],
            variations: [
              "Semana 1-2: 30s rápido / 2.5min leve",
              "Semana 3-4: 1min rápido / 1.5min leve",
              "Semana 5+: 2min rápido / 1min leve"
            ]
          }
        ]
      },
      {
        day: "Dia 3 - Resistência Aeróbica",
        focus: "Construindo Base de Resistência",
        week: 2,
        exercises: [
          { 
            name: "Long Slow Distance (LSD)", 
            duration: "40 min", 
            description: "Corrida longa em ritmo confortável",
            week: 2,
            howTo: [
              "Mantenha ritmo conversacional por 40 minutos",
              "60-70% da frequência cardíaca máxima",
              "Foque na eficiência e economia de movimento",
              "Hidratação a cada 15 minutos"
            ],
            variations: [
              "Semana 2-3: 30 minutos em ritmo muito confortável",
              "Semana 4-5: 40 minutos em ritmo confortável",
              "Semana 6+: 50-60 minutos, adicione terreno variado"
            ]
          }
        ]
      }
    ]
  }

  // Gerar plano de força com progressão semanal
  const generateStrengthPlan = (): WorkoutDay[] => {
    return [
      {
        day: "Dia 1 - Peito e Tríceps",
        focus: "Desenvolvimento de Força Superior",
        week: 1,
        exercises: [
          { 
            name: "Flexão de Braço Básica", 
            sets: "3", 
            reps: "10-12", 
            rest: "60s", 
            description: "Fundamento essencial para peito e tríceps",
            week: 1,
            howTo: [
              "Posição de prancha alta, mãos largura dos ombros",
              "Corpo em linha reta da cabeça aos calcanhares",
              "Desça até peito quase tocar o chão",
              "Empurre de volta à posição inicial",
              "Execute 10-12 repetições, descanse 60s, repita 3 vezes"
            ],
            variations: [
              "Semana 1-2: Flexão com joelhos apoiados",
              "Semana 3-4: Flexão padrão no chão",
              "Semana 5+: Flexão com pés elevados"
            ]
          },
          { 
            name: "Flexão Diamante", 
            sets: "3", 
            reps: "8-10", 
            rest: "60s", 
            description: "Isolamento intenso de tríceps",
            week: 2,
            howTo: [
              "Mãos próximas formando um diamante",
              "Cotovelos próximos ao corpo",
              "Desça controladamente",
              "Foque na contração dos tríceps",
              "Execute 8-10 repetições, descanse 60s, repita 3 vezes"
            ],
            variations: [
              "Semana 2-3: Joelhos apoiados",
              "Semana 4-5: Flexão diamante padrão",
              "Semana 6+: Pés elevados, adicione explosão"
            ]
          },
          { 
            name: "Flexão Pliométrica", 
            sets: "4", 
            reps: "6-8", 
            rest: "90s", 
            description: "Explosão de peito",
            week: 3,
            howTo: [
              "Flexão padrão com explosão ao subir",
              "Mãos saem do chão",
              "Bata palmas no ar (opcional)",
              "Aterrisse suavemente",
              "Execute 6-8 repetições, descanse 90s, repita 4 vezes"
            ],
            variations: [
              "Semana 3-4: Empurrão forte sem sair do chão",
              "Semana 5-6: Mãos saem do chão levemente",
              "Semana 7+: Bata palmas ou flexão com salto completo"
            ]
          }
        ]
      },
      {
        day: "Dia 2 - Costas e Bíceps",
        focus: "Desenvolvimento de Puxada",
        week: 1,
        exercises: [
          { 
            name: "Remada Invertida", 
            sets: "3", 
            reps: "10-12", 
            rest: "60s", 
            description: "Fundamento para costas e bíceps",
            week: 1,
            howTo: [
              "Barra ou mesa na altura da cintura",
              "Corpo reto, puxe o peito até a barra",
              "Contraia as escápulas",
              "Desça controladamente",
              "Execute 10-12 repetições, descanse 60s, repita 3 vezes"
            ],
            variations: [
              "Semana 1-2: Barra mais alta, joelhos dobrados",
              "Semana 3-4: Barra na cintura, corpo reto",
              "Semana 5+: Barra mais baixa, pés elevados"
            ]
          }
        ]
      },
      {
        day: "Dia 3 - Pernas e Glúteos",
        focus: "Força de Membros Inferiores",
        week: 1,
        exercises: [
          { 
            name: "Agachamento Básico", 
            sets: "4", 
            reps: "15-20", 
            rest: "60s", 
            description: "Fundamento para pernas completas",
            week: 1,
            howTo: [
              "Pés na largura dos ombros",
              "Desça até coxas paralelas ao chão",
              "Joelhos alinhados com os dedos",
              "Empurre pelos calcanhares para subir",
              "Execute 15-20 repetições, descanse 60s, repita 4 vezes"
            ],
            variations: [
              "Semana 1-2: Agachamento parcial (45°)",
              "Semana 3-4: Agachamento completo (90°)",
              "Semana 5+: Agachamento profundo, adicione peso"
            ]
          }
        ]
      },
      {
        day: "Dia 4 - Core e Ombros",
        focus: "Estabilização e Força Central",
        week: 2,
        exercises: [
          { 
            name: "Prancha com Variações", 
            duration: "4x 60s", 
            rest: "30s", 
            description: "Core fundamental",
            week: 2,
            howTo: [
              "Prancha padrão (60s)",
              "Prancha lateral direita (60s)",
              "Prancha lateral esquerda (60s)",
              "Prancha com toque nos ombros (60s)"
            ],
            variations: [
              "Semana 2-3: 30s cada variação",
              "Semana 4-5: 60s cada variação",
              "Semana 6+: 90s cada variação com movimentos"
            ]
          }
        ]
      }
    ]
  }

  // Gerar plano HIIT com progressão semanal
  const generateHIITPlan = (): WorkoutDay[] => {
    return [
      {
        day: "Dia 1 - HIIT Full Body",
        focus: "Explosão de Corpo Inteiro",
        week: 1,
        exercises: [
          { 
            name: "Burpees Básicos", 
            sets: "3", 
            duration: "30s", 
            rest: "30s", 
            description: "Exercício explosivo fundamental",
            week: 1,
            howTo: [
              "Agache, mãos no chão",
              "Passe os pés para trás (prancha)",
              "Traga os pés de volta",
              "Levante-se",
              "Execute por 30 segundos, descanse 30s, repita 3 vezes"
            ],
            variations: [
              "Semana 1-2: Sem flexão, sem salto",
              "Semana 3-4: Com flexão, salto moderado",
              "Semana 5+: Flexão completa, salto alto"
            ]
          },
          { 
            name: "Burpees com Flexão e Salto", 
            sets: "4", 
            duration: "40s", 
            rest: "20s", 
            description: "Versão completa",
            week: 2,
            howTo: [
              "Burpee completo com flexão no meio",
              "Salto explosivo no final",
              "Aterrissagem controlada",
              "Execute por 40 segundos, descanse 20s, repita 4 vezes"
            ],
            variations: [
              "Semana 2-3: Flexão com joelhos, salto baixo",
              "Semana 4-5: Flexão completa, salto moderado",
              "Semana 6+: Flexão explosiva, salto máximo"
            ]
          },
          { 
            name: "Burpee Box Jump", 
            sets: "4", 
            duration: "30s", 
            rest: "30s", 
            description: "Explosão máxima",
            week: 3,
            howTo: [
              "Burpee completo",
              "Salte sobre caixa ou banco (30-60cm)",
              "Desça e repita",
              "Execute por 30 segundos, descanse 30s, repita 4 vezes"
            ],
            variations: [
              "Semana 3-4: Caixa baixa (20-30cm)",
              "Semana 5-6: Caixa média (40-50cm)",
              "Semana 7+: Caixa alta (60cm+)"
            ]
          }
        ]
      },
      {
        day: "Dia 2 - HIIT Cardio Explosivo",
        focus: "Máxima Intensidade Cardiovascular",
        week: 1,
        exercises: [
          { 
            name: "Sprints no Lugar", 
            sets: "5", 
            duration: "20s", 
            rest: "40s", 
            description: "Cardio explosivo básico",
            week: 1,
            howTo: [
              "Corra no lugar na máxima velocidade",
              "Joelhos elevados, braços bombeando",
              "Execute por 20 segundos, descanse 40s, repita 5 vezes"
            ],
            variations: [
              "Semana 1-2: 15s sprint, 45s descanso",
              "Semana 3-4: 20s sprint, 40s descanso",
              "Semana 5+: 30s sprint, 30s descanso"
            ]
          }
        ]
      },
      {
        day: "Dia 3 - HIIT Força e Potência",
        focus: "Explosão Muscular",
        week: 2,
        exercises: [
          { 
            name: "Jump Squats", 
            sets: "4", 
            reps: "15", 
            rest: "45s", 
            description: "Explosão de pernas",
            week: 2,
            howTo: [
              "Agache até paralelo",
              "Exploda para cima em salto máximo",
              "Aterrisse suavemente",
              "Execute 15 repetições, descanse 45s, repita 4 vezes"
            ],
            variations: [
              "Semana 2-3: Elevação na ponta dos pés",
              "Semana 4-5: Saltos moderados",
              "Semana 6+: Saltos máximos com peso"
            ]
          }
        ]
      }
    ]
  }

  // Selecionar plano baseado no tipo
  const workoutPlan = (() => {
    switch (workoutType) {
      case "yoga": return generateYogaPlan()
      case "cardio": return generateCardioPlan()
      case "strength": return generateStrengthPlan()
      case "hiit": return generateHIITPlan()
      default: return []
    }
  })()

  // Filtrar exercícios pela semana atual
  const currentWeekPlan = workoutPlan.map(day => ({
    ...day,
    exercises: day.exercises.filter(ex => ex.week <= currentWeek)
  })).filter(day => day.exercises.length > 0)

  const workoutInfo = {
    yoga: {
      title: "Plano de Yoga Personalizado",
      icon: Activity,
      color: "from-purple-400 to-pink-500",
      description: "Sequências adaptadas com progressão semanal"
    },
    cardio: {
      title: "Plano de Cardio Personalizado",
      icon: Heart,
      color: "from-red-400 to-orange-500",
      description: "Treinos cardiovasculares progressivos"
    },
    strength: {
      title: "Plano de Força Personalizado",
      icon: Dumbbell,
      color: "from-blue-400 to-purple-500",
      description: "Desenvolvimento muscular com progressão"
    },
    hiit: {
      title: "Plano HIIT Personalizado",
      icon: Zap,
      color: "from-orange-400 to-pink-500",
      description: "Alta intensidade com desafios crescentes"
    }
  }

  const info = workoutInfo[workoutType]
  const Icon = info.icon

  const maxWeeks = Math.max(...workoutPlan.flatMap(day => day.exercises.map(ex => ex.week)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6 py-6">
        {/* Header com Seletor de Semana */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
          <CardHeader>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Harmona</CardTitle>
                  <CardDescription className="text-base">{info.description}</CardDescription>
                </div>
              </div>
              <Button onClick={onClose} variant="outline">
                Voltar
              </Button>
            </div>

            {/* Seletor de Semana */}
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-purple-500" />
                  <span className="font-bold text-lg">Semana {currentWeek}</span>
                  <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white border-0">
                    Intensidade Progressiva
                  </Badge>
                </div>
              </div>

              {/* Navegação de Semanas */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: maxWeeks }, (_, i) => i + 1).map(week => (
                  <Button
                    key={week}
                    onClick={() => setCurrentWeek(week)}
                    variant={currentWeek === week ? "default" : "outline"}
                    className={currentWeek === week ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : ""}
                  >
                    Semana {week}
                  </Button>
                ))}
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white dark:bg-gray-800">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Exercícios</p>
                  </div>
                  <p className="text-lg font-bold">{completedExercises.size}</p>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-gray-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-blue-500" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Frequência</p>
                  </div>
                  <p className="text-lg font-bold">{weeklyFrequency}x/sem</p>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-gray-800">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Semana Atual</p>
                  </div>
                  <p className="text-lg font-bold">{currentWeek}/{maxWeeks}</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Workout Days */}
        {currentWeekPlan.map((day, dayIndex) => (
          <Card key={dayIndex} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center`}>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      {day.day}
                    </CardTitle>
                    <CardDescription className="text-sm">{day.focus}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {day.exercises.map((exercise, exIndex) => {
                  const exerciseId = `${workoutType}-${exercise.name}-week${currentWeek}`
                  const isCompleted = completedExercises.has(exerciseId)
                  
                  return (
                    <div 
                      key={exIndex} 
                      className={`flex flex-col gap-3 p-4 rounded-lg ${
                        isCompleted
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                          : 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <CheckCircle2 className={`w-5 h-5 mt-0.5 ${isCompleted ? 'text-green-500' : 'text-purple-500'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 flex-wrap">
                                <span className="break-words">{exercise.name}</span>
                                {isCompleted && (
                                  <Badge className="bg-green-500 text-white text-xs">
                                    Completo
                                  </Badge>
                                )}
                              </h4>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              {exercise.sets && (
                                <Badge variant="secondary" className="text-xs whitespace-nowrap">
                                  {exercise.sets} séries
                                </Badge>
                              )}
                              {exercise.reps && (
                                <Badge variant="secondary" className="text-xs whitespace-nowrap">
                                  {exercise.reps} reps
                                </Badge>
                              )}
                              {exercise.duration && (
                                <Badge variant="secondary" className="text-xs whitespace-nowrap">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {exercise.duration}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium break-words">
                            {exercise.description}
                          </p>
                          
                          {/* Como Fazer */}
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
                              <h5 className="font-semibold text-sm text-blue-700 dark:text-blue-400">Como Fazer:</h5>
                            </div>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-2">
                              {exercise.howTo.map((step, stepIndex) => (
                                <li key={stepIndex} className="leading-relaxed break-words">{step}</li>
                              ))}
                            </ol>
                          </div>

                          {/* Variações por Semana */}
                          <div className="p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-4 h-4 text-purple-500 flex-shrink-0" />
                              <h5 className="font-semibold text-sm text-purple-700 dark:text-purple-400">Progressão Semanal:</h5>
                            </div>
                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                              {exercise.variations.map((variation, varIndex) => (
                                <li key={varIndex} className="flex items-start gap-2">
                                  <span className="text-purple-500 mt-0.5 flex-shrink-0">•</span>
                                  <span className="leading-relaxed break-words">{variation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Botão de Completar */}
                          {!isCompleted && (
                            <Button
                              onClick={() => completeExercise(exercise.name)}
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Marcar como Completo
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Guia de Nutrição - Premium */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl flex-wrap">
                    Guia de Nutrição
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 text-xs">
                      Premium
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Contador de calorias inteligente com análise de fotos
                  </CardDescription>
                </div>
              </div>
              {!isPremium && (
                <Lock className="w-5 h-5 text-amber-500" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!isPremium ? (
              <div className="text-center py-8 space-y-4">
                <Lock className="w-16 h-16 text-amber-500 mx-auto" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Recurso Exclusivo Premium</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                    Desbloqueie o contador de calorias inteligente e análise nutricional completa
                  </p>
                  <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white">
                    Fazer Upgrade para Premium
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {!showNutrition ? (
                  <Button
                    onClick={() => setShowNutrition(true)}
                    className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Abrir Contador de Calorias
                  </Button>
                ) : (
                  <div className="space-y-4">
                    {/* Opções de Captura */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button
                        onClick={handleCameraCapture}
                        variant="outline"
                        className="w-full"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Tirar Foto
                      </Button>
                      <label className="w-full">
                        <Button
                          variant="outline"
                          className="w-full"
                          asChild
                        >
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload de Imagem
                          </span>
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Preview da Imagem */}
                    {nutritionImage && (
                      <div className="space-y-4">
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            src={nutritionImage}
                            alt="Prato de comida"
                            className="w-full h-auto max-h-64 object-cover"
                          />
                        </div>

                        {/* Loading */}
                        {isAnalyzing && (
                          <div className="flex items-center justify-center gap-3 p-4">
                            <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                            <span className="text-sm font-medium">Analisando nutrientes...</span>
                          </div>
                        )}

                        {/* Resultados da Análise */}
                        {nutritionAnalysis && !isAnalyzing && (
                          <div className="space-y-4">
                            {/* Calorias Totais */}
                            <div className="p-4 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                              <div className="text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Calorias Totais</p>
                                <p className="text-4xl font-bold text-amber-600">{nutritionAnalysis.calories}</p>
                                <p className="text-xs text-gray-500">kcal</p>
                              </div>
                            </div>

                            {/* Macronutrientes */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 text-center">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Proteínas</p>
                                <p className="text-xl font-bold text-blue-600">{nutritionAnalysis.protein}g</p>
                              </div>
                              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 text-center">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Carboidratos</p>
                                <p className="text-xl font-bold text-green-600">{nutritionAnalysis.carbs}g</p>
                              </div>
                              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 text-center">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Gorduras</p>
                                <p className="text-xl font-bold text-orange-600">{nutritionAnalysis.fat}g</p>
                              </div>
                              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 text-center">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Fibras</p>
                                <p className="text-xl font-bold text-purple-600">{nutritionAnalysis.fiber}g</p>
                              </div>
                            </div>

                            {/* Distribuição Visual */}
                            <div className="p-4 rounded-lg bg-white dark:bg-gray-800">
                              <h4 className="font-semibold mb-3 text-sm">Distribuição de Macronutrientes</h4>
                              <div className="space-y-2">
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Proteínas</span>
                                    <span>{Math.round((nutritionAnalysis.protein * 4 / nutritionAnalysis.calories) * 100)}%</span>
                                  </div>
                                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-blue-500"
                                      style={{ width: `${(nutritionAnalysis.protein * 4 / nutritionAnalysis.calories) * 100}%` }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Carboidratos</span>
                                    <span>{Math.round((nutritionAnalysis.carbs * 4 / nutritionAnalysis.calories) * 100)}%</span>
                                  </div>
                                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-green-500"
                                      style={{ width: `${(nutritionAnalysis.carbs * 4 / nutritionAnalysis.calories) * 100}%` }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Gorduras</span>
                                    <span>{Math.round((nutritionAnalysis.fat * 9 / nutritionAnalysis.calories) * 100)}%</span>
                                  </div>
                                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-orange-500"
                                      style={{ width: `${(nutritionAnalysis.fat * 9 / nutritionAnalysis.calories) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Dicas Nutricionais */}
                            <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                              <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                                <Info className="w-4 h-4 text-green-600" />
                                Dicas Personalizadas
                              </h4>
                              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                {nutritionAnalysis.tips.map((tip, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                                    <span className="break-words">{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Botão Nova Análise */}
                            <Button
                              onClick={() => {
                                setNutritionImage(null)
                                setNutritionAnalysis(null)
                              }}
                              variant="outline"
                              className="w-full"
                            >
                              Nova Análise
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-purple-500 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Sistema de Progressão Semanal</h3>
                <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li className="break-words">• Novos exercícios são desbloqueados a cada semana</li>
                  <li className="break-words">• A intensidade aumenta gradualmente conforme você progride</li>
                  <li className="break-words">• Complete os exercícios da semana atual antes de avançar</li>
                  <li className="break-words">• Foque na técnica perfeita antes de aumentar a intensidade</li>
                  <li className="break-words">• Mantenha consistência para obter melhores resultados</li>
                  <li className="break-words">• Ouça seu corpo e ajuste o ritmo quando necessário</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
