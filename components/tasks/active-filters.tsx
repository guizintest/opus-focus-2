"use client"

import { X } from "lucide-react"
import type { TaskFilters } from "./task-filters"

interface ActiveFiltersProps {
  filters: TaskFilters
  onRemoveFilter: (filterType: keyof TaskFilters, value: string | null) => void
  onClearAllFilters: () => void
}

export function ActiveFilters({ filters, onRemoveFilter, onClearAllFilters }: ActiveFiltersProps) {
  const getFilterLabel = (filterType: keyof TaskFilters, value: string | null) => {
    switch (filterType) {
      case "types":
        switch (value) {
          case "leitura":
            return "Leitura"
          case "video":
            return "Vídeo"
          case "codigo":
            return "Código"
          case "notebook":
            return "Notebook"
          case "curso":
            return "Curso"
          default:
            return value
        }
      case "difficulties":
        switch (value) {
          case "fácil":
            return "Fácil"
          case "médio":
            return "Médio"
          case "difícil":
            return "Difícil"
          default:
            return value
        }
      case "validations":
        return value
      case "completionStatus":
        switch (value) {
          case "completed":
            return "Concluídas"
          case "incomplete":
            return "Pendentes"
          default:
            return "Todas"
        }
      default:
        return value
    }
  }

  const hasActiveFilters =
    filters.types.length > 0 ||
    filters.difficulties.length > 0 ||
    filters.validations.length > 0 ||
    filters.completionStatus !== null

  if (!hasActiveFilters) return null

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-aoe-light text-sm">Filtros ativos:</h4>
        <button onClick={onClearAllFilters} className="text-aoe-gold text-xs hover:underline">
          Limpar todos
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.types.map((type) => (
          <div
            key={`type-${type}`}
            className="bg-aoe-dark-blue text-aoe-light text-xs px-2 py-1 rounded-md flex items-center"
          >
            <span>Tipo: {getFilterLabel("types", type)}</span>
            <button onClick={() => onRemoveFilter("types", type)} className="ml-1 text-aoe-muted hover:text-aoe-light">
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        {filters.difficulties.map((difficulty) => (
          <div
            key={`difficulty-${difficulty}`}
            className="bg-aoe-dark-blue text-aoe-light text-xs px-2 py-1 rounded-md flex items-center"
          >
            <span>Dificuldade: {getFilterLabel("difficulties", difficulty)}</span>
            <button
              onClick={() => onRemoveFilter("difficulties", difficulty)}
              className="ml-1 text-aoe-muted hover:text-aoe-light"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        {filters.validations.map((validation) => (
          <div
            key={`validation-${validation}`}
            className="bg-aoe-dark-blue text-aoe-light text-xs px-2 py-1 rounded-md flex items-center"
          >
            <span>Validação: {getFilterLabel("validations", validation)}</span>
            <button
              onClick={() => onRemoveFilter("validations", validation)}
              className="ml-1 text-aoe-muted hover:text-aoe-light"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        {filters.completionStatus && (
          <div
            key="completion-status"
            className="bg-aoe-dark-blue text-aoe-light text-xs px-2 py-1 rounded-md flex items-center"
          >
            <span>Status: {getFilterLabel("completionStatus", filters.completionStatus)}</span>
            <button
              onClick={() => onRemoveFilter("completionStatus", null)}
              className="ml-1 text-aoe-muted hover:text-aoe-light"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
