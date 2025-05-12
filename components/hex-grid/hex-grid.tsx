"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { HexTile, type HexTileProps } from "./hex-tile"

interface HexGridProps {
  hexes: Array<Omit<HexTileProps, "onClick" | "isSelected">>
  onSelectHex: (id: string) => void
  selectedHexId?: string | null
}

export function HexGrid({ hexes, onSelectHex, selectedHexId }: HexGridProps) {
  const [mounted, setMounted] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Manipuladores de eventos para arrastar o mapa
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Manipuladores para zoom
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleZoomReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  if (!mounted) return null

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-aoe-map-bg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Controles de zoom */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          className="w-8 h-8 bg-aoe-panel border border-aoe-border rounded-md flex items-center justify-center text-aoe-light hover:bg-aoe-button"
          onClick={handleZoomIn}
        >
          +
        </button>
        <button
          className="w-8 h-8 bg-aoe-panel border border-aoe-border rounded-md flex items-center justify-center text-aoe-light hover:bg-aoe-button"
          onClick={handleZoomOut}
        >
          -
        </button>
        <button
          className="w-8 h-8 bg-aoe-panel border border-aoe-border rounded-md flex items-center justify-center text-aoe-light hover:bg-aoe-button"
          onClick={handleZoomReset}
        >
          R
        </button>
      </div>

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
        <div
          className="relative"
          style={{
            width: "800px",
            height: "600px",
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transformOrigin: "center",
            transition: isDragging ? "none" : "transform 0.2s ease-out",
          }}
        >
          {hexes.map((hex) => (
            <HexTile
              key={hex.id}
              {...hex}
              isSelected={selectedHexId === hex.id}
              onClick={onSelectHex}
              // Garantir que a posição seja passada corretamente
              position={{
                q: hex.position_q ?? 0,
                r: hex.position_r ?? 0,
                s: hex.position_s ?? 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
