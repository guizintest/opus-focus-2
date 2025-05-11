import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { AoE4Button } from "./aoe4-button"
import type { MapItem } from "@/types/map"

interface MapCardProps {
  map: MapItem
}

export function MapCard({ map }: MapCardProps) {
  return (
    <div className="bg-aoe-dark-blue border border-aoe-border rounded-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-cinzel text-aoe-gold">{map.title}</h3>
          <div className="flex items-center text-xs text-aoe-muted">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{map.date}</span>
          </div>
        </div>
        <p className="text-sm text-aoe-muted mb-4">{map.description}</p>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-xs text-aoe-muted">
            <Clock className="h-3 w-3 mr-1" />
            <span>{map.lastActivity}</span>
          </div>
          <span className="text-sm font-medium text-aoe-gold">{map.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-aoe-panel rounded-full mb-4 overflow-hidden">
          <div className="h-full bg-aoe-gold rounded-full" style={{ width: `${map.progress}%` }}></div>
        </div>
        <div className="flex justify-between">
          <AoE4Button variant="secondary" size="sm">
            <Link href={`/map/${map.id}`}>Visualizar</Link>
          </AoE4Button>
          <AoE4Button size="sm">
            <Link href={`/war-room?map=${map.id}`}>Conquistar</Link>
          </AoE4Button>
        </div>
      </div>
    </div>
  )
}
