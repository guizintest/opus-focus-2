"use server"

import { getSupabaseServer } from "../supabase/server"
import type { UserProfile, UserMapProgress, UserHexProgress, UserMissionProgress, UserEvent } from "@/types/supabase"
import { revalidatePath } from "next/cache"

// Função para obter o perfil do usuário
export async function getUserProfile(userId: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error) {
    if (error.code === "PGRST116") {
      // Perfil não encontrado, criar um novo
      return createUserProfile(userId)
    }
    console.error("Erro ao buscar perfil do usuário:", error)
    return null
  }

  return data as UserProfile
}

// Função para criar um perfil de usuário
export async function createUserProfile(userId: string, username?: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("user_profiles")
    .insert({
      id: userId,
      username: username || null,
      focus_points: 100,
      recreation_points: 50,
      current_mood: "normal",
    })
    .select()
    .single()

  if (error) {
    console.error("Erro ao criar perfil do usuário:", error)
    return null
  }

  return data as UserProfile
}

// Função para atualizar os pontos de foco do usuário
export async function updateUserFocusPoints(userId: string, points: number) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("user_profiles")
    .update({ focus_points: points })
    .eq("id", userId)
    .select()
    .single()

  if (error) {
    console.error("Erro ao atualizar pontos de foco:", error)
    return null
  }

  revalidatePath("/war-room")
  return data as UserProfile
}

// Função para atualizar os pontos de recreação do usuário
export async function updateUserRecreationPoints(userId: string, points: number) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("user_profiles")
    .update({ recreation_points: points })
    .eq("id", userId)
    .select()
    .single()

  if (error) {
    console.error("Erro ao atualizar pontos de recreação:", error)
    return null
  }

  revalidatePath("/war-room")
  return data as UserProfile
}

// Função para atualizar o humor do usuário
export async function updateUserMood(userId: string, mood: "good" | "normal" | "bad") {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("user_profiles")
    .update({ current_mood: mood })
    .eq("id", userId)
    .select()
    .single()

  if (error) {
    console.error("Erro ao atualizar humor:", error)
    return null
  }

  revalidatePath("/war-room")
  return data as UserProfile
}

// Função para obter o progresso do usuário em um mapa
export async function getUserMapProgress(userId: string, mapId: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("user_map_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("map_id", mapId)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      // Progresso não encontrado, criar um novo
      return createUserMapProgress(userId, mapId)
    }
    console.error("Erro ao buscar progresso do mapa:", error)
    return null
  }

  return data as UserMapProgress
}

// Função para criar um progresso de mapa para o usuário
export async function createUserMapProgress(userId: string, mapId: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("user_map_progress")
    .insert({
      user_id: userId,
      map_id: mapId,
      remaining_free_pauses: 2,
    })
    .select()
    .single()

  if (error) {
    console.error("Erro ao criar progresso do mapa:", error)
    return null
  }

  return data as UserMapProgress
}

// Função para atualizar o número de pausas gratuitas restantes
export async function updateRemainingFreePauses(userId: string, mapId: string, pauses: number) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("user_map_progress")
    .update({ remaining_free_pauses: pauses })
    .eq("user_id", userId)
    .eq("map_id", mapId)
    .select()
    .single()

  if (error) {
    console.error("Erro ao atualizar pausas restantes:", error)
    return null
  }

  revalidatePath("/war-room")
  return data as UserMapProgress
}

