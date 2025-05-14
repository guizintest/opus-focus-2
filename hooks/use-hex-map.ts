"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { areNeighbors } from "@/lib/hex-utils"
import type { Hexagon, HexConnection, UserHexProgress } from "@/types/supabase"
// Adicionar import para useRouter
import { useRouter } from "next/navigation"

// Modificar a função useHexMap para buscar o mapa pela data em vez de pelo ID
// Alterar a assinatura da função para receber apenas userId
export function useHexMap({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hexagons, setHexagons] = useState<Hexagon[]>([])
  const [connections, setConnections] = useState<HexConnection[]>([])
  const [userProgress, setUserProgress] = useState<UserHexProgress[]>([])
  const [selectedHexId, setSelectedHexId] = useState<string | null>(null)
  const [activeHexId, setActiveHexId] = useState<string | null>(null)
  const [mapId, setMapId] = useState<string | null>(null)

  const supabase = getSupabaseClient()
  // Adicionar router dentro da função useHexMap
  const router = useRouter()

  // Carregar dados do mapa e progresso do usuário
  useEffect(() => {
    // Modificar o loadMapData para redirecionar quando não houver mapa
    async function loadMapData() {
      try {
        setLoading(true)
        setError(null)

        // Obter a data atual no formato ISO (YYYY-MM-DD)
        const today = new Date().toISOString().split("T")[0]

        // Buscar o mapa ativo para hoje
        const { data: mapData, error: mapError } = await supabase
          .from("daily_maps")
          .select("*")
          .eq("is_active", true)
          .eq("day_date", today)
          .single()

        if (mapError) {
          if (mapError.code === "PGRST116") {
            // Código para "não encontrado"
            router.push("/war-room/no-map")
            return
          }
          throw new Error(`Erro ao buscar mapa diário: ${mapError.message}`)
        }

        if (!mapData) {
          router.push("/war-room/no-map")
          return
        }

        // Armazenar o ID do mapa
        setMapId(mapData.id)

        // Carregar hexágonos do mapa
        const { data: hexData, error: hexError } = await supabase.from("hexagons").select("*").eq("map_id", mapData.id)

        if (hexError) {
          throw new Error(`Erro ao carregar hexágonos: ${hexError.message}`)
        }

        // Carregar conexões entre hexágonos
        const { data: connData, error: connError } = await supabase
          .from("hex_connections")
          .select("*")
          .eq("map_id", mapData.id)

        if (connError) {
          throw new Error(`Erro ao carregar conexões: ${connError.message}`)
        }

        // Carregar progresso do usuário
        const { data: progressData, error: progressError } = await supabase
          .from("user_hex_progress")
          .select("*")
          .eq("user_id", userId)
          .eq("map_id", mapData.id)

        if (progressError) {
          throw new Error(`Erro ao carregar progresso: ${progressError.message}`)
        }

        // Se não houver progresso, inicializar
        if (progressData.length === 0 && hexData) {
          await initializeUserProgress(hexData, userId, mapData.id)
        } else {
          setUserProgress(progressData)
        }

        // Atualizar estado
        setHexagons(hexData || [])
        setConnections(connData || [])
      } catch (err) {
        console.error("Erro ao carregar dados do mapa:", err)
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      loadMapData()
    }
  }, [userId, supabase, router])

  // Inicializar progresso do usuário se não existir
  async function initializeUserProgress(hexes: Hexagon[], userId: string, mapId: string) {
    try {
      // Encontrar o hexágono inicial (geralmente com difficulty = "start")
      const startHex = hexes.find((hex) => hex.difficulty === "start")

      if (!startHex) {
        console.warn("Hexágono inicial não encontrado, usando o primeiro hexágono da lista")
        // Se não encontrar um hexágono inicial, usar o primeiro da lista
        const firstHex = hexes[0]
        if (!firstHex) {
          throw new Error("Nenhum hexágono encontrado no mapa")
        }

        // Criar progresso para cada hexágono
        const progressData = hexes.map((hex) => ({
          user_id: userId,
          map_id: mapId,
          hex_id: hex.id,
          status: hex.id === firstHex.id ? "available" : "locked",
          conquered_at: null,
        }))

        // Inserir no banco de dados
        const { data, error } = await supabase.from("user_hex_progress").insert(progressData).select()

        if (error) {
          throw new Error(`Erro ao inicializar progresso: ${error.message}`)
        }

        setUserProgress(data)
        return
      }

      // Criar progresso para cada hexágono
      const progressData = hexes.map((hex) => ({
        user_id: userId,
        map_id: mapId,
        hex_id: hex.id,
        status: hex.id === startHex.id ? "available" : "locked",
        conquered_at: null,
      }))

      // Inserir no banco de dados
      const { data, error } = await supabase.from("user_hex_progress").insert(progressData).select()

      if (error) {
        throw new Error(`Erro ao inicializar progresso: ${error.message}`)
      }

      setUserProgress(data)
    } catch (err) {
      console.error("Erro ao inicializar progresso:", err)
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    }
  }

  // Obter hexágonos com status do usuário
  const hexagonsWithStatus = hexagons.map((hex) => {
    const progress = userProgress.find((p) => p.hex_id === hex.id)
    return {
      ...hex,
      status: progress?.status || "locked",
      conqueredAt: progress?.conquered_at,
    }
  })

  // Selecionar um hexágono
  const handleSelectHex = (hexId: string) => {
    const hex = hexagonsWithStatus.find((h) => h.id === hexId)
    if (hex && (hex.status === "available" || hex.status === "conquered")) {
      setSelectedHexId(hexId)
    }
  }

  // Iniciar uma tarefa (hexágono)
  const handleStartTask = async (hexId: string) => {
    try {
      // Verificar se o hexágono está disponível
      const hex = hexagonsWithStatus.find((h) => h.id === hexId)
      if (!hex || hex.status !== "available") {
        throw new Error("Hexágono não disponível")
      }

      // Atualizar estado local
      setActiveHexId(hexId)

      // Registrar evento no banco de dados
      await supabase.from("user_events").insert({
        user_id: userId,
        map_id: mapId,
        event_type: "task_started",
        event_data: { hex_id: hexId },
      })

      return true
    } catch (err) {
      console.error("Erro ao iniciar tarefa:", err)
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      return false
    }
  }

  // Completar uma tarefa (hexágono)
  const handleCompleteTask = async (hexId: string) => {
    try {
      // Verificar se é a tarefa ativa
      if (activeHexId !== hexId) {
        throw new Error("Esta não é a tarefa ativa")
      }

      // Atualizar status no banco de dados
      const { error: updateError } = await supabase
        .from("user_hex_progress")
        .update({
          status: "conquered",
          conquered_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("map_id", mapId)
        .eq("hex_id", hexId)

      if (updateError) {
        throw new Error(`Erro ao atualizar status: ${updateError.message}`)
      }

      // Desbloquear hexágonos vizinhos
      await unlockNeighborHexes(hexId)

      // Atualizar estado local
      setActiveHexId(null)

      // Atualizar progresso do usuário
      const { data: updatedProgress, error: progressError } = await supabase
        .from("user_hex_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("map_id", mapId)

      if (progressError) {
        throw new Error(`Erro ao carregar progresso atualizado: ${progressError.message}`)
      }

      setUserProgress(updatedProgress)

      // Registrar evento no banco de dados
      await supabase.from("user_events").insert({
        user_id: userId,
        map_id: mapId,
        event_type: "task_completed",
        event_data: { hex_id: hexId },
      })

      return true
    } catch (err) {
      console.error("Erro ao completar tarefa:", err)
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      return false
    }
  }

  // Desbloquear hexágonos vizinhos
  async function unlockNeighborHexes(hexId: string) {
    try {
      // Encontrar o hexágono conquistado
      const conqueredHex = hexagons.find((h) => h.id === hexId)
      if (!conqueredHex) return

      // Encontrar todos os hexágonos vizinhos
      const neighbors = hexagons.filter((h) =>
        areNeighbors({ q: conqueredHex.position_q, r: conqueredHex.position_r }, { q: h.position_q, r: h.position_r }),
      )

      // Verificar quais vizinhos estão bloqueados
      const lockedNeighbors = neighbors.filter((neighbor) => {
        const progress = userProgress.find((p) => p.hex_id === neighbor.id)
        return progress?.status === "locked"
      })

      // Desbloquear vizinhos
      if (lockedNeighbors.length > 0) {
        const updates = lockedNeighbors.map((neighbor) => ({
          user_id: userId,
          map_id: mapId,
          hex_id: neighbor.id,
          status: "available",
        }))

        const { error } = await supabase
          .from("user_hex_progress")
          .upsert(updates, { onConflict: "user_id,map_id,hex_id" })

        if (error) {
          throw new Error(`Erro ao desbloquear vizinhos: ${error.message}`)
        }
      }
    } catch (err) {
      console.error("Erro ao desbloquear vizinhos:", err)
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    }
  }

  // Verificar se o mapa está completo
  const isMapCompleted = () => {
    // Verificar se todos os hexágonos não-recompensa foram conquistados
    const requiredHexes = hexagonsWithStatus.filter((h) => h.difficulty !== "reward")
    return requiredHexes.every((h) => h.status === "conquered")
  }

  // Verificar se o hexágono especial foi conquistado
  const isSpecialHexCompleted = () => {
    const specialHex = hexagonsWithStatus.find((h) => h.difficulty === "special")
    return specialHex?.status === "conquered"
  }

  return {
    loading,
    error,
    hexagons: hexagonsWithStatus,
    connections,
    selectedHexId,
    activeHexId,
    handleSelectHex,
    handleStartTask,
    handleCompleteTask,
    isMapCompleted,
    isSpecialHexCompleted,
  }
}
