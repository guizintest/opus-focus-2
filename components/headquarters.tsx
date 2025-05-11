import Link from "next/link"
import { MapIcon, CalendarIcon, TrophyIcon, BarChart3Icon, Clock } from "lucide-react"
import { AoE4Panel } from "./aoe4-panel"
import { AoE4Button } from "./aoe4-button"
import { activeMapsData } from "@/data/maps-data"

export function Headquarters() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da esquerda - Mapas Ativos */}
        <div className="space-y-6">
          <AoE4Panel title="Mapas Ativos" className="h-full">
            {/* Lista de mapas disponíveis */}
            <div className="space-y-4">
              {activeMapsData.map((map) => (
                <Link href={`/map/${map.id}`} key={map.id} className="block">
                  <div className="border border-aoe-border hover:border-aoe-gold rounded-md p-3 transition-all hover:bg-aoe-panel-header cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-aoe-gold">{map.title}</h3>
                      <span className="text-xs text-aoe-muted">{map.lastActivity}</span>
                    </div>
                    <p className="text-sm text-aoe-muted mb-3">{map.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-aoe-muted">
                        <span>
                          {map.completedTasks} de {map.totalTasks} tarefas concluídas
                        </span>
                      </div>
                      <span className="text-sm font-medium text-aoe-gold">{map.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-aoe-dark-blue rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-aoe-gold rounded-full" style={{ width: `${map.progress}%` }}></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <AoE4Button>
                <Link href="/maps" className="flex items-center">
                  <MapIcon className="w-4 h-4 mr-2" />
                  Ver Todos os Mapas
                </Link>
              </AoE4Button>
            </div>
          </AoE4Panel>
        </div>

        {/* Coluna do meio - Mapa do Dia */}
        <div className="space-y-6">
          <AoE4Panel title="Mapa do Dia" className="relative">
            {/* Data e XP */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-aoe-gold mr-2" />
                <span className="text-aoe-muted">Restante: 4h 15m</span>
              </div>
            </div>

            {/* Mapa do dia atual */}
            <div className="border border-aoe-border rounded-md p-4 mb-4 bg-aoe-dark-blue">
              <h3 className="font-medium text-aoe-gold mb-2">Estudos Avançados</h3>
              <div className="flex justify-between items-center text-xs text-aoe-muted mb-2">
                <span>Progresso</span>
                <span>2/5 concluídas</span>
              </div>
              <div className="w-full h-1.5 bg-aoe-panel rounded-full overflow-hidden mb-4">
                <div className="h-full bg-aoe-gold rounded-full" style={{ width: "40%" }}></div>
              </div>
              <p className="text-sm text-aoe-muted mb-4">Próxima tarefa: Resolver Exercícios</p>
              <AoE4Button className="w-full">Continuar</AoE4Button>
            </div>

            {/* Missões Diárias */}
            <div className="mt-6">
              <h3 className="font-cinzel text-lg font-semibold text-aoe-gold mb-3">Missões Diárias</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-aoe-border rounded-md bg-aoe-dark-blue">
                  <div className="text-yellow-500">★</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-aoe-light font-medium">Complete 3 tarefas hoje</h4>
                      <span className="text-xs text-yellow-500">+100 XP</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="w-full h-1.5 bg-aoe-panel rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "33%" }}></div>
                      </div>
                      <span className="text-xs text-aoe-muted ml-2">1/3</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-aoe-border rounded-md bg-aoe-dark-blue">
                  <div className="text-yellow-500">★</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-aoe-light font-medium">Estude por 2 horas</h4>
                      <span className="text-xs text-yellow-500">+150 XP</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="w-full h-1.5 bg-aoe-panel rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "37%" }}></div>
                      </div>
                      <span className="text-xs text-aoe-muted ml-2">45min/120min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AoE4Panel>
        </div>

        {/* Coluna da direita - Atualizações e Resumo */}
        <div className="space-y-6">
          <AoE4Panel title="Atualizações" className="h-full">
            <div className="space-y-4">
              <div className="border-b border-aoe-border pb-3">
                <h3 className="text-aoe-gold font-medium mb-1">Nova funcionalidade: Colaboração</h3>
                <p className="text-sm text-aoe-muted mb-1">
                  Agora você pode convidar amigos para colaborar em seus mapas de conquista.
                </p>
                <p className="text-xs text-aoe-muted">22/04/2025</p>
              </div>
              <div className="border-b border-aoe-border pb-3">
                <h3 className="text-aoe-gold font-medium mb-1">Conquistas desbloqueadas</h3>
                <p className="text-sm text-aoe-muted mb-1">
                  Novas conquistas foram adicionadas. Verifique seu progresso na seção de estatísticas.
                </p>
                <p className="text-xs text-aoe-muted">18/04/2025</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-cinzel text-lg font-semibold text-aoe-gold mb-3">Resumo</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-aoe-gold" />
                    <span className="text-aoe-muted">Sequência Atual</span>
                  </div>
                  <span className="text-aoe-light font-medium">5 dias</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrophyIcon className="w-4 h-4 text-aoe-gold" />
                    <span className="text-aoe-muted">Tarefas Concluídas</span>
                  </div>
                  <span className="text-aoe-light font-medium">132</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapIcon className="w-4 h-4 text-aoe-gold" />
                    <span className="text-aoe-muted">Mapas Criados</span>
                  </div>
                  <span className="text-aoe-light font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrophyIcon className="w-4 h-4 text-aoe-gold" />
                    <span className="text-aoe-muted">Conquistas</span>
                  </div>
                  <span className="text-aoe-light font-medium">8/15</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <AoE4Button>
                  <Link href="/stats" className="flex items-center">
                    <BarChart3Icon className="w-4 h-4 mr-2" />
                    Ver Estatísticas
                  </Link>
                </AoE4Button>
              </div>
            </div>
          </AoE4Panel>
        </div>
      </div>
    </div>
  )
}
