"use client"

import { useState } from "react"
import { AoE4Button } from "@/components/aoe4-button"
import { Clock, Star, Shield, AlertTriangle, CheckCircle, Play, Pause } from "lucide-react"
import type { HexTileProps } from "../hex-grid/hex-tile"

interface TaskDetailsPanelProps {
  hex: Omit<HexTileProps, "onClick" | "isSelected" | "position"> | null
  onStartTask: (hexId: string) => void
  onPauseTask: () => void
  activeTaskId: string | null
  remainingFreePauses: number
  focusPoints: number
}

export function TaskDetailsPanel({
  hex,
  onStartTask,
  onPauseTask,
  activeTaskId,
  remainingFreePauses,
  focusPoints,
}: TaskDetailsPanelProps) {
  const [selectedPauseTime, setSelectedPauseTime] = useState<number | null>(null)

  if (!hex) {
    return (
      <div className="p-4 text-aoe-muted flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <p>Selecione um hexágono no mapa</p>
          <p className="text-xs mt-2">Clique em um hexágono disponível para ver seus detalhes</p>
        </div>
      </div>
    )
  }

  const isActiveTask = activeTaskId === hex.id
  const canStartTask = hex.status === "available" && !activeTaskId
  const canPauseTask = isActiveTask

  // Determinar a dificuldade em texto
  const getDifficultyText = () => {
    switch (hex.difficulty) {
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
    switch (hex.difficulty) {
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

  // Calcular o custo de uma pausa paga
  const getPauseCost = (minutes: number) => {
    return minutes * 2 // Dobro do valor normal
  }

  // Verificar se o usuário tem pontos suficientes para uma pausa
  const canAffordPause = (minutes: number) => {
    return focusPoints >= getPauseCost(minutes)
  }

  return (
    <div className="flex-1 p-4 flex flex-col h-full">
      <div className="border-b border-aoe-border pb-3 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-aoe-gold text-lg font-bold">{hex.title}</h2>
          <div className={`flex items-center ${hex.status === "conquered" ? "text-green-400" : "text-aoe-muted"}`}>
            {hex.status === "conquered" ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">Conquistado</span>
              </>
            ) : hex.status === "available" ? (
              <span className="text-sm">Disponível</span>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-sm">Bloqueado</span>
              </>
            )}
          </div>
        </div>
        <p className="text-aoe-muted text-sm mt-2">{hex.description}</p>
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
            <span className="text-sm text-aoe-light">{hex.estimatedTime || "N/A"}</span>
          </div>
        </div>

        {/* Valor */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-aoe-muted">Valor:</span>
          <span className="text-sm text-aoe-gold">+{hex.points || 0} pontos</span>
        </div>

        {/* Defesa (se for conquistado) */}
        {hex.status === "conquered" && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-aoe-muted">Defesa:</span>
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-blue-400 mr-1" />
              <span className="text-sm text-blue-400">3</span>
            </div>
          </div>
        )}
      </div>

      {/* Seção de pausas (se for tarefa ativa) */}
      {isActiveTask && (
        <div className="mt-4 border-t border-aoe-border pt-4">
          <h3 className="text-aoe-light text-sm font-medium mb-2">Pausas Disponíveis:</h3>

          {/* Pausas gratuitas */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-aoe-muted">Pausas gratuitas:</span>
            <span className="text-sm text-aoe-light">{remainingFreePauses}/2</span>
          </div>

          {/* Botão de pausa gratuita */}
          {remainingFreePauses > 0 && (
            <AoE4Button className="w-full mb-3" onClick={onPauseTask}>
              <Pause className="h-4 w-4 mr-2" />
              Pausa Gratuita (10 min)
            </AoE4Button>
          )}

          {/* Opções de pausas pagas */}
          <h4 className="text-sm text-aoe-muted mb-2">Pausas Pagas:</h4>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[5, 10, 15, 20, 25, 30].map((minutes) => (
              <button
                key={minutes}
                className={`p-2 text-xs border rounded-md ${
                  selectedPauseTime === minutes
                    ? "border-aoe-gold bg-aoe-button text-aoe-gold"
                    : "border-aoe-border bg-aoe-dark-blue text-aoe-muted"
                } ${!canAffordPause(minutes) ? "opacity-50 cursor-not-allowed" : "hover:bg-aoe-panel-header"}`}
                onClick={() => canAffordPause(minutes) && setSelectedPauseTime(minutes)}
                disabled={!canAffordPause(minutes)}
              >
                {minutes} min
                <div className="text-xs mt-1 text-aoe-gold">{getPauseCost(minutes)} pts</div>
              </button>
            ))}
          </div>

          {/* Botão para iniciar pausa paga */}
          <AoE4Button
            className="w-full"
            disabled={selectedPauseTime === null}
            onClick={() => selectedPauseTime && onPauseTask()}
          >
            <Pause className="h-4 w-4 mr-2" />
            Iniciar Pausa Paga
          </AoE4Button>
        </div>
      )}

      {/* Botão de ação */}
      {!isActiveTask && (
        <div className="mt-6">
          {canStartTask ? (
            <AoE4Button className="w-full" onClick={() => onStartTask(hex.id)}>
              <Play className="h-4 w-4 mr-2" />
              Iniciar Tarefa
            </AoE4Button>
          ) : hex.status === "conquered" ? (
            <AoE4Button variant="secondary" className="w-full" onClick={() => {}}>
              Revisar Tarefa
            </AoE4Button>
          ) : (
            <AoE4Button variant="secondary" className="w-full" disabled>
              Tarefa Bloqueada
            </AoE4Button>
          )}
        </div>
      )}
    </div>
  )
}
