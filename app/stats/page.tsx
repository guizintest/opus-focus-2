"use client"

import { useState } from "react"
import { AoE4Panel } from "@/components/aoe4-panel"
import { statsData } from "@/data/stats-data"

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState<"visao-geral" | "conquistas" | "historico">("visao-geral")

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-cinzel text-aoe-gold mb-8">Estatísticas</h1>

      <div className="bg-aoe-panel border border-aoe-border rounded-md overflow-hidden">
        <div className="flex border-b border-aoe-border">
          <button
            className={`px-6 py-3 font-cinzel ${
              activeTab === "visao-geral" ? "bg-aoe-button text-aoe-gold" : "text-aoe-muted hover:bg-aoe-panel-header"
            }`}
            onClick={() => setActiveTab("visao-geral")}
          >
            Visão Geral
          </button>
          <button
            className={`px-6 py-3 font-cinzel ${
              activeTab === "conquistas" ? "bg-aoe-button text-aoe-gold" : "text-aoe-muted hover:bg-aoe-panel-header"
            }`}
            onClick={() => setActiveTab("conquistas")}
          >
            Conquistas
          </button>
          <button
            className={`px-6 py-3 font-cinzel ${
              activeTab === "historico" ? "bg-aoe-button text-aoe-gold" : "text-aoe-muted hover:bg-aoe-panel-header"
            }`}
            onClick={() => setActiveTab("historico")}
          >
            Histórico
          </button>
        </div>

        <div className="p-6">
          {activeTab === "visao-geral" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AoE4Panel title="Tarefas">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-aoe-muted">Total de Tarefas</span>
                    <span className="text-2xl text-aoe-light">{statsData.totalTasks}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-aoe-muted">Tarefas Concluídas</span>
                    <span className="text-2xl text-aoe-light">{statsData.completedTasks}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-aoe-muted">Taxa de Conclusão</span>
                    <span className="text-2xl text-green-400">{statsData.completionRate}%</span>
                  </div>
                </div>
              </AoE4Panel>

              <AoE4Panel title="Nível e Experiência">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-aoe-muted">Nível Atual</span>
                    <span className="text-2xl text-aoe-light">{statsData.currentLevel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-aoe-muted">Total de XP</span>
                    <span className="text-2xl text-aoe-light">{statsData.totalXP}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-aoe-muted">Próximo Nível</span>
                      <span className="text-sm text-aoe-gold">{statsData.nextLevelProgress}</span>
                    </div>
                    <div className="w-full h-2 bg-aoe-dark-blue rounded-full overflow-hidden">
                      <div
                        className="h-full bg-aoe-gold"
                        style={{
                          width: `${(Number.parseInt(statsData.nextLevelProgress.split("/")[0]) / Number.parseInt(statsData.nextLevelProgress.split("/")[1])) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </AoE4Panel>

              <AoE4Panel title="Sequência">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-32 h-32 rounded-full border-4 border-aoe-gold flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold text-aoe-gold">{statsData.streak.current}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-aoe-light">Dias Consecutivos</p>
                    <p className="text-sm text-aoe-muted">Recorde: {statsData.streak.record} dias</p>
                  </div>
                </div>
              </AoE4Panel>

              <AoE4Panel title="Tempo">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-aoe-muted">Tempo Total</span>
                    <span className="text-2xl text-aoe-light">{statsData.time.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-aoe-muted">Dia Mais Produtivo</span>
                    <span className="text-aoe-light">{statsData.time.mostProductiveDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-aoe-muted">Horário Mais Produtivo</span>
                    <span className="text-aoe-light">{statsData.time.mostProductiveTime}</span>
                  </div>
                </div>
              </AoE4Panel>

              <AoE4Panel title="Atividade Recente">
                <div className="h-48 flex items-center justify-center">
                  <p className="text-aoe-muted">Gráfico de atividade aqui</p>
                </div>
              </AoE4Panel>
            </div>
          )}

          {activeTab === "conquistas" && (
            <div>
              <h2 className="text-xl font-cinzel text-aoe-gold mb-4">Conquistas Desbloqueadas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{/* Conquistas aqui */}</div>
            </div>
          )}

          {activeTab === "historico" && (
            <div>
              <h2 className="text-xl font-cinzel text-aoe-gold mb-4">Histórico de Atividades</h2>
              <div className="space-y-4">{/* Histórico aqui */}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
