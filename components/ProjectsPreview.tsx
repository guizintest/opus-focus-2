import Link from "next/link"
import ProjectCard from "./ProjectCard"
import { projectsData } from "@/data/projects-data"

export default function ProjectsPreview() {
  // Mostrar apenas os 3 primeiros projetos na prévia
  const previewProjects = projectsData.slice(0, 3)

  return (
    <section className="bg-slate-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Projetos em Destaque</h2>
          <p className="mt-4 text-lg text-gray-400">Conheça alguns dos meus trabalhos mais recentes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Ver Todos os Projetos
          </Link>
        </div>
      </div>
    </section>
  )
}
