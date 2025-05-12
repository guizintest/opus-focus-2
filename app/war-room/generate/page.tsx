"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AoE4Button } from "@/components/aoe4-button"
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react"

export default function GenerateMapPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleGenerateMap = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/war-room/generate-map", {
        method: "POST",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Falha ao gerar mapa")
      }

      setSuccess(true)

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/war-room")
      }, 2000)
    } catch (err) {
      console.error("Erro ao gerar mapa:", err)
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-aoe-panel border border-aoe-border rounded-lg p-6">
        <h1 className="text-2xl font-cinzel text-aoe-gold mb-4 text-center">Gerar Mapa do Dia</h1>

        <p className="text-aoe-light mb-6">
          Não há um mapa ativo para hoje. Gere um novo mapa para começar sua jornada de conquista!
        </p>

        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-md p-4 mb-6 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-900/20 border border-green-800 rounded-md p-4 mb-6 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <p className="text-green-400 text-sm">Mapa gerado com sucesso! Redirecionando...</p>
          </div>
        )}

        <div className="flex justify-center">
          <AoE4Button onClick={handleGenerateMap} disabled={loading || success} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Gerando Mapa...
              </>
            ) : (
              "Gerar Novo Mapa"
            )}
          </AoE4Button>
        </div>
      </div>
    </div>
  )
}
