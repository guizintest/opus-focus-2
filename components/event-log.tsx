"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Event {
  id: string
  message: string
  type: string
  timestamp: number
}

interface EventLogProps {
  events?: Event[]
}

export function EventLog({ events = [] }: EventLogProps) {
  const [localEvents, setLocalEvents] = useState<Event[]>(events)

  // Atualizar eventos quando as props mudarem
  useEffect(() => {
    if (events.length > 0) {
      setLocalEvents(events)
    }
  }, [events])

  // Adicionar alguns eventos de exemplo se não houver eventos
  useEffect(() => {
    if (events.length === 0 && localEvents.length === 0) {
      setLocalEvents([
        {
          id: "event-1",
          message: "Bem-vindo ao Mapa do Dia!",
          type: "info",
          timestamp: Date.now() - 60000,
        },
        {
          id: "event-2",
          message: "Selecione um hexágono para começar",
          type: "info",
          timestamp: Date.now() - 30000,
        },
        {
          id: "event-3",
          message: "Dica: Conquiste hexágonos para ganhar pontos de foco",
          type: "info",
          timestamp: Date.now(),
        },
      ])
    }
  }, [events])

  // Formatar timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Obter classe de cor com base no tipo de evento
  const getEventTypeClass = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "danger":
        return "text-red-400"
      case "info":
      default:
        return "text-blue-400"
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-aoe-border">
        <h3 className="text-aoe-gold font-cinzel">Registro de Eventos</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {localEvents.map((event) => (
            <div key={event.id} className="text-sm">
              <span className="text-aoe-muted text-xs">{formatTimestamp(event.timestamp)}</span>
              <span className={`ml-2 ${getEventTypeClass(event.type)}`}>{event.message}</span>
            </div>
          ))}
          {localEvents.length === 0 && <div className="text-aoe-muted text-sm italic">Nenhum evento registrado</div>}
        </div>
      </ScrollArea>
    </div>
  )
}
