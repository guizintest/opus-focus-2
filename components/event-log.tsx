"use client"

import { useState } from "react"
import { Clock, AlertTriangle, Flag } from "lucide-react"

interface LogEvent {
  id: string
  type: "info" | "success" | "warning" | "danger"
  message: string
  time: string
}

export function EventLog() {
  const [events, setEvents] = useState<LogEvent[]>([
    {
      id: "e1",
      type: "info",
      message: "Bem-vindo ao War Room! Conquiste territórios e defenda-se da Névoa da Distração.",
      time: "01:17 PM",
    },
    {
      id: "e2",
      type: "success",
      message: "Você conquistou o território 'Planejamento Inicial'!",
      time: "01:45 PM",
    },
    {
      id: "e3",
      type: "warning",
      message: "A Névoa da Distração está atacando 'Revisão de Literatura'!",
      time: "01:46 PM",
    },
    {
      id: "e4",
      type: "success",
      message: "Você defendeu com sucesso o território 'Revisão de Literatura'!",
      time: "01:47 PM",
    },
    {
      id: "e5",
      type: "success",
      message: "Missão completada: 'Conquistar 3 territórios'",
      time: "01:47 PM",
    },
  ])

  const getEventIcon = (type: LogEvent["type"]) => {
    switch (type) {
      case "info":
        return <Clock className="h-4 w-4 text-blue-400" />
      case "success":
        return <Flag className="h-4 w-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "danger":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
    }
  }

  const getEventColor = (type: LogEvent["type"]) => {
    switch (type) {
      case "info":
        return "text-blue-400"
      case "success":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "danger":
        return "text-red-400"
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-aoe-border">
        <h2 className="text-aoe-gold text-lg font-cinzel">Log de Eventos</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-2">
            <div className="mt-0.5">{getEventIcon(event.type)}</div>
            <div className="flex-1">
              <p className={`text-sm ${getEventColor(event.type)}`}>{event.message}</p>
              <span className="text-xs text-aoe-muted">{event.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
