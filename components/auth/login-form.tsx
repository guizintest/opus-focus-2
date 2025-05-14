"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { AoE4Button } from "@/components/aoe4-button"
import { Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message || "Falha ao fazer login. Verifique suas credenciais.")
      } else {
        router.push("/qg")
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado. Tente novamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-md p-3 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-aoe-light">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-2 focus:ring-aoe-gold"
            placeholder="seu@email.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-aoe-light">
              Senha
            </label>
            <Link href="/forgot-password" className="text-sm text-aoe-gold hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-2 focus:ring-aoe-gold"
            placeholder="••••••••"
          />
        </div>

        <AoE4Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </AoE4Button>

        <div className="text-center mt-4">
          <p className="text-aoe-muted text-sm">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-aoe-gold hover:underline">
              Registre-se
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
