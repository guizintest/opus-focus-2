"use client"

import { Star, Clock } from "lucide-react"
import { AoE4Button } from "@/components/aoe4-button"

interface SimpleTaskPanelProps {
  selectedHexId: string | null
}

export function SimpleTaskPanel({ selectedHexId }: SimpleTaskPanelProps) {
  // Dados de exemplo para os hexágonos
  const hexes = {
    hex1: {
      title: "Tarefa Inicial",
      description: "Uma tarefa fácil para começar o dia",
      difficulty: "start",
      points: 10,
      estimatedTime: "15min",
    },
    hex2: {
      title: "Leitura Básica",
      description: "Leia o artigo introdutório sobre o tema e faça anotações dos pontos principais.",
      difficulty: "easy",
      points: 15,
      estimatedTime: "15min",
    },
    hex3: {
      title: "Vídeo Tutorial",
      description: "Assista ao vídeo tutorial e pratique os conceitos apresentados.",
      difficulty: "easy",
      points: 20,
      estimatedTime: "20min",
    },
    hex4: {
      title: "Exercício Prático",
      description: "Resolva o exercício prático aplicando os conceitos aprendidos.",
      difficulty: "medium",
      points: 30,
      estimatedTime: "30min",
    },
    hex5: {
      title: "Recompensa",
      description: "Uma recompensa surpresa! Pode ser pontos de foco ou recreação.",
      difficulty: "reward",
      points: 25,
      estimatedTime: "5min",
    },
    hex6: {
      title: "Objetivo Final",
      description: "Complete este desafio para conquistar o mapa do dia!",
      difficulty: "special",
      points: 100,
      estimatedTime: "60min",
    },
  }

  const selectedHex = selectedHexId ? hexes[selectedHexId as keyof typeof hexes] : null

  if (!selectedHex) {
    return (
      <div className="p-4 text-aoe-muted flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <p>Selecione um hexágono no mapa</p>
          <p className="text-xs mt-2">Clique em um hexágono disponível para ver seus detalhes</p>
        </div>
      </div>
    )
  }

  // Determinar a dificuldade em texto
  const getDifficultyText = () => {
    switch (selectedHex.difficulty) {
      case "easy":
        return "Fácil"
      case "medium":
        return "Média"
      case "hard":
        return "Difícil"
      case "reward":
        return "Recompensa"
      case "special":
        return "Especial"
      case "start":
        return "Inicial"
      default:
        return "Desconhecida"
    }
  }

  // Determinar o número de estrelas com base na dificuldade
  const getDifficultyStars = () => {
    switch (selectedHex.difficulty) {
      case "easy":
        return 1
      case "medium":
        return 3
      case "hard":
        return 5
      case "reward":
        return 2
      case "special":
        return 4
      case "start":
        return 1
      default:
        return 0
    }
  }

  return (
    <div className="flex-1 p-4 flex flex-col h-full">
      <div className="border-b border-aoe-border pb-3 mb-4">
        <h2 className="text-aoe-gold text-lg font-bold">{selectedHex.title}</h2>
        <p className="text-aoe-muted text-sm mt-2">{selectedHex.description}</p>
      </div>

      {/* Detalhes da tarefa */}
      <div className="space-y-4 flex-1">
        {/* Dificuldade */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-aoe-muted">Dificuldade:</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < getDifficultyStars() ? "text-aoe-gold" : "text-aoe-muted"}`}
                fill={i < getDifficultyStars() ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>

        {/* Tempo estimado */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-aoe-muted">Tempo estimado:</span>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-aoe-light mr-1" />
            <span className="text-sm text-aoe-light">{selectedHex.estimatedTime}</span>
          </div>
        </div>

        {/* Valor */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-aoe-muted">Valor:</span>
          <span className="text-sm text-aoe-gold">+{selectedHex.points} pontos</span>
        </div>
      </div>

      {/* Botão de ação */}
      <div className="mt-6">
        <AoE4Button className="w-full">Iniciar Tarefa</AoE4Button>
      </div>
    </div>
  )
}
