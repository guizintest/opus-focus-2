"use client"

import type React from "react"

import { useState } from "react"
import { AoE4Button } from "@/components/aoe4-button"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { updateTask } from "@/lib/services/task-service"

interface Task {
  id: string
  title: string
  type: string
  difficulty: string
  points: number
  validation: string
  estimated_time?: string
}

interface EditTaskFormProps {
  task: Task
  onSuccess: () => void
  onCancel: () => void
}

export function EditTaskForm({ task, onSuccess, onCancel }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title)
  const [type, setType] = useState(task.type)
  const [difficulty, setDifficulty] = useState(task.difficulty)
  const [points, setPoints] = useState(task.points)
  const [validation, setValidation] = useState(task.validation)
  const [estimatedTime, setEstimatedTime] = useState(task.estimated_time || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate form
      if (!title.trim()) {
        throw new Error("O título da tarefa é obrigatório")
      }

      if (points <= 0) {
        throw new Error("Os pontos devem ser maiores que zero")
      }

      // Update task
      await updateTask(task.id, {
        title,
        type,
        difficulty,
        points,
        validation,
        estimated_time: estimatedTime,
      })

      setSuccess(true)
      setTimeout(() => {
        onSuccess()
      }, 1500)
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err)
      setError(err instanceof Error ? err.message : "Erro ao atualizar tarefa")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-md p-3 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-900/20 border border-green-800 rounded-md p-3 flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-green-400 text-sm">Tarefa atualizada com sucesso!</p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-aoe-light">
          Título
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-1 focus:ring-aoe-gold"
          placeholder="Título da tarefa"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="type" className="block text-sm font-medium text-aoe-light">
            Tipo
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-1 focus:ring-aoe-gold"
          >
            <option value="leitura">Leitura</option>
            <option value="video">Vídeo do YouTube</option>
            <option value="codigo">Código</option>
            <option value="notebook">NotebookLM</option>
            <option value="curso">Curso</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="difficulty" className="block text-sm font-medium text-aoe-light">
            Dificuldade
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-1 focus:ring-aoe-gold"
          >
            <option value="fácil">Fácil</option>
            <option value="médio">Médio</option>
            <option value="difícil">Difícil</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="points" className="block text-sm font-medium text-aoe-light">
            Pontos
          </label>
          <input
            id="points"
            type="number"
            value={points}
            onChange={(e) => setPoints(Number.parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-1 focus:ring-aoe-gold"
            min="1"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="estimatedTime" className="block text-sm font-medium text-aoe-light">
            Tempo Estimado
          </label>
          <input
            id="estimatedTime"
            type="text"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            className="w-full px-3 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-1 focus:ring-aoe-gold"
            placeholder="30min"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="validation" className="block text-sm font-medium text-aoe-light">
          Método de Validação
        </label>
        <select
          id="validation"
          value={validation}
          onChange={(e) => setValidation(e.target.value)}
          className="w-full px-3 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-1 focus:ring-aoe-gold"
        >
          <option value="Quiz">Quiz</option>
          <option value="Tempo">Tempo</option>
          <option value="Nenhum">Nenhum</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <AoE4Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </AoE4Button>
        <AoE4Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar Alterações"
          )}
        </AoE4Button>
      </div>
    </form>
  )
}
