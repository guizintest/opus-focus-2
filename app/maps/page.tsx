"use client"

import { TopMenu } from "@/components/top-menu"
import { ResourceBar } from "@/components/resource-bar"
import { AoE4Button } from "@/components/aoe4-button"
import Link from "next/link"
import { Calendar, Star } from "lucide-react"

export default function MapsPage() {
  const userProfile = {
    focus_points: 100,
    recreation_points: 30,
    current_mood: "normal" as "good" | "normal" | "bad",
  }

  const handleMoodChange = (mood: "good" | "normal" | "bad") => {
    console.log("Mood changed to:", mood)
  }

  const maps = [
    {
      id: "map-2023-05-11",
      name: "Mapa do Dia",
      description: "Mapa diário com tarefas variadas",
      difficulty: "medium",
      completed: false,
      isToday: true,
    },
    {
      id: "map-2023-05-10",
      name: "Fundamentos de React",
      description: "Aprenda os conceitos básicos do React",
      difficulty: "easy",
      completed: true,
      isToday: false,
    },
    {
      id: "map-2023-05-09",
      name: "Algoritmos Avançados",
      description: "Estude algoritmos complexos e estruturas de dados",
      difficulty: "hard",
      completed: false,
      isToday: false,
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-aoe-dark-blue">
      <TopMenu activeItem="mapas" />

      <ResourceBar
        focus={userProfile.focus_points}
        recreation={userProfile.recreation_points}
        mood={userProfile.current_mood}
        dayProgress={40}
        onMoodChange={handleMoodChange}
      />

      <div className="container mx-auto p-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-aoe-gold font-cinzel">MAPAS</h1>
          <AoE4Button>Criar Novo Mapa</AoE4Button>
        </div>

        <div className="space-y-4">
          {maps.map((map) => (
            <div
              key={map.id}
              className={`bg-aoe-panel border rounded-md p-4 ${map.isToday ? "border-aoe-gold" : "border-aoe-border"}`}
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  {map.isToday ? (
                    <Calendar className="h-8 w-8 text-aoe-gold" />
                  ) : (
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        map.difficulty === "easy"
                          ? "bg-blue-600"
                          : map.difficulty === "medium"
                            ? "bg-purple-600"
                            : "bg-red-600"
                      }`}
                    >
                      <span className="text-white font-bold">
                        {map.difficulty === "easy" ? "E" : map.difficulty === "medium" ? "M" : "H"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center">
                    <h2 className="text-lg font-medium text-aoe-light">{map.name}</h2>
                    {map.isToday && (
                      <span className="ml-2 px-2 py-0.5 bg-aoe-gold text-black text-xs rounded-full">Hoje</span>
                    )}
                    {map.completed && (
                      <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">Completo</span>
                    )}
                  </div>

                  <p className="text-aoe-muted text-sm mt-1">{map.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <span className="text-sm text-aoe-muted mr-2">Dificuldade:</span>
                      <div className="flex">
                        {[...Array(map.difficulty === "easy" ? 1 : map.difficulty === "medium" ? 3 : 5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-aoe-gold" fill="currentColor" />
                        ))}
                      </div>
                    </div>

                    <Link href={map.isToday ? "/war-room" : `/maps/${map.id}`}>
                      <AoE4Button>{map.isToday ? "Jogar Agora" : "Ver Detalhes"}</AoE4Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
