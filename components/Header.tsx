"use client"

import { usePathname } from "next/navigation"
import { TopBar } from "./top-bar"
import { Sidebar } from "./sidebar"

export default function Header() {
  const pathname = usePathname()

  // Não mostrar o header na página inicial
  if (pathname === "/") {
    return null
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="flex">
        <Sidebar />
        <TopBar />
      </div>
    </header>
  )
}
