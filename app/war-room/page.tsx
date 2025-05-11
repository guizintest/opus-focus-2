"use client"

import { useState, useEffect } from "react"
import { ResourceBar } from "@/components/resource-bar"
import { WarRoomMap } from "@/components/war-room-map"
import { MissionPanel } from "@/components/mission-panel"
import { TaskDetails } from "@/components/task-details"
import { EventLog } from "@/components/event-log"
import { FogAttackModal } from "@/components/fog-attack-modal"
import { VictoryModal } from "@/components/victory-modal"
import { TopMenu } from "@/components/top-menu"
import type { Territory, Mission, FogAttack } from "@/types/war-room"
import { AmbientSounds } from "@/components/ambient-sounds"
import { exampleTerritories, exampleMissions } from "@/data/war-room-data"

export default function WarRoomPage() {
  const [territories, setTerritories] = useState<Territory[]>(exampleTerritories)
  const [missions, setMissions] = useState<Mission[]>(exampleMissions)
  const [selectedTerritory, setSelectedTerritory] = useState<string | undefined>("t1")
  const [resources, setResources] = useState({
    focus: 80,
    recreation: 50,
    mood: 70,
    dayProgress: 10,
  })
  const [activeFogAttack, setActiveFogAttack] = useState<FogAttack | null>(null)
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)

  const selectedTerritoryData = territories.find((t) => t.id === selectedTerritory)

  const handleSelectTerritory = (territoryId: string) => {
    setSelectedTerritory(territoryId)
  }

  const handleStartTask = (territoryId: string) => {
    // Lógica para iniciar uma tarefa/conquistar território
    const updatedTerritories = territories.map((territory) => {
      if (territory.id === territoryId) {
        return { ...territory, owner: "player" }
      }
      return territory
    })
    setTerritories(updatedTerritories)
  }

  const handleDefend = (territoryId: string) => {
    // Lógica para defender um território contra a névoa
    setActiveFogAttack(null)
    setResources((prev) => ({
      ...prev,
      focus: Math.max(0, prev.focus - 10),
      recreation: Math.max(0, prev.recreation - 5),
    }))
  }

  // Simular um ataque de névoa após 30 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      const playerTerritories = territories.filter((t) => t.owner === "player")
      if (playerTerritories.length > 0) {
        const randomIndex = Math.floor(Math.random() * playerTerritories.length)
        setActiveFogAttack({
          territoryId: playerTerritories[randomIndex].id,
          timeRemaining: 60, // 60 segundos para defender
        })
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [territories])

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-aoe-dark-blue -m-4">
      <TopMenu activeItem="mapa-do-dia" />

      <div>
        <ResourceBar
          focus={resources.focus}
          recreation={resources.recreation}
          mood={resources.mood}
          dayProgress={resources.dayProgress}
        />

        <div className="flex h-[calc(100vh-116px)]">
          {/* Painel lateral esquerdo - Missões */}
          <div className="w-64 border-r border-aoe-border bg-aoe-panel">
            <MissionPanel missions={missions} onMissionClick={(missionId) => {}} />
          </div>

          {/* Mapa central */}
          <div className="flex-1 relative">
            <WarRoomMap
              territories={territories}
              selectedTerritory={selectedTerritory}
              activeFogAttack={activeFogAttack}
              onSelectTerritory={handleSelectTerritory}
              onStartTask={handleStartTask}
            />
            <div className="absolute top-4 right-4 z-10">{audioEnabled && <AmbientSounds scene="warRoom" />}</div>
          </div>

          {/* Painel lateral direito - Detalhes e Log */}
          <div className="w-80 border-l border-aoe-border flex flex-col bg-aoe-panel">
            {/* Detalhes do território selecionado */}
            <div className="h-1/2 border-b border-aoe-border">
              {selectedTerritoryData ? (
                <TaskDetails
                  territory={selectedTerritoryData}
                  onStartTask={() => handleStartTask(selectedTerritoryData.id)}
                />
              ) : (
                <div className="p-4 text-aoe-muted">Selecione um território no mapa</div>
              )}
            </div>

            {/* Log de eventos */}
            <div className="h-1/2">
              <EventLog />
            </div>
          </div>
        </div>
      </div>

      {/* Modais */}
      {activeFogAttack && (
        <FogAttackModal
          attack={activeFogAttack}
          territory={territories.find((t) => t.id === activeFogAttack.territoryId)!}
          onDefend={handleDefend}
          resources={resources}
        />
      )}
      {showVictoryModal && (
        <VictoryModal
          resources={resources}
          completedMissions={missions.filter((m) => m.completed).length}
          totalMissions={missions.length}
          onClose={() => setShowVictoryModal(false)}
        />
      )}
    </div>
  )
}
