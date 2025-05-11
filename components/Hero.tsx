import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Transformando Ideias em Realidade Digital
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Soluções de desenvolvimento web e mobile sob medida para o seu sucesso. Foco, precisão e resultados.
        </p>
        <div className="space-x-4">
          <Link
            href="/projects"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Ver Projetos
          </Link>
          <a
            href="#contact"
            className="bg-transparent hover:bg-white text-white hover:text-purple-700 font-semibold py-3 px-8 rounded-lg border-2 border-white text-lg shadow-md transition duration-300 ease-in-out"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </section>
  )
}
