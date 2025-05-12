"use client"

import { useState, useEffect } from "react"
import { TopMenu } from "@/components/top-menu"
import { ResourceBar } from "@/components/resource-bar"
import { SimpleMissionPanel } from "@/components/war-room/simple-mission-panel"
import { SimpleHexGrid } from "@/components/war-room/simple-hex-grid"
import { SimpleTaskPanel } from "@/components/war-room/simple-task-panel"
import { EventLog } from "@/components/event-log"
import { AoE4Button } from "@/components/aoe4-button"
import { Loader2 } from "lucide-react"

export default function WarRoomPage() {
  const [loading, setLoading] = useState(true)
  const [selectedHexId, setSelectedHexId] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState({
    focus_points: 100,
    recreation_points: 30,
    current_mood: "normal" as "good" | "normal" | "bad",
  })

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleMoodChange = (mood: "good" | "normal" | "bad") => {
    setUserProfile((prev) => ({ ...prev, current_mood: mood }))
  }

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-aoe-dark-blue items-center justify-center">
        <Loader2 className="h-12 w-12 text-aoe-gold animate-spin mb-4" />
        <p className="text-aoe-light text-lg">Carregando Mapa do Dia...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-aoe-dark-blue">
      <TopMenu activeItem="mapa-do-dia" />

      <ResourceBar
        focus={userProfile.focus_points}
        recreation={userProfile.recreation_points}
        mood={userProfile.current_mood}
        dayProgress={40}
        onMoodChange={handleMoodChange}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Painel de missões */}
        <div className="w-64 border-r border-aoe-border bg-aoe-panel">
          <SimpleMissionPanel />
        </div>

        {/* Área central - Mapa */}
        <div className="flex-1 relative">
          <SimpleHexGrid onSelectHex={setSelectedHexId} selectedHexId={selectedHexId} />

          <div className="absolute bottom-4 left-4">
            <AoE4Button>Iniciar Recreação (30 min)</AoE4Button>
          </div>
        </div>

        {/* Painel lateral direito */}
        <div className="w-80 border-l border-aoe-border flex flex-col bg-aoe-panel">
          {/* Detalhes da tarefa */}
          <div className="h-1/2 border-b border-aoe-border">
            <SimpleTaskPanel selectedHexId={selectedHexId} />
          </div>

          {/* Log de eventos */}
          <div className="h-1/2">
            <EventLog />
          </div>
        </div>
      </div>
    </div>
  )
}