// Função para marcar um mapa como concluído
export async function completeUserMap(userId: string, mapId: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("user_map_progress")
    .update({
      is_completed: true,
      completed_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("map_id", mapId)
    .select()
    .single()

  if (error) {
    console.error("Erro ao completar mapa:", error)
    return null
  }

  revalidatePath("/war-room")
  return data as UserMapProgress
}

// Função para obter o progresso do usuário em hexágonos de um mapa
export async function getUserHexProgress(userId: string, mapId: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.from("user_hex_progress").select("*").eq("user_id", userId).eq("map_id", mapId)

  if (error) {
    console.error("Erro ao buscar progresso dos hexágonos:", error)
    return []
  }

  return data as UserHexProgress[]
}

// Função para inicializar o progresso do usuário em hexágonos
export async function initializeUserHexProgress(userId: string, mapId: string, hexIds: string[]) {
  const supabase = getSupabaseServer()

  // Primeiro, verificamos se já existe progresso para este mapa
  const { data: existingProgress } = await supabase
    .from("user_hex_progress")
    .select("hex_id")
    .eq("user_id", userId)
    .eq("map_id", mapId)

  if (existingProgress && existingProgress.length > 0) {
    // Já existe progresso, não precisamos inicializar
    return existingProgress as UserHexProgress[]
  }

  // Preparar os dados para inserção
  const progressData = hexIds.map((hexId) => ({
    user_id: userId,
    map_id: mapId,
    hex_id: hexId,
    status: hexId === "hex1" ? "available" : "locked", // Assumindo que hex1 é sempre o inicial
  }))

  const { data, error } = await supabase.from("user_hex_progress").insert(progressData).select()

  if (error) {
    console.error("Erro ao inicializar progresso dos hexágonos:", error)
    return []
  }

  revalidatePath("/war-room")
  return data as UserHexProgress[]
}

// Função para atualizar o status de um hexágono
export async function updateHexStatus(
  userId: string,
  mapId: string,
  hexId: string,
  status: "locked" | "available" | "conquered",
) {
  const supabase = getSupabaseServer()

  const updateData: any = { status }
  if (status === "conquered") {
    updateData.conquered_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from("user_hex_progress")
    .update(updateData)
    .eq("user_id", userId)
    .eq("map_id", mapId)
    .eq("hex_id", hexId)
    .select()
    .single()

  if (error) {
    console.error("Erro ao atualizar status do hexágono:", error)
    return null
  }

  revalidatePath("/war-room")
  return data as UserHexProgress
}

// Função para obter o progresso do usuário em missões
export async function getUserMissionProgress(userId: string, missionIds: string[]) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("user_mission_progress")
    .select("*")
    .eq("user_id", userId)
    .in("mission_id", missionIds)

  if (error) {
    console.error("Erro ao buscar progresso das missões:", error)
    return []
  }

  return data as UserMissionProgress[]
}

// Função para inicializar o progresso do usuário em missões
export async function initializeUserMissionProgress(userId: string, missionIds: string[]) {
  const supabase = getSupabaseServer()

  // Primeiro, verificamos quais missões já têm progresso
  const { data: existingProgress } = await supabase
    .from("user_mission_progress")
    .select("mission_id")
    .eq("user_id", userId)
    .in("mission_id", missionIds)

  const existingMissionIds = existingProgress ? existingProgress.map((p) => p.mission_id) : []
  const missionsToInitialize = missionIds.filter((id) => !existingMissionIds.includes(id))

  if (missionsToInitialize.length === 0) {
    // Todas as missões já têm progresso
    return existingProgress as UserMissionProgress[]
  }

  // Preparar os dados para inserção
  const progressData = missionsToInitialize.map((missionId) => ({
    user_id: userId,
    mission_id: missionId,
    is_completed: false,
  }))

  const { data, error } = await supabase.from("user_mission_progress").insert(progressData).select()

  if (error) {
    console.error("Erro ao inicializar progresso das missões:", error)
    return []
  }

  revalidatePath("/war-room")
  return [...existingProgress, ...data] as UserMissionProgress[]
}

// Função para atualizar o progresso de uma missão
export async function updateMissionProgress(userId: string, missionId: string, progress: string, isCompleted = false) {
  const supabase = getSupabaseServer()

  const updateData: any = { progress }
  if (isCompleted) {
    updateData.is_completed = true
    updateData.completed_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from("user_mission_progress")
    .update(updateData)
    .eq("user_id", userId)
    .eq("mission_id", missionId)
    .select()
    .single()

  if (error) {
    console.error("Erro ao atualizar progresso da missão:", error)
    return null
  }

  revalidatePath("/war-room")
  return data as UserMissionProgress
}

// Função para registrar um evento do usuário
export async function logUserEvent(userId: string, eventType: string, mapId?: string, eventData?: any) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("user_events")
    .insert({
      user_id: userId,
      map_id: mapId || null,
      event_type: eventType,
      event_data: eventData || {},
    })
    .select()
    .single()

  if (error) {
    console.error("Erro ao registrar evento:", error)
    return null
  }

  return data as UserEvent
}

// Função para obter os eventos recentes do usuário
export async function getUserRecentEvents(userId: string, limit = 10) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("user_events")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Erro ao buscar eventos recentes:", error)
    return []
  }

  return data as UserEvent[]
}
