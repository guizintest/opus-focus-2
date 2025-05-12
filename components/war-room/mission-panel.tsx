"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, Star, Trophy, Flag, Clock } from "lucide-react"

interface Mission {
  id: string
  title: string
  description: string
  type: string
  reward: string
  reward_amount: number
  completed: boolean
}

interface MissionPanelProps {
  missions: Mission[]
  onMissionClick: (missionId: string) => void
}

export function MissionPanel({ missions, onMissionClick }: MissionPanelProps) {
  const [filter, setFilter] = useState<"all" | "main" | "side">("all")

  // Filtrar missões com base no filtro selecionado
  const filteredMissions = missions.filter((mission) => {
    if (filter === "all") return true
    if (filter === "main") return mission.type === "main" || mission.type === "special"
    if (filter === "side") return mission.type === "daily" || mission.type === "side"
    return true
  })

  // Obter ícone com base no tipo de missão
  const getMissionIcon = (type: string) => {
    switch (type) {
      case "main":
        return <Flag className="h-5 w-5 text-red-400" />
      case "special":
        return <Star className="h-5 w-5 text-yellow-400" />
      case "daily":
        return <Clock className="h-5 w-5 text-blue-400" />
      case "side":
      default:
        return <Trophy className="h-5 w-5 text-green-400" />
    }
  }

  // Obter cor do texto com base no tipo de missão
  const getMissionTextColor = (type: string) => {
    switch (type) {
      case "main":
        return "text-red-400"
      case "special":
        return "text-yellow-400"
      case "daily":
        return "text-blue-400"
      case "side":
      default:
        return "text-green-400"
    }
  }

  // Obter texto do tipo de missão
  const getMissionTypeText = (type: string) => {
    switch (type) {
      case "main":
        return "Principal"
      case "special":
        return "Especial"
      case "daily":
        return "Diária"
      case "side":
        return "Secundária"
      default:
        return type
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-aoe-border">
        <h3 className="text-aoe-gold font-cinzel">Missões</h3>
      </div>

      {/* Filtros */}
      <div className="flex border-b border-aoe-border">
        <button
          className={`flex-1 py-2 text-sm ${
            filter === "all" ? "text-aoe-gold border-b-2 border-aoe-gold" : "text-aoe-muted hover:text-aoe-light"
          }`}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          className={`flex-1 py-2 text-sm ${
            filter === "main" ? "text-aoe-gold border-b-2 border-aoe-gold" : "text-aoe-muted hover:text-aoe-light"
          }`}
          onClick={() => setFilter("main")}
        >
          Principais
        </button>
        <button
          className={`flex-1 py-2 text-sm ${
            filter === "side" ? "text-aoe-gold border-b-2 border-aoe-gold" : "text-aoe-muted hover:text-aoe-light"
          }`}
          onClick={() => setFilter("side")}
        >
          Secundárias
        </button>
      </div>

      {/* Lista de missões */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {filteredMissions.length > 0 ? (
            filteredMissions.map((mission) => (
              <div
                key={mission.id}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  mission.completed
                    ? "bg-aoe-dark-blue/50 border-aoe-border"
                    : "bg-aoe-dark-blue border-aoe-border hover:border-aoe-gold"
                }`}
                onClick={() => onMissionClick(mission.id)}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">{getMissionIcon(mission.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-aoe-light font-medium">{mission.title}</h4>
                      {mission.completed && <CheckCircle className="h-4 w-4 text-green-500 ml-2" />}
                    </div>
                    <p className="text-xs text-aoe-muted mt-1">{mission.description}</p>
                    <div className="flex justify-between mt-2">
                      <span className={`text-xs ${getMissionTextColor(mission.type)}`}>
                        {getMissionTypeText(mission.type)}
                      </span>
                      <span className="text-xs text-aoe-gold">
                        +{mission.reward_amount} {mission.reward === "focus" ? "Foco" : "Recreação"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-aoe-muted">
              <p>Nenhuma missão encontrada</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
