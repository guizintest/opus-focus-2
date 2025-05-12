"use client"

import { useState } from "react"
import Link from "next/link"
import { AoE4Button } from "@/components/aoe4-button"
import { TopMenu } from "@/components/top-menu"

export default function TasksPage() {
  const [tasks] = useState([
    { id: "1", title: "Revisar código", completed: false, difficulty: "medium" },
    { id: "2", title: "Escrever documentação", completed: true, difficulty: "easy" },
    { id: "3", title: "Implementar feature", completed: false, difficulty: "hard" },
  ])

  return (
    <div className="min-h-screen bg-aoe-dark-blue">
      <TopMenu activeItem="tarefas" />

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-aoe-gold font-cinzel mb-6">Tarefas</h1>

        <div className="bg-aoe-panel border border-aoe-border rounded-md p-4 mb-6">
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`p-3 border rounded-md ${
                  task.completed ? "border-green-600 bg-green-900/20" : "border-aoe-border bg-aoe-dark-blue"
                }`}
              >
                <div className="flex items-center">
                  <input type="checkbox" checked={task.completed} readOnly className="mr-3 h-5 w-5" />
                  <span className={task.completed ? "line-through text-aoe-muted" : "text-aoe-light"}>
                    {task.title}
                  </span>
                  <span className="ml-auto text-xs px-2 py-1 rounded-full bg-aoe-panel-header text-aoe-light">
                    {task.difficulty}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between">
          <Link href="/">
            <AoE4Button variant="secondary">Voltar</AoE4Button>
          </Link>
          <Link href="/war-room">
            <AoE4Button>Ir para o Mapa do Dia</AoE4Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
