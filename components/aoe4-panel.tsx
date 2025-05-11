import type React from "react"
import { cn } from "@/lib/utils"

interface AoE4PanelProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export function AoE4Panel({ children, title, className }: AoE4PanelProps) {
  return (
    <div className={cn("bg-aoe-panel border border-aoe-border rounded-md shadow-md overflow-hidden", className)}>
      {title && (
        <div className="bg-aoe-panel-header border-b border-aoe-border p-3">
          <h2 className="text-lg font-bold text-aoe-gold font-cinzel">{title}</h2>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  )
}
