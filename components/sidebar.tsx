"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Map, Calendar, ListTodo, BarChart2, ShoppingCart, Settings } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navItems = [
    { path: "/qg", icon: <LayoutDashboard className="w-5 h-5" />, label: "QG" },
    { path: "/maps", icon: <Map className="w-5 h-5" />, label: "Mapas" },
    { path: "/war-room", icon: <Calendar className="w-5 h-5" />, label: "Mapa do Dia" },
    { path: "/tasks", icon: <ListTodo className="w-5 h-5" />, label: "Tarefas" },
    { path: "/stats", icon: <BarChart2 className="w-5 h-5" />, label: "Estatísticas" },
    { path: "/shop", icon: <ShoppingCart className="w-5 h-5" />, label: "Loja" },
    { path: "/settings", icon: <Settings className="w-5 h-5" />, label: "Configurações" },
  ]

  return (
    <div className="w-16 min-w-[4rem] flex-shrink-0 bg-aoe-panel border-r border-aoe-border flex flex-col items-center py-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`w-10 h-10 flex items-center justify-center rounded-md mb-6 transition-colors duration-200 ${
            isActive(item.path)
              ? "bg-aoe-button text-aoe-gold"
              : "text-aoe-muted hover:bg-aoe-panel-header hover:text-aoe-light"
          }`}
          title={item.label}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  )
}
