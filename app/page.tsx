"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AoE4Button } from "@/components/aoe4-button"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-aoe-dark-blue flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 text-aoe-gold animate-spin mb-4" />
        <p className="text-aoe-light text-lg">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-aoe-dark-blue flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-aoe-gold font-cinzel mb-6">Guardião do Foco</h1>
      <p className="text-aoe-light max-w-md text-center mb-8">
        Bem-vindo ao Guardião do Foco, seu aplicativo gamificado para gerenciar foco e produtividade.
      </p>

      <div className="space-y-4 w-full max-w-xs">
        {user ? (
          <Link href="/qg" className="block w-full">
            <AoE4Button className="w-full">Entrar no Quartel General</AoE4Button>
          </Link>
        ) : (
          <>
            <Link href="/login" className="block w-full">
              <AoE4Button className="w-full">Entrar</AoE4Button>
            </Link>

            <Link href="/register" className="block w-full">
              <AoE4Button variant="secondary" className="w-full">
                Registrar
              </AoE4Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
