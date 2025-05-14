"use client"

import { useState, useEffect } from "react"
import { AoE4Button } from "@/components/aoe4-button"
import { Trophy, Star } from "lucide-react"
import { useRouter } from "next/navigation"

interface VictoryNotificationProps {
  isVisible: boolean
  onClose: () => void
  focusPoints: number
  completedHexes: number
  totalHexes: number
}

export function VictoryNotification({
  isVisible,
  onClose,
  focusPoints,
  completedHexes,
  totalHexes,
}: VictoryNotificationProps) {
  const router = useRouter()
  const [stars, setStars] = useState(0)

  useEffect(() => {
    // Calcular estrelas com base na porcentagem de hexágonos completados
    const percentage = (completedHexes / totalHexes) * 100
    if (percentage >= 90) {
      setStars(3)
    } else if (percentage >= 70) {
      setStars(2)
    } else {
      setStars(1)
    }
  }, [completedHexes, totalHexes])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-aoe-panel border border-aoe-gold rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-500" />
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
              <span className="text-aoe-muted">Hexágonos Conquistados</span>
              <span className="text-aoe-light">
                {completedHexes}/{totalHexes}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-aoe-muted">Pontos de Foco Ganhos</span>
              <span className="text-blue-400">+{focusPoints}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-aoe-muted">Estrelas</span>
              <span className="text-yellow-400">{stars}/3</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <AoE4Button variant="secondary" onClick={() => router.push("/stats")}>
            Ver Estatísticas
          </AoE4Button>
          <AoE4Button onClick={onClose}>Continuar</AoE4Button>
        </div>
      </div>
    </div>
  )
}
