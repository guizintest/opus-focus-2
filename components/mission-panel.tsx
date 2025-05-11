"use client"

import { useState } from "react"
import type { Mission } from "@/types/war-room"
import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react"

interface MissionPanelProps {
  missions: Mission[]
  onMissionClick: (missionId: string) => void
}

export function MissionPanel({ missions, onMissionClick }: MissionPanelProps) {
  const [expanded, setExpanded] = useState(true)
  const [activeTab, setActiveTab] = useState<"todas" | "principais" | "secundarias">("todas")

  const filteredMissions = missions.filter((mission) => {
    if (activeTab === "todas") return true
    if (activeTab === "principais") return mission.type === "main"
    if (activeTab === "secundarias") return mission.type === "side"
    return true
  })

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-aoe-border flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-aoe-gold text-lg font-cinzel">Missões</span>
        </div>
        <button className="text-aoe-muted hover:text-aoe-light" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {expanded && (
        <>
          <div className="flex border-b border-aoe-border">
            <button
              className={`flex-1 py-2 text-sm ${
                activeTab === "todas" ? "bg-aoe-button text-aoe-gold" : "text-aoe-muted hover:bg-aoe-panel-header"
              }`}
              onClick={() => setActiveTab("todas")}
            >
              Todas ({missions.length})
            </button>
            <button
              className={`flex-1 py-2 text-sm ${
                activeTab === "principais" ? "bg-aoe-button text-aoe-gold" : "text-aoe-muted hover:bg-aoe-panel-header"
              }`}
              onClick={() => setActiveTab("principais")}
            >
              Principais ({missions.filter((m) => m.type === "main").length})
            </button>
            <button
              className={`flex-1 py-2 text-sm ${
                activeTab === "secundarias" ? "bg-aoe-button text-aoe-gold" : "text-aoe-muted hover:bg-aoe-panel-header"
              }`}
              onClick={() => setActiveTab("secundarias")}
            >
              Secundárias ({missions.filter((m) => m.type === "side").length})
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredMissions.map((mission) => (
              <div
                key={mission.id}
                className="p-3 border-b border-aoe-border hover:bg-aoe-panel-header cursor-pointer"
                onClick={() => onMissionClick(mission.id)}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-1">
                    {mission.type === "main" ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-aoe-muted flex items-center justify-center">
                        <div
                          className={`h-2 w-2 rounded-full ${mission.completed ? "bg-green-500" : "bg-aoe-muted"}`}
                        ></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-medium ${mission.type === "main" ? "text-aoe-gold" : "text-aoe-light"}`}>
                      {mission.title}
                    </h3>
                    <p className="text-xs text-aoe-muted mt-1">{mission.description}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-aoe-muted mr-2">Recompensa:</span>
                      <span className="text-xs text-aoe-gold">{mission.reward}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-aoe-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-aoe-muted">Progresso da Conquista</span>
              <span className="text-sm text-aoe-gold">0/4</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
