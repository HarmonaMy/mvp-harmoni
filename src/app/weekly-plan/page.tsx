"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Calendar, 
  Dumbbell, 
  Target, 
  TrendingUp, 
  CheckCircle2,
  Clock,
  Info,
  Sparkles,
  Play,
  Pause,
  Heart,
  Zap,
  Activity
} from "lucide-react"
import { useRouter } from "next/navigation"

type Exercise = {
  name: string
  sets?: string
  reps?: string
  duration?: string
  rest?: string
  description: string
  howTo: string[]
  variations: string[]
  tips: string[]
}

type WeekDay = {
  day: string
  focus: string
  duration: string
  exercises: Exercise[]
}

type Week = {
  week: number
  title: string
  description: string
  goal: string
  days: WeekDay[]
}

export default function WeeklyPlanPage() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState<number>(1)

  const monthlyPlan: Week[] = [
    {
      week: 1,
      title: "Semana 1 - Fundação e Adaptação",
      description: "Foco em construir uma base sólida, aprender técnicas corretas e adaptar o corpo ao novo ritmo de exercícios.",
      goal: "Estabelecer consistência e dominar movimentos básicos",
      days: [
        {
          day: "Segunda-feira",
          focus: "Corpo Inteiro - Introdução",
          duration: "35-40 minutos",
          exercises: [
            {
              name: "Aquecimento Dinâmico Completo",
              duration: "8 min",
              description: "Preparação articular e cardiovascular para o treino",
              howTo: [
                "Comece com 2 minutos de caminhada leve no lugar, movendo braços naturalmente",
                "Faça círculos de braços: 30 segundos para frente, 30 segundos para trás",
                "Rotações de tronco: 1 minuto, mantendo quadris fixos",
                "Círculos de quadril: 30 segundos em cada direção",
                "Elevações de joelhos alternadas: 1 minuto em ritmo moderado",
                "Chutes para trás (butt kicks): 1 minuto",
                "Polichinelos leves: 1 minuto",
                "Agachamentos sem peso: 1 minuto, focando na técnica",
                "Finalize com respirações profundas: 30 segundos"
              ],
              variations: [
                "Iniciante: Reduza cada movimento para 20-30 segundos, mantenha ritmo lento",
                "Intermediário: Siga o tempo padrão com movimentos completos",
                "Avançado: Adicione pequenos saltos e aumente a amplitude dos movimentos"
              ],
              tips: [
                "Mantenha movimentos controlados e fluidos",
                "Respire profundamente durante todo o aquecimento",
                "Se sentir qualquer desconforto, reduza a intensidade",
                "O aquecimento é essencial - nunca pule esta etapa"
              ]
            },
            {
              name: "Agachamento Básico",
              sets: "3",
              reps: "12-15",
              rest: "60s",
              description: "Exercício fundamental para pernas, glúteos e core",
              howTo: [
                "Fique em pé com pés na largura dos ombros",
                "Dedos dos pés levemente apontados para fora (10-15 graus)",
                "Mantenha o peito aberto e olhar para frente",
                "Estenda os braços à frente para equilíbrio",
                "Inspire e empurre os quadris para trás, como se fosse sentar em uma cadeira",
                "Dobre os joelhos, descendo até as coxas ficarem paralelas ao chão",
                "Mantenha os joelhos alinhados com os dedos dos pés - não deixe virarem para dentro",
                "Peso nos calcanhares, não nas pontas dos pés",
                "Expire e empurre pelos calcanhares para subir",
                "Contraia glúteos no topo do movimento",
                "Execute 12-15 repetições com técnica perfeita",
                "Descanse 60 segundos e repita por 3 séries"
              ],
              variations: [
                "Iniciante: Agachamento parcial (até 45°), use uma cadeira atrás como referência",
                "Intermediário: Agachamento completo (90°) com peso corporal",
                "Avançado: Agachamento profundo (abaixo de 90°), adicione pausa de 2s embaixo"
              ],
              tips: [
                "Mantenha o core contraído durante todo o movimento",
                "Não deixe os joelhos ultrapassarem muito os dedos dos pés",
                "Se sentir dor nos joelhos, reduza a profundidade",
                "Qualidade do movimento é mais importante que quantidade"
              ]
            },
            {
              name: "Flexão de Braço Modificada",
              sets: "3",
              reps: "8-12",
              rest: "60s",
              description: "Fortalecimento de peito, ombros, tríceps e core",
              howTo: [
                "Posicione-se em quatro apoios no chão",
                "Mãos um pouco mais largas que os ombros, dedos apontando para frente",
                "Joelhos apoiados no chão (modificação para iniciantes)",
                "Corpo formando uma linha reta dos joelhos até a cabeça",
                "Core contraído, não deixe a lombar arquear",
                "Inspire e dobre os cotovelos, descendo o peito em direção ao chão",
                "Cotovelos a aproximadamente 45° do corpo (não muito abertos)",
                "Desça até o peito quase tocar o chão",
                "Expire e empurre de volta à posição inicial",
                "Mantenha o pescoço neutro, olhando para o chão",
                "Execute 8-12 repetições controladas",
                "Descanse 60 segundos e repita por 3 séries"
              ],
              variations: [
                "Iniciante: Flexão com joelhos apoiados, mãos elevadas em banco ou parede",
                "Intermediário: Flexão padrão no chão com joelhos apoiados",
                "Avançado: Flexão completa sem apoio dos joelhos, pés no chão"
              ],
              tips: [
                "Mantenha o core sempre ativado",
                "Não deixe os quadris caírem ou subirem",
                "Se sentir dor nos pulsos, use apoios ou punhos fechados",
                "Foque na descida controlada (2-3 segundos)"
              ]
            }
          ]
        },
        {
          day: "Quarta-feira",
          focus: "Cardio Leve e Mobilidade",
          duration: "30-35 minutos",
          exercises: [
            {
              name: "Aquecimento Cardiovascular",
              duration: "5 min",
              description: "Preparação do sistema cardiovascular",
              howTo: [
                "Minuto 1: Caminhada leve no lugar, braços balançando naturalmente",
                "Minuto 2: Aumente o ritmo para caminhada moderada",
                "Minuto 3: Marcha com elevação leve de joelhos",
                "Minuto 4: Polichinelos em ritmo lento a moderado",
                "Minuto 5: Corrida estacionária leve, preparando para o treino"
              ],
              variations: [
                "Iniciante: Mantenha todos os movimentos em baixa intensidade",
                "Intermediário: Aumente gradualmente a intensidade",
                "Avançado: Adicione pequenos saltos e movimentos mais dinâmicos"
              ],
              tips: [
                "Aumente a intensidade progressivamente",
                "Respire pelo nariz e expire pela boca",
                "Se sentir falta de ar, reduza o ritmo",
                "Mantenha os ombros relaxados"
              ]
            },
            {
              name: "Caminhada Rápida ou Corrida Leve",
              duration: "20 min",
              description: "Cardio contínuo em intensidade moderada",
              howTo: [
                "Estabeleça um ritmo confortável que você possa manter",
                "Postura ereta, ombros relaxados e para trás",
                "Olhar para frente, não para baixo",
                "Braços dobrados a 90°, balançando naturalmente",
                "Respiração rítmica: inspire pelo nariz (2-3 passos), expire pela boca (2-3 passos)",
                "Passos firmes, aterrissando no meio do pé",
                "Mantenha o core levemente ativado",
                "Deve conseguir manter uma conversa (teste do falar)",
                "Se necessário, alterne 2 minutos rápido + 1 minuto lento",
                "Hidrate-se a cada 10 minutos se necessário",
                "Nos últimos 2 minutos, mantenha o ritmo sem acelerar"
              ],
              variations: [
                "Iniciante: 15-20 minutos de caminhada moderada, pausas se necessário",
                "Intermediário: 20 minutos alternando caminhada rápida e corrida leve",
                "Avançado: 20-25 minutos de corrida contínua em ritmo confortável"
              ],
              tips: [
                "Mantenha ritmo constante, não acelere no início",
                "Se sentir dor, pare e descanse",
                "Use calçado adequado para evitar lesões",
                "Escolha superfície plana e segura"
              ]
            }
          ]
        },
        {
          day: "Sexta-feira",
          focus: "Força e Resistência Muscular",
          duration: "35-40 minutos",
          exercises: [
            {
              name: "Aquecimento Específico",
              duration: "7 min",
              description: "Preparação muscular e articular",
              howTo: [
                "Caminhada leve com movimentos de braços (2 minutos)",
                "Agachamentos sem peso, focando na técnica (1 minuto)",
                "Flexões na parede (1 minuto)",
                "Prancha nos joelhos (30 segundos)",
                "Elevações de joelhos alternadas (1 minuto)",
                "Rotações de tronco dinâmicas (1 minuto)",
                "Respirações profundas e alongamentos dinâmicos (30 segundos)"
              ],
              variations: [
                "Iniciante: Movimentos mais lentos e controlados",
                "Intermediário: Ritmo moderado com boa amplitude",
                "Avançado: Adicione pequenos saltos e maior intensidade"
              ],
              tips: [
                "Prepare os músculos que serão trabalhados",
                "Aumente a intensidade gradualmente",
                "Foque na qualidade dos movimentos",
                "Respire profundamente"
              ]
            },
            {
              name: "Circuito de Força (3 rodadas)",
              duration: "20 min",
              description: "Trabalho muscular completo em formato de circuito",
              howTo: [
                "Execute cada exercício por 40 segundos, descanse 20 segundos",
                "Após completar todos os exercícios, descanse 90 segundos",
                "Repita o circuito 3 vezes",
                "",
                "Exercício 1 - Agachamento: 40s trabalho, 20s descanso",
                "Exercício 2 - Flexão (joelhos ou completa): 40s trabalho, 20s descanso",
                "Exercício 3 - Avanço alternado: 40s trabalho, 20s descanso",
                "Exercício 4 - Prancha: 40s trabalho, 20s descanso",
                "Exercício 5 - Ponte de glúteo: 40s trabalho, 20s descanso",
                "Exercício 6 - Mountain climbers lentos: 40s trabalho, 20s descanso",
                "",
                "Descanso entre rodadas: 90 segundos",
                "Hidrate-se durante os descansos"
              ],
              variations: [
                "Iniciante: 30s trabalho, 30s descanso, 2 rodadas",
                "Intermediário: 40s trabalho, 20s descanso, 3 rodadas",
                "Avançado: 45s trabalho, 15s descanso, 4 rodadas"
              ],
              tips: [
                "Mantenha boa forma mesmo quando cansado",
                "Ajuste intensidade conforme necessário",
                "Respire constantemente, não prenda a respiração",
                "Foque na execução correta, não na velocidade"
              ]
            }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "Semana 2 - Progressão e Intensidade",
      description: "Aumentar gradualmente a intensidade dos exercícios, introduzir variações e melhorar a resistência muscular.",
      goal: "Aumentar volume de treino e introduzir novos desafios",
      days: [
        {
          day: "Segunda-feira",
          focus: "Força - Parte Superior",
          duration: "40-45 minutos",
          exercises: [
            {
              name: "Aquecimento Específico Superior",
              duration: "8 min",
              description: "Preparação focada em ombros, peito e braços",
              howTo: [
                "Círculos de braços: 1 minuto para frente, 1 minuto para trás",
                "Rotações de ombros: 1 minuto",
                "Flexões na parede: 1 minuto (15-20 repetições)",
                "Alongamento dinâmico de peito: 1 minuto",
                "Círculos de punhos: 30 segundos cada direção",
                "Elevações de braços laterais sem peso: 1 minuto",
                "Prancha nos joelhos: 30 segundos",
                "Respirações profundas: 30 segundos"
              ],
              variations: [
                "Iniciante: Movimentos lentos, amplitude reduzida",
                "Intermediário: Ritmo moderado, amplitude completa",
                "Avançado: Adicione resistência leve (garrafas d'água)"
              ],
              tips: [
                "Foque em sentir os músculos aquecendo",
                "Não force os ombros - movimentos suaves",
                "Prepare punhos e cotovelos adequadamente",
                "Mantenha postura ereta durante todo aquecimento"
              ]
            },
            {
              name: "Flexão de Braço Progressiva",
              sets: "4",
              reps: "10-15",
              rest: "60s",
              description: "Fortalecimento de peito, ombros e tríceps",
              howTo: [
                "Escolha a variação apropriada para seu nível",
                "Posicione as mãos um pouco mais largas que os ombros",
                "Corpo em linha reta (joelhos apoiados ou pés no chão)",
                "Core contraído durante todo o movimento",
                "Inspire descendo em 2-3 segundos",
                "Desça até o peito quase tocar o chão",
                "Cotovelos a 45° do corpo",
                "Expire empurrando de volta em 1 segundo",
                "Mantenha pescoço neutro, olhando para o chão",
                "Execute 10-15 repetições com boa forma",
                "Descanse 60 segundos",
                "Complete 4 séries"
              ],
              variations: [
                "Iniciante: Flexão com joelhos apoiados, 8-10 reps",
                "Intermediário: Flexão padrão no chão, 10-15 reps",
                "Avançado: Flexão com pés elevados ou adicione pausa de 2s embaixo"
              ],
              tips: [
                "Qualidade do movimento é essencial",
                "Se perder a forma, pare e descanse",
                "Mantenha core sempre ativado",
                "Não deixe quadris caírem ou subirem"
              ]
            }
          ]
        },
        {
          day: "Quarta-feira",
          focus: "HIIT Cardio Moderado",
          duration: "30-35 minutos",
          exercises: [
            {
              name: "Aquecimento Cardiovascular Progressivo",
              duration: "6 min",
              description: "Preparação para alta intensidade",
              howTo: [
                "Minuto 1: Caminhada leve no lugar",
                "Minuto 2: Marcha com elevação de joelhos moderada",
                "Minuto 3: Polichinelos em ritmo lento",
                "Minuto 4: Corrida estacionária leve",
                "Minuto 5: High knees moderados",
                "Minuto 6: Acelerações curtas (5s rápido, 10s lento)"
              ],
              variations: [
                "Iniciante: Mantenha intensidade baixa a moderada",
                "Intermediário: Aumente progressivamente a intensidade",
                "Avançado: Alta intensidade desde o minuto 3"
              ],
              tips: [
                "Aumente intensidade gradualmente",
                "Respire profundamente",
                "Prepare-se mentalmente para o HIIT",
                "Hidrate-se antes de começar"
              ]
            },
            {
              name: "HIIT - Intervalos Moderados",
              duration: "20 min",
              description: "Trabalho intervalado de alta intensidade",
              howTo: [
                "Estrutura: 40 segundos trabalho intenso + 20 segundos recuperação ativa",
                "Repita cada exercício por 2 rodadas antes de passar para o próximo",
                "",
                "Exercício 1: High Knees (joelhos altos) - 40s trabalho, 20s caminhada",
                "Repita: High Knees - 40s trabalho, 20s caminhada",
                "",
                "Exercício 2: Burpees modificados - 40s trabalho, 20s caminhada",
                "Repita: Burpees modificados - 40s trabalho, 20s caminhada",
                "",
                "Exercício 3: Mountain Climbers - 40s trabalho, 20s caminhada",
                "Repita: Mountain Climbers - 40s trabalho, 20s caminhada",
                "",
                "Total: 10 rodadas (20 minutos)"
              ],
              variations: [
                "Iniciante: 30s trabalho, 30s descanso, versões de baixo impacto",
                "Intermediário: 40s trabalho, 20s descanso, ritmo moderado",
                "Avançado: 45s trabalho, 15s descanso, máxima intensidade"
              ],
              tips: [
                "Mantenha boa forma mesmo quando cansado",
                "Ajuste intensidade conforme necessário",
                "Respire constantemente",
                "Hidrate-se durante recuperações"
              ]
            }
          ]
        },
        {
          day: "Sexta-feira",
          focus: "Força - Parte Inferior e Core",
          duration: "40-45 minutos",
          exercises: [
            {
              name: "Aquecimento Específico Inferior",
              duration: "8 min",
              description: "Preparação focada em pernas, glúteos e quadril",
              howTo: [
                "Caminhada leve com movimentos de braços (2 minutos)",
                "Círculos de quadril: 1 minuto (30s cada direção)",
                "Agachamentos sem peso: 1 minuto (15-20 reps)",
                "Avanços alternados sem peso: 1 minuto (10 cada perna)",
                "Elevações de panturrilha: 1 minuto (20-25 reps)",
                "Balanços de perna: 1 minuto (frente-trás e lateral)",
                "Respirações profundas: 30 segundos"
              ],
              variations: [
                "Iniciante: Movimentos lentos, amplitude reduzida",
                "Intermediário: Ritmo moderado, amplitude completa",
                "Avançado: Adicione pequenos saltos e maior amplitude"
              ],
              tips: [
                "Prepare quadris e joelhos adequadamente",
                "Movimentos controlados e fluidos",
                "Sinta os músculos aquecendo",
                "Mantenha equilíbrio durante balanços"
              ]
            },
            {
              name: "Agachamento Progressivo",
              sets: "4",
              reps: "15-20",
              rest: "60s",
              description: "Fortalecimento completo de pernas e glúteos",
              howTo: [
                "Fique em pé, pés na largura dos ombros",
                "Dedos levemente apontados para fora",
                "Braços estendidos à frente para equilíbrio",
                "Inspire e empurre quadris para trás",
                "Dobre joelhos, descendo até coxas paralelas ao chão",
                "Joelhos alinhados com dedos dos pés",
                "Peso nos calcanhares",
                "Peito aberto, olhar para frente",
                "Expire e empurre pelos calcanhares para subir",
                "Contraia glúteos no topo",
                "Execute 15-20 repetições com técnica perfeita",
                "Descanse 60 segundos e complete 4 séries"
              ],
              variations: [
                "Iniciante: Agachamento parcial, 12-15 reps",
                "Intermediário: Agachamento completo (90°), 15-20 reps",
                "Avançado: Agachamento profundo, adicione pausa de 3s embaixo ou peso"
              ],
              tips: [
                "Mantenha core contraído",
                "Não deixe joelhos virarem para dentro",
                "Se sentir dor nos joelhos, reduza profundidade",
                "Qualidade sobre quantidade"
              ]
            }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "Semana 3 - Desafio e Resistência",
      description: "Semana de maior intensidade com foco em resistência muscular, cardiovascular e mental.",
      goal: "Superar limites e construir resistência avançada",
      days: [
        {
          day: "Segunda-feira",
          focus: "HIIT Full Body Avançado",
          duration: "45 minutos",
          exercises: [
            {
              name: "Aquecimento Dinâmico Intenso",
              duration: "8 min",
              description: "Preparação completa para alta intensidade",
              howTo: [
                "Caminhada rápida no lugar: 1 minuto",
                "Polichinelos progressivos: 1 minuto (lento para rápido)",
                "High knees: 1 minuto",
                "Butt kicks: 1 minuto",
                "Agachamentos dinâmicos: 1 minuto",
                "Flexões leves: 1 minuto (10-15 reps)",
                "Burpees modificados: 1 minuto",
                "Respirações profundas: 1 minuto"
              ],
              variations: [
                "Iniciante: Versões de baixo impacto, ritmo moderado",
                "Intermediário: Ritmo acelerado, movimentos completos",
                "Avançado: Máxima intensidade desde o início"
              ],
              tips: [
                "Prepare-se mentalmente para treino intenso",
                "Hidrate-se bem antes de começar",
                "Aumente intensidade progressivamente",
                "Respire profundamente"
              ]
            },
            {
              name: "HIIT Circuito Avançado (4 rodadas)",
              duration: "28 min",
              description: "Trabalho intervalado de máxima intensidade",
              howTo: [
                "Execute cada exercício por 45 segundos, descanse 15 segundos",
                "Após completar todos os 7 exercícios, descanse 90 segundos",
                "Repita o circuito 4 vezes",
                "",
                "Exercício 1 - Burpees completos: 45s trabalho, 15s descanso",
                "Exercício 2 - Mountain climbers rápidos: 45s trabalho, 15s descanso",
                "Exercício 3 - Agachamento com salto: 45s trabalho, 15s descanso",
                "Exercício 4 - Flexão explosiva: 45s trabalho, 15s descanso",
                "Exercício 5 - High knees máximos: 45s trabalho, 15s descanso",
                "Exercício 6 - Prancha com salto (plank jacks): 45s trabalho, 15s descanso",
                "Exercício 7 - Jumping jacks explosivos: 45s trabalho, 15s descanso",
                "",
                "Descanso entre rodadas: 90 segundos",
                "Total: 4 rodadas (28 minutos)"
              ],
              variations: [
                "Iniciante: 30s trabalho, 30s descanso, 3 rodadas, versões modificadas",
                "Intermediário: 45s trabalho, 15s descanso, 4 rodadas, ritmo moderado",
                "Avançado: 50s trabalho, 10s descanso, 5 rodadas, máxima intensidade"
              ],
              tips: [
                "Mantenha boa forma mesmo exausto",
                "Ajuste intensidade se necessário",
                "Respire constantemente",
                "Hidrate-se durante descansos longos",
                "Mental forte - você consegue!"
              ]
            }
          ]
        },
        {
          day: "Quarta-feira",
          focus: "Força e Potência - Push/Pull",
          duration: "45-50 minutos",
          exercises: [
            {
              name: "Aquecimento Específico Push/Pull",
              duration: "8 min",
              description: "Preparação para treino de força",
              howTo: [
                "Mobilidade articular completa: 2 minutos",
                "Flexões na parede: 1 minuto",
                "Remada com toalha: 1 minuto",
                "Círculos de braços: 1 minuto",
                "Agachamentos leves: 1 minuto",
                "Prancha: 1 minuto",
                "Respirações profundas: 1 minuto"
              ],
              variations: [
                "Iniciante: Movimentos suaves e lentos",
                "Intermediário: Ritmo moderado",
                "Avançado: Adicione resistência leve"
              ],
              tips: [
                "Prepare músculos e articulações",
                "Foque em amplitude completa",
                "Respire profundamente",
                "Mentalize o treino"
              ]
            },
            {
              name: "Superset 1: Peito e Costas (4 rodadas)",
              duration: "16 min",
              description: "Trabalho alternado de músculos antagonistas",
              howTo: [
                "A1 - Flexão de braço (variação apropriada): 12-15 reps",
                "Sem descanso",
                "A2 - Remada invertida: 10-12 reps",
                "Descanso: 90 segundos",
                "Repita 4 vezes",
                "",
                "Foque em: Contração máxima, movimento controlado, respiração adequada"
              ],
              variations: [
                "Iniciante: Flexão com joelhos, remada com barra alta, 3 rodadas",
                "Intermediário: Flexão padrão, remada padrão, 4 rodadas",
                "Avançado: Flexão com pés elevados, remada com pés elevados, 5 rodadas"
              ],
              tips: [
                "Mantenha boa forma em ambos exercícios",
                "Não sacrifique técnica por velocidade",
                "Respire: expire no esforço, inspire no retorno",
                "Hidrate-se durante descansos"
              ]
            }
          ]
        },
        {
          day: "Sexta-feira",
          focus: "Força Inferior e Explosão",
          duration: "45-50 minutos",
          exercises: [
            {
              name: "Aquecimento Específico Inferior",
              duration: "8 min",
              description: "Preparação para treino de pernas intenso",
              howTo: [
                "Caminhada rápida: 2 minutos",
                "Círculos de quadril: 1 minuto",
                "Agachamentos dinâmicos: 1 minuto",
                "Avanços alternados: 1 minuto",
                "Elevações de panturrilha: 1 minuto",
                "Balanços de perna: 1 minuto",
                "Respirações profundas: 1 minuto"
              ],
              variations: [
                "Iniciante: Movimentos lentos e controlados",
                "Intermediário: Ritmo moderado",
                "Avançado: Adicione pequenos saltos"
              ],
              tips: [
                "Prepare quadris e joelhos",
                "Movimentos fluidos",
                "Respire profundamente",
                "Mentalize o treino"
              ]
            },
            {
              name: "Agachamento Intensivo",
              sets: "5",
              reps: "15-20",
              rest: "60s",
              description: "Fortalecimento máximo de pernas",
              howTo: [
                "Fique em pé, pés na largura dos ombros",
                "Dedos levemente para fora",
                "Braços à frente para equilíbrio",
                "Inspire e empurre quadris para trás",
                "Desça até coxas paralelas ou abaixo",
                "Mantenha joelhos alinhados",
                "Peso nos calcanhares",
                "Expire e empurre para subir",
                "Contraia glúteos no topo",
                "Execute 15-20 repetições perfeitas",
                "Descanse 60 segundos",
                "Complete 5 séries"
              ],
              variations: [
                "Iniciante: Agachamento parcial, 12-15 reps, 4 séries",
                "Intermediário: Agachamento completo, 15-20 reps, 5 séries",
                "Avançado: Agachamento profundo com pausa, adicione peso, 5 séries"
              ],
              tips: [
                "Mantenha core contraído",
                "Não deixe joelhos virarem para dentro",
                "Qualidade sobre quantidade",
                "Respire adequadamente"
              ]
            }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "Semana 4 - Recuperação Ativa",
      description: "Semana de recuperação ativa com foco em mobilidade, flexibilidade e consolidação dos ganhos.",
      goal: "Recuperar, consolidar ganhos e preparar para novo ciclo",
      days: [
        {
          day: "Segunda-feira",
          focus: "Yoga Flow e Mobilidade",
          duration: "40 minutos",
          exercises: [
            {
              name: "Respiração Consciente (Pranayama)",
              duration: "5 min",
              description: "Preparação mental e oxigenação",
              howTo: [
                "Sente-se confortavelmente com coluna ereta",
                "Feche os olhos suavemente",
                "Coloque uma mão no peito, outra no abdômen",
                "Inspire profundamente pelo nariz por 4 segundos",
                "Sinta o abdômen expandir primeiro, depois o peito",
                "Segure a respiração por 4 segundos",
                "Expire lentamente pela boca por 6 segundos",
                "Sinta o peito esvaziar primeiro, depois o abdômen",
                "Repita o ciclo por 5 minutos",
                "Foque completamente na respiração",
                "Deixe pensamentos passarem sem julgamento"
              ],
              variations: [
                "Iniciante: Respiração 3-3-3 (inspire-segure-expire)",
                "Intermediário: Respiração 4-4-6 (inspire-segure-expire)",
                "Avançado: Respiração alternada pelas narinas (Nadi Shodhana)"
              ],
              tips: [
                "Mantenha ombros relaxados",
                "Não force a respiração",
                "Foque no momento presente",
                "Deixe o corpo relaxar a cada expiração"
              ]
            },
            {
              name: "Saudação ao Sol (Surya Namaskar)",
              duration: "10 min",
              description: "Sequência completa de aquecimento",
              howTo: [
                "Posição inicial: Em pé, pés juntos, mãos em prece no peito",
                "Inspire: Eleve braços acima da cabeça, arqueie suavemente para trás",
                "Expire: Dobre para frente, mãos tocando o chão ao lado dos pés",
                "Inspire: Olhe para frente, alongue a coluna",
                "Expire: Passe ou salte os pés para trás (prancha)",
                "Desça o corpo ao chão (chaturanga)",
                "Inspire: Empurre o peito para frente (cobra ou cachorro olhando para cima)",
                "Expire: Eleve os quadris (cachorro olhando para baixo)",
                "Mantenha por 5 respirações profundas",
                "Inspire: Passe ou salte os pés entre as mãos",
                "Expire: Dobre para frente",
                "Inspire: Suba com braços acima da cabeça",
                "Expire: Retorne à posição inicial",
                "Repita 5-8 vezes, alternando pernas"
              ],
              variations: [
                "Iniciante: Mantenha joelhos no chão, movimentos lentos, 3-5 repetições",
                "Intermediário: Saudação completa, ritmo moderado, 5-8 repetições",
                "Avançado: Adicione saltos entre transições, 8-10 repetições"
              ],
              tips: [
                "Sincronize movimento com respiração",
                "Movimentos fluidos e contínuos",
                "Não force além do confortável",
                "Foque na conexão mente-corpo"
              ]
            }
          ]
        },
        {
          day: "Quarta-feira",
          focus: "Cardio Leve e Mobilidade Articular",
          duration: "35 minutos",
          exercises: [
            {
              name: "Aquecimento Suave",
              duration: "5 min",
              description: "Preparação cardiovascular leve",
              howTo: [
                "Caminhada leve no lugar: 2 minutos",
                "Círculos de braços suaves: 1 minuto",
                "Rotações de tronco: 1 minuto",
                "Elevações de joelhos leves: 1 minuto"
              ],
              variations: [
                "Iniciante: Movimentos muito lentos e suaves",
                "Intermediário: Ritmo moderado e confortável",
                "Avançado: Adicione amplitude aos movimentos"
              ],
              tips: [
                "Mantenha intensidade baixa",
                "Foque em movimentos fluidos",
                "Respire profundamente",
                "Prepare o corpo gentilmente"
              ]
            },
            {
              name: "Caminhada Moderada",
              duration: "20 min",
              description: "Cardio de baixa intensidade",
              howTo: [
                "Estabeleça ritmo confortável de caminhada",
                "Postura ereta, ombros relaxados",
                "Braços balançando naturalmente",
                "Respiração natural e relaxada",
                "Deve conseguir conversar facilmente",
                "Aproveite o momento, não force",
                "Mantenha ritmo constante",
                "Foque em como seu corpo se sente",
                "Agradeça ao seu corpo pelo trabalho das últimas semanas",
                "Últimos 2 minutos: reduza gradualmente o ritmo"
              ],
              variations: [
                "Iniciante: 15 minutos, ritmo muito leve",
                "Intermediário: 20 minutos, ritmo moderado",
                "Avançado: 25 minutos, adicione pequenas variações de terreno"
              ],
              tips: [
                "Esta é uma semana de recuperação - não force",
                "Aproveite o movimento",
                "Respire profundamente",
                "Conecte-se com seu corpo"
              ]
            }
          ]
        },
        {
          day: "Sexta-feira",
          focus: "Treino Leve de Corpo Inteiro",
          duration: "35 minutos",
          exercises: [
            {
              name: "Aquecimento Completo",
              duration: "7 min",
              description: "Preparação suave do corpo",
              howTo: [
                "Caminhada leve: 2 minutos",
                "Mobilidade articular: 2 minutos",
                "Agachamentos leves: 1 minuto",
                "Flexões na parede: 1 minuto",
                "Respirações profundas: 1 minuto"
              ],
              variations: [
                "Iniciante: Movimentos muito suaves",
                "Intermediário: Ritmo moderado",
                "Avançado: Adicione amplitude"
              ],
              tips: [
                "Mantenha intensidade baixa",
                "Foque na qualidade",
                "Respire profundamente",
                "Prepare-se gentilmente"
              ]
            },
            {
              name: "Circuito Leve de Manutenção (2 rodadas)",
              duration: "20 min",
              description: "Trabalho muscular de baixa intensidade",
              howTo: [
                "Execute cada exercício por 30 segundos, descanse 30 segundos",
                "Após completar todos, descanse 2 minutos",
                "Repita o circuito apenas 2 vezes",
                "",
                "Exercício 1 - Agachamento leve: 30s trabalho, 30s descanso",
                "Exercício 2 - Flexão (versão fácil): 30s trabalho, 30s descanso",
                "Exercício 3 - Avanço alternado leve: 30s trabalho, 30s descanso",
                "Exercício 4 - Prancha (joelhos apoiados): 30s trabalho, 30s descanso",
                "Exercício 5 - Ponte de glúteo: 30s trabalho, 30s descanso",
                "Exercício 6 - Elevação de panturrilha: 30s trabalho, 30s descanso",
                "",
                "Descanso entre rodadas: 2 minutos",
                "Hidrate-se e respire profundamente"
              ],
              variations: [
                "Iniciante: 20s trabalho, 40s descanso, 1-2 rodadas",
                "Intermediário: 30s trabalho, 30s descanso, 2 rodadas",
                "Avançado: 40s trabalho, 20s descanso, 3 rodadas (mas mantenha intensidade baixa)"
              ],
              tips: [
                "Foque na técnica perfeita, não na intensidade",
                "Movimentos controlados e suaves",
                "Respire normalmente",
                "Esta é uma semana de recuperação"
              ]
            }
          ]
        }
      ]
    }
  ]

  const currentWeek = monthlyPlan.find(w => w.week === selectedWeek)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 py-4 sm:py-6">
        {/* Header */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <Button 
                  onClick={() => router.back()} 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/20 flex-shrink-0"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <div className="min-w-0">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl text-white break-words">
                    Plano Semanal de Treino
                  </CardTitle>
                  <CardDescription className="text-white/90 text-xs sm:text-sm md:text-base mt-1">
                    Programa detalhado de 4 semanas
                  </CardDescription>
                </div>
              </div>
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 flex-shrink-0"
              >
                {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Seletor de Semanas */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg md:text-xl">Selecione a Semana</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Escolha qual semana deseja visualizar</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {monthlyPlan.map((week) => (
                <Button
                  key={week.week}
                  onClick={() => setSelectedWeek(week.week)}
                  variant={selectedWeek === week.week ? "default" : "outline"}
                  className={`h-auto p-3 sm:p-4 flex flex-col items-start gap-2 ${
                    selectedWeek === week.week 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
                  }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedWeek === week.week 
                        ? 'bg-white/20' 
                        : 'bg-purple-100 dark:bg-purple-900/30'
                    }`}>
                      <span className={`font-bold text-sm sm:text-base ${
                        selectedWeek === week.week ? 'text-white' : 'text-purple-600'
                      }`}>
                        {week.week}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-left break-words">
                      Semana {week.week}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs opacity-90 text-left line-clamp-2">
                    {week.title.split(' - ')[1]}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detalhes da Semana Selecionada */}
        {currentWeek && (
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg sm:text-2xl">{currentWeek.week}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl break-words">{currentWeek.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm md:text-base mt-1 line-clamp-2">
                    {currentWeek.description}
                  </CardDescription>
                  <Badge variant="secondary" className="mt-2 text-[10px] sm:text-xs">
                    <Target className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    <span className="truncate">{currentWeek.goal}</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                {currentWeek.days.map((day, dayIndex) => (
                  <Card key={dayIndex} className="border-2 border-purple-100 dark:border-purple-900/30">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-3 sm:p-4 md:p-6">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <CardTitle className="text-base sm:text-lg md:text-xl break-words">{day.day}</CardTitle>
                            <CardDescription className="text-xs sm:text-sm md:text-base break-words">
                              {day.focus}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] sm:text-xs flex-shrink-0">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="hidden sm:inline">{day.duration}</span>
                          <span className="sm:hidden">{day.duration.split('-')[0]}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                      <div className="space-y-4 sm:space-y-6">
                        {day.exercises.map((exercise, exIndex) => (
                          <div 
                            key={exIndex} 
                            className="p-3 sm:p-4 md:p-5 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-900/30"
                          >
                            <div className="flex items-start gap-2 sm:gap-4">
                              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0 mt-1" />
                              <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
                                {/* Cabeçalho do Exercício */}
                                <div>
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                    <h4 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 dark:text-gray-100 break-words">
                                      {exercise.name}
                                    </h4>
                                    <div className="flex gap-1 sm:gap-2 flex-wrap">
                                      {exercise.sets && (
                                        <Badge variant="secondary" className="text-[10px] sm:text-xs">
                                          {exercise.sets} séries
                                        </Badge>
                                      )}
                                      {exercise.reps && (
                                        <Badge variant="secondary" className="text-[10px] sm:text-xs">
                                          {exercise.reps} reps
                                        </Badge>
                                      )}
                                      {exercise.duration && (
                                        <Badge variant="secondary" className="text-[10px] sm:text-xs">
                                          <Clock className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                                          {exercise.duration}
                                        </Badge>
                                      )}
                                      {exercise.rest && (
                                        <Badge variant="outline" className="text-[10px] sm:text-xs">
                                          Descanso: {exercise.rest}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium break-words">
                                    {exercise.description}
                                  </p>
                                </div>

                                {/* Como Fazer */}
                                <div className="bg-white/50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                                    <h5 className="font-bold text-sm sm:text-base text-blue-700 dark:text-blue-400">
                                      Como Fazer:
                                    </h5>
                                  </div>
                                  <ol className="list-decimal list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                    {exercise.howTo.map((step, stepIndex) => (
                                      <li key={stepIndex} className="leading-relaxed pl-1 sm:pl-2 break-words">
                                        {step}
                                      </li>
                                    ))}
                                  </ol>
                                </div>

                                {/* Variações */}
                                <div className="bg-purple-50/50 dark:bg-purple-900/20 p-3 sm:p-4 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                                    <h5 className="font-bold text-sm sm:text-base text-purple-700 dark:text-purple-400">
                                      Variações por Nível:
                                    </h5>
                                  </div>
                                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                    {exercise.variations.map((variation, varIndex) => (
                                      <li key={varIndex} className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-0.5 font-bold flex-shrink-0">•</span>
                                        <span className="leading-relaxed break-words">{variation}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Dicas */}
                                {exercise.tips && exercise.tips.length > 0 && (
                                  <div className="bg-green-50/50 dark:bg-green-900/20 p-3 sm:p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                                      <h5 className="font-bold text-sm sm:text-base text-green-700 dark:text-green-400">
                                        Dicas Importantes:
                                      </h5>
                                    </div>
                                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                      {exercise.tips.map((tip, tipIndex) => (
                                        <li key={tipIndex} className="flex items-start gap-2">
                                          <span className="text-green-500 mt-0.5 font-bold flex-shrink-0">✓</span>
                                          <span className="leading-relaxed break-words">{tip}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dicas Gerais */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20">
          <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
            <div className="flex items-start gap-2 sm:gap-4">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
              <div className="space-y-2 sm:space-y-3 min-w-0">
                <h3 className="font-bold text-base sm:text-lg">Dicas Essenciais para Sucesso</h3>
                <ul className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1 sm:space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                    <span className="break-words"><strong>Consistência é a chave:</strong> Siga o plano mesmo nos dias difíceis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                    <span className="break-words"><strong>Hidratação:</strong> Beba pelo menos 2-3 litros de água por dia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                    <span className="break-words"><strong>Alimentação:</strong> Combine com dieta balanceada rica em proteínas e vegetais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                    <span className="break-words"><strong>Descanso:</strong> Durma 7-9 horas por noite para recuperação adequada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                    <span className="break-words"><strong>Progressão:</strong> Aumente intensidade gradualmente, não force demais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                    <span className="break-words"><strong>Ouça seu corpo:</strong> Se sentir dor (não desconforto), pare e descanse</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
