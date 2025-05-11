"use client"

import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()

  // Não mostrar o footer na página inicial ou nas páginas do app
  if (
    pathname === "/" ||
    pathname.startsWith("/qg") ||
    pathname.startsWith("/war-room") ||
    pathname.startsWith("/maps") ||
    pathname.startsWith("/tasks") ||
    pathname.startsWith("/stats") ||
    pathname.startsWith("/shop") ||
    pathname.startsWith("/settings")
  ) {
    return null
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-400">© {currentYear} Opus Focus. Todos os direitos reservados.</p>
        <p className="text-sm text-gray-400 mt-1">Desenvolvido com paixão por Igor Leno.</p>
      </div>
    </footer>
  )
}
