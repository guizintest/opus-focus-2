"use client"

import { useState } from "react"
import { testimonialsData } from "@/data/testimonials-data"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
  }

  return (
    <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">O Que Dizem Sobre Mim</h2>
          <p className="mt-4 text-lg text-gray-400">Feedback de clientes e parceiros</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg shadow-xl p-8 relative">
            <div className="absolute top-4 left-8 text-purple-500 text-6xl opacity-30">"</div>
            <div className="relative z-10">
              <p className="text-gray-300 text-lg mb-6 italic">{testimonialsData[activeIndex].text}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonialsData[activeIndex].name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">{testimonialsData[activeIndex].name}</h4>
                  <p className="text-gray-400 text-sm">{testimonialsData[activeIndex].position}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full"
              aria-label="Depoimento anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full"
              aria-label="Próximo depoimento"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
