"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, User } from "lucide-react"

interface TopMenuProps {
  activeItem: string
}

export function TopMenu({ activeItem }: TopMenuProps) {
  const { user, signOut } = useAuth()

  const menuItems = [
    { id: "qg", label: "QG", href: "/qg" },
    { id: "mapas", label: "Mapas", href: "/maps" },
    { id: "mapa-do-dia", label: "Mapa do Dia", href: "/war-room" },
    { id: "tarefas", label: "Tarefas", href: "/tasks" },
  ]

  return (
    <div className="bg-aoe-panel border-b border-aoe-border h-12 flex items-center justify-between px-4">
      <div className="flex items-center">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`px-4 py-3 transition-colors duration-200 font-cinzel ${
              activeItem === item.id
                ? "border-b-2 border-aoe-gold text-aoe-gold"
                : "text-aoe-muted hover:text-aoe-light"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center">
        {user && (
          <>
            <div className="flex items-center mr-4">
              <User className="h-4 w-4 text-aoe-muted mr-2" />
              <span className="text-aoe-light text-sm">{user.user_metadata.username || user.email}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center text-aoe-muted hover:text-aoe-light transition-colors"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span className="text-sm">Sair</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
