"use server"

import { getSupabaseServer } from "../supabase/server"
import { revalidatePath } from "next/cache"

interface TaskInput {
  title: string
  type: string
  difficulty: string
  points: number
  validation: string
  estimated_time?: string
}

export async function createTask(task: TaskInput) {
  const supabase = getSupabaseServer()

  // Get current user ID
  const { data: userData } = await supabase.auth.getUser()
  if (!userData?.user) {
    throw new Error("Usuário não autenticado")
  }

  const userId = userData.user.id

  // Create task
  const { data, error } = await supabase.from("tasks").insert({
    user_id: userId,
    title: task.title,
    type: task.type,
    difficulty: task.difficulty,
    points: task.points,
    validation: task.validation,
    estimated_time: task.estimated_time || null,
    created_at: new Date().toISOString(),
    completed: false,
  })

  if (error) {
    console.error("Erro ao criar tarefa:", error)
    throw new Error(`Erro ao criar tarefa: ${error.message}`)
  }

  // Revalidate tasks page
  revalidatePath("/tasks")

  return data
}

export async function updateTask(taskId: string, task: TaskInput) {
  const supabase = getSupabaseServer()

  // Get current user ID
  const { data: userData } = await supabase.auth.getUser()
  if (!userData?.user) {
    throw new Error("Usuário não autenticado")
  }

  // Update task
  const { data, error } = await supabase
    .from("tasks")
    .update({
      title: task.title,
      type: task.type,
      difficulty: task.difficulty,
      points: task.points,
      validation: task.validation,
      estimated_time: task.estimated_time || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", taskId)
    .eq("user_id", userData.user.id)
    .select()

  if (error) {
    console.error("Erro ao atualizar tarefa:", error)
    throw new Error(`Erro ao atualizar tarefa: ${error.message}`)
  }

  // Revalidate tasks page
  revalidatePath("/tasks")

  return data
}

export async function toggleTaskCompletion(taskId: string, completed: boolean) {
  const supabase = getSupabaseServer()

  // Get current user ID
  const { data: userData } = await supabase.auth.getUser()
  if (!userData?.user) {
    throw new Error("Usuário não autenticado")
  }

  const updateData: any = {
    completed,
    updated_at: new Date().toISOString(),
  }

  // If marking as completed, add completion date
  if (completed) {
    updateData.completed_at = new Date().toISOString()
  } else {
    updateData.completed_at = null
  }

  // Update task completion status
  const { data, error } = await supabase
    .from("tasks")
    .update(updateData)
    .eq("id", taskId)
    .eq("user_id", userData.user.id)
    .select()

  if (error) {
    console.error("Erro ao atualizar status da tarefa:", error)
    throw new Error(`Erro ao atualizar status da tarefa: ${error.message}`)
  }

  // Revalidate tasks page
  revalidatePath("/tasks")

  return data
}

export async function getUserTasks(userId: string) {
  const supabase = getSupabaseServer()

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao buscar tarefas:", error)
    throw new Error(`Erro ao buscar tarefas: ${error.message}`)
  }

  return data
}

export async function deleteTask(taskId: string) {
  const supabase = getSupabaseServer()

  // Get current user ID
  const { data: userData } = await supabase.auth.getUser()
  if (!userData?.user) {
    throw new Error("Usuário não autenticado")
  }

  // Delete task
  const { error } = await supabase.from("tasks").delete().eq("id", taskId).eq("user_id", userData.user.id)

  if (error) {
    console.error("Erro ao excluir tarefa:", error)
    throw new Error(`Erro ao excluir tarefa: ${error.message}`)
  }

  // Revalidate tasks page
  revalidatePath("/tasks")

  return true
}
