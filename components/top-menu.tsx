"use client"

import Link from "next/link"

interface TopMenuProps {
  activeItem: string
}

export function TopMenu({ activeItem }: TopMenuProps) {
  const menuItems = [
    { id: "qg", label: "QG", href: "/qg" },
    { id: "mapas", label: "Mapas", href: "/maps" },
    { id: "mapa-do-dia", label: "Mapa do Dia", href: "/war-room" },
    { id: "tarefas", label: "Tarefas", href: "/tasks" },
  ]

  return (
    <div className="bg-aoe-panel border-b border-aoe-border h-12 min-h-[3rem] flex-shrink-0 flex items-center px-4">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`px-4 h-full flex items-center transition-colors duration-200 ${
            activeItem === item.id ? "border-b-2 border-aoe-gold text-aoe-gold" : "text-aoe-muted hover:text-aoe-light"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
