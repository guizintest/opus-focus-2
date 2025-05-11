"use client"

import { useState } from "react"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { shopItems } from "@/data/shop-data"
import { Palette, ImageIcon, Music, Award, Bookmark } from "lucide-react"

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<"todos" | "temas" | "fundos" | "icones" | "recursos" | "bonus">(
    "todos",
  )
  const [points, setPoints] = useState(850)

  const filteredItems =
    activeCategory === "todos" ? shopItems : shopItems.filter((item) => item.category === activeCategory)

  const handleBuy = (itemId: string, price: number) => {
    if (points >= price) {
      setPoints(points - price)
      // Lógica para marcar o item como adquirido
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-cinzel text-aoe-gold">Loja de Tempo</h1>
        <div className="flex items-center gap-2 bg-aoe-panel border border-aoe-border rounded-md px-4 py-2">
          <span className="text-aoe-gold">{points}</span>
          <span className="text-aoe-muted">pontos</span>
        </div>
      </div>

      <div className="bg-aoe-panel border border-aoe-border rounded-md p-4">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <AoE4Button
            variant={activeCategory === "todos" ? "default" : "secondary"}
            onClick={() => setActiveCategory("todos")}
          >
            Todos
          </AoE4Button>
          <AoE4Button
            variant={activeCategory === "temas" ? "default" : "secondary"}
            onClick={() => setActiveCategory("temas")}
            className="flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            Temas
          </AoE4Button>
          <AoE4Button
            variant={activeCategory === "fundos" ? "default" : "secondary"}
            onClick={() => setActiveCategory("fundos")}
            className="flex items-center gap-2"
          >
            <ImageIcon className="h-4 w-4" />
            Fundos
          </AoE4Button>
          <AoE4Button
            variant={activeCategory === "icones" ? "default" : "secondary"}
            onClick={() => setActiveCategory("icones")}
            className="flex items-center gap-2"
          >
            <Bookmark className="h-4 w-4" />
            Ícones
          </AoE4Button>
          <AoE4Button
            variant={activeCategory === "recursos" ? "default" : "secondary"}
            onClick={() => setActiveCategory("recursos")}
            className="flex items-center gap-2"
          >
            <Award className="h-4 w-4" />
            Recursos
          </AoE4Button>
          <AoE4Button
            variant={activeCategory === "bonus" ? "default" : "secondary"}
            onClick={() => setActiveCategory("bonus")}
            className="flex items-center gap-2"
          >
            <Music className="h-4 w-4" />
            Bônus
          </AoE4Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-aoe-dark-blue border border-aoe-border rounded-md overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-aoe-panel to-aoe-dark-blue flex items-center justify-center">
                {item.icon}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-cinzel text-aoe-gold">{item.name}</h3>
                  <div className="flex items-center">
                    <span className="text-aoe-gold">{item.price}</span>
                    <span className="text-xs text-aoe-muted ml-1">pontos</span>
                  </div>
                </div>
                <p className="text-sm text-aoe-muted mb-4">{item.description}</p>
                {item.acquired ? (
                  <button className="w-full py-2 text-center bg-aoe-panel-header text-aoe-muted border border-aoe-border rounded-md cursor-not-allowed">
                    Adquirido
                  </button>
                ) : (
                  <AoE4Button
                    className="w-full"
                    disabled={points < item.price}
                    onClick={() => handleBuy(item.id, item.price)}
                  >
                    Adquirir
                  </AoE4Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <AoE4Panel title="Como Funciona">
          <p className="text-aoe-muted mb-4">
            A Loja de Tempo permite que você troque seus pontos recreativos por itens e recursos especiais.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-aoe-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-aoe-gold"></div>
              <span>Completando tarefas diárias</span>
            </li>
            <li className="flex items-center gap-2 text-aoe-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-aoe-gold"></div>
              <span>Mantendo sequências de dias</span>
            </li>
            <li className="flex items-center gap-2 text-aoe-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-aoe-gold"></div>
              <span>Alcançando conquistas especiais</span>
            </li>
          </ul>
        </AoE4Panel>

        <AoE4Panel title="Ofertas Especiais">
          <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4 flex items-center gap-4">
            <Award className="h-12 w-12 text-yellow-500" />
            <div className="flex-1">
              <h3 className="text-lg font-cinzel text-aoe-gold">Pacote Premium</h3>
              <p className="text-sm text-aoe-muted">
                Desbloqueie todos os temas, fundos e ícones com um desconto especial.
              </p>
              <div className="flex items-center mt-2">
                <span className="text-aoe-muted line-through mr-2">2500</span>
                <span className="text-aoe-gold text-lg">1800 pontos</span>
              </div>
            </div>
            <AoE4Button disabled={points < 1800}>Adquirir Pacote</AoE4Button>
          </div>
          <p className="text-xs text-aoe-muted mt-4 text-center">
            Novas ofertas especiais disponíveis a cada semana. Volte para conferir!
          </p>
        </AoE4Panel>
      </div>
    </div>
  )
}
