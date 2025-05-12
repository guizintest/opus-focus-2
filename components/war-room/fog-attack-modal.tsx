"use client"

import { useState, useEffect } from "react"
import { AoE4Panel } from "@/components/aoe4-panel"
import { AoE4Button } from "@/components/aoe4-button"
import { AlertTriangle, Clock, Brain, X } from "lucide-react"
import type { HexTileProps } from "../hex-grid/hex-tile"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

interface FogAttackModalProps {
  hex: Omit<HexTileProps, "onClick" | "isSelected" | "position">
  timeRemaining: number
  onDefend: (success: boolean) => void
  onFlee: () => void
  focusPoints: number
}

export function FogAttackModal({ hex, timeRemaining, onDefend, onFlee, focusPoints }: FogAttackModalProps) {
  const [timeLeft, setTimeLeft] = useState(timeRemaining)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  // Exemplo de perguntas (na implementação real, seriam geradas com base na tarefa)
  const questions: QuizQuestion[] = [
    {
      question: "Qual era o principal objetivo desta tarefa?",
      options: [
        "Aprender conceitos básicos",
        "Praticar habilidades avançadas",
        "Revisar conhecimentos prévios",
        "Explorar novas tecnologias",
      ],
      correctAnswer: 1,
    },
    {
      question: "Qual técnica foi utilizada para resolver o problema principal?",
      options: ["Algoritmos de busca", "Programação dinâmica", "Estruturas de dados avançadas", "Métodos iterativos"],
      correctAnswer: 2,
    },
    {
      question: "Qual conceito NÃO foi abordado nesta tarefa?",
      options: [
        "Otimização de código",
        "Gerenciamento de memória",
        "Interfaces de usuário",
        "Processamento assíncrono",
      ],
      correctAnswer: 3,
    },
  ]

  useEffect(() => {
    if (timeLeft <= 0) {
      // Tempo esgotado, território perdido
      onFlee()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onFlee])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressPercentage = () => {
    return (timeLeft / timeRemaining) * 100
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[questionIndex] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleSubmitQuiz = () => {
    // Calcular pontuação
    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const percentage = (correctAnswers / questions.length) * 100
    setScore(percentage)
    setQuizCompleted(true)

    // Determinar sucesso (>=80%)
    const success = percentage >= 80

    // Atraso para mostrar o resultado antes de fechar
    setTimeout(() => {
      onDefend(success)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <AoE4Panel className="w-full max-w-md">
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <AlertTriangle className="h-8 w-8 text-purple-500 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-aoe-gold font-cinzel">Ataque da Névoa!</h2>
          <p className="text-aoe-muted mt-2">
            A Névoa da Distração está atacando seu território. Defenda-o respondendo às perguntas sobre a tarefa!
          </p>
        </div>

        <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-aoe-gold font-medium">{hex.title}</h3>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-red-400 mr-1" />
              <span className="text-red-400">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="w-full h-2 bg-aoe-panel rounded-full overflow-hidden mb-4">
            <div className="h-full bg-red-500" style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>
        </div>

        {!quizCompleted ? (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-aoe-muted mb-2">
              <span>
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span>Acerte pelo menos 80% para defender</span>
            </div>

            <div className="bg-aoe-dark-blue border border-aoe-border rounded-md p-4 mb-4">
              <h3 className="text-aoe-light font-medium mb-3">{questions[currentQuestion].question}</h3>

              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-3 border rounded-md ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-aoe-gold bg-aoe-button text-aoe-gold"
                        : "border-aoe-border bg-aoe-dark-blue text-aoe-muted hover:bg-aoe-panel-header"
                    }`}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <AoE4Button
                variant="secondary"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Anterior
              </AoE4Button>

              {currentQuestion < questions.length - 1 ? (
                <AoE4Button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                >
                  Próxima
                </AoE4Button>
              ) : (
                <AoE4Button
                  onClick={handleSubmitQuiz}
                  disabled={selectedAnswers.length < questions.length || selectedAnswers.includes(undefined)}
                >
                  Finalizar Quiz
                </AoE4Button>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-4 text-center">
            <div className="text-2xl font-bold mb-2">
              {score >= 80 ? (
                <span className="text-green-500">Sucesso!</span>
              ) : (
                <span className="text-red-500">Falha!</span>
              )}
            </div>
            <p className="text-aoe-light mb-4">Você acertou {Math.round(score)}% das perguntas.</p>
            <p className="text-aoe-muted">
              {score >= 80
                ? "Você defendeu seu território com sucesso!"
                : "A Névoa da Distração conquistou seu território."}
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <AoE4Button variant="secondary" onClick={onFlee} disabled={quizCompleted}>
            <X className="h-4 w-4 mr-2" />
            Fugir (-{Math.round(focusPoints * 0.2)} Foco)
          </AoE4Button>

          {!quizCompleted && (
            <div className="flex items-center text-aoe-muted">
              <Brain className="h-4 w-4 mr-1" />
              <span>{focusPoints} Pontos de Foco</span>
            </div>
          )}
        </div>
      </AoE4Panel>
    </div>
  )
}
