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
import { useHexMap } from "@/hooks/use-hex-map"
import { generateDailyMapId } from "@/lib/map-utils"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function WarRoomPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState({
    focus_points: 100,
    recreation_points: 30,
    current_mood: "normal" as "good" | "normal" | "bad",
  })
  const [events, setEvents] = useState<Array<{ id: string; message: string; type: string; timestamp: number }>>([])

  // Obter o ID do usuário atual
  useEffect(() => {
    const fetchUserId = async () => {
      const supabase = getSupabaseClient()
      const { data } = await supabase.auth.getUser()

      if (data?.user) {
        setUserId(data.user.id)
      } else {
        // Redirecionar para login se não estiver autenticado
        router.push("/login")
      }
    }

    fetchUserId()
  }, [router])

  // Adicionar um estado para armazenar o mapId
  const [mapId, setMapId] = useState<string | null>(null)

  // Obter o ID do mapa diário
  useEffect(() => {
    const dailyMapId = generateDailyMapId()
    setMapId(dailyMapId)
  }, [])

  // Usar o hook de mapa hexagonal
  const {
    loading,
    error,
    hexagons,
    connections,
    selectedHexId,
    activeHexId,
    handleSelectHex,
    handleStartTask,
    handleCompleteTask,
    isMapCompleted,
    isSpecialHexCompleted,
  } = useHexMap({
    userId: userId || "",
  })

  // Obter o hexágono selecionado
  const selectedHex = selectedHexId ? hexagons.find((hex) => hex.id === selectedHexId) : null

  // Carregar eventos do usuário
  useEffect(() => {
    const loadEvents = async () => {
      if (!userId || !mapId) return

      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from("user_events")
        .select("*")
        .eq("user_id", userId)
        .eq("map_id", mapId)
        .order("created_at", { ascending: false })
        .limit(10)

      if (!error && data) {
        const formattedEvents = data.map((event) => ({
          id: event.id,
          message: getEventMessage(event.event_type, event.event_data),
          type: getEventType(event.event_type),
          timestamp: new Date(event.created_at).getTime(),
        }))
        setEvents(formattedEvents)
      }
    }

    if (userId && mapId) {
      loadEvents()
      // Configurar um intervalo para atualizar os eventos
      const interval = setInterval(loadEvents, 30000)
      return () => clearInterval(interval)
    }
  }, [userId, mapId])

  // Função para formatar mensagens de eventos
  const getEventMessage = (eventType: string, eventData: any) => {
    switch (eventType) {
      case "task_started":
        const startHex = hexagons.find((h) => h.id === eventData.hex_id)
        return `Iniciou a tarefa: ${startHex?.title || "Desconhecida"}`
      case "task_completed":
        const completeHex = hexagons.find((h) => h.id === eventData.hex_id)
        return `Completou a tarefa: ${completeHex?.title || "Desconhecida"}`
      case "map_completed":
        return "Completou o mapa do dia!"
      case "fog_attack":
        return "Sofreu um ataque da Névoa da Distração"
      case "fog_defended":
        return "Defendeu-se com sucesso de um ataque da Névoa"
      default:
        return "Evento desconhecido"
    }
  }

  // Função para determinar o tipo de evento
  const getEventType = (eventType: string) => {
    switch (eventType) {
      case "task_completed":
      case "map_completed":
      case "fog_defended":
        return "success"
      case "fog_attack":
        return "danger"
      case "task_started":
        return "info"
      default:
        return "info"
    }
  }

  // Função para lidar com a mudança de humor
  const handleMoodChange = async (mood: "good" | "normal" | "bad") => {
    if (!userId) return

    setUserProfile((prev) => ({ ...prev, current_mood: mood }))

    // Atualizar no banco de dados
    const supabase = getSupabaseClient()
    await supabase.from("user_profiles").update({ current_mood: mood }).eq("id", userId)
  }

  // Função para iniciar o modo de recreação
  const handleStartRecreation = async () => {
    if (!userId || userProfile.recreation_points < 30) return

    // Atualizar pontos de recreação
    setUserProfile((prev) => ({
      ...prev,
      recreation_points: prev.recreation_points - 30,
    }))

    // Atualizar no banco de dados
    const supabase = getSupabaseClient()
    await supabase
      .from("user_profiles")
      .update({
        recreation_points: userProfile.recreation_points - 30,
      })
      .eq("id", userId)

    // Registrar evento
    await supabase.from("user_events").insert({
      user_id: userId,
      map_id: mapId,
      event_type: "recreation_started",
      event_data: { duration: 30 },
    })

    // Adicionar evento à lista local
    setEvents((prev) => [
      {
        id: `recreation-${Date.now()}`,
        message: "Iniciou modo de recreação por 30 minutos",
        type: "info",
        timestamp: Date.now(),
      },
      ...prev,
    ])
  }

  // Converter conexões para o formato esperado pelo SimpleHexGrid
  const formattedConnections = connections.map((conn) => ({
    from: {
      q: hexagons.find((h) => h.id === conn.from_hex_id)?.position_q || 0,
      r: hexagons.find((h) => h.id === conn.from_hex_id)?.position_r || 0,
    },
    to: {
      q: hexagons.find((h) => h.id === conn.to_hex_id)?.position_q || 0,
      r: hexagons.find((h) => h.id === conn.to_hex_id)?.position_r || 0,
    },
  }))

  if (loading || !userId || !mapId) {
    return (
      <div className="flex flex-col h-screen bg-aoe-dark-blue items-center justify-center">
        <Loader2 className="h-12 w-12 text-aoe-gold animate-spin mb-4" />
        <p className="text-aoe-light text-lg">Carregando Mapa do Dia...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen bg-aoe-dark-blue items-center justify-center">
        <p className="text-red-400 text-lg mb-4">Erro ao carregar o mapa: {error}</p>
        <AoE4Button onClick={() => router.push("/war-room/generate")}>Gerar Novo Mapa</AoE4Button>
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
          <SimpleHexGrid
            hexagons={hexagons}
            connections={formattedConnections}
            selectedHexId={selectedHexId}
            onSelectHex={handleSelectHex}
          />

          <div className="absolute bottom-4 left-4">
            <AoE4Button onClick={handleStartRecreation} disabled={userProfile.recreation_points < 30}>
              Iniciar Recreação (30 min)
            </AoE4Button>
          </div>
        </div>

        {/* Painel lateral direito */}
        <div className="w-80 border-l border-aoe-border flex flex-col bg-aoe-panel">
          {/* Detalhes da tarefa */}
          <div className="h-1/2 border-b border-aoe-border">
            <SimpleTaskPanel
              selectedHex={selectedHex}
              activeHexId={activeHexId}
              onStartTask={handleStartTask}
              onCompleteTask={handleCompleteTask}
            />
          </div>

          {/* Log de eventos */}
          <div className="h-1/2">
            <EventLog events={events} />
          </div>
        </div>
      </div>
    </div>
  )
}
