import { NextResponse } from "next/server"
import { generateDailyMap } from "@/lib/services/map-generator-service"

export async function POST() {
  try {
    const result = await generateDailyMap()

    return NextResponse.json({
      success: true,
      message: "Mapa gerado com sucesso",
      data: result,
    })
  } catch (error) {
    console.error("Erro ao gerar mapa:", error)

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erro ao gerar mapa",
      },
      { status: 500 },
    )
  }
}
