"use server"

import {
  createDailyMap,
  addHexagonsToMap,
  addHexConnections,
  addMissionsToMap,
  addFogAttackQuizzes,
} from "./map-service"
import type { DailyMap, Hexagon, HexConnection, Mission, FogAttackQuiz } from "@/types/supabase"

// Função para gerar um mapa diário aleatório
export async function generateDailyMap() {
  // Criar o mapa base
  const map: Omit<DailyMap, "id" | "created_at"> = {
    name: `Mapa do Dia - ${new Date().toLocaleDateString("pt-BR")}`,
    description: "Conquiste o hexágono especial para completar o mapa do dia!",
    difficulty: "normal",
    is_active: true,
    special_hex_id: "hex8", // Hexágono especial
    day_date: new Date().toISOString().split("T")[0],
  }

  const createdMap = await createDailyMap(map)
  if (!createdMap) {
    throw new Error("Falha ao criar mapa diário")
  }

  // Gerar hexágonos
  const hexagons: Omit<Hexagon, "id">[] = [
    {
      map_id: createdMap.id,
      hex_id: "hex1",
      title: "Ponto de Partida",
      description: "Seu ponto de partida neste mapa. Conquiste os hexágonos adjacentes para avançar.",
      difficulty: "start",
      type: "start",
      points: 10,
      estimated_time: "5min",
      position_q: 0,
      position_r: 0,
      position_s: 0,
    },
    {
      map_id: createdMap.id,
      hex_id: "hex2",
      title: "Leitura Básica",
      description: "Leia o artigo introdutório sobre o tema e faça anotações dos pontos principais.",
      difficulty: "easy",
      type: "reading",
      points: 15,
      estimated_time: "15min",
      position_q: 1,
      position_r: -1,
      position_s: 0,
    },
    {
      map_id: createdMap.id,
      hex_id: "hex3",
      title: "Vídeo Tutorial",
      description: "Assista ao vídeo tutorial e pratique os conceitos apresentados.",
      difficulty: "easy",
      type: "video",
      points: 20,
      estimated_time: "20min",
      position_q: 0,
      position_r: -1,
      position_s: 1,
    },
    {
      map_id: createdMap.id,
      hex_id: "hex4",
      title: "Exercício Prático",
      description: "Resolva o exercício prático aplicando os conceitos aprendidos.",
      difficulty: "medium",
      type: "coding",
      points: 30,
      estimated_time: "30min",
      position_q: -1,
      position_r: 0,
      position_s: 1,
    },
    {
      map_id: createdMap.id,
      hex_id: "hex5",
      title: "Recompensa",
      description: "Uma recompensa surpresa! Pode ser pontos de foco ou recreação.",
      difficulty: "reward",
      type: "reward",
      points: 25,
      estimated_time: "5min",
      position_q: 2,
      position_r: -2,
      position_s: 0,
    },
    {
      map_id: createdMap.id,
      hex_id: "hex6",
      title: "Quiz Intermediário",
      description: "Teste seus conhecimentos com este quiz intermediário.",
      difficulty: "medium",
      type: "quiz",
      points: 35,
      estimated_time: "25min",
      position_q: 1,
      position_r: -2,
      position_s: 1,
    },
    {
      map_id: createdMap.id,
      hex_id: "hex7",
      title: "Projeto Complexo",
      description: "Desenvolva um projeto aplicando todos os conceitos aprendidos até agora.",
      difficulty: "hard",
      type: "coding",
      points: 50,
      estimated_time: "45min",
      position_q: -1,
      position_r: -1,
      position_s: 2,
    },
    {
      map_id: createdMap.id,
      hex_id: "hex8",
      title: "Objetivo Final",
      description: "Complete este desafio para conquistar o mapa do dia!",
      difficulty: "special",
      type: "special",
      points: 100,
      estimated_time: "60min",
      position_q: -2,
      position_r: 1,
      position_s: 1,
    },
    {
      map_id: createdMap.id,
      hex_id: "hex9",
      title: "Artigo Avançado",
      description: "Leia este artigo avançado e faça um resumo dos conceitos principais.",
      difficulty: "hard",
      type: "reading",
      points: 45,
      estimated_time: "40min",
      position_q: -2,
      position_r: 0,
      position_s: 2,
    },
    {
      map_id: createdMap.id,
      hex_id: "hex10",
      title: "Webinar Especializado",
      description: "Assista a este webinar especializado e faça anotações.",
      difficulty: "medium",
      type: "video",
      points: 40,
      estimated_time: "35min",
      position_q: 0,
      position_r: -2,
      position_s: 2,
    },
  ]

  const createdHexagons = await addHexagonsToMap(hexagons)
  if (!createdHexagons || createdHexagons.length === 0) {
    throw new Error("Falha ao criar hexágonos")
  }

  // Gerar conexões entre hexágonos
  const connections: Omit<HexConnection, "id">[] = [
    { map_id: createdMap.id, from_hex_id: "hex1", to_hex_id: "hex2" },
    { map_id: createdMap.id, from_hex_id: "hex1", to_hex_id: "hex3" },
    { map_id: createdMap.id, from_hex_id: "hex1", to_hex_id: "hex4" },
    { map_id: createdMap.id, from_hex_id: "hex2", to_hex_id: "hex5" },
    { map_id: createdMap.id, from_hex_id: "hex2", to_hex_id: "hex6" },
    { map_id: createdMap.id, from_hex_id: "hex3", to_hex_id: "hex6" },
    { map_id: createdMap.id, from_hex_id: "hex3", to_hex_id: "hex7" },
    { map_id: createdMap.id, from_hex_id: "hex4", to_hex_id: "hex7" },
    { map_id: createdMap.id, from_hex_id: "hex4", to_hex_id: "hex9" },
    { map_id: createdMap.id, from_hex_id: "hex7", to_hex_id: "hex10" },
    { map_id: createdMap.id, from_hex_id: "hex9", to_hex_id: "hex8" },
    { map_id: createdMap.id, from_hex_id: "hex10", to_hex_id: "hex8" },
  ]

  const createdConnections = await addHexConnections(connections)
  if (!createdConnections || createdConnections.length === 0) {
    throw new Error("Falha ao criar conexões")
  }

  // Gerar missões
  const missions: Omit<Mission, "id">[] = [
    {
      map_id: createdMap.id,
      title: "Conquistar o Objetivo Final",
      description: "Complete o hexágono especial para vencer o mapa do dia",
      type: "main",
      reward: "+100 Pontos de Foco",
      reward_amount: 100,
    },
    {
      map_id: createdMap.id,
      title: "Defender contra 3 ataques",
      description: "Defenda seus territórios contra 3 ataques da Névoa",
      type: "main",
      reward: "+50 Pontos de Foco",
      reward_amount: 50,
    },
    {
      map_id: createdMap.id,
      title: "Conquistar todos os hexágonos azuis",
      description: "Complete todas as tarefas fáceis do mapa",
      type: "side",
      reward: "+30 Pontos Recreativos",
      reward_amount: 30,
    },
    {
      map_id: createdMap.id,
      title: "Completar em menos de 2 horas",
      description: "Conquiste o objetivo final em menos de 2 horas",
      type: "side",
      reward: "+20 XP",
      reward_amount: 20,
    },
  ]

  const createdMissions = await addMissionsToMap(missions)
  if (!createdMissions || createdMissions.length === 0) {
    throw new Error("Falha ao criar missões")
  }

  // Gerar quizzes para ataques da névoa
  const quizzes: Omit<FogAttackQuiz, "id">[] = [
    {
      map_id: createdMap.id,
      hex_id: "hex2",
      question: "Qual era o principal conceito abordado na leitura básica?",
      options: JSON.stringify([
        "Fundamentos de programação",
        "Estruturas de dados",
        "Algoritmos de busca",
        "Padrões de design",
      ]),
      correct_answer: 0,
    },
    {
      map_id: createdMap.id,
      hex_id: "hex3",
      question: "Qual técnica foi demonstrada no vídeo tutorial?",
      options: JSON.stringify([
        "Debugging de código",
        "Otimização de algoritmos",
        "Implementação de interfaces",
        "Testes automatizados",
      ]),
      correct_answer: 1,
    },
    {
      map_id: createdMap.id,
      hex_id: "hex4",
      question: "Qual estrutura de dados foi utilizada no exercício prático?",
      options: JSON.stringify(["Array", "Linked List", "Hash Table", "Binary Tree"]),
      correct_answer: 2,
    },
  ]

  const createdQuizzes = await addFogAttackQuizzes(quizzes)
  if (!createdQuizzes || createdQuizzes.length === 0) {
    throw new Error("Falha ao criar quizzes")
  }

  return {
    map: createdMap,
    hexagons: createdHexagons,
    connections: createdConnections,
    missions: createdMissions,
    quizzes: createdQuizzes,
  }
}
