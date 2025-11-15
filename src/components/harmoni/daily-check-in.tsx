"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Smile, Frown, Meh, Activity, Brain, Moon, X, Check } from "lucide-react"
import type { DailyEntry } from "@/app/page"

type DailyCheckInProps = {
  onComplete: (entry: DailyEntry) => void
  onCancel: () => void
}

export function DailyCheckIn({ onComplete, onCancel }: DailyCheckInProps) {
  const [mood, setMood] = useState(5)
  const [energy, setEnergy] = useState(5)
  const [sleep, setSleep] = useState(5)
  const [workout, setWorkout] = useState(false)
  const [meditation, setMeditation] = useState(false)

  const handleSubmit = () => {
    const entry: DailyEntry = {
      date: new Date().toISOString().split("T")[0],
      mood,
      energy,
      sleep,
      workout,
      meditation
    }
    onComplete(entry)
  }

  const getMoodIcon = () => {
    if (mood <= 3) return <Frown className="w-8 h-8 text-red-500" />
    if (mood <= 7) return <Meh className="w-8 h-8 text-yellow-500" />
    return <Smile className="w-8 h-8 text-green-500" />
  }

  const getMoodColor = () => {
    if (mood <= 3) return "from-red-400 to-orange-500"
    if (mood <= 7) return "from-yellow-400 to-orange-500"
    return "from-green-400 to-emerald-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-2xl">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getMoodColor()} flex items-center justify-center`}>
                {getMoodIcon()}
              </div>
              <div>
                <CardTitle className="text-2xl">Check-in Diário</CardTitle>
                <CardDescription>Como você está se sentindo hoje?</CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Humor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-base">
                <Brain className="w-5 h-5 text-blue-500" />
                Como está seu humor?
              </Label>
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                {mood}/10
              </span>
            </div>
            <Slider
              value={[mood]}
              onValueChange={([value]) => setMood(value)}
              min={1}
              max={10}
              step={1}
              className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-500 [&_[role=slider]]:to-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Muito baixo</span>
              <span>Excelente</span>
            </div>
          </div>

          {/* Energia */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-base">
                <Activity className="w-5 h-5 text-orange-500" />
                Qual seu nível de energia?
              </Label>
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                {energy}/10
              </span>
            </div>
            <Slider
              value={[energy]}
              onValueChange={([value]) => setEnergy(value)}
              min={1}
              max={10}
              step={1}
              className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-orange-500 [&_[role=slider]]:to-pink-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Esgotado</span>
              <span>Energizado</span>
            </div>
          </div>

          {/* Sono */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-base">
                <Moon className="w-5 h-5 text-indigo-500" />
                Como foi seu sono?
              </Label>
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                {sleep}/10
              </span>
            </div>
            <Slider
              value={[sleep]}
              onValueChange={([value]) => setSleep(value)}
              min={1}
              max={10}
              step={1}
              className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-indigo-500 [&_[role=slider]]:to-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Péssimo</span>
              <span>Revigorante</span>
            </div>
          </div>

          {/* Atividades */}
          <div className="space-y-4 pt-4 border-t">
            <Label className="text-base font-semibold">Atividades de hoje</Label>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Treino físico</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Fez exercícios hoje?</p>
                </div>
              </div>
              <Switch
                checked={workout}
                onCheckedChange={setWorkout}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-pink-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Meditação</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Praticou mindfulness?</p>
                </div>
              </div>
              <Switch
                checked={meditation}
                onCheckedChange={setMeditation}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1 h-12"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Check className="w-5 h-5 mr-2" />
              Salvar Check-in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
