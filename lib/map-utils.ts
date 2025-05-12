/**
 * Gera um ID para o mapa diário com base na data atual
 * @returns string ID do mapa diário no formato 'map-YYYY-MM-DD'
 */
export function generateDailyMapId(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `map-${year}-${month}-${day}`
}
