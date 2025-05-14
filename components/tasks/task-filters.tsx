"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { AoE4Button } from "@/components/aoe4-button"

export interface TaskFilters {
  types: string[]
  difficulties: string[]
  validations: string[]
  completionStatus: string | null // Add completion status filter
}

interface TaskFiltersProps {
  onApplyFilters: (filters: TaskFilters) => void
  onClose: () => void
  initialFilters?: TaskFilters
}

export function TaskFilters({ onApplyFilters, onClose, initialFilters }: TaskFiltersProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialFilters?.types || [])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(initialFilters?.difficulties || [])
  const [selectedValidations, setSelectedValidations] = useState<string[]>(initialFilters?.validations || [])
  const [completionStatus, setCompletionStatus] = useState<string | null>(initialFilters?.completionStatus || null)

  const typeOptions = [
    { value: "leitura", label: "Leitura" },
    { value: "video", label: "Vídeo" },
    { value: "codigo", label: "Código" },
    { value: "notebook", label: "Notebook" },
    { value: "curso", label: "Curso" },
  ]

  const difficultyOptions = [
    { value: "fácil", label: "Fácil" },
    { value: "médio", label: "Médio" },
    { value: "difícil", label: "Difícil" },
  ]

  const validationOptions = [
    { value: "Quiz", label: "Quiz" },
    { value: "Tempo", label: "Tempo" },
    { value: "Nenhum", label: "Nenhum" },
  ]

  const completionOptions = [
    { value: "completed", label: "Concluídas" },
    { value: "incomplete", label: "Pendentes" },
    { value: null, label: "Todas" },
  ]

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    )
  }

  const toggleValidation = (validation: string) => {
    setSelectedValidations((prev) =>
      prev.includes(validation) ? prev.filter((v) => v !== validation) : [...prev, validation],
    )
  }

  const handleApplyFilters = () => {
    onApplyFilters({
      types: selectedTypes,
      difficulties: selectedDifficulties,
      validations: selectedValidations,
      completionStatus,
    })
  }

  const handleClearFilters = () => {
    setSelectedTypes([])
    setSelectedDifficulties([])
    setSelectedValidations([])
    setCompletionStatus(null)
  }

  return (
    <div className="bg-aoe-panel border border-aoe-border rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-aoe-gold font-cinzel">Filtrar Tarefas</h3>
        <button onClick={onClose} className="text-aoe-muted hover:text-aoe-light">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Completion status filters */}
        <div>
          <h4 className="text-aoe-light font-medium mb-2">Status</h4>
          <div className="flex flex-wrap gap-2">
            {completionOptions.map((option) => (
              <button
                key={option.value || "all"}
                onClick={() => setCompletionStatus(option.value)}
                className={`px-3 py-1 rounded-md text-sm ${
                  completionStatus === option.value
                    ? "bg-aoe-gold text-aoe-dark-blue"
                    : "bg-aoe-dark-blue text-aoe-light hover:bg-aoe-button"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type filters */}
        <div>
          <h4 className="text-aoe-light font-medium mb-2">Tipo</h4>
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleType(option.value)}
                className={`px-3 py-1 rounded-md text-sm ${
                  selectedTypes.includes(option.value)
                    ? "bg-aoe-gold text-aoe-dark-blue"
                    : "bg-aoe-dark-blue text-aoe-light hover:bg-aoe-button"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty filters */}
        <div>
          <h4 className="text-aoe-light font-medium mb-2">Dificuldade</h4>
          <div className="flex flex-wrap gap-2">
            {difficultyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleDifficulty(option.value)}
                className={`px-3 py-1 rounded-md text-sm ${
                  selectedDifficulties.includes(option.value)
                    ? "bg-aoe-gold text-aoe-dark-blue"
                    : "bg-aoe-dark-blue text-aoe-light hover:bg-aoe-button"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Validation filters */}
        <div>
          <h4 className="text-aoe-light font-medium mb-2">Validação</h4>
          <div className="flex flex-wrap gap-2">
            {validationOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleValidation(option.value)}
                className={`px-3 py-1 rounded-md text-sm ${
                  selectedValidations.includes(option.value)
                    ? "bg-aoe-gold text-aoe-dark-blue"
                    : "bg-aoe-dark-blue text-aoe-light hover:bg-aoe-button"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <AoE4Button variant="secondary" onClick={handleClearFilters}>
          Limpar Filtros
        </AoE4Button>
        <AoE4Button onClick={handleApplyFilters}>Aplicar Filtros</AoE4Button>
      </div>
    </div>
  )
}
