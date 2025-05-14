"use client"

import { TopMenu } from "@/components/top-menu"
import { ResourceBar } from "@/components/resource-bar"
import { AoE4Button } from "@/components/aoe4-button"
import Link from "next/link"
import { Trophy, Calendar, BookOpen, Settings } from "lucide-react"

export default function QGPage() {
  const userProfile = {
    focus_points: 100,
    recreation_points: 30,
    current_mood: "normal" as "good" | "normal" | "bad",
  }

  const handleMoodChange = (mood: "good" | "normal" | "bad") => {
    console.log("Mood changed to:", mood)
  }

  return (
    <div className="flex flex-col h-screen bg-aoe-dark-blue">
      <TopMenu activeItem="qg" />

      <ResourceBar
        focus={userProfile.focus_points}
        recreation={userProfile.recreation_points}
        mood={userProfile.current_mood}
        dayProgress={40}
        onMoodChange={handleMoodChange}
      />

      <div className="container mx-auto p-6 flex-1">
        <h1 className="text-2xl font-bold text-aoe-gold font-cinzel mb-6">QUARTEL GENERAL</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mapa do Dia */}
          <div className="bg-aoe-panel border border-aoe-border rounded-md p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-aoe-gold mr-2" />
              <h2 className="text-xl font-cinzel text-aoe-gold">Mapa do Dia</h2>
            </div>
            <p className="text-aoe-muted mb-6 flex-1">
              Conquiste o mapa diário para ganhar pontos de foco e recompensas especiais.
            </p>
            <Link href="/war-room">
              <AoE4Button className="w-full">Acessar Mapa</AoE4Button>
            </Link>
          </div>

          {/* Tarefas */}
          <div className="bg-aoe-panel border border-aoe-border rounded-md p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-aoe-gold mr-2" />
              <h2 className="text-xl font-cinzel text-aoe-gold">Tarefas</h2>
            </div>
            <p className="text-aoe-muted mb-6 flex-1">Gerencie suas tarefas diárias e projetos em andamento.</p>
            <Link href="/tasks">
              <AoE4Button className="w-full">Ver Tarefas</AoE4Button>
            </Link>
          </div>

          {/* Conquistas */}
          <div className="bg-aoe-panel border border-aoe-border rounded-md p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <Trophy className="h-6 w-6 text-aoe-gold mr-2" />
              <h2 className="text-xl font-cinzel text-aoe-gold">Conquistas</h2>
            </div>
            <p className="text-aoe-muted mb-6 flex-1">Veja suas conquistas e desbloqueie novas recompensas.</p>
            <Link href="/achievements">
              <AoE4Button className="w-full">Ver Conquistas</AoE4Button>
            </Link>
          </div>

          {/* Configurações */}
          <div className="bg-aoe-panel border border-aoe-border rounded-md p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-aoe-gold mr-2" />
              <h2 className="text-xl font-cinzel text-aoe-gold">Configurações</h2>
            </div>
            <p className="text-aoe-muted mb-6 flex-1">Personalize o aplicativo de acordo com suas preferências.</p>
            <Link href="/settings">
              <AoE4Button className="w-full">Configurar</AoE4Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
