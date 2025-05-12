"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, Star, Trophy, Clock } from "lucide-react"

export function SimpleMissionPanel() {
  const [filter, setFilter] = useState<"all" | "main" | "side">("all")

  // Dados de exemplo
  const missions = [
    {
      id: "mission1",
      title: "Completar 3 tarefas",
      description: "Complete 3 tarefas para ganhar pontos de foco extras",
      type: "daily",
      reward: "focus",
      reward_amount: 20,
      completed: false,
    },
    {
      id: "mission2",
      title: "Conquistar um hexágono difícil",
      description: "Conquiste um hexágono difícil para ganhar pontos de recreação",
      type: "daily",
      reward: "recreation",
      reward_amount: 15,
      completed: false,
    },
    {
      id: "mission3",
      title: "Completar o mapa",
      description: "Conquiste todos os hexágonos para completar o mapa",
      type: "special",
      reward: "focus",
      reward_amount: 50,
      completed: false,
    },
  ]

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
      case "special":
        return <Star className="h-5 w-5 text-yellow-400" />
      case "daily":
        return <Clock className="h-5 w-5 text-blue-400" />
      default:
        return <Trophy className="h-5 w-5 text-green-400" />
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
          {filteredMissions.map((mission) => (
            <div
              key={mission.id}
              className="p-3 border rounded-md cursor-pointer transition-colors bg-aoe-dark-blue border-aoe-border hover:border-aoe-gold"
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
                    <span className="text-xs text-blue-400">{mission.type === "special" ? "Especial" : "Diária"}</span>
                    <span className="text-xs text-aoe-gold">
                      +{mission.reward_amount} {mission.reward === "focus" ? "Foco" : "Recreação"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
