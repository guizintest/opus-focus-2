"use client"

import { AoE4Panel } from "./aoe4-panel"
import { AoE4Button } from "./aoe4-button"
import { Trophy, Star, BarChart2, Home } from "lucide-react"
import Link from "next/link"

interface VictoryModalProps {
  resources: {
    focus: number
    recreation: number
    mood: "good" | "normal" | "bad"
    dayProgress: number
  }
  completedMissions: number
  totalMissions: number
  onClose: () => void
}

export function VictoryModal({ resources, completedMissions, totalMissions, onClose }: VictoryModalProps) {
  const calculateScore = () => {
    // Cálculo de pontuação baseado nos recursos e missões
    const focusScore = resources.focus * 10
    const moodBonus = resources.mood === "good" ? 500 : resources.mood === "normal" ? 300 : 100
    const missionBonus = (completedMissions / totalMissions) * 1000

    return Math.round(focusScore + moodBonus + missionBonus)
  }

  const calculateStars = () => {
    const score = calculateScore()
    if (score >= 2000) return 3
    if (score >= 1500) return 2
    return 1
  }

  const stars = calculateStars()

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <AoE4Panel className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-aoe-gold font-cinzel">Vitória!</h2>
          <p className="text-aoe-light mt-2">Você completou o Mapa do Dia com sucesso!</p>
        </div>

        <div className="flex justify-center mb-6">
          {[...Array(3)].map((_, i) => (
            <Star
              key={i}
              className={`h-10 w-10 ${i < stars ? "text-yellow-500" : "text-gray-700"}`}
              fill={i < stars ? "currentColor" : "none"}
            />
          ))}
        </div>

        <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4 mb-6">
          <h3 className="text-aoe-gold font-medium mb-3 text-center">Resumo</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-aoe-muted">Pontuação Total</span>
              <span className="text-aoe-gold font-medium">{calculateScore()} pontos</span>
            </div>
            <div className="flex justify-between">
              <span className="text-aoe-muted">Missões Completadas</span>
              <span className="text-aoe-light">
                {completedMissions}/{totalMissions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-aoe-muted">Foco Restante</span>
              <span className="text-blue-400">{resources.focus}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-aoe-muted">Humor Final</span>
              <span className="text-yellow-400">
                {resources.mood === "good" ? "Excelente" : resources.mood === "normal" ? "Bom" : "Regular"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <AoE4Button variant="secondary" onClick={onClose}>
            <Link href="/stats" className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              Estatísticas
            </Link>
          </AoE4Button>
          <AoE4Button onClick={onClose}>
            <Link href="/qg" className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Voltar ao QG
            </Link>
          </AoE4Button>
        </div>
      </AoE4Panel>
    </div>
  )
}
