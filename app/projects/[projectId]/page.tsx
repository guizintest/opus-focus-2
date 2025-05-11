"use client"

import { useParams } from "next/navigation"
import { projectsData } from "@/data/projects-data"
import Link from "next/link"
import Image from "next/image"
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa"

export default function ProjectDetails() {
  const params = useParams()
  const projectId = params.projectId as string

  const project = projectsData.find((p) => p.id === projectId)

  if (!project) {
    return (
      <div className="bg-slate-900 min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Projeto não encontrado</h1>
          <Link
            href="/projects"
            className="text-purple-500 hover:text-purple-400 flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Voltar para projetos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/projects" className="text-purple-500 hover:text-purple-400 flex items-center gap-2 mb-8">
          <FaArrowLeft /> Voltar para projetos
        </Link>

        <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-64 sm:h-80 md:h-96">
            <Image
              src={project.imageUrl || "/placeholder.svg?height=400&width=800"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-0">{project.title}</h1>
              <span className="text-sm font-semibold inline-block py-1 px-3 rounded-full text-purple-600 bg-purple-200">
                {project.category}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Descrição</h2>
              <p className="text-gray-300">{project.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Tecnologias</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <FaGithub /> Repositório
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <FaExternalLinkAlt /> Ver Projeto
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
