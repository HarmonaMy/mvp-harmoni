"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Trash2, Lock, Crown, Plus, Calendar } from "lucide-react"

export type JournalNote = {
  id: string
  date: string
  content: string
  mood?: string
}

type JournalNotesProps = {
  notes: JournalNote[]
  onAddNote: (note: Omit<JournalNote, "id">) => void
  onDeleteNote: (id: string) => void
  isPremium: boolean
}

export function JournalNotes({ notes, onAddNote, onDeleteNote, isPremium }: JournalNotesProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newNote, setNewNote] = useState("")

  const handleSave = () => {
    if (newNote.trim()) {
      onAddNote({
        date: new Date().toISOString(),
        content: newNote.trim()
      })
      setNewNote("")
      setIsAdding(false)
    }
  }

  const freeLimit = 3
  const canAddMore = isPremium || notes.length < freeLimit

  // Ordenar notas por data (mais recente primeiro)
  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-500" />
            Área de Desabafo
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {isPremium ? (
              <span className="flex items-center gap-1">
                <Crown className="w-4 h-4 text-yellow-500" />
                Recados ilimitados (Premium)
              </span>
            ) : (
              `${notes.length}/${freeLimit} recados usados (Plano gratuito)`
            )}
          </p>
        </div>

        {canAddMore && !isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Recado
          </Button>
        )}
      </div>

      {/* Limite atingido (plano gratuito) */}
      {!canAddMore && !isAdding && (
        <Card className="border-2 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Lock className="w-8 h-8 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Limite de recados atingido</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Você atingiu o limite de {freeLimit} recados do plano gratuito. 
                  Faça upgrade para Premium e tenha recados ilimitados!
                </p>
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade para Premium
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Formulário de novo recado */}
      {isAdding && (
        <Card className="border-2 border-purple-300 dark:border-purple-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Escreva seu desabafo</CardTitle>
            <CardDescription>
              Este é um espaço seguro para expressar seus sentimentos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Como você está se sentindo hoje? O que está pensando?"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[150px] resize-none"
              autoFocus
            />
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setIsAdding(false)
                  setNewNote("")
                }}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={!newNote.trim()}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Salvar Recado
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de recados */}
      {sortedNotes.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="pt-12 pb-12 text-center">
            <MessageSquare className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Nenhum recado ainda</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Comece a escrever seus pensamentos e sentimentos
            </p>
            {canAddMore && (
              <Button
                onClick={() => setIsAdding(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Recado
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {new Date(note.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </div>
                  <Button
                    onClick={() => onDeleteNote(note.id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {note.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Info Premium */}
      {!isPremium && notes.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Crown className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Quer mais espaço para desabafar?</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Com o plano Premium, você tem recados ilimitados e pode expressar seus sentimentos sem limites.
                </p>
                <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                  Conhecer Premium
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
