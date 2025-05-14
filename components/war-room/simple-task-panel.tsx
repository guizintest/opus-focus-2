"use client"

import { Star, Clock } from "lucide-react"
import { AoE4Button } from "@/components/aoe4-button"
import type { Hexagon } from "@/types/supabase"

interface SimpleTaskPanelProps {
  selectedHex: (Hexagon & { status: string }) | null
  activeHexId: string | null
  onStartTask: (hexId: string) => void
  onCompleteTask: (hexId: string) => void
}

export function SimpleTaskPanel({ selectedHex, activeHexId, onStartTask, onCompleteTask }: SimpleTaskPanelProps) {
  if (!selectedHex) {
    return (
      <div className="p-4 text-aoe-muted flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <p>Selecione um hexágono no mapa</p>
          <p className="text-xs mt-2">Clique em um hexágono disponível para ver seus detalhes</p>
        </div>
      </div>
    )
  }

  const isActiveTask = activeHexId === selectedHex.id
  const canStartTask = selectedHex.status === "available" && !activeHexId
  const canCompleteTask = isActiveTask

  // Determinar a dificuldade em texto
  const getDifficultyText = () => {
    switch (selectedHex.difficulty) {
      case "easy":
        return "Fácil"
      case "medium":
        return "Média"
      case "hard":
        return "Difícil"
      case "reward":
        return "Recompensa"
      case "special":
        return "Especial"
      case "start":
        return "Inicial"
      default:
        return "Desconhecida"
    }
  }

  // Determinar o número de estrelas com base na dificuldade
  const getDifficultyStars = () => {
    switch (selectedHex.difficulty) {
      case "easy":
        return 1
      case "medium":
        return 3
      case "hard":
        return 5
      case "reward":
        return 2
      case "special":
        return 4
      case "start":
        return 1
      default:
        return 0
    }
  }

  return (
    <div className="flex-1 p-4 flex flex-col h-full">
      <div className="border-b border-aoe-border pb-3 mb-4">
        <h2 className="text-aoe-gold text-lg font-bold">{selectedHex.title}</h2>
        <p className="text-aoe-muted text-sm mt-2">{selectedHex.description}</p>
      </div>

      {/* Detalhes da tarefa */}
      <div className="space-y-4 flex-1">
        {/* Dificuldade */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-aoe-muted">Dificuldade:</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < getDifficultyStars() ? "text-aoe-gold" : "text-aoe-muted"}`}
                fill={i < getDifficultyStars() ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>

        {/* Tempo estimado */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-aoe-muted">Tempo estimado:</span>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-aoe-light mr-1" />
            <span className="text-sm text-aoe-light">{selectedHex.estimated_time}</span>
          </div>
        </div>

        {/* Valor */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-aoe-muted">Valor:</span>
          <span className="text-sm text-aoe-gold">+{selectedHex.points} pontos</span>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-aoe-muted">Status:</span>
          <span
            className={`text-sm ${
              selectedHex.status === "conquered"
                ? "text-green-400"
                : selectedHex.status === "available"
                  ? "text-blue-400"
                  : "text-red-400"
            }`}
          >
            {selectedHex.status === "conquered"
              ? "Conquistado"
              : selectedHex.status === "available"
                ? "Disponível"
                : "Bloqueado"}
          </span>
        </div>
      </div>

      {/* Botão de ação */}
      <div className="mt-6">
        {canStartTask ? (
          <AoE4Button className="w-full" onClick={() => onStartTask(selectedHex.id)}>
            Iniciar Tarefa
          </AoE4Button>
        ) : canCompleteTask ? (
          <AoE4Button className="w-full" onClick={() => onCompleteTask(selectedHex.id)}>
            Completar Tarefa
          </AoE4Button>
        ) : selectedHex.status === "conquered" ? (
          <AoE4Button variant="secondary" className="w-full" disabled>
            Tarefa Concluída
          </AoE4Button>
        ) : (
          <AoE4Button variant="secondary" className="w-full" disabled>
            Tarefa Bloqueada
          </AoE4Button>
        )}
      </div>
    </div>
  )
}
