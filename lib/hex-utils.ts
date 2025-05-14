// Constantes para o tamanho do hexágono
export const HEX_SIZE = 50 // Raio do hexágono (distância do centro até um vértice)
export const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE // Largura do hexágono pointy-topped
export const HEX_HEIGHT = 2 * HEX_SIZE // Altura do hexágono pointy-topped
export const HEX_HORIZ_DISTANCE = HEX_WIDTH // Distância horizontal entre centros
export const HEX_VERT_DISTANCE = HEX_HEIGHT * 0.75 // Distância vertical entre centros

// Coordenadas axiais (q, r, s) para coordenadas de pixel (x, y)
export function hexToPixel(q: number, r: number): { x: number; y: number } {
  const x = HEX_SIZE * Math.sqrt(3) * (q + r / 2)
  const y = ((HEX_SIZE * 3) / 2) * r
  return { x, y }
}

// Coordenadas de pixel (x, y) para coordenadas axiais (q, r, s)
export function pixelToHex(x: number, y: number): { q: number; r: number; s: number } {
  const q = ((Math.sqrt(3) / 3) * x - (1 / 3) * y) / HEX_SIZE
  const r = ((2 / 3) * y) / HEX_SIZE
  const s = -q - r // Em coordenadas axiais, q + r + s = 0
  return { q, r, s }
}

// Arredondar para o hexágono mais próximo
export function hexRound(q: number, r: number, s: number): { q: number; r: number; s: number } {
  let roundQ = Math.round(q)
  let roundR = Math.round(r)
  let roundS = Math.round(s)

  const qDiff = Math.abs(roundQ - q)
  const rDiff = Math.abs(roundR - r)
  const sDiff = Math.abs(roundS - s)

  if (qDiff > rDiff && qDiff > sDiff) {
    roundQ = -roundR - roundS
  } else if (rDiff > sDiff) {
    roundR = -roundQ - roundS
  } else {
    roundS = -roundQ - roundR
  }

  return { q: roundQ, r: roundR, s: roundS }
}

// Obter os vizinhos de um hexágono
export function getHexNeighbors(q: number, r: number): Array<{ q: number; r: number; s: number }> {
  const directions = [
    { q: 1, r: 0, s: -1 },
    { q: 1, r: -1, s: 0 },
    { q: 0, r: -1, s: 1 },
    { q: -1, r: 0, s: 1 },
    { q: -1, r: 1, s: 0 },
    { q: 0, r: 1, s: -1 },
  ]

  return directions.map((dir) => ({
    q: q + dir.q,
    r: r + dir.r,
    s: -q - r - dir.q - dir.r,
  }))
}

// Gerar pontos para desenhar um hexágono SVG
export function getHexPoints(centerX: number, centerY: number): string {
  const points = []
  for (let i = 0; i < 6; i++) {
    const angleDeg = 60 * i - 30
    const angleRad = (Math.PI / 180) * angleDeg
    const x = centerX + HEX_SIZE * Math.cos(angleRad)
    const y = centerY + HEX_SIZE * Math.sin(angleRad)
    points.push(`${x},${y}`)
  }
  return points.join(" ")
}

// Verificar se dois hexágonos são vizinhos
export function areNeighbors(hex1: { q: number; r: number }, hex2: { q: number; r: number }): boolean {
  const s1 = -hex1.q - hex1.r
  const s2 = -hex2.q - hex2.r

  const dq = Math.abs(hex1.q - hex2.q)
  const dr = Math.abs(hex1.r - hex2.r)
  const ds = Math.abs(s1 - s2)

  return (dq + dr + ds) / 2 === 1
}
