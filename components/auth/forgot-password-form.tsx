"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { AoE4Button } from "@/components/aoe4-button"
import { Loader2, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await resetPassword(email)
      if (error) {
        setError(error.message || "Falha ao enviar email de recuperação. Tente novamente.")
      } else {
        setSuccess(true)
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
              Email de recuperação enviado! Verifique sua caixa de entrada para redefinir sua senha.
            </p>
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

        <AoE4Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar Email de Recuperação"
          )}
        </AoE4Button>

        <div className="text-center mt-4">
          <Link href="/login" className="text-aoe-gold hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para o login
          </Link>
        </div>
      </form>
    </div>
  )
}
