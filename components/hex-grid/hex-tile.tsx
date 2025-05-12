"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Book, Code, Video, HelpCircle, Flag, Trophy, AlertTriangle, Lock, CheckCircle } from "lucide-react"

export type HexDifficulty = "easy" | "medium" | "hard" | "reward" | "special" | "start"
export type HexStatus = "locked" | "available" | "conquered"
export type HexType = "reading" | "coding" | "video" | "quiz" | "reward" | "special" | "start" | "task"

export interface HexTileProps {
  id: string
  difficulty: HexDifficulty
  type: HexType
  status: HexStatus
  title: string
  description?: string
  points?: number
  estimatedTime?: string
  isSelected?: boolean
  isAttacked?: boolean
  onClick?: (id: string) => void
  position?: { q: number; r: number; s: number }
  position_q?: number
  position_r?: number
  position_s?: number
}

export function HexTile({
  id,
  difficulty,
  type,
  status,
  title,
  description,
  points,
  estimatedTime,
  isSelected = false,
  isAttacked = false,
  onClick,
  position,
  position_q,
  position_r,
  position_s,
}: HexTileProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Usar position se fornecido, caso contrário, usar position_x, position_y, position_z
  const q = position?.q ?? position_q ?? 0
  const r = position?.r ?? position_r ?? 0
  const s = position?.s ?? position_s ?? 0

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
      case "quiz":
        return <AlertTriangle className="h-6 w-6" />
      case "reward":
        return <Trophy className="h-6 w-6" />
      case "special":
        return <Trophy className="h-6 w-6" />
      case "start":
        return <Flag className="h-6 w-6" />
      case "task":
        return <CheckCircle className="h-6 w-6" />
      default:
        return <HelpCircle className="h-6 w-6" />
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
        return "opacity-100 ring-4 ring-aoe-gold ring-opacity-80 shadow-lg shadow-aoe-gold/30"
      default:
        return ""
    }
  }

  // Determinar se o hexágono é clicável
  const isClickable = status === "available" || status === "conquered"

  return (
    <div
      className={cn(
        "hex-tile absolute",
        getBaseColor(),
        getStatusClasses(),
        isSelected ? "ring-4 ring-white" : "",
        isAttacked ? "animate-pulse ring-4 ring-red-500" : "",
        isClickable ? "cursor-pointer hover:brightness-110" : "cursor-not-allowed",
        "transition-all duration-200",
      )}
      style={{
        width: "100px",
        height: "115px",
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        transform: `translate(${q * 75}px, ${r * 86}px)`,
      }}
      onClick={() => isClickable && onClick && onClick(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        {status === "locked" && <Lock className="absolute top-2 right-2 h-4 w-4 text-gray-300" />}
        {status === "conquered" && <CheckCircle className="absolute top-2 right-2 h-4 w-4 text-green-300" />}

        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-black/20">{getIcon()}</div>

        <div className="mt-1 text-xs font-bold text-center px-2 truncate max-w-full">{title}</div>

        {points && status !== "locked" && <div className="text-xs mt-1 font-medium text-yellow-300">+{points} pts</div>}
      </div>

      {/* Tooltip on hover */}
      {isHovered && status !== "locked" && (
        <div className="absolute z-10 w-48 bg-aoe-panel border border-aoe-border rounded-md p-2 shadow-lg -top-24 left-1/2 transform -translate-x-1/2">
          <h4 className="font-bold text-aoe-gold text-sm">{title}</h4>
          {description && <p className="text-xs text-aoe-muted mt-1">{description}</p>}
          <div className="flex justify-between mt-2 text-xs">
            <span className="text-aoe-light">{estimatedTime}</span>
            <span className="text-yellow-400">+{points} pts</span>
          </div>
        </div>
      )}
    </div>
  )
}
