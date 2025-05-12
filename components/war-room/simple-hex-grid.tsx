"use client"
import { Book, Code, Video, Trophy, Flag } from "lucide-react"

interface SimpleHexProps {
  id: string
  title: string
  type: string
  difficulty: string
  status: string
  position: { x: number; y: number }
  isSelected: boolean
  onClick: (id: string) => void
}

function SimpleHex({ id, title, type, difficulty, status, position, isSelected, onClick }: SimpleHexProps) {
  // Determinar a cor base do hexágono com base na dificuldade
  const getBaseColor = () => {
    switch (difficulty) {
      case "easy":
        return "bg-blue-600"
      case "medium":
        return "bg-purple-600"
      case "hard":
        return "bg-red-600"
      case "reward":
        return "bg-emerald-600"
      case "special":
        return "bg-amber-500"
      case "start":
        return "bg-teal-600"
      default:
        return "bg-gray-600"
    }
  }

  // Determinar o ícone com base no tipo
  const getIcon = () => {
    switch (type) {
      case "reading":
        return <Book className="h-6 w-6" />
      case "coding":
        return <Code className="h-6 w-6" />
      case "video":
        return <Video className="h-6 w-6" />
      case "reward":
        return <Trophy className="h-6 w-6" />
      case "start":
      default:
        return <Flag className="h-6 w-6" />
    }
  }

  // Determinar classes adicionais com base no status
  const getStatusClasses = () => {
    switch (status) {
      case "locked":
        return "opacity-50 grayscale"
      case "available":
        return "opacity-100"
      case "conquered":
        return "opacity-100 ring-4 ring-aoe-gold ring-opacity-80"
      default:
        return ""
    }
  }

  return (
    <div
      className={`absolute ${getBaseColor()} ${getStatusClasses()} ${
        isSelected ? "ring-4 ring-white" : ""
      } cursor-pointer hover:brightness-110 transition-all duration-200`}
      style={{
        width: "100px",
        height: "115px",
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onClick={() => onClick(id)}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-black/20">{getIcon()}</div>
        <div className="mt-1 text-xs font-bold text-center px-2 truncate max-w-full">{title}</div>
      </div>
    </div>
  )
}

interface SimpleHexGridProps {
  onSelectHex: (id: string) => void
  selectedHexId: string | null
}

export function SimpleHexGrid({ onSelectHex, selectedHexId }: SimpleHexGridProps) {
  // Dados de exemplo para os hexágonos
  const hexes = [
    {
      id: "hex1",
      title: "Tarefa Inicial",
      type: "start",
      difficulty: "start",
      status: "available",
      position: { x: 300, y: 250 },
    },
    {
      id: "hex2",
      title: "Leitura Básica",
      type: "reading",
      difficulty: "easy",
      status: "available",
      position: { x: 400, y: 200 },
    },
    {
      id: "hex3",
      title: "Vídeo Tutorial",
      type: "video",
      difficulty: "easy",
      status: "locked",
      position: { x: 350, y: 150 },
    },
    {
      id: "hex4",
      title: "Exercício Prático",
      type: "coding",
      difficulty: "medium",
      status: "locked",
      position: { x: 250, y: 150 },
    },
    {
      id: "hex5",
      title: "Recompensa",
      type: "reward",
      difficulty: "reward",
      status: "locked",
      position: { x: 450, y: 250 },
    },
    {
      id: "hex6",
      title: "Objetivo Final",
      type: "special",
      difficulty: "special",
      status: "locked",
      position: { x: 200, y: 250 },
    },
  ]

  return (
    <div className="relative w-full h-full overflow-hidden bg-aoe-map-bg">
      {/* Grid background pattern */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
        <defs>
          <pattern id="hexPattern" width="100" height="115" patternUnits="userSpaceOnUse">
            <path d="M50,0 L100,25 L100,75 L50,100 L0,75 L0,25 Z" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>

      {/* Centering container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Actual grid with hexes */}
        <div className="relative" style={{ width: "800px", height: "600px" }}>
          {hexes.map((hex) => (
            <SimpleHex key={hex.id} {...hex} isSelected={selectedHexId === hex.id} onClick={onSelectHex} />
          ))}
        </div>
      </div>
    </div>
  )
}
