export interface Testimonial {
  id: string
  name: string
  position: string
  text: string
}

export const testimonialsData: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Ana Silva",
    position: "CEO, TechSolutions",
    text: "Trabalhar com a Opus Focus foi uma experiência incrível. Eles entenderam perfeitamente nossas necessidades e entregaram um produto que superou nossas expectativas. Altamente recomendado!",
  },
  {
    id: "testimonial-2",
    name: "Carlos Mendes",
    position: "Diretor de Marketing, InnovateX",
    text: "A equipe da Opus Focus é extremamente profissional e talentosa. Nosso site ficou exatamente como queríamos e o processo de desenvolvimento foi transparente e eficiente.",
  },
  {
    id: "testimonial-3",
    name: "Mariana Costa",
    position: "Fundadora, StartupBR",
    text: "Encontrar a Opus Focus foi um divisor de águas para nossa startup. Eles não apenas desenvolveram nossa plataforma, mas também contribuíram com ideias valiosas que melhoraram nosso produto final.",
  },
]
