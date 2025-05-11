"use client"

import { useState } from "react"
import { AoE4Button } from "@/components/aoe4-button"
import { Search, Filter, Edit, Trash2 } from "lucide-react"
import { tasksData } from "@/data/tasks-data"

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredTasks = tasksData.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-cinzel text-aoe-gold">Banco de Tarefas</h1>
        <AoE4Button>Adicionar Nova Tarefa</AoE4Button>
      </div>

      <div className="bg-aoe-panel border border-aoe-border rounded-md p-4">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aoe-muted h-4 w-4" />
            <input
              type="text"
              placeholder="Pesquisar tarefas..."
              className="w-full bg-aoe-dark-blue border border-aoe-border rounded-md py-2 pl-10 pr-4 text-aoe-light placeholder:text-aoe-muted focus:outline-none focus:ring-1 focus:ring-aoe-gold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <AoE4Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtrar
          </AoE4Button>
        </div>

        {showFilters && (
          <div className="mb-6 p-4 bg-aoe-dark-blue border border-aoe-border rounded-md">
            {/* Filtros aqui */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-aoe-muted mb-1">Tipo</label>
                <select className="w-full bg-aoe-panel border border-aoe-border rounded-md py-2 px-3">
                  <option value="">Todos</option>
                  <option value="leitura">Leitura</option>
                  <option value="video">Vídeo</option>
                  <option value="codigo">Código</option>
                  <option value="curso">Curso</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-aoe-muted mb-1">Dificuldade</label>
                <select className="w-full bg-aoe-panel border border-aoe-border rounded-md py-2 px-3">
                  <option value="">Todas</option>
                  <option value="facil">Fácil</option>
                  <option value="medio">Médio</option>
                  <option value="dificil">Difícil</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-aoe-muted mb-1">Pontos</label>
                <select className="w-full bg-aoe-panel border border-aoe-border rounded-md py-2 px-3">
                  <option value="">Todos</option>
                  <option value="1-25">1-25</option>
                  <option value="26-50">26-50</option>
                  <option value="51-100">51-100</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-aoe-border">
                <th className="text-left py-3 px-4 text-aoe-gold font-cinzel">Título</th>
                <th className="text-left py-3 px-4 text-aoe-gold font-cinzel">Tipo</th>
                <th className="text-left py-3 px-4 text-aoe-gold font-cinzel">Dificuldade</th>
                <th className="text-left py-3 px-4 text-aoe-gold font-cinzel">Pontos</th>
                <th className="text-left py-3 px-4 text-aoe-gold font-cinzel">Validação</th>
                <th className="text-left py-3 px-4 text-aoe-gold font-cinzel">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-b border-aoe-border hover:bg-aoe-panel-header">
                  <td className="py-3 px-4">{task.title}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {task.typeIcon}
                      <span className="ml-2">{task.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        task.difficulty === "Fácil"
                          ? "bg-blue-900/30 text-blue-400"
                          : task.difficulty === "Médio"
                            ? "bg-purple-900/30 text-purple-400"
                            : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {task.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-aoe-gold">{task.points}</td>
                  <td className="py-3 px-4">{task.validation}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-aoe-muted hover:text-aoe-gold">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-aoe-muted hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
