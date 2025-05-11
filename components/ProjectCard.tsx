import Link from "next/link"
import Image from "next/image"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import type { Project } from "@/types/project"

export default function ProjectCard({
  id,
  title,
  imageUrl,
  description,
  technologies,
  repoUrl,
  liveUrl,
  category,
}: Project) {
  return (
    <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full">
      <Link href={`/projects/${id}`} className="block">
        <div className="relative w-full h-48">
          <Image src={imageUrl || "/placeholder.svg?height=400&width=200"} alt={title} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/projects/${id}`}>
          <h3 className="text-2xl font-semibold text-white mb-2 hover:text-purple-400 transition-colors">{title}</h3>
        </Link>
        <p className="text-gray-400 text-sm mb-3 flex-grow">
          {description.substring(0, 100)}
          {description.length > 100 && "..."}
        </p>

        <div className="mb-4">
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
            {category}
          </span>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-1">Tecnologias:</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-700 flex justify-between items-center">
          <div className="flex space-x-3">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label={`Repositório de ${title} no Github`}
              >
                <FaGithub size={20} />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label={`Ver ${title} online`}
              >
                <FaExternalLinkAlt size={20} />
              </a>
            )}
          </div>
          <Link
            href={`/projects/${id}`}
            className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Ver Detalhes →
          </Link>
        </div>
      </div>
    </div>
  )
}
