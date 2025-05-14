"use client"
import { Book, Code, Video, Trophy, Flag, Lock, CheckCircle } from "lucide-react"
import type React from "react"

import { useEffect, useState, useRef } from "react"
import { hexToPixel, HEX_SIZE } from "@/lib/hex-utils"
import type { Hexagon } from "@/types/supabase"

interface SimpleHexProps {
  id: string
  title: string
  type: string
  difficulty: string
  status: string
  position_q: number
  position_r: number
  position_s: number
  isSelected: boolean
  onClick: (id: string) => void
}

function SimpleHex({
  id,
  title,
  type,
  difficulty,
  status,
  position_q,
  position_r,
  position_s,
  isSelected,
  onClick,
}: SimpleHexProps) {
  // Determinar a cor base do hexágono com base na dificuldade
  const getBaseColor = () => {
    switch (difficulty) {
      case "easy":
        return "hex-difficulty-easy"
      case "medium":
        return "hex-difficulty-medium"
      case "hard":
        return "hex-difficulty-hard"
      case "reward":
        return "hex-difficulty-reward"
      case "special":
        return "hex-difficulty-special"
      case "start":
        return "hex-difficulty-start"
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
        return "opacity-100 ring-4 ring-aoe-gold ring-opacity-80 hex-conquered"
      default:
        return ""
    }
  }

  // Calcular a posição do hexágono
  const { x, y } = hexToPixel(position_q, position_r)

  return (
    <div
      className={`absolute ${getBaseColor()} ${getStatusClasses()} ${
        isSelected ? "ring-4 ring-white hex-selected" : ""
      } cursor-pointer hover:brightness-110 transition-all duration-200`}
      style={{
        width: `${HEX_SIZE * 2}px`,
        height: `${HEX_SIZE * 2}px`,
        clipPath: `polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`,
        transform: `translate(${x - HEX_SIZE}px, ${y - HEX_SIZE}px)`,
      }}
      onClick={() => onClick(id)}
      data-q={position_q}
      data-r={position_r}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        {status === "locked" && <Lock className="absolute top-2 right-2 h-4 w-4 text-gray-300" />}
        {status === "conquered" && <CheckCircle className="absolute top-2 right-2 h-4 w-4 text-green-300" />}
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-black/20">{getIcon()}</div>
        <div className="mt-1 text-xs font-bold text-center px-2 truncate max-w-full">{title}</div>
      </div>
    </div>
  )
}

interface SimpleHexGridProps {
  hexagons: Array<Hexagon & { status: string }>
  connections: Array<{ from: { q: number; r: number }; to: { q: number; r: number } }>
  selectedHexId: string | null
  onSelectHex: (id: string) => void
}

export function SimpleHexGrid({ hexagons, connections, selectedHexId, onSelectHex }: SimpleHexGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [gridCenter, setGridCenter] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setGridCenter({
        x: rect.width / 2,
        y: rect.height / 2,
      })
    }
  }, [])

  // Manipuladores de eventos para arrastar o mapa
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-aoe-map-bg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
        <div className="relative" style={{ width: "800px", height: "600px" }}>
          {/* SVG para as conexões */}
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: "center",
            }}
          >
            {connections.map((connection, index) => {
              const fromPos = hexToPixel(connection.from.q, connection.from.r)
              const toPos = hexToPixel(connection.to.q, connection.to.r)

              return (
                <line
                  key={index}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2"
                />
              )
            })}
          </svg>

          {/* Hexágonos */}
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: "center",
            }}
          >
            {hexagons.map((hex) => (
              <SimpleHex
                key={hex.id}
                id={hex.id}
                title={hex.title}
                type={hex.type}
                difficulty={hex.difficulty}
                status={hex.status}
                position_q={hex.position_q}
                position_r={hex.position_r}
                position_s={hex.position_s}
                isSelected={selectedHexId === hex.id}
                onClick={onSelectHex}
              />
            ))}
          </div>

          {/* Controles de zoom */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <button
              className="w-8 h-8 bg-aoe-panel border border-aoe-border rounded-md flex items-center justify-center text-aoe-light hover:bg-aoe-button"
              onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}
            >
              +
            </button>
            <button
              className="w-8 h-8 bg-aoe-panel border border-aoe-border rounded-md flex items-center justify-center text-aoe-light hover:bg-aoe-button"
              onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.5))}
            >
              -
            </button>
            <button
              className="w-8 h-8 bg-aoe-panel border border-aoe-border rounded-md flex items-center justify-center text-aoe-light hover:bg-aoe-button"
              onClick={() => {
                setZoom(1)
                setPan({ x: 0, y: 0 })
              }}
            >
              R
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
