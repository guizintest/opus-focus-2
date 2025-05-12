"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface AoE4PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark"
  children: React.ReactNode
}

export function AoE4Panel({ variant = "default", className, children, ...props }: AoE4PanelProps) {
  return (
    <div
      className={cn(
        "border rounded-md shadow-md overflow-hidden",
        variant === "default" ? "bg-aoe-panel border-aoe-border" : "bg-aoe-dark-blue border-aoe-border",
        className,
      )}
      {...props}
    >
      <div className="p-4">{children}</div>
    </div>
  )
}
