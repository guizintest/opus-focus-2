"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Volume2, BarChart2, ShoppingCart, Settings } from "lucide-react"

export function TopBar() {
  const pathname = usePathname()

  const getPageTitle = () => {
    switch (true) {
      case pathname === "/" || pathname === "/qg":
        return "Conquer Focus"
      case pathname.startsWith("/maps"):
        return "Mapas"
      case pathname.startsWith("/war-room"):
        return "Mapa do Dia"
      case pathname.startsWith("/tasks"):
        return "Tarefas"
      case pathname.startsWith("/stats"):
        return "Estatísticas"
      case pathname.startsWith("/shop"):
        return "Loja"
      case pathname.startsWith("/settings"):
        return "Configurações"
      default:
        return "Conquer Focus"
    }
  }

  return (
    <header className="h-16 min-h-[4rem] flex-shrink-0 bg-aoe-panel border-b border-aoe-border px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-cinzel text-aoe-gold">
          {getPageTitle()}
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-1">
        <Link
          href="/qg"
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            pathname === "/qg" || pathname === "/"
              ? "bg-aoe-button text-aoe-gold"
              : "text-aoe-muted hover:bg-aoe-panel-header hover:text-aoe-light"
          }`}
        >
          QG
        </Link>
        <Link
          href="/maps"
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            pathname.startsWith("/maps")
              ? "bg-aoe-button text-aoe-gold"
              : "text-aoe-muted hover:bg-aoe-panel-header hover:text-aoe-light"
          }`}
        >
          MAPAS
        </Link>
        <Link
          href="/war-room"
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            pathname.startsWith("/war-room")
              ? "bg-aoe-button text-aoe-gold"
              : "text-aoe-muted hover:bg-aoe-panel-header hover:text-aoe-light"
          }`}
        >
          MAPA DO DIA
        </Link>
        <Link
          href="/tasks"
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            pathname.startsWith("/tasks")
              ? "bg-aoe-button text-aoe-gold"
              : "text-aoe-muted hover:bg-aoe-panel-header hover:text-aoe-light"
          }`}
        >
          TAREFAS
        </Link>
      </nav>

      <div className="flex items-center space-x-2">
        <button className="w-10 h-10 rounded-md flex items-center justify-center text-aoe-muted hover:bg-aoe-panel-header hover:text-aoe-light transition-colors duration-200">
          <Volume2 className="w-5 h-5" />
        </button>
        <Link
          href="/stats"
          className="w-10 h-10 rounded-md flex items-center justify-center text-aoe-muted hover:bg-aoe-panel-header hover:text-aoe-light transition-colors duration-200"
        >
          <BarChart2 className="w-5 h-5" />
        </Link>
        <Link
          href="/shop"
          className="w-10 h-10 rounded-md flex items-center justify-center text-aoe-muted hover:bg-aoe-panel-header hover:text-aoe-light transition-colors duration-200"
        >
          <ShoppingCart className="w-5 h-5" />
        </Link>
        <Link
          href="/settings"
          className="w-10 h-10 rounded-md flex items-center justify-center text-aoe-muted hover:bg-aoe-panel-header hover:text-aoe-light transition-colors duration-200"
        >
          <Settings className="w-5 h-5" />
        </Link>
      </div>
    </header>
  )
}
