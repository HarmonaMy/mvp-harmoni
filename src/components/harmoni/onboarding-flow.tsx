"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Activity, Brain, Moon, ArrowRight, Check } from "lucide-react"
import type { UserProfile } from "@/app/page"

type OnboardingFlowProps = {
  onComplete: (profile: UserProfile) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [goals, setGoals] = useState({
    energy: 5,
    focus: 5,
    sleep: 5
  })
  const [preferences, setPreferences] = useState<string[]>([])

  const preferenceOptions = [
    { id: "yoga", label: "Yoga" },
    { id: "cardio", label: "Cardio" },
    { id: "strength", label: "Musculação" },
    { id: "meditation", label: "Meditação" }
  ]

  const handlePreferenceToggle = (id: string) => {
    setPreferences(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    )
  }

  const handleComplete = () => {
    onComplete({
      name,
      goals,
      preferences
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Bem-vindo ao Harmoni
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Vamos criar seu plano personalizado de bem-estar
            </CardDescription>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step 
                    ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500" 
                    : s < step
                    ? "w-2 bg-purple-300"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Nome */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Como podemos te chamar?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vamos personalizar sua experiência
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Seu nome</Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg h-12"
                  autoFocus
                />
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-base"
              >
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Objetivos */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Quais são seus objetivos?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ajuste os níveis de acordo com suas prioridades
                </p>
              </div>

              <div className="space-y-8">
                {/* Energia */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-base">
                      <Activity className="w-5 h-5 text-orange-500" />
                      Aumentar Energia
                    </Label>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {goals.energy}/10
                    </span>
                  </div>
                  <Slider
                    value={[goals.energy]}
                    onValueChange={([value]) => setGoals(prev => ({ ...prev, energy: value }))}
                    min={1}
                    max={10}
                    step={1}
                    className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-orange-500 [&_[role=slider]]:to-pink-500"
                  />
                </div>

                {/* Foco */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-base">
                      <Brain className="w-5 h-5 text-blue-500" />
                      Melhorar Foco
                    </Label>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {goals.focus}/10
                    </span>
                  </div>
                  <Slider
                    value={[goals.focus]}
                    onValueChange={([value]) => setGoals(prev => ({ ...prev, focus: value }))}
                    min={1}
                    max={10}
                    step={1}
                    className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-500 [&_[role=slider]]:to-purple-500"
                  />
                </div>

                {/* Sono */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-base">
                      <Moon className="w-5 h-5 text-indigo-500" />
                      Qualidade do Sono
                    </Label>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {goals.sleep}/10
                    </span>
                  </div>
                  <Slider
                    value={[goals.sleep]}
                    onValueChange={([value]) => setGoals(prev => ({ ...prev, sleep: value }))}
                    min={1}
                    max={10}
                    step={1}
                    className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-indigo-500 [&_[role=slider]]:to-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Preferências */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">O que você gosta de fazer?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Selecione suas atividades favoritas
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {preferenceOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      preferences.includes(option.id)
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() => handlePreferenceToggle(option.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <Checkbox
                        checked={preferences.includes(option.id)}
                        onCheckedChange={() => handlePreferenceToggle(option.id)}
                        className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                      />
                      <span className="font-medium">{option.label}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={preferences.length === 0}
                  className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Começar Jornada
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
