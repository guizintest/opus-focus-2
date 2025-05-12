"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aoe-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-aoe-button text-aoe-gold hover:bg-aoe-button-hover border border-aoe-gold/50",
        secondary: "bg-aoe-dark-blue text-aoe-light hover:bg-aoe-panel-header border border-aoe-border",
        destructive: "bg-red-900 text-white hover:bg-red-800 border border-red-700",
        ghost: "hover:bg-aoe-panel-header hover:text-aoe-gold",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface AoE4ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function AoE4Button({ className, variant, size, ...props }: AoE4ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
