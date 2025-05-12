"use client"

import { useState } from "react"
import { Smile, Meh, Frown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type MoodType = "good" | "normal" | "bad"

interface ResourceBarProps {
  focus: number
  recreation: number
  mood: MoodType
  dayProgress: number
  onMoodChange: (mood: MoodType) => void
}

export function ResourceBar({ focus, recreation, mood, dayProgress, onMoodChange }: ResourceBarProps) {
  const [showMoodSelector, setShowMoodSelector] = useState(false)

  // Formatar o tempo restante do dia (para demonstração)
  const formatTimeRemaining = () => {
    const hours = Math.floor(dayProgress / 60)
    const minutes = dayProgress % 60
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="bg-aoe-panel border-b border-aoe-border p-2 flex items-center justify-between">
      {/* Recursos */}
      <div className="flex items-center space-x-6">
        {/* Pontos de Foco */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center mr-2">
            <span className="text-blue-200 font-bold text-sm">F</span>
          </div>
          <div>
            <p className="text-aoe-light text-xs">Pontos de Foco</p>
            <p className="text-aoe-gold font-bold">{focus}</p>
          </div>
        </div>

        {/* Pontos de Recreação */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center mr-2">
            <span className="text-green-200 font-bold text-sm">R</span>
          </div>
          <div>
            <p className="text-aoe-light text-xs">Recreação</p>
            <p className="text-aoe-gold font-bold">{recreation} min</p>
          </div>
        </div>

        {/* Humor */}
        <div className="flex items-center relative">
          <div
            className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center mr-2 cursor-pointer"
            onClick={() => setShowMoodSelector(!showMoodSelector)}
          >
            {mood === "good" && <Smile className="h-5 w-5 text-purple-200" />}
            {mood === "normal" && <Meh className="h-5 w-5 text-purple-200" />}
            {mood === "bad" && <Frown className="h-5 w-5 text-purple-200" />}
          </div>
          <div>
            <p className="text-aoe-light text-xs">Humor</p>
            <p className="text-aoe-gold font-bold capitalize">
              {mood === "good" && "Bom"}
              {mood === "normal" && "Normal"}
              {mood === "bad" && "Ruim"}
            </p>
          </div>

          {/* Seletor de humor */}
          {showMoodSelector && (
            <div className="absolute top-full left-0 mt-2 bg-aoe-panel border border-aoe-border rounded-md p-2 z-20 flex space-x-2">
              <button
                className={`p-1 rounded-md ${mood === "good" ? "bg-purple-900" : "hover:bg-aoe-dark-blue"}`}
                onClick={() => {
                  onMoodChange("good")
                  setShowMoodSelector(false)
                }}
              >
                <Smile className="h-6 w-6 text-purple-200" />
              </button>
              <button
                className={`p-1 rounded-md ${mood === "normal" ? "bg-purple-900" : "hover:bg-aoe-dark-blue"}`}
                onClick={() => {
                  onMoodChange("normal")
                  setShowMoodSelector(false)
                }}
              >
                <Meh className="h-6 w-6 text-purple-200" />
              </button>
              <button
                className={`p-1 rounded-md ${mood === "bad" ? "bg-purple-900" : "hover:bg-aoe-dark-blue"}`}
                onClick={() => {
                  onMoodChange("bad")
                  setShowMoodSelector(false)
                }}
              >
                <Frown className="h-6 w-6 text-purple-200" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progresso do dia */}
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="text-aoe-light text-xs">Tempo Restante</p>
          <p className="text-aoe-gold font-bold">{formatTimeRemaining()}</p>
        </div>
        <div className="w-32">
          <Progress value={dayProgress} max={100} className="h-2" />
        </div>
      </div>
    </div>
  )
}
