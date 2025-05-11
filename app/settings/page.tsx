"use client"

import { useState } from "react"
import { AoE4Button } from "@/components/aoe4-button"
import { Settings, Moon, Bell, User } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"geral" | "aparencia" | "notificacoes" | "conta">("geral")

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-cinzel text-aoe-gold mb-8">Configurações</h1>

      <div className="flex gap-6">
        <div className="w-64">
          <div className="bg-aoe-panel border border-aoe-border rounded-md overflow-hidden">
            <h2 className="font-cinzel text-aoe-gold p-4 border-b border-aoe-border">Configurações</h2>
            <div className="flex flex-col">
              <button
                className={`flex items-center gap-3 p-4 text-left ${
                  activeTab === "geral" ? "bg-aoe-button text-aoe-gold" : "text-aoe-light hover:bg-aoe-panel-header"
                }`}
                onClick={() => setActiveTab("geral")}
              >
                <Settings className="h-5 w-5" />
                Geral
              </button>
              <button
                className={`flex items-center gap-3 p-4 text-left ${
                  activeTab === "aparencia" ? "bg-aoe-button text-aoe-gold" : "text-aoe-light hover:bg-aoe-panel-header"
                }`}
                onClick={() => setActiveTab("aparencia")}
              >
                <Moon className="h-5 w-5" />
                Aparência
              </button>
              <button
                className={`flex items-center gap-3 p-4 text-left ${
                  activeTab === "notificacoes"
                    ? "bg-aoe-button text-aoe-gold"
                    : "text-aoe-light hover:bg-aoe-panel-header"
                }`}
                onClick={() => setActiveTab("notificacoes")}
              >
                <Bell className="h-5 w-5" />
                Notificações
              </button>
              <button
                className={`flex items-center gap-3 p-4 text-left ${
                  activeTab === "conta" ? "bg-aoe-button text-aoe-gold" : "text-aoe-light hover:bg-aoe-panel-header"
                }`}
                onClick={() => setActiveTab("conta")}
              >
                <User className="h-5 w-5" />
                Conta
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-aoe-panel border border-aoe-border rounded-md p-6">
            {activeTab === "geral" && (
              <div>
                <h2 className="text-xl font-cinzel text-aoe-gold mb-6">Configurações Gerais</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg text-aoe-light mb-4">Preferências de Idioma</h3>
                    <div className="flex items-center gap-4">
                      <label className="text-aoe-muted w-32">Idioma</label>
                      <select className="bg-aoe-dark-blue border border-aoe-border rounded-md py-2 px-3 w-64">
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg text-aoe-light mb-4">Preferências de Tempo</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <label className="text-aoe-muted w-32">Formato de Hora</label>
                        <select className="bg-aoe-dark-blue border border-aoe-border rounded-md py-2 px-3 w-64">
                          <option value="24h">24 horas</option>
                          <option value="12h">12 horas (AM/PM)</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="text-aoe-muted w-32">Primeiro Dia da Semana</label>
                        <select className="bg-aoe-dark-blue border border-aoe-border rounded-md py-2 px-3 w-64">
                          <option value="domingo">Domingo</option>
                          <option value="segunda">Segunda-feira</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg text-aoe-light mb-4">Comportamento do Aplicativo</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-aoe-light">Iniciar com o Sistema</p>
                          <p className="text-sm text-aoe-muted">
                            Abrir o aplicativo automaticamente quando você ligar o computador
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-aoe-dark-blue peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-aoe-muted after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-aoe-light">Confirmar antes de Excluir</p>
                          <p className="text-sm text-aoe-muted">
                            Mostrar diálogo de confirmação antes de excluir tarefas ou mapas
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-aoe-dark-blue peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-aoe-muted after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <AoE4Button>Salvar Alterações</AoE4Button>
                </div>
              </div>
            )}

            {activeTab === "aparencia" && (
              <div>
                <h2 className="text-xl font-cinzel text-aoe-gold mb-6">Aparência</h2>
                {/* Conteúdo da aba Aparência */}
              </div>
            )}

            {activeTab === "notificacoes" && (
              <div>
                <h2 className="text-xl font-cinzel text-aoe-gold mb-6">Notificações</h2>
                {/* Conteúdo da aba Notificações */}
              </div>
            )}

            {activeTab === "conta" && (
              <div>
                <h2 className="text-xl font-cinzel text-aoe-gold mb-6">Conta</h2>
                {/* Conteúdo da aba Conta */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
