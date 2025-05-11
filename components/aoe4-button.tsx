"use client"

import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-aoe-button hover:bg-aoe-button-hover text-aoe-gold border border-aoe-border",
        secondary: "bg-aoe-secondary hover:bg-aoe-secondary-hover text-aoe-light border border-aoe-border",
        outline: "border border-aoe-gold text-aoe-gold hover:bg-aoe-button-hover",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function AoE4Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  // Adiciona um efeito de clique ao botão
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const ripple = document.createElement("span")

    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.className = "absolute rounded-full bg-white bg-opacity-30 pointer-events-none animate-ripple"

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }), "overflow-hidden")}
      onClick={handleClick}
      {...props}
    />
  )
}
