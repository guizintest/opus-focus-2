"use client"

import type React from "react"

import { useState } from "react"
import { AoE4Button } from "@/components/aoe4-button"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function ResetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = getSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Validar senha
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        setError(error.message || "Falha ao redefinir senha. Tente novamente.")
      } else {
        setSuccess(true)
        // Redirecionar após 2 segundos
        setTimeout(() => {
          router.push("/login")
        }, 2000)
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

        {success && (
          <div className="bg-green-900/20 border border-green-800 rounded-md p-3 flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-green-400 text-sm">
              Senha redefinida com sucesso! Redirecionando para a página de login...
            </p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-aoe-light">
            Nova Senha
          </label>
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

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-aoe-light">
            Confirmar Nova Senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-2 focus:ring-aoe-gold"
            placeholder="••••••••"
          />
        </div>

        <AoE4Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Redefinindo...
            </>
          ) : (
            "Redefinir Senha"
          )}
        </AoE4Button>
      </form>
    </div>
  )
}
