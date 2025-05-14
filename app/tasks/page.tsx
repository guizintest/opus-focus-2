"use client"

import { useState, useEffect } from "react"
import { AoE4Button } from "@/components/aoe4-button"
import { TopMenu } from "@/components/top-menu"
import {
  Search,
  Filter,
  Edit,
  Trash,
  Book,
  Video,
  Code,
  FileText,
  GraduationCapIcon as Graduation,
  CheckCircle,
  Circle,
} from "lucide-react"
import { Modal } from "@/components/ui/modal"
import { AddTaskForm } from "@/components/tasks/add-task-form"
import { TaskFilters, type TaskFilters as TaskFiltersType } from "@/components/tasks/task-filters"
import { ActiveFilters } from "@/components/tasks/active-filters"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { EditTaskForm } from "@/components/tasks/edit-task-form"
import { toggleTaskCompletion } from "@/lib/services/task-service"

interface Task {
  id: string
  title: string
  type: string
  difficulty: string
  points: number
  validation: string
  estimated_time?: string
  completed: boolean
  completed_at?: string
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<TaskFiltersType>({
    types: [],
    difficulties: [],
    validations: [],
    completionStatus: null,
  })
  const router = useRouter()

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
  const [completionLoading, setCompletionLoading] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      try {
        const supabase = getSupabaseClient()

        // Get current user
        const { data: userData } = await supabase.auth.getUser()
        if (!userData?.user) {
          router.push("/login")
          return
        }

        // Get tasks
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching tasks:", error)
          return
        }

