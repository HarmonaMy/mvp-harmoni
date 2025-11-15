"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Scale, Ruler, Droplets, Utensils, Activity, Save, X } from "lucide-react"

export type HealthProfile = {
  weight: number // kg
  height: number // cm
  age: number
  gender: "male" | "female" | "other"
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active"
}

type HealthProfileEditorProps = {
  onSave: (profile: HealthProfile) => void
  onCancel: () => void
  initialProfile?: HealthProfile
}

export function HealthProfileEditor({ onSave, onCancel, initialProfile }: HealthProfileEditorProps) {
  const [profile, setProfile] = useState<HealthProfile>(
    initialProfile || {
      weight: 70,
      height: 170,
      age: 30,
      gender: "other",
      activityLevel: "moderate"
    }
  )

  // Calcular IMC
  const calculateBMI = () => {
    const heightInMeters = profile.height / 100
    return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  // Calcular TMB (Taxa Metabólica Basal) - Fórmula de Harris-Benedict
  const calculateBMR = () => {
    if (profile.gender === "male") {
      return 88.362 + (13.397 * profile.weight) + (4.799 * profile.height) - (5.677 * profile.age)
    } else if (profile.gender === "female") {
      return 447.593 + (9.247 * profile.weight) + (3.098 * profile.height) - (4.330 * profile.age)
    }
    // Média para "other"
    return ((88.362 + (13.397 * profile.weight) + (4.799 * profile.height) - (5.677 * profile.age)) +
            (447.593 + (9.247 * profile.weight) + (3.098 * profile.height) - (4.330 * profile.age))) / 2
  }

  // Calcular calorias diárias necessárias
  const calculateDailyCalories = () => {
    const bmr = calculateBMR()
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9
    }
    return Math.round(bmr * multipliers[profile.activityLevel])
  }

  // Calcular água recomendada (ml)
  const calculateWaterIntake = () => {
    return Math.round(profile.weight * 35) // 35ml por kg
  }

  // Calcular proteína recomendada (g)
  const calculateProteinIntake = () => {
    const multipliers = {
      sedentary: 0.8,
      light: 1.0,
      moderate: 1.2,
      active: 1.6,
      "very-active": 2.0
    }
    return Math.round(profile.weight * multipliers[profile.activityLevel])
  }

  const bmi = calculateBMI()
  const dailyCalories = calculateDailyCalories()
  const waterIntake = calculateWaterIntake()
  const proteinIntake = calculateProteinIntake()

  // Classificação IMC
  const getBMICategory = () => {
    const bmiValue = parseFloat(bmi)
    if (bmiValue < 18.5) return { text: "Abaixo do peso", color: "text-blue-600" }
    if (bmiValue < 25) return { text: "Peso normal", color: "text-green-600" }
    if (bmiValue < 30) return { text: "Sobrepeso", color: "text-yellow-600" }
    return { text: "Obesidade", color: "text-red-600" }
  }

  const bmiCategory = getBMICategory()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl border-0 shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Perfil de Saúde</CardTitle>
              <CardDescription>Configure seus dados para recomendações personalizadas</CardDescription>
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

        <CardContent className="space-y-6">
          {/* Dados Básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-500" />
                Peso (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) || 0 })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-blue-500" />
                Altura (cm)
              </Label>
              <Input
                id="height"
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: parseFloat(e.target.value) || 0 })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Idade</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Sexo</Label>
              <select
                id="gender"
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                className="w-full h-12 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950"
              >
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="activity">Nível de Atividade</Label>
              <select
                id="activity"
                value={profile.activityLevel}
                onChange={(e) => setProfile({ ...profile, activityLevel: e.target.value as any })}
                className="w-full h-12 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950"
              >
                <option value="sedentary">Sedentário (pouco ou nenhum exercício)</option>
                <option value="light">Leve (exercício 1-3 dias/semana)</option>
                <option value="moderate">Moderado (exercício 3-5 dias/semana)</option>
                <option value="active">Ativo (exercício 6-7 dias/semana)</option>
                <option value="very-active">Muito Ativo (exercício intenso diariamente)</option>
              </select>
            </div>
          </div>

          {/* Resultados Calculados */}
          <div className="pt-6 border-t space-y-4">
            <h3 className="font-semibold text-lg">Suas Recomendações Personalizadas</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* IMC */}
              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <Scale className="w-8 h-8 mx-auto text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">IMC</p>
                      <p className="text-2xl font-bold">{bmi}</p>
                      <p className={`text-xs font-medium ${bmiCategory.color}`}>
                        {bmiCategory.text}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calorias */}
              <Card className="border-2 border-orange-200 dark:border-orange-800">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <Utensils className="w-8 h-8 mx-auto text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Calorias/dia</p>
                      <p className="text-2xl font-bold">{dailyCalories}</p>
                      <p className="text-xs text-gray-500">kcal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Água */}
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <Droplets className="w-8 h-8 mx-auto text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Água/dia</p>
                      <p className="text-2xl font-bold">{(waterIntake / 1000).toFixed(1)}L</p>
                      <p className="text-xs text-gray-500">{waterIntake}ml</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Proteína */}
              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <Activity className="w-8 h-8 mx-auto text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Proteína/dia</p>
                      <p className="text-2xl font-bold">{proteinIntake}g</p>
                      <p className="text-xs text-gray-500">recomendado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dicas */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  💡 <strong>Dica:</strong> Essas recomendações são calculadas com base nos seus dados. 
                  Para perder peso, crie um déficit calórico de 300-500 kcal/dia através de dieta e exercícios.
                </p>
              </CardContent>
            </Card>
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
              onClick={() => onSave(profile)}
              className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Save className="w-5 h-5 mr-2" />
              Salvar Perfil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
