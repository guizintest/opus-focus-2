"use client"

import { useState, useMemo } from "react"
import ProjectCard from "@/components/ProjectCard"
import { projectsData } from "@/data/projects-data"

export default function Projects() {
  const [filter, setFilter] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = useMemo(() => {
    const allCategories = projectsData.map((p) => p.category)
    return ["Todos", ...new Set(allCategories)]
  }, [])

  const filteredProjects = useMemo(() => {
    return projectsData
      .filter((project) => filter === "Todos" || project.category === filter)
      .filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [filter, searchTerm])

  return (
    <div className="bg-slate-900 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Meus Projetos</h2>
          <p className="mt-4 text-lg text-gray-400">Explore uma seleção dos trabalhos que desenvolvi.</p>
        </div>

        {/* Filtros e Busca */}
        <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Buscar projetos..."
            className="px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                            ${filter === category ? "bg-purple-600 text-white" : "bg-slate-700 text-gray-300 hover:bg-slate-600"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Projetos */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-xl">Nenhum projeto encontrado com os filtros atuais.</p>
        )}
      </div>
    </div>
  )
}
