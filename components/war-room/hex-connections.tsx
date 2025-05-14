"use client"

interface HexConnection {
  from: { q: number; r: number }
  to: { q: number; r: number }
}

interface HexConnectionsProps {
  connections: HexConnection[]
}

export function HexConnections({ connections }: HexConnectionsProps) {
  // Função para calcular a posição de um hexágono com base nas coordenadas q, r
  const getHexPosition = (q: number, r: number) => {
    // Estas posições devem corresponder às definidas no CSS
    switch (`${q},${r}`) {
      case "0,0":
        return { x: 250, y: 150 }
      case "1,-1":
        return { x: 325, y: 95 }
      case "1,0":
        return { x: 325, y: 150 }
      case "0,1":
        return { x: 250, y: 205 }
      case "-1,1":
        return { x: 175, y: 205 }
      case "-1,0":
        return { x: 175, y: 150 }
      default:
        return { x: 0, y: 0 }
    }
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {connections.map((connection, index) => {
        const fromPos = getHexPosition(connection.from.q, connection.from.r)
        const toPos = getHexPosition(connection.to.q, connection.to.r)

        return (
          <line
            key={index}
            x1={fromPos.x}
            y1={fromPos.y}
            x2={toPos.x}
            y2={toPos.y}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
          />
        )
      })}
    </svg>
  )
}
