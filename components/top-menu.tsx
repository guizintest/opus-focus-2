"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Volume2, BarChart2, ShoppingCart, Settings } from "lucide-react"

interface TopMenuProps {
  activeItem: string
}

export function TopMenu({ activeItem }: TopMenuProps) {
  const { user, signOut } = useAuth()

  const menuItems = [
    { id: "qg", label: "QG", href: "/qg" },
    { id: "mapas", label: "MAPAS", href: "/maps" },
    { id: "mapa-do-dia", label: "MAPA DO DIA", href: "/war-room" },
    { id: "tarefas", label: "TAREFAS", href: "/tasks" },
  ]

  return (
    <div className="bg-aoe-dark-blue border-b border-aoe-border h-14 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex-1">
        <Link href="/" className="text-aoe-gold font-cinzel text-2xl">
          OPUS FOCUS
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`px-4 py-3 transition-colors duration-200 font-cinzel ${
              activeItem === item.id ? "bg-aoe-button text-aoe-gold" : "text-aoe-light hover:text-aoe-gold"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        <button className="text-aoe-light hover:text-aoe-gold">
          <Volume2 className="h-5 w-5" />
        </button>
        <button className="text-aoe-light hover:text-aoe-gold">
          <BarChart2 className="h-5 w-5" />
        </button>
        <button className="text-aoe-light hover:text-aoe-gold">
          <ShoppingCart className="h-5 w-5" />
        </button>
        <button className="text-aoe-light hover:text-aoe-gold">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
