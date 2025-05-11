"use client"

import { useState } from "react"
import { AoE4Button } from "@/components/aoe4-button"
import { MapCard } from "@/components/map-card"
import { mapsData } from "@/data/maps-data"
import { Search } from "lucide-react"

export default function MapsPage() {
  const [filter, setFilter] = useState<"todos" | "em-progresso" | "concluidos">("todos")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMaps = mapsData.filter((map) => {
    const matchesSearch = map.title.toLowerCase().includes(searchTerm.toLowerCase())

    if (filter === "todos") return matchesSearch
    if (filter === "em-progresso") return matchesSearch && map.progress > 0 && map.progress < 100
    if (filter === "concluidos") return matchesSearch && map.progress === 100

    return matchesSearch
  })

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-cinzel text-aoe-gold">Seus Mapas de Conquista</h1>
        <AoE4Button>Novo Mapa</AoE4Button>
      </div>

      <div className="bg-aoe-panel border border-aoe-border rounded-md p-4 mb-8">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aoe-muted h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar mapas..."
              className="w-full bg-aoe-dark-blue border border-aoe-border rounded-md py-2 pl-10 pr-4 text-aoe-light placeholder:text-aoe-muted focus:outline-none focus:ring-1 focus:ring-aoe-gold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <AoE4Button variant={filter === "todos" ? "default" : "secondary"} onClick={() => setFilter("todos")}>
              Todos
            </AoE4Button>
            <AoE4Button
              variant={filter === "em-progresso" ? "default" : "secondary"}
              onClick={() => setFilter("em-progresso")}
            >
              Em Progresso
            </AoE4Button>
            <AoE4Button
              variant={filter === "concluidos" ? "default" : "secondary"}
              onClick={() => setFilter("concluidos")}
            >
              Concluídos
            </AoE4Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaps.map((map) => (
            <MapCard key={map.id} map={map} />
          ))}
        </div>
      </div>
    </div>
  )
}
