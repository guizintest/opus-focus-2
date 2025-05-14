"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-aoe-dark-blue items-center justify-center">
        <Loader2 className="h-12 w-12 text-aoe-gold animate-spin mb-4" />
        <p className="text-aoe-light text-lg">Carregando...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
