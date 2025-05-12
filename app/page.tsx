import Link from "next/link"
import { AoE4Button } from "@/components/aoe4-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-aoe-dark-blue flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-aoe-gold font-cinzel mb-6">Guardião do Foco</h1>
      <p className="text-aoe-light max-w-md text-center mb-8">
        Bem-vindo ao Guardião do Foco, seu aplicativo gamificado para gerenciar foco e produtividade.
      </p>

      <div className="space-y-4 w-full max-w-xs">
        <Link href="/war-room" className="block w-full">
          <AoE4Button className="w-full">Mapa do Dia</AoE4Button>
        </Link>

        <Link href="/tasks" className="block w-full">
          <AoE4Button variant="secondary" className="w-full">
            Tarefas
          </AoE4Button>
        </Link>
      </div>
    </div>
  )
}
