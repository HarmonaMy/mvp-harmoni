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

export default function WorkoutFullPlanPage() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)

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
            },
            {
              name: "Prancha Isométrica",
              duration: "3x 30-45s",
              rest: "30s",
              description: "Fortalecimento profundo do core e estabilização",
              howTo: [
                "Posicione-se apoiado nos antebraços e dedos dos pés",
                "Cotovelos diretamente sob os ombros",
                "Antebraços paralelos ou mãos unidas",
                "Corpo formando uma linha reta da cabeça aos calcanhares",
                "Contraia o abdômen, puxando o umbigo para dentro",
                "Contraia os glúteos e mantenha as pernas retas",
                "Olhe para o chão, mantendo o pescoço neutro",
                "Respire normalmente - não prenda a respiração",
                "Mantenha a posição por 30-45 segundos",
                "Se começar a tremer, é normal - mantenha a forma",
                "Descanse 30 segundos e repita 3 vezes"
              ],
              variations: [
                "Iniciante: Joelhos apoiados no chão, mantenha 20-30 segundos",
                "Intermediário: Prancha padrão, 30-45 segundos",
                "Avançado: Prancha com pés elevados ou levante alternadamente um braço/perna"
              ],
              tips: [
                "Não deixe os quadris caírem ou subirem muito",
                "Se sentir dor lombar, verifique se o core está ativado",
                "Mantenha os ombros longe das orelhas",
                "Qualidade da postura é mais importante que tempo"
              ]
            },
            {
              name: "Ponte de Glúteo",
              sets: "3",
              reps: "15-20",
              rest: "45s",
              description: "Ativação de glúteos, isquiotibiais e lombar",
              howTo: [
                "Deite-se de costas no chão com joelhos dobrados",
                "Pés apoiados no chão, afastados na largura dos quadris",
                "Pés próximos aos glúteos (cerca de 30cm de distância)",
                "Braços ao lado do corpo, palmas para baixo",
                "Inspire e prepare o movimento",
                "Expire e pressione os calcanhares no chão",
                "Levante os quadris, contraindo fortemente os glúteos",
                "Forme uma linha reta dos ombros aos joelhos",
                "Aperte os glúteos no topo por 2 segundos",
                "Não arqueie demais a lombar - foque nos glúteos",
                "Inspire e desça controladamente",
                "Execute 15-20 repetições",
                "Descanse 45 segundos e repita 3 vezes"
              ],
              variations: [
                "Iniciante: Ponte padrão, mantenha 1-2 segundos no topo",
                "Intermediário: Adicione pausa de 3-5 segundos no topo",
                "Avançado: Uma perna de cada vez (single leg bridge) ou coloque peso sobre os quadris"
              ],
              tips: [
                "Foque na contração dos glúteos, não na lombar",
                "Mantenha os joelhos alinhados - não deixe abrirem",
                "Se sentir cãibra nos isquiotibiais, aproxime os pés dos glúteos",
                "Respire normalmente durante todo o exercício"
              ]
            },
            {
              name: "Alongamento Completo",
              duration: "8 min",
              description: "Recuperação ativa e melhora da flexibilidade",
              howTo: [
                "Alongamento de quadríceps em pé: segure o pé atrás, puxe em direção ao glúteo (45s cada perna)",
                "Alongamento de isquiotibiais: perna estendida à frente, incline-se para frente (45s cada perna)",
                "Alongamento de panturrilha: perna estendida atrás, calcanhar no chão, incline-se para frente (45s cada)",
                "Alongamento de quadril: estocada baixa, empurre quadril para frente (45s cada lado)",
                "Alongamento de glúteos: deitado, cruze tornozelo sobre joelho oposto, puxe (45s cada)",
                "Alongamento de peito: braços abertos na parede, incline-se para frente (45s)",
                "Alongamento de ombros: puxe um braço através do peito (30s cada)",
                "Alongamento de tríceps: braço acima da cabeça, cotovelo dobrado (30s cada)",
                "Torção suave da coluna deitado: joelhos para um lado (45s cada)",
                "Postura da criança: ajoelhado, tronco para frente, braços estendidos (1 minuto)",
                "Respirações profundas finais: inspire 4s, segure 4s, expire 6s (1 minuto)"
              ],
              variations: [
                "Iniciante: Alongamentos suaves, 20-30 segundos cada, sem forçar",
                "Intermediário: Mantenha 30-45 segundos, respire profundamente",
                "Avançado: Alongamentos mais profundos, 45-60 segundos, adicione yoga"
              ],
              tips: [
                "Nunca force o alongamento até sentir dor",
                "Respire profundamente e relaxe mais a cada expiração",
                "Mantenha cada posição estática, sem balançar",
                "Hidrate-se bem após o treino"
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
            },
            {
              name: "Exercícios de Mobilidade",
              duration: "10 min",
              description: "Melhora da amplitude de movimento e flexibilidade",
              howTo: [
                "Círculos de tornozelo: sentado, circule cada tornozelo 20x em cada direção",
                "Mobilidade de quadril: em quatro apoios, círculos com o joelho (10x cada lado)",
                "Gato-vaca: em quatro apoios, alterne arqueando e arredondando as costas (15 repetições)",
                "Rotações de tronco sentado: gire suavemente de um lado para o outro (20 repetições)",
                "Círculos de ombros: para frente e para trás (15x cada direção)",
                "Rotações de pescoço: suavemente, em todas as direções (10x cada)",
                "Abertura de quadril: agachamento profundo, cotovelos empurrando joelhos (1 minuto)",
                "Alongamento de isquiotibiais: perna estendida, incline-se para frente (45s cada)",
                "Torção espinal deitado: joelhos para os lados (1 minuto cada lado)",
                "Respirações profundas finais: inspire profundamente, expire completamente (1 minuto)"
              ],
              variations: [
                "Iniciante: Movimentos suaves, amplitude reduzida",
                "Intermediário: Amplitude completa, movimentos controlados",
                "Avançado: Adicione resistência leve ou aumente amplitude"
              ],
              tips: [
                "Movimentos devem ser suaves e controlados",
                "Nunca force além do confortável",
                "Respire profundamente durante cada exercício",
                "Foque em áreas que sente mais tensas"
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
            },
            {
              name: "Core Finalizador",
              duration: "5 min",
              description: "Fortalecimento abdominal e estabilização",
              howTo: [
                "Prancha: 30 segundos, descanse 15s",
                "Bicicleta no ar: 30 segundos, descanse 15s",
                "Prancha lateral direita: 20 segundos, descanse 10s",
                "Prancha lateral esquerda: 20 segundos, descanse 10s",
                "Dead bug: 30 segundos, descanse 15s",
                "Prancha com toques nos ombros: 30 segundos, descanse 15s",
                "Postura do barco: 20 segundos, descanse 10s",
                "Repita o circuito 1-2 vezes"
              ],
              variations: [
                "Iniciante: Reduza tempos pela metade, mais descanso",
                "Intermediário: Siga os tempos padrão",
                "Avançado: Aumente tempos em 50%, menos descanso"
              ],
              tips: [
                "Mantenha lombar protegida durante todos os exercícios",
                "Respire normalmente, não prenda a respiração",
                "Qualidade sobre quantidade",
                "Se sentir dor lombar, pare e reavalie a técnica"
              ]
            },
            {
              name: "Alongamento de Recuperação",
              duration: "8 min",
              description: "Relaxamento muscular e flexibilidade",
              howTo: [
                "Alongamento de quadríceps: 45s cada perna",
                "Alongamento de isquiotibiais: 45s cada perna",
                "Alongamento de panturrilha: 45s cada perna",
                "Alongamento de quadril em estocada: 45s cada lado",
                "Alongamento de glúteos deitado: 45s cada lado",
                "Alongamento de peito e ombros: 45s",
                "Alongamento de tríceps: 30s cada braço",
                "Torção espinal deitado: 1 minuto cada lado",
                "Postura da criança: 1 minuto",
                "Respirações profundas finais: 1 minuto"
              ],
              variations: [
                "Iniciante: Alongamentos suaves, 30 segundos cada",
                "Intermediário: Alongamentos moderados, 45 segundos cada",
                "Avançado: Alongamentos profundos, 60 segundos cada"
              ],
              tips: [
                "Relaxe completamente em cada alongamento",
                "Respire profundamente e solte a tensão",
                "Nunca force além do confortável",
                "Hidrate-se bem após o treino"
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
            },
            {
              name: "Mergulho em Cadeira (Dips)",
              sets: "3",
              reps: "12-15",
              rest: "60s",
              description: "Isolamento intenso dos tríceps",
              howTo: [
                "Sente-se na borda de uma cadeira ou banco estável",
                "Mãos ao lado dos quadris, dedos apontando para frente",
                "Agarre firmemente a borda da cadeira",
                "Deslize o quadril para fora da cadeira",
                "Pernas estendidas à frente (mais difícil) ou dobradas (mais fácil)",
                "Dobre os cotovelos, descendo o corpo em direção ao chão",
                "Desça até os cotovelos formarem 90°",
                "Mantenha cotovelos apontando para trás, não para os lados",
                "Empurre de volta à posição inicial",
                "Foque na contração dos tríceps",
                "Execute 12-15 repetições",
                "Descanse 60 segundos e complete 3 séries"
              ],
              variations: [
                "Iniciante: Pés próximos, joelhos dobrados, 8-10 reps",
                "Intermediário: Pernas estendidas, pés no chão, 12-15 reps",
                "Avançado: Pés elevados em outra cadeira ou adicione peso no colo"
              ],
              tips: [
                "Mantenha ombros para baixo, longe das orelhas",
                "Não desça demais se sentir desconforto nos ombros",
                "Core ativado para estabilização",
                "Movimento controlado, sem balançar"
              ]
            },
            {
              name: "Remada Invertida",
              sets: "3",
              reps: "10-12",
              rest: "60s",
              description: "Fortalecimento das costas e bíceps",
              howTo: [
                "Posicione uma barra, mesa resistente ou toalha em porta na altura da cintura",
                "Deite-se embaixo, segurando com pegada pronada (palmas para baixo)",
                "Corpo reto da cabeça aos calcanhares",
                "Calcanhares no chão, corpo em ângulo",
                "Braços completamente estendidos",
                "Puxe o peito em direção à barra",
                "Contraia as escápulas (aproxime as omoplatas)",
                "Cotovelos próximos ao corpo",
                "Toque o peito na barra se possível",
                "Desça controladamente à posição inicial",
                "Execute 10-12 repetições",
                "Descanse 60 segundos e complete 3 séries"
              ],
              variations: [
                "Iniciante: Barra mais alta, joelhos dobrados, 6-8 reps",
                "Intermediário: Barra na cintura, corpo reto, 10-12 reps",
                "Avançado: Barra mais baixa, pés elevados, adicione pausa no topo"
              ],
              tips: [
                "Foque em puxar com as costas, não apenas com os braços",
                "Mantenha corpo reto durante todo o movimento",
                "Não deixe quadris caírem",
                "Contraia as escápulas no topo do movimento"
              ]
            },
            {
              name: "Prancha com Variações",
              duration: "4 rodadas",
              description: "Core dinâmico e estabilização avançada",
              howTo: [
                "Rodada 1: Prancha padrão - 45 segundos",
                "Descanso: 20 segundos",
                "Rodada 2: Prancha com toque nos ombros - 40 segundos (20 toques)",
                "Descanso: 20 segundos",
                "Rodada 3: Prancha lateral direita - 30 segundos",
                "Descanso: 15 segundos",
                "Rodada 4: Prancha lateral esquerda - 30 segundos",
                "Descanso: 15 segundos",
                "Repita o circuito 2 vezes"
              ],
              variations: [
                "Iniciante: Reduza tempos pela metade, joelhos apoiados",
                "Intermediário: Siga os tempos padrão",
                "Avançado: Aumente tempos em 50%, adicione movimentos"
              ],
              tips: [
                "Mantenha forma perfeita mesmo quando cansado",
                "Respire normalmente durante todas as pranchas",
                "Core sempre contraído",
                "Se perder a forma, pare e descanse"
              ]
            },
            {
              name: "Alongamento Superior Completo",
              duration: "8 min",
              description: "Recuperação e flexibilidade da parte superior",
              howTo: [
                "Alongamento de peito na parede: 1 minuto cada lado",
                "Alongamento de ombros: puxe braço através do peito (45s cada)",
                "Alongamento de tríceps: braço acima da cabeça (45s cada)",
                "Alongamento de bíceps: braço estendido na parede (45s cada)",
                "Alongamento de costas: gato-vaca (1 minuto)",
                "Alongamento de pescoço: inclinações suaves (30s cada direção)",
                "Torção de tronco sentado: 1 minuto cada lado",
                "Respirações profundas finais: 1 minuto"
              ],
              variations: [
                "Iniciante: Alongamentos suaves, 30 segundos cada",
                "Intermediário: Alongamentos moderados, 45 segundos cada",
                "Avançado: Alongamentos profundos, 60 segundos cada"
              ],
              tips: [
                "Relaxe completamente em cada posição",
                "Respire profundamente",
                "Nunca force além do confortável",
                "Foque em áreas que trabalhou mais"
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
                "Exercício 4: Jumping Jacks - 40s trabalho, 20s caminhada",
                "Repita: Jumping Jacks - 40s trabalho, 20s caminhada",
                "",
                "Exercício 5: Agachamento com salto leve - 40s trabalho, 20s caminhada",
                "Repita: Agachamento com salto leve - 40s trabalho, 20s caminhada",
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
            },
            {
              name: "Desaquecimento Ativo",
              duration: "5 min",
              description: "Retorno gradual ao estado de repouso",
              howTo: [
                "Minutos 1-2: Caminhada moderada, reduzindo velocidade",
                "Minutos 3-4: Caminhada lenta com respirações profundas",
                "Minuto 5: Caminhada muito lenta, alongamentos suaves de braços",
                "Circule os ombros para relaxar",
                "Respire profundamente pelo nariz, expire pela boca",
                "Hidrate-se adequadamente"
              ],
              variations: [
                "Iniciante: 7-10 minutos de desaquecimento mais longo",
                "Intermediário: 5 minutos padrão",
                "Avançado: 3-5 minutos + alongamentos dinâmicos"
              ],
              tips: [
                "Não pare abruptamente após HIIT",
                "Mantenha-se em movimento",
                "Respire profundamente",
                "Monitore sua frequência cardíaca"
              ]
            },
            {
              name: "Alongamento Pós-HIIT",
              duration: "5 min",
              description: "Recuperação e prevenção de lesões",
              howTo: [
                "Alongamento de quadríceps: 30s cada perna",
                "Alongamento de isquiotibiais: 30s cada perna",
                "Alongamento de panturrilha: 30s cada perna",
                "Alongamento de quadril: 30s cada lado",
                "Alongamento de peito e ombros: 30s",
                "Torção suave da coluna: 30s cada lado",
                "Respirações profundas finais: 1 minuto"
              ],
              variations: [
                "Iniciante: Alongamentos suaves, 20 segundos cada",
                "Intermediário: Alongamentos moderados, 30 segundos cada",
                "Avançado: Alongamentos profundos, 45 segundos cada"
              ],
              tips: [
                "Relaxe completamente",
                "Respire profundamente",
                "Hidrate-se bem",
                "Descanse adequadamente antes do próximo treino"
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
            },
            {
              name: "Avanço (Lunges) Alternado",
              sets: "3",
              reps: "12-15 cada perna",
              rest: "60s",
              description: "Fortalecimento unilateral e equilíbrio",
              howTo: [
                "Fique em pé, pés na largura dos quadris",
                "Mãos nos quadris ou à frente para equilíbrio",
                "Dê um passo grande para frente com a perna direita",
                "Dobre ambos os joelhos, descendo o quadril",
                "Joelho da frente a 90°, não ultrapassa os dedos",
                "Joelho de trás quase toca o chão",
                "Mantenha tronco ereto",
                "Empurre pelo calcanhar da frente para voltar",
                "Alterne as pernas a cada repetição",
                "Execute 12-15 repetições cada perna",
                "Descanse 60 segundos e complete 3 séries"
              ],
              variations: [
                "Iniciante: Avanço estático (sem retornar), use apoio, 8-10 cada",
                "Intermediário: Avanço alternado, 12-15 cada perna",
                "Avançado: Avanço caminhando ou adicione peso (garrafas d'água)"
              ],
              tips: [
                "Mantenha equilíbrio durante todo o movimento",
                "Não deixe joelho da frente ultrapassar muito os dedos",
                "Core ativado para estabilização",
                "Se perder equilíbrio, use parede para apoio"
              ]
            },
            {
              name: "Ponte de Glúteo com Variações",
              sets: "3",
              reps: "15-20",
              rest: "45s",
              description: "Ativação intensa de glúteos e isquiotibiais",
              howTo: [
                "Deite-se de costas, joelhos dobrados, pés no chão",
                "Pés afastados na largura dos quadris",
                "Braços ao lado do corpo, palmas para baixo",
                "Pressione calcanhares no chão",
                "Levante quadris, contraindo glúteos",
                "Forme linha reta dos ombros aos joelhos",
                "Aperte glúteos no topo por 3 segundos",
                "Desça controladamente",
                "Execute 15-20 repetições",
                "Variação: Últimas 5 reps com pulsações no topo",
                "Descanse 45 segundos e complete 3 séries"
              ],
              variations: [
                "Iniciante: Ponte padrão, pausa de 2s no topo",
                "Intermediário: Ponte com pausa de 3-5s, adicione pulsações",
                "Avançado: Uma perna de cada vez ou coloque peso sobre quadris"
              ],
              tips: [
                "Foque na contração dos glúteos",
                "Não arqueie demais a lombar",
                "Mantenha joelhos alinhados",
                "Respire normalmente"
              ]
            },
            {
              name: "Elevação de Panturrilha",
              sets: "3",
              reps: "20-25",
              rest: "45s",
              description: "Fortalecimento das panturrilhas",
              howTo: [
                "Fique em pé, pés na largura dos quadris",
                "Pode segurar em parede para equilíbrio",
                "Levante-se na ponta dos pés o mais alto possível",
                "Contraia panturrilhas no topo",
                "Mantenha por 1-2 segundos",
                "Desça controladamente, calcanhares tocando o chão",
                "Execute 20-25 repetições",
                "Descanse 45 segundos e complete 3 séries"
              ],
              variations: [
                "Iniciante: Ambos os pés, amplitude completa, 15-20 reps",
                "Intermediário: Uma perna de cada vez, 20-25 reps cada",
                "Avançado: Pés na borda de degrau para maior amplitude, adicione peso"
              ],
              tips: [
                "Movimento controlado, sem balançar",
                "Contraia panturrilhas no topo",
                "Mantenha equilíbrio",
                "Se sentir cãibra, alongue suavemente"
              ]
            },
            {
              name: "Core Intensivo",
              duration: "8 min",
              description: "Fortalecimento abdominal completo",
              howTo: [
                "Prancha: 45 segundos, descanse 15s",
                "Bicicleta no ar: 45 segundos, descanse 15s",
                "Russian twist: 45 segundos, descanse 15s",
                "Prancha lateral direita: 30 segundos, descanse 15s",
                "Prancha lateral esquerda: 30 segundos, descanse 15s",
                "Dead bug: 45 segundos, descanse 15s",
                "Mountain climbers lentos: 45 segundos, descanse 15s",
                "Postura do barco: 30 segundos, descanse 15s",
                "Repita o circuito 1 vez"
              ],
              variations: [
                "Iniciante: Reduza tempos pela metade",
                "Intermediário: Siga os tempos padrão",
                "Avançado: Aumente tempos em 50%"
              ],
              tips: [
                "Mantenha lombar protegida",
                "Respire normalmente",
                "Qualidade sobre quantidade",
                "Se sentir dor lombar, pare"
              ]
            },
            {
              name: "Alongamento Inferior Completo",
              duration: "8 min",
              description: "Recuperação e flexibilidade das pernas",
              howTo: [
                "Alongamento de quadríceps: 1 minuto cada perna",
                "Alongamento de isquiotibiais: 1 minuto cada perna",
                "Alongamento de panturrilha: 1 minuto cada perna",
                "Alongamento de quadril em estocada: 1 minuto cada lado",
                "Alongamento de glúteos deitado: 1 minuto cada lado",
                "Alongamento de adutores (borboleta): 1 minuto",
                "Torção espinal deitado: 1 minuto cada lado",
                "Respirações profundas finais: 1 minuto"
              ],
              variations: [
                "Iniciante: Alongamentos suaves, 30-45 segundos cada",
                "Intermediário: Alongamentos moderados, 1 minuto cada",
                "Avançado: Alongamentos profundos, 1-2 minutos cada"
              ],
              tips: [
                "Relaxe completamente",
                "Respire profundamente",
                "Nunca force",
                "Hidrate-se bem"
              ]
            }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "Semana 3 - Desafio e Resistência",
      description: "Semana de maior intensidade com foco em resistência muscular, cardiovascular e mental. Introdução de exercícios mais complexos.",
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
            },
            {
              name: "Core Finalizador Intenso",
              duration: "5 min",
              description: "Queima final do core",
              howTo: [
                "Prancha: 1 minuto",
                "Bicicleta no ar rápida: 45 segundos",
                "Russian twist com peso: 45 segundos",
                "Prancha com toques nos ombros: 45 segundos",
                "V-ups: 30 segundos",
                "Postura do barco: 30 segundos",
                "Prancha final: 45 segundos"
              ],
              variations: [
                "Iniciante: Reduza tempos pela metade, sem peso",
                "Intermediário: Siga os tempos padrão",
                "Avançado: Aumente tempos, adicione peso"
              ],
              tips: [
                "Mantenha lombar protegida",
                "Respire normalmente",
                "Foque na contração do core",
                "Última queima - dê tudo!"
              ]
            },
            {
              name: "Desaquecimento e Alongamento",
              duration: "8 min",
              description: "Recuperação ativa completa",
              howTo: [
                "Caminhada lenta: 2 minutos",
                "Respirações profundas: 1 minuto",
                "Alongamento de pernas: 2 minutos",
                "Alongamento de braços e peito: 1 minuto",
                "Alongamento de core: 1 minuto",
                "Torções suaves: 1 minuto"
              ],
              variations: [
                "Iniciante: 10-12 minutos de recuperação",
                "Intermediário: 8 minutos padrão",
                "Avançado: 6-8 minutos + foam rolling"
              ],
              tips: [
                "Não pare abruptamente",
                "Respire profundamente",
                "Hidrate-se muito bem",
                "Descanse adequadamente"
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
            },
            {
              name: "Superset 2: Ombros e Bíceps/Tríceps (4 rodadas)",
              duration: "16 min",
              description: "Trabalho de ombros e braços",
              howTo: [
                "B1 - Flexão pike (ombros): 10-12 reps",
                "Sem descanso",
                "B2 - Mergulho em cadeira (tríceps): 12-15 reps",
                "Sem descanso",
                "B3 - Rosca com peso improvisado (bíceps): 12-15 reps",
                "Descanso: 90 segundos",
                "Repita 4 vezes"
              ],
              variations: [
                "Iniciante: Pike com mãos elevadas, dips com pés próximos, peso leve, 3 rodadas",
                "Intermediário: Pike padrão, dips padrão, peso moderado, 4 rodadas",
                "Avançado: Pike com pés elevados, dips com pés elevados, peso pesado, 5 rodadas"
              ],
              tips: [
                "Foque em cada grupo muscular",
                "Controle o movimento, sem balançar",
                "Mantenha core ativado",
                "Respire adequadamente"
              ]
            },
            {
              name: "Core Avançado",
              duration: "6 min",
              description: "Fortalecimento intenso do core",
              howTo: [
                "Prancha: 1 minuto",
                "Russian twist com peso: 45 segundos",
                "Prancha lateral direita: 45 segundos",
                "Prancha lateral esquerda: 45 segundos",
                "V-ups: 30 segundos",
                "Bicicleta no ar: 45 segundos",
                "Prancha com toques: 45 segundos",
                "Dead bug: 45 segundos"
              ],
              variations: [
                "Iniciante: Reduza tempos pela metade",
                "Intermediário: Siga os tempos padrão",
                "Avançado: Aumente tempos em 50%"
              ],
              tips: [
                "Mantenha lombar protegida",
                "Respire normalmente",
                "Qualidade sobre quantidade",
                "Última queima - foque!"
              ]
            },
            {
              name: "Alongamento Completo",
              duration: "8 min",
              description: "Recuperação e flexibilidade",
              howTo: [
                "Alongamento de peito: 1 minuto cada lado",
                "Alongamento de costas: 1 minuto",
                "Alongamento de ombros: 1 minuto cada",
                "Alongamento de bíceps: 45s cada",
                "Alongamento de tríceps: 45s cada",
                "Torção de tronco: 1 minuto cada lado",
                "Respirações profundas: 1 minuto"
              ],
              variations: [
                "Iniciante: Alongamentos suaves, 30-45s cada",
                "Intermediário: Alongamentos moderados, 45-60s cada",
                "Avançado: Alongamentos profundos, 60-90s cada"
              ],
              tips: [
                "Relaxe completamente",
                "Respire profundamente",
                "Hidrate-se bem",
                "Descanse adequadamente"
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
            },
            {
              name: "Avanço Caminhando",
              sets: "4",
              reps: "12-15 cada perna",
              rest: "60s",
              description: "Fortalecimento unilateral dinâmico",
              howTo: [
                "Fique em pé, pés juntos",
                "Dê um passo grande para frente com perna direita",
                "Dobre ambos joelhos, descendo",
                "Joelho da frente a 90°",
                "Joelho de trás quase toca o chão",
                "Empurre e traga perna de trás para frente",
                "Continue caminhando alternando pernas",
                "Execute 12-15 passos cada perna",
                "Descanse 60 segundos",
                "Complete 4 séries"
              ],
              variations: [
                "Iniciante: Avanço estático, 10 cada perna, 3 séries",
                "Intermediário: Avanço caminhando, 12-15 cada, 4 séries",
                "Avançado: Adicione peso (garrafas d'água ou mochila), 5 séries"
              ],
              tips: [
                "Mantenha equilíbrio",
                "Core ativado",
                "Passos largos e controlados",
                "Respire normalmente"
              ]
            },
            {
              name: "Agachamento Búlgaro",
              sets: "3",
              reps: "12-15 cada perna",
              rest: "60s",
              description: "Força unilateral avançada",
              howTo: [
                "Fique de costas para banco ou cadeira",
                "Coloque peito do pé direito sobre o banco",
                "Pé esquerdo à frente, afastado",
                "Dobre joelho esquerdo, descendo",
                "Joelho da frente não ultrapassa dedos",
                "Desça até coxa paralela ao chão",
                "Empurre pelo calcanhar para subir",
                "Execute 12-15 repetições",
                "Troque de perna",
                "Descanse 60 segundos",
                "Complete 3 séries"
              ],
              variations: [
                "Iniciante: Banco mais baixo, amplitude reduzida, 8-10 reps",
                "Intermediário: Banco padrão, peso corporal, 12-15 reps",
                "Avançado: Adicione peso (halteres ou mochila), 15-20 reps"
              ],
              tips: [
                "Mantenha equilíbrio",
                "Foque na perna da frente",
                "Core ativado",
                "Não force joelho"
              ]
            },
            {
              name: "Ponte de Glúteo com Uma Perna",
              sets: "3",
              reps: "12-15 cada perna",
              rest: "45s",
              description: "Ativação máxima de glúteos",
              howTo: [
                "Deite-se de costas, joelhos dobrados",
                "Estenda perna direita reta no ar",
                "Pressione calcanhar esquerdo no chão",
                "Levante quadris, contraindo glúteo esquerdo",
                "Forme linha reta dos ombros ao joelho",
                "Mantenha perna direita estendida",
                "Aperte glúteo no topo por 2 segundos",
                "Desça controladamente",
                "Execute 12-15 repetições",
                "Troque de perna",
                "Descanse 45 segundos",
                "Complete 3 séries"
              ],
              variations: [
                "Iniciante: Ponte com ambas pernas, 15-20 reps",
                "Intermediário: Ponte com uma perna, 12-15 reps cada",
                "Avançado: Adicione peso sobre quadris, 15-20 reps cada"
              ],
              tips: [
                "Foque no glúteo da perna de apoio",
                "Não arqueie lombar",
                "Mantenha quadris nivelados",
                "Respire normalmente"
              ]
            },
            {
              name: "Elevação de Panturrilha Avançada",
              sets: "4",
              reps: "25-30",
              rest: "45s",
              description: "Fortalecimento intenso de panturrilhas",
              howTo: [
                "Fique em pé, pés na largura dos quadris",
                "Pode segurar peso leve (garrafas d'água)",
                "Levante-se na ponta dos pés o máximo possível",
                "Contraia panturrilhas no topo",
                "Mantenha por 2 segundos",
                "Desça controladamente",
                "Execute 25-30 repetições",
                "Descanse 45 segundos",
                "Complete 4 séries"
              ],
              variations: [
                "Iniciante: Ambos pés, sem peso, 20-25 reps",
                "Intermediário: Uma perna de cada vez, 25-30 reps cada",
                "Avançado: Pés na borda de degrau, com peso, 30-35 reps"
              ],
              tips: [
                "Movimento controlado",
                "Contraia no topo",
                "Amplitude completa",
                "Respire normalmente"
              ]
            },
            {
              name: "Core e Explosão",
              duration: "8 min",
              description: "Finalização com core e pliometria",
              howTo: [
                "Agachamento com salto: 30 segundos",
                "Descanso: 15 segundos",
                "Prancha: 45 segundos",
                "Descanso: 15 segundos",
                "Avanço com salto alternado: 30 segundos",
                "Descanso: 15 segundos",
                "Russian twist: 45 segundos",
                "Descanso: 15 segundos",
                "Burpees: 30 segundos",
                "Descanso: 15 segundos",
                "Prancha lateral direita: 30 segundos",
                "Descanso: 15 segundos",
                "Prancha lateral esquerda: 30 segundos",
                "Descanso: 15 segundos",
                "V-ups: 30 segundos"
              ],
              variations: [
                "Iniciante: Versões sem salto, tempos reduzidos",
                "Intermediário: Siga os tempos padrão",
                "Avançado: Aumente tempos, máxima intensidade"
              ],
              tips: [
                "Última queima - dê tudo!",
                "Mantenha boa forma",
                "Respire constantemente",
                "Foco mental"
              ]
            },
            {
              name: "Alongamento Inferior Completo",
              duration: "10 min",
              description: "Recuperação profunda das pernas",
              howTo: [
                "Alongamento de quadríceps: 1 minuto cada perna",
                "Alongamento de isquiotibiais: 1 minuto cada perna",
                "Alongamento de panturrilha: 1 minuto cada perna",
                "Alongamento de quadril: 1 minuto cada lado",
                "Alongamento de glúteos: 1 minuto cada lado",
                "Alongamento de adutores: 1 minuto",
                "Torção espinal: 1 minuto cada lado",
                "Postura da criança: 1 minuto",
                "Respirações profundas: 1 minuto"
              ],
              variations: [
                "Iniciante: Alongamentos suaves, 45s cada",
                "Intermediário: Alongamentos moderados, 1 min cada",
                "Avançado: Alongamentos profundos, 1-2 min cada"
              ],
              tips: [
                "Relaxe completamente",
                "Respire profundamente",
                "Hidrate-se muito bem",
                "Descanse adequadamente - você merece!"
              ]
            }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "Semana 4 - Recuperação Ativa e Consolidação",
      description: "Semana de recuperação ativa com foco em mobilidade, flexibilidade e consolidação dos ganhos das semanas anteriores. Intensidade reduzida para permitir recuperação completa.",
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
            },
            {
              name: "Sequência de Guerreiros",
              duration: "12 min",
              description: "Força, equilíbrio e abertura",
              howTo: [
                "Guerreiro I (direita): 1 minuto",
                "  - Pé direito à frente, joelho a 90°, pé esquerdo atrás a 45°",
                "  - Quadris voltados para frente, braços acima da cabeça",
                "  - Olhar para cima, peito aberto",
                "",
                "Guerreiro II (direita): 1 minuto",
                "  - Mesma posição das pernas, gire tronco para o lado",
                "  - Braços em linha reta, olhar sobre a mão da frente",
                "  - Ombros relaxados, peito aberto",
                "",
                "Guerreiro Reverso (direita): 1 minuto",
                "  - De Guerreiro II, incline para trás",
                "  - Mão esquerda desliza pela perna de trás",
                "  - Braço direito estendido sobre a cabeça",
                "",
                "Troque de lado e repita a sequência (esquerda): 3 minutos",
                "",
                "Guerreiro III (direita): 1 minuto",
                "  - Perna direita de apoio, esquerda estendida para trás",
                "  - Corpo em linha reta, braços à frente",
                "  - Foco e equilíbrio",
                "",
                "Guerreiro III (esquerda): 1 minuto",
                "",
                "Postura da criança: 2 minutos (recuperação)"
              ],
              variations: [
                "Iniciante: Reduza profundidade dos agachamentos, use parede para apoio",
                "Intermediário: Mantenha posturas completas, respiração profunda",
                "Avançado: Adicione transições fluidas entre posturas, olhos fechados"
              ],
              tips: [
                "Mantenha joelho alinhado com tornozelo",
                "Respire profundamente em cada postura",
                "Foque em um ponto para equilíbrio",
                "Sinta a força e a abertura"
              ]
            },
            {
              name: "Alongamentos Profundos",
              duration: "10 min",
              description: "Flexibilidade e liberação de tensões",
              howTo: [
                "Pombo (direita): 2 minutos",
                "  - Joelho direito à frente, perna esquerda estendida atrás",
                "  - Incline-se para frente sobre a perna, relaxe completamente",
                "",
                "Pombo (esquerda): 2 minutos",
                "",
                "Torção sentada (direita): 1 minuto",
                "  - Sente-se, cruze perna direita sobre a esquerda",
                "  - Gire tronco para a direita, olhe por cima do ombro",
                "",
                "Torção sentada (esquerda): 1 minuto",
                "",
                "Alongamento de isquiotibiais: 2 minutos",
                "  - Pernas estendidas à frente, incline-se para frente",
                "  - Relaxe completamente, respire profundamente",
                "",
                "Borboleta: 2 minutos",
                "  - Solas dos pés juntas, joelhos abertos",
                "  - Incline-se suavemente para frente"
              ],
              variations: [
                "Iniciante: Use blocos ou almofadas para suporte, não force",
                "Intermediário: Alongamentos moderados, respire profundamente",
                "Avançado: Alongamentos profundos, mantenha por mais tempo"
              ],
              tips: [
                "Nunca force além do confortável",
                "Respire profundamente e relaxe mais a cada expiração",
                "Foque em soltar tensões",
                "Seja paciente com seu corpo"
              ]
            },
            {
              name: "Savasana e Meditação",
              duration: "8 min",
              description: "Relaxamento profundo e integração",
              howTo: [
                "Deite-se de costas, pernas naturalmente afastadas",
                "Pés caindo para os lados, braços ao lado do corpo",
                "Palmas para cima, olhos fechados",
                "Relaxe conscientemente cada parte do corpo",
                "Comece pelos dedos dos pés, subindo até a cabeça",
                "Testa, olhos, mandíbula - relaxe tudo",
                "Respire naturalmente, sem controlar",
                "Permaneça imóvel e presente",
                "Observe pensamentos sem julgamento",
                "Permaneça por 5-8 minutos",
                "Para sair: mova dedos e dedões suavemente",
                "Role para o lado direito",
                "Sente-se lentamente, olhos ainda fechados",
                "Respire profundamente 3 vezes",
                "Abra os olhos suavemente"
              ],
              variations: [
                "Iniciante: Use travesseiro sob joelhos, cobertor leve",
                "Intermediário: Savasana padrão, foco na respiração",
                "Avançado: Yoga Nidra guiado, body scan profundo"
              ],
              tips: [
                "Este é o momento mais importante da prática",
                "Permita-se relaxar completamente",
                "Não se preocupe se adormecer",
                "Integre todos os benefícios da prática"
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
            },
            {
              name: "Mobilidade Articular Completa",
              duration: "10 min",
              description: "Trabalho de amplitude e saúde articular",
              howTo: [
                "Círculos de tornozelo: 30 segundos cada, ambas direções",
                "Círculos de joelho: 30 segundos cada, ambas direções",
                "Círculos de quadril: 1 minuto, ambas direções",
                "Gato-vaca: 2 minutos (mobilidade de coluna)",
                "Círculos de ombros: 1 minuto, ambas direções",
                "Rotações de pescoço: 1 minuto, suavemente",
                "Círculos de punhos: 30 segundos cada direção",
                "Abertura de quadril: 1 minuto (agachamento profundo)",
                "Rotações de tronco: 1 minuto",
                "Respirações profundas: 1 minuto"
              ],
              variations: [
                "Iniciante: Movimentos muito suaves, amplitude reduzida",
                "Intermediário: Amplitude completa, movimentos controlados",
                "Avançado: Adicione resistência leve ou aumente amplitude"
              ],
              tips: [
                "Movimentos devem ser suaves e sem dor",
                "Foque em sentir as articulações",
                "Respire profundamente",
                "Não force além do confortável"
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
            },
            {
              name: "Core Suave",
              duration: "5 min",
              description: "Manutenção do core sem exaustão",
              howTo: [
                "Prancha (joelhos apoiados): 30 segundos",
                "Descanso: 30 segundos",
                "Dead bug lento: 30 segundos",
                "Descanso: 30 segundos",
                "Prancha lateral (joelhos): 20 segundos cada lado",
                "Descanso: 30 segundos",
                "Ponte: 30 segundos",
                "Descanso: 30 segundos",
                "Respirações profundas: 1 minuto"
              ],
              variations: [
                "Iniciante: Reduza tempos pela metade",
                "Intermediário: Siga os tempos padrão",
                "Avançado: Mantenha versões mais fáceis dos exercícios"
              ],
              tips: [
                "Mantenha lombar protegida",
                "Movimentos suaves",
                "Respire normalmente",
                "Não force"
              ]
            },
            {
              name: "Alongamento Restaurativo",
              duration: "10 min",
              description: "Recuperação profunda e flexibilidade",
              howTo: [
                "Alongamento de quadríceps: 1 minuto cada perna",
                "Alongamento de isquiotibiais: 1 minuto cada perna",
                "Alongamento de quadril: 1 minuto cada lado",
                "Alongamento de peito e ombros: 1 minuto",
                "Torção espinal deitado: 1 minuto cada lado",
                "Postura da criança: 2 minutos",
                "Respirações profundas finais: 1 minuto"
              ],
              variations: [
                "Iniciante: Alongamentos muito suaves",
                "Intermediário: Alongamentos moderados",
                "Avançado: Alongamentos profundos e relaxantes"
              ],
              tips: [
                "Relaxe completamente",
                "Respire profundamente",
                "Solte todas as tensões",
                "Agradeça ao seu corpo"
              ]
            }
          ]
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-2 sm:p-4 overflow-y-auto">
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
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl text-white truncate">
                    Plano Completo de Exercícios
                  </CardTitle>
                  <CardDescription className="text-white/90 text-xs sm:text-sm md:text-base mt-1">
                    Programa mensal detalhado
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
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <p className="text-[10px] sm:text-xs text-white/80 mb-1">Duração Total</p>
                <p className="text-sm sm:text-base md:text-lg font-bold text-white">4 Semanas</p>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <p className="text-[10px] sm:text-xs text-white/80 mb-1">Treinos/Semana</p>
                <p className="text-sm sm:text-base md:text-lg font-bold text-white">3 dias</p>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <p className="text-[10px] sm:text-xs text-white/80 mb-1">Nível</p>
                <p className="text-sm sm:text-base md:text-lg font-bold text-white">Progressivo</p>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <p className="text-[10px] sm:text-xs text-white/80 mb-1">Equipamento</p>
                <p className="text-sm sm:text-base md:text-lg font-bold text-white">Peso Corporal</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visão Geral do Mês */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0" />
              <div className="min-w-0">
                <CardTitle className="text-base sm:text-lg md:text-xl truncate">Visão Geral do Programa</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Progressão estruturada</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              {monthlyPlan.map((week) => (
                <Card 
                  key={week.week}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedWeek === week.week 
                      ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                  onClick={() => setSelectedWeek(selectedWeek === week.week ? null : week.week)}
                >
                  <CardHeader className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-base sm:text-lg">{week.week}</span>
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="text-sm sm:text-base md:text-lg truncate">{week.title}</CardTitle>
                          <Badge variant="outline" className="mt-1 text-[10px] sm:text-xs">
                            <Target className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            <span className="truncate">{week.goal}</span>
                          </Badge>
                        </div>
                      </div>
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-2">
                      {week.description}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500">
                      <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{week.days.length} treinos na semana</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detalhes das Semanas */}
        {monthlyPlan.map((week) => (
          <div key={week.week} className={selectedWeek !== null && selectedWeek !== week.week ? 'hidden' : ''}>
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg sm:text-2xl">{week.week}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl truncate">{week.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base mt-1 line-clamp-2">
                      {week.description}
                    </CardDescription>
                    <Badge variant="secondary" className="mt-2 text-[10px] sm:text-xs">
                      <Target className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                      <span className="truncate">{week.goal}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  {week.days.map((day, dayIndex) => (
                    <Card key={dayIndex} className="border-2 border-purple-100 dark:border-purple-900/30">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-3 sm:p-4 md:p-6">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="min-w-0">
                              <CardTitle className="text-base sm:text-lg md:text-xl truncate">{day.day}</CardTitle>
                              <CardDescription className="text-xs sm:text-sm md:text-base truncate">
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
          </div>
        ))}

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
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                    <span className="break-words"><strong>Aquecimento e alongamento:</strong> Nunca pule essas etapas essenciais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                    <span className="break-words"><strong>Registre seu progresso:</strong> Anote seus treinos e comemore conquistas</span>
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
