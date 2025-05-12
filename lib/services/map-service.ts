"use server"

import { getSupabaseServer } from "../supabase/server"
import type { DailyMap, Hexagon, HexConnection, Mission, FogAttackQuiz } from "@/types/supabase"
import { revalidatePath } from "next/cache"

// Função para obter o mapa diário ativo
export async function getActiveDailyMap() {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("daily_maps")
    .select("*")
    .eq("is_active", true)
    .eq("day_date", new Date().toISOString().split("T")[0])
    .single()

  if (error) {
    console.error("Erro ao buscar mapa diário:", error)
    return null
  }

  return data as DailyMap
}

// Função para obter todos os hexágonos de um mapa
export async function getMapHexagons(mapId: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.from("hexagons").select("*").eq("map_id", mapId)

  if (error) {
    console.error("Erro ao buscar hexágonos:", error)
    return []
  }

  return data as Hexagon[]
}

// Função para obter as conexões entre hexágonos de um mapa
export async function getMapHexConnections(mapId: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.from("hex_connections").select("*").eq("map_id", mapId)

  if (error) {
    console.error("Erro ao buscar conexões de hexágonos:", error)
    return []
  }

  return data as HexConnection[]
}

// Função para obter as missões de um mapa
export async function getMapMissions(mapId: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.from("missions").select("*").eq("map_id", mapId)

  if (error) {
    console.error("Erro ao buscar missões:", error)
    return []
  }

  return data as Mission[]
}

// Função para obter os quizzes de um mapa para ataques da névoa
export async function getMapFogAttackQuizzes(mapId: string, hexId: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.from("fog_attack_quizzes").select("*").eq("map_id", mapId).eq("hex_id", hexId)

  if (error) {
    console.error("Erro ao buscar quizzes:", error)
    return []
  }

  return data as FogAttackQuiz[]
}

// Função para criar um novo mapa diário
export async function createDailyMap(map: Omit<DailyMap, "id" | "created_at">) {
  const supabase = getSupabaseServer()

  // Primeiro, desativa todos os mapas ativos
  await supabase.from("daily_maps").update({ is_active: false }).eq("is_active", true)

  // Cria o novo mapa
  const { data, error } = await supabase.from("daily_maps").insert(map).select().single()

  if (error) {
    console.error("Erro ao criar mapa diário:", error)
    return null
  }

  revalidatePath("/war-room")
  return data as DailyMap
}

// Função para adicionar hexágonos a um mapa
export async function addHexagonsToMap(hexagons: Omit<Hexagon, "id">[]) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.from("hexagons").insert(hexagons).select()

  if (error) {
    console.error("Erro ao adicionar hexágonos:", error)
    return []
  }

  revalidatePath("/war-room")
  return data as Hexagon[]
}

// Função para adicionar conexões entre hexágonos
export async function addHexConnections(connections: Omit<HexConnection, "id">[]) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.from("hex_connections").insert(connections).select()

  if (error) {
    console.error("Erro ao adicionar conexões:", error)
    return []
  }

  revalidatePath("/war-room")
  return data as HexConnection[]
}

// Função para adicionar missões a um mapa
export async function addMissionsToMap(missions: Omit<Mission, "id">[]) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.from("missions").insert(missions).select()

  if (error) {
    console.error("Erro ao adicionar missões:", error)
    return []
  }

  revalidatePath("/war-room")
  return data as Mission[]
}

// Função para adicionar quizzes para ataques da névoa
export async function addFogAttackQuizzes(quizzes: Omit<FogAttackQuiz, "id">[]) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase.from("fog_attack_quizzes").insert(quizzes).select()

  if (error) {
    console.error("Erro ao adicionar quizzes:", error)
    return []
  }

  return data as FogAttackQuiz[]
}
