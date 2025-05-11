"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import type { Territory, FogAttack } from "@/types/war-room"
import { Flag, AlertTriangle, Target, Compass } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/contexts/sound-context"

interface WarRoomMapProps {
  territories: Territory[]
  selectedTerritory: string | undefined
  activeFogAttack: FogAttack | null
  onSelectTerritory: (territoryId: string) => void
  onStartTask: (territoryId: string) => void
}

export function WarRoomMap({
  territories,
  selectedTerritory,
  activeFogAttack,
  onSelectTerritory,
  onStartTask,
}: WarRoomMapProps) {
  const { playSound } = useSound()
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapScale, setMapScale] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hoveredTerritory, setHoveredTerritory] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [tooltipContent, setTooltipContent] = useState<Territory | null>(null)

  // Estado para efeitos de névoa
  const [fogOpacity, setFogOpacity] = useState(0.3)
  const [fogParticles, setFogParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([])

  // Inicializar partículas de névoa
  useEffect(() => {
    const particles = []
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * 1000,
        y: Math.random() * 600,
        size: Math.random() * 5 + 2,
        speed: Math.random() * 0.5 + 0.1,
      })
    }
    setFogParticles(particles)
  }, [])

  // Animar partículas de névoa
  useEffect(() => {
    const interval = setInterval(() => {
      setFogParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speed) % 1000,
          y: (particle.y + particle.speed / 2) % 600,
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Manipuladores de eventos para arrastar o mapa
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapPosition({
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
    setMapScale((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setMapScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleZoomReset = () => {
    setMapScale(1)
    setMapPosition({ x: 0, y: 0 })
  }

  // Manipuladores para tooltip
  const handleTerritoryHover = (territory: Territory, e: React.MouseEvent) => {
    setHoveredTerritory(territory.id)
    setTooltipContent(territory)

    // Calcular posição do tooltip
    const rect = mapRef.current?.getBoundingClientRect()
    if (rect) {
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    setShowTooltip(true)
  }

  const handleTerritoryLeave = () => {
    setHoveredTerritory(null)
    setShowTooltip(false)
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-aoe-map-bg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={mapRef}
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
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Mapa SVG */}
      <div
        className="w-full h-full"
        style={{
          transform: `scale(${mapScale}) translate(${mapPosition.x / mapScale}px, ${mapPosition.y / mapScale}px)`,
          transformOrigin: "center",
          transition: isDragging ? "none" : "transform 0.2s ease-out",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
          {/* Definições, gradientes e filtros */}
          <defs>
            <filter id="fogFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            </filter>
            <linearGradient id="playerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="fogGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7e22ce" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="neutralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Fundo do mapa com detalhes */}
          <g className="terrain-details">
            <rect x="0" y="0" width="1000" height="600" fill="#0c1826" />
            <path d="M0,100 Q250,150 500,50 T1000,100 V600 H0 Z" fill="#0f172a" opacity="0.5" />
            <path d="M0,300 Q250,250 500,350 T1000,300 V600 H0 Z" fill="#1e293b" opacity="0.3" />
            <circle cx="800" cy="150" r="50" fill="#1e293b" opacity="0.2" />
            <circle cx="200" cy="450" r="70" fill="#1e293b" opacity="0.2" />
          </g>

          {/* Conexões entre territórios */}
          <g className="connections" pointerEvents="none">
            {territories.map((territory) => {
              if (!territory.connections) return null

              return territory.connections.map((connId) => {
                const connTerritory = territories.find((t) => t.id === connId)
                if (!connTerritory) return null

                const isActive =
                  (territory.owner === "player" && connTerritory.owner === "player") ||
                  selectedTerritory === territory.id ||
                  selectedTerritory === connId

                return (
                  <line
                    key={`${territory.id}-${connId}`}
                    x1={territory.center.x}
                    y1={territory.center.y}
                    x2={connTerritory.center.x}
                    y2={connTerritory.center.y}
                    stroke={isActive ? "#d4b374" : "#3a4b5c"}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive ? "none" : "5,5"}
                    opacity={isActive ? 0.8 : 0.4}
                  />
                )
              })
            })}
          </g>

          {/* Territórios */}
          <g className="territories">
            {territories.map((territory) => {
              const isSelected = selectedTerritory === territory.id
              const isHovered = hoveredTerritory === territory.id
              const isAttacked = activeFogAttack?.territoryId === territory.id

              let fillColor
              switch (territory.owner) {
                case "player":
                  fillColor = "url(#playerGradient)"
                  break
                case "fog":
                  fillColor = "url(#fogGradient)"
                  break
                default:
                  fillColor = "url(#neutralGradient)"
              }

              return (
                <g key={territory.id}>
                  {/* Forma do território */}
                  <path
                    d={territory.path}
                    fill={fillColor}
                    stroke={isSelected ? "#d4b374" : isHovered ? "#94a3b8" : "#3a4b5c"}
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                    opacity={isSelected || isHovered ? 1 : 0.9}
                    onMouseEnter={(e) => handleTerritoryHover(territory, e)}
                    onMouseLeave={handleTerritoryLeave}
                    onClick={() => {
                      playSound("buttonClick")
                      onSelectTerritory(territory.id)
                    }}
                    className={`cursor-pointer transition-all duration-300 hover:brightness-110 ${
                      isAttacked ? "animate-pulse-slow" : ""
                    } ${territory.owner === "player" ? "territory-player" : ""}`}
                  />

                  {/* Ícone do território */}
                  <g
                    transform={`translate(${territory.center.x - 10}, ${territory.center.y - 10})`}
                    className="pointer-events-none"
                  >
                    {territory.owner === "player" ? (
                      <circle cx="10" cy="10" r="12" fill="#1d4ed8" opacity="0.7" />
                    ) : territory.owner === "fog" ? (
                      <circle cx="10" cy="10" r="12" fill="#7e22ce" opacity="0.7" />
                    ) : (
                      <circle cx="10" cy="10" r="12" fill="#475569" opacity="0.7" />
                    )}

                    {territory.owner === "player" ? (
                      <Flag className="w-5 h-5 text-blue-300" x="7.5" y="7.5" />
                    ) : territory.owner === "fog" ? (
                      <AlertTriangle className="w-5 h-5 text-purple-300" x="7.5" y="7.5" />
                    ) : (
                      <Target className="w-5 h-5 text-gray-300" x="7.5" y="7.5" />
                    )}
                  </g>

                  {/* Texto do território */}
                  <text
                    x={territory.center.x}
                    y={territory.center.y + 30}
                    textAnchor="middle"
                    fill="#e5e7eb"
                    fontSize="12"
                    fontWeight={isSelected ? "bold" : "normal"}
                    className="pointer-events-none"
                  >
                    {territory.name}
                  </text>
                </g>
              )
            })}
          </g>

          {/* Partículas de névoa */}
          {fogParticles.map((particle, index) => (
            <circle
              key={`fog-particle-${index}`}
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill="#7e22ce"
              fillOpacity="0.5"
              className="animate-float"
            />
          ))}
        </svg>
      </div>

      {/* Tooltip para território */}
      <AnimatePresence>
        {showTooltip && tooltipContent && (
          <motion.div
            className="absolute z-20 bg-gray-900/90 border border-aoe-gold rounded-md p-3 shadow-lg max-w-xs pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: "translate(-50%, -100%)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-aoe-gold font-medium mb-1">{tooltipContent.name}</h3>
            <p className="text-xs text-aoe-muted mb-2">{tooltipContent.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-aoe-muted">Dificuldade: {tooltipContent.difficulty}/5</span>
              <span className="text-aoe-gold">{tooltipContent.estimatedTime}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
