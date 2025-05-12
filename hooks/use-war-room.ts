"use client"

import { useState, useEffect } from "react"
import { generateDailyMapId } from "@/lib/map-utils"

// Tipos
type MoodType = "good" | "normal" | "bad"

interface UserProfile {
  id: string
  username: string
  focus_points: number
  recreation_points: number
  current_mood: MoodType
}

interface DailyMap {
  id: string
  name: string
  description: string
  difficulty: string
  special_hex_id: string
}

interface HexTile {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard" | "special" | "reward"
  type: string
  points: number
  estimated_time: string
  status: "locked" | "available" | "conquered"
  position_q: number
  position_r: number
  position_s: number
}

interface Mission {
  id: string
  title: string
  description: string
  type: string
  reward: string
  reward_amount: number
  completed: boolean
}

interface UserMapProgress {
  id: string
  user_id: string
  map_id: string
  started_at: string
  completed_at: string | null
  is_completed: boolean
  remaining_free_pauses: number
}

interface FogAttack {
  hexId: string
  timeRemaining: number
}

// Hook
export function useWarRoom() {
  // Estado
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [dailyMap, setDailyMap] = useState<DailyMap | null>(null)
  const [hexTiles, setHexTiles] = useState<HexTile[]>([])
  const [formattedMissions, setFormattedMissions] = useState<Mission[]>([])
  const [userMapProgress, setUserMapProgress] = useState<UserMapProgress | null>(null)
  const [selectedHexId, setSelectedHexId] = useState<string | null>(null)
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [activeFogAttack, setActiveFogAttack] = useState<FogAttack | null>(null)

  // Carregar dados (simulado)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Simular carregamento de dados
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Dados simulados
        setUserProfile({
          id: "user-1",
          username: "player1",
          focus_points: 100,
          recreation_points: 30,
          current_mood: "normal",
        })

        setDailyMap({
          id: generateDailyMapId(),
          name: "Mapa do Dia",
          description: "Conquiste todos os hexágonos para completar o mapa",
          difficulty: "medium",
          special_hex_id: "hex8",
        })

        setHexTiles([
          {
            id: "hex1",
            title: "Tarefa Inicial",
            description: "Uma tarefa fácil para começar o dia",
            difficulty: "easy",
            type: "task",
            points: 10,
            estimated_time: "15min",
            status: "available",
            position_q: 0,
            position_r: 0,
            position_s: 0,
          },
          {
            id: "hex2",
            title: "Revisão de Código",
            description: "Revisar o código do projeto",
            difficulty: "medium",
            type: "task",
            points: 20,
            estimated_time: "30min",
            status: "locked",
            position_q: 1,
            position_r: -1,
            position_s: 0,
          },
          {
            id: "hex3",
            title: "Reunião de Equipe",
            description: "Participar da reunião diária",
            difficulty: "medium",
            type: "task",
            points: 15,
            estimated_time: "20min",
            status: "locked",
            position_q: 0,
            position_r: -1,
            position_s: 1,
          },
          {
            id: "hex4",
            title: "Pausa para Café",
            description: "Tome um café e relaxe",
            difficulty: "reward",
            type: "reward",
            points: 5,
            estimated_time: "10min",
            status: "locked",
            position_q: -1,
            position_r: 0,
            position_s: 1,
          },
          {
            id: "hex5",
            title: "Implementar Feature",
            description: "Implementar nova funcionalidade",
            difficulty: "hard",
            type: "task",
            points: 30,
            estimated_time: "45min",
            status: "locked",
            position_q: -1,
            position_r: 1,
            position_s: 0,
          },
          {
            id: "hex6",
            title: "Testes Unitários",
            description: "Escrever testes para o código",
            difficulty: "medium",
            type: "task",
            points: 20,
            estimated_time: "30min",
            status: "locked",
            position_q: 0,
            position_r: 1,
            position_s: -1,
          },
          {
            id: "hex7",
            title: "Documentação",
            description: "Atualizar a documentação do projeto",
            difficulty: "easy",
            type: "task",
            points: 10,
            estimated_time: "15min",
            status: "locked",
            position_q: 1,
            position_r: 0,
            position_s: -1,
          },
          {
            id: "hex8",
            title: "Deploy",
            description: "Fazer o deploy da aplicação",
            difficulty: "special",
            type: "special",
            points: 50,
            estimated_time: "20min",
            status: "locked",
            position_q: 0,
            position_r: 0,
            position_s: 0,
          },
        ])

        setFormattedMissions([
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
        ])

        setUserMapProgress({
          id: "progress1",
          user_id: "user1",
          map_id: generateDailyMapId(),
          started_at: new Date().toISOString(),
          completed_at: null,
          is_completed: false,
          remaining_free_pauses: 2,
        })
      } catch (err) {
        console.error("Erro ao carregar dados:", err)
        setError("Erro ao carregar dados do mapa")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Funções
  const handleSelectHex = (hexId: string) => {
    setSelectedHexId(hexId)
  }

  const handleStartTask = (hexId: string) => {
    setActiveTaskId(hexId)
    // Aqui seria feita a chamada para a API para iniciar a tarefa
  }

  const handleCompleteTask = (hexId: string) => {
    // Atualizar o estado local
    setHexTiles((prev) => prev.map((hex) => (hex.id === hexId ? { ...hex, status: "conquered" as const } : hex)))

    // Desbloquear hexágonos adjacentes
    setHexTiles((prev) => {
      const conqueredHex = prev.find((h) => h.id === hexId)
      if (!conqueredHex) return prev

      return prev.map((hex) => {
        // Verificar se é adjacente (simplificado)
        const isAdjacent =
          Math.abs(hex.position_q - conqueredHex.position_q) <= 1 &&
          Math.abs(hex.position_r - conqueredHex.position_r) <= 1 &&
          Math.abs(hex.position_s - conqueredHex.position_s) <= 1

        if (isAdjacent && hex.status === "locked") {
          return { ...hex, status: "available" as const }
        }
        return hex
      })
    })

    setActiveTaskId(null)
    return true
  }

  const handlePauseTask = (isPaid: boolean) => {
    if (!userMapProgress) return

    if (!isPaid && userMapProgress.remaining_free_pauses > 0) {
      // Atualizar pausas gratuitas restantes
      setUserMapProgress({
        ...userMapProgress,
        remaining_free_pauses: userMapProgress.remaining_free_pauses - 1,
      })
    } else {
      // Deduzir pontos de foco
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          focus_points: Math.max(0, userProfile.focus_points - 20),
        })
      }
    }
  }

  const handleDefendFogAttack = (success: boolean) => {
    if (!userProfile) return

    if (success) {
      // Ganhar pontos de foco
      setUserProfile({
        ...userProfile,
        focus_points: userProfile.focus_points + 15,
      })
    } else {
      // Perder pontos de foco
      setUserProfile({
        ...userProfile,
        focus_points: Math.max(0, userProfile.focus_points - 10),
      })
    }

    setActiveFogAttack(null)
  }

  const handleFleeFogAttack = () => {
    if (!userProfile) return

    // Perder mais pontos de foco
    setUserProfile({
      ...userProfile,
      focus_points: Math.max(0, userProfile.focus_points - 20),
    })

    setActiveFogAttack(null)
  }

  const handleUpdateMood = (mood: MoodType) => {
    if (!userProfile) return

    setUserProfile({
      ...userProfile,
      current_mood: mood,
    })
  }

  return {
    loading,
    error,
    userProfile,
    dailyMap,
    hexTiles,
    formattedMissions,
    userMapProgress,
    selectedHexId,
    activeTaskId,
    activeFogAttack,
    handleSelectHex,
    handleStartTask,
    handleCompleteTask,
    handlePauseTask,
    handleDefendFogAttack,
    handleFleeFogAttack,
    handleUpdateMood,
  }
}
