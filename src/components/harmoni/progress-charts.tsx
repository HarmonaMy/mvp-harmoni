"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Activity, Brain, Moon, TrendingUp } from "lucide-react"
import type { DailyEntry } from "@/app/page"

type ProgressChartsProps = {
  entries: DailyEntry[]
}

export function ProgressCharts({ entries }: ProgressChartsProps) {
  // Preparar dados para os gráficos (últimos 14 dias)
  const chartData = entries.slice(-14).map(entry => ({
    date: new Date(entry.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
    humor: entry.mood,
    energia: entry.energy,
    sono: entry.sleep
  }))

  // Dados de atividades
  const activityData = entries.slice(-14).map(entry => ({
    date: new Date(entry.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
    treino: entry.workout ? 1 : 0,
    meditacao: entry.meditation ? 1 : 0
  }))

  // Calcular estatísticas
  const calculateStats = () => {
    if (entries.length === 0) return { avgMood: 0, avgEnergy: 0, avgSleep: 0, totalWorkouts: 0, totalMeditations: 0 }
    
    const recent = entries.slice(-7)
    const avgMood = Math.round((recent.reduce((acc, e) => acc + e.mood, 0) / recent.length) * 10)
    const avgEnergy = Math.round((recent.reduce((acc, e) => acc + e.energy, 0) / recent.length) * 10)
    const avgSleep = Math.round((recent.reduce((acc, e) => acc + e.sleep, 0) / recent.length) * 10)
    const totalWorkouts = entries.filter(e => e.workout).length
    const totalMeditations = entries.filter(e => e.meditation).length
    
    return { avgMood, avgEnergy, avgSleep, totalWorkouts, totalMeditations }
  }

  const stats = calculateStats()

  if (entries.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Comece sua jornada</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Faça seu primeiro check-in diário para começar a acompanhar seu progresso
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-blue-500" />
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Humor Médio</p>
            </div>
            <p className="text-2xl font-bold">{stats.avgMood}%</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-orange-500" />
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Energia Média</p>
            </div>
            <p className="text-2xl font-bold">{stats.avgEnergy}%</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-4 h-4 text-indigo-500" />
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Sono Médio</p>
            </div>
            <p className="text-2xl font-bold">{stats.avgSleep}%</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-green-500" />
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Treinos</p>
            </div>
            <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Meditações</p>
            </div>
            <p className="text-2xl font-bold">{stats.totalMeditations}</p>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart - Evolução */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Evolução do Bem-estar</CardTitle>
          <CardDescription>Acompanhe suas métricas ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tick={{ fill: "currentColor" }}
              />
              <YAxis 
                domain={[0, 10]}
                className="text-xs"
                tick={{ fill: "currentColor" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="humor" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                name="Humor"
              />
              <Line 
                type="monotone" 
                dataKey="energia" 
                stroke="#f97316" 
                strokeWidth={2}
                dot={{ fill: "#f97316", r: 4 }}
                name="Energia"
              />
              <Line 
                type="monotone" 
                dataKey="sono" 
                stroke="#6366f1" 
                strokeWidth={2}
                dot={{ fill: "#6366f1", r: 4 }}
                name="Sono"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart - Atividades */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Atividades Realizadas</CardTitle>
          <CardDescription>Frequência de treinos e meditações</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tick={{ fill: "currentColor" }}
              />
              <YAxis 
                domain={[0, 1]}
                ticks={[0, 1]}
                className="text-xs"
                tick={{ fill: "currentColor" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value: number) => value === 1 ? "Sim" : "Não"}
              />
              <Legend />
              <Bar 
                dataKey="treino" 
                fill="#f97316" 
                radius={[8, 8, 0, 0]}
                name="Treino"
              />
              <Bar 
                dataKey="meditacao" 
                fill="#8b5cf6" 
                radius={[8, 8, 0, 0]}
                name="Meditação"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
