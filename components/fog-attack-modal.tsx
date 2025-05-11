"use client"

import { useState, useEffect } from "react"
import type { Territory, FogAttack } from "@/types/war-room"
import { AoE4Panel } from "./aoe4-panel"
import { AoE4Button } from "./aoe4-button"
import { AlertTriangle, Clock, Brain, Coffee } from "lucide-react"

interface FogAttackModalProps {
  attack: FogAttack
  territory: Territory
  onDefend: (territoryId: string) => void
  resources: {
    focus: number
    recreation: number
    mood: number
    dayProgress: number
  }
}

export function FogAttackModal({ attack, territory, onDefend, resources }: FogAttackModalProps) {
  const [timeLeft, setTimeLeft] = useState(attack.timeRemaining)
  const [defenseOption, setDefenseOption] = useState<"focus" | "recreation" | null>(null)

  useEffect(() => {
    if (timeLeft <= 0) {
      // Tempo esgotado, território perdido
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressPercentage = () => {
    return (timeLeft / attack.timeRemaining) * 100
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <AoE4Panel className="w-full max-w-md">
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <AlertTriangle className="h-8 w-8 text-purple-500 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-aoe-gold font-cinzel">Ataque da Névoa!</h2>
          <p className="text-aoe-muted mt-2">
            A Névoa da Distração está atacando seu território. Defenda-o antes que seja tarde demais!
          </p>
        </div>

        <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-aoe-gold font-medium">{territory.name}</h3>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-red-400 mr-1" />
              <span className="text-red-400">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="w-full h-2 bg-aoe-panel rounded-full overflow-hidden mb-4">
            <div className="h-full bg-red-500" style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>
          <p className="text-sm text-aoe-muted">{territory.description}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-aoe-light font-medium mb-2">Escolha como defender:</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`p-3 border rounded-md flex flex-col items-center ${
                defenseOption === "focus"
                  ? "border-blue-500 bg-blue-900/20"
                  : "border-aoe-border bg-aoe-dark-blue hover:bg-aoe-panel-header"
              }`}
              onClick={() => setDefenseOption("focus")}
              disabled={resources.focus < 10}
            >
              <Brain className="h-6 w-6 text-blue-400 mb-2" />
              <span className="text-aoe-light font-medium">Usar Foco</span>
              <span className="text-xs text-aoe-muted mt-1">Custo: 10 Foco</span>
            </button>
            <button
              className={`p-3 border rounded-md flex flex-col items-center ${
                defenseOption === "recreation"
                  ? "border-green-500 bg-green-900/20"
                  : "border-aoe-border bg-aoe-dark-blue hover:bg-aoe-panel-header"
              }`}
              onClick={() => setDefenseOption("recreation")}
              disabled={resources.recreation < 5}
            >
              <Coffee className="h-6 w-6 text-green-400 mb-2" />
              <span className="text-aoe-light font-medium">Usar Recreação</span>
              <span className="text-xs text-aoe-muted mt-1">Custo: 5 Recreação</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <AoE4Button
            variant="secondary"
            onClick={() => {
              // Abandonar território
            }}
          >
            Abandonar Território
          </AoE4Button>
          <AoE4Button disabled={!defenseOption} onClick={() => onDefend(territory.id)}>
            Defender
          </AoE4Button>
        </div>
      </AoE4Panel>
    </div>
  )
}