        setTasks(data || [])
        setFilteredTasks(data || [])
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [router])

  // Apply filters and search whenever they change
  useEffect(() => {
    let result = [...tasks]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((task) => task.title.toLowerCase().includes(query))
    }

    // Apply completion status filter
    if (filters.completionStatus) {
      if (filters.completionStatus === "completed") {
        result = result.filter((task) => task.completed)
      } else if (filters.completionStatus === "incomplete") {
        result = result.filter((task) => !task.completed)
      }
    }

    // Apply type filters
    if (filters.types.length > 0) {
      result = result.filter((task) => filters.types.includes(task.type))
    }

    // Apply difficulty filters
    if (filters.difficulties.length > 0) {
      result = result.filter((task) => filters.difficulties.includes(task.difficulty))
    }

    // Apply validation filters
    if (filters.validations.length > 0) {
      result = result.filter((task) => filters.validations.includes(task.validation))
    }

    setFilteredTasks(result)
  }, [tasks, searchQuery, filters])

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return

    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from("tasks").delete().eq("id", taskId)

      if (error) {
        console.error("Error deleting task:", error)
        return
      }

      // Update local state
      const updatedTasks = tasks.filter((task) => task.id !== taskId)
      setTasks(updatedTasks)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleToggleCompletion = async (taskId: string, currentStatus: boolean) => {
    setCompletionLoading(taskId)
    try {
      await toggleTaskCompletion(taskId, !currentStatus)

      // Update local state
      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !currentStatus,
              completed_at: !currentStatus ? new Date().toISOString() : undefined,
            }
          : task,
      )
      setTasks(updatedTasks)
    } catch (error) {
      console.error("Error toggling task completion:", error)
    } finally {
      setCompletionLoading(null)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "leitura":
        return <Book className="h-5 w-5 text-blue-400" />
      case "video":
        return <Video className="h-5 w-5 text-red-400" />
      case "codigo":
        return <Code className="h-5 w-5 text-green-400" />
      case "notebook":
        return <FileText className="h-5 w-5 text-yellow-400" />
      case "curso":
        return <Graduation className="h-5 w-5 text-purple-400" />
      default:
        return <Book className="h-5 w-5 text-blue-400" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "leitura":
        return "Leitura"
      case "video":
        return "Vídeo do YouTube"
      case "codigo":
        return "Código"
      case "notebook":
        return "NotebookLM"
      case "curso":
        return "Curso"
      default:
        return type
    }
  }

  const handleTaskAdded = () => {
    setIsAddModalOpen(false)
    router.refresh()
  }

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task)
    setIsEditModalOpen(true)
  }

  const handleTaskUpdated = () => {
    setIsEditModalOpen(false)
    router.refresh()
  }

  const handleApplyFilters = (newFilters: TaskFiltersType) => {
    setFilters(newFilters)
    setIsFilterPanelOpen(false)
  }

  const handleRemoveFilter = (filterType: keyof TaskFiltersType, value: string | null) => {
    if (filterType === "completionStatus") {
      setFilters((prev) => ({
        ...prev,
        completionStatus: null,
      }))
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: prev[filterType].filter((item) => item !== value),
      }))
    }
  }

  const handleClearAllFilters = () => {
    setFilters({
      types: [],
      difficulties: [],
      validations: [],
      completionStatus: null,
    })
  }

  const formatCompletionDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-aoe-dark-blue">
      <TopMenu activeItem="tarefas" />

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-aoe-gold font-cinzel">BANCO DE TAREFAS</h1>
          <AoE4Button onClick={() => setIsAddModalOpen(true)}>Adicionar Nova Tarefa</AoE4Button>
        </div>

        <div className="bg-aoe-panel border border-aoe-border rounded-md p-4 mb-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aoe-muted h-5 w-5" />
              <input
                type="text"
                placeholder="Pesquisar tarefas..."
                className="w-full pl-10 pr-4 py-2 bg-aoe-dark-blue border border-aoe-border rounded-md text-aoe-light focus:outline-none focus:ring-1 focus:ring-aoe-gold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AoE4Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            >
              <Filter className="h-4 w-4" />
              Filtrar
            </AoE4Button>
          </div>

          {/* Filter panel */}
          {isFilterPanelOpen && (
            <div className="mb-6">
              <TaskFilters
                onApplyFilters={handleApplyFilters}
                onClose={() => setIsFilterPanelOpen(false)}
                initialFilters={filters}
              />
            </div>
          )}

          {/* Active filters */}
          <ActiveFilters
            filters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAllFilters={handleClearAllFilters}
          />

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-aoe-gold"></div>
              <p className="mt-2 text-aoe-muted">Carregando tarefas...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-aoe-muted">
                {tasks.length === 0
                  ? "Nenhuma tarefa encontrada"
                  : "Nenhuma tarefa corresponde aos filtros selecionados"}
              </p>
              {tasks.length === 0 && (
                <p className="text-aoe-muted text-sm mt-2">Clique em "Adicionar Nova Tarefa" para começar</p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="task-table">
                <thead>
                  <tr>
                    <th className="w-12">STATUS</th>
                    <th>TÍTULO</th>
                    <th>TIPO</th>
                    <th>DIFICULDADE</th>
                    <th>PONTOS</th>
                    <th>VALIDAÇÃO</th>
                    <th>CONCLUÍDA EM</th>
                    <th>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className={task.completed ? "opacity-70" : ""}>
                      <td>
                        <button
                          onClick={() => handleToggleCompletion(task.id, task.completed)}
                          disabled={completionLoading === task.id}
                          className="p-1 text-aoe-light hover:text-aoe-gold"
                          title={task.completed ? "Marcar como pendente" : "Marcar como concluída"}
                        >
                          {completionLoading === task.id ? (
                            <div className="h-5 w-5 rounded-full border-2 border-aoe-gold border-t-transparent animate-spin"></div>
                          ) : task.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </button>
                      </td>
                      <td className={`text-aoe-light ${task.completed ? "line-through" : ""}`}>{task.title}</td>
                      <td>
                        <div className="task-type-icon">
                          {getTypeIcon(task.type)}
                          <span className="text-aoe-light">{getTypeLabel(task.type)}</span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`difficulty-${task.difficulty === "fácil" ? "easy" : task.difficulty === "médio" ? "medium" : "hard"}`}
                        >
                          {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
                        </span>
                      </td>
                      <td className="text-aoe-gold">{task.points}</td>
                      <td className="text-aoe-light">{task.validation}</td>
                      <td className="text-aoe-light text-sm">
                        {task.completed ? formatCompletionDate(task.completed_at) : "-"}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="p-1 text-aoe-light hover:text-aoe-gold"
                            onClick={() => handleEditTask(task)}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="p-1 text-aoe-light hover:text-red-400"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Adicionar Nova Tarefa">
        <AddTaskForm onSuccess={handleTaskAdded} onCancel={() => setIsAddModalOpen(false)} />
      </Modal>

      {/* Edit Task Modal */}
      {taskToEdit && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Editar Tarefa">
          <EditTaskForm task={taskToEdit} onSuccess={handleTaskUpdated} onCancel={() => setIsEditModalOpen(false)} />
        </Modal>
      )}
    </div>
  )
}
