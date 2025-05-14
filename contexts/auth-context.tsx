"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import type { Session, User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any | null }>
  signUp: (email: string, password: string, username: string) => Promise<{ error: any | null; user: User | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = getSupabaseClient()

  useEffect(() => {
    // Verificar se há uma sessão ativa
    const initializeAuth = async () => {
      setLoading(true)
      try {
        // Obter sessão atual
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user || null)

        // Configurar listener para mudanças na autenticação
        const {
          data: { subscription },
        } = await supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
          setUser(session?.user || null)
          router.refresh()
        })

        return () => subscription.unsubscribe()
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [supabase, router])

  // Função para login
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      return { error }
    }
  }

  // Função para registro
  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      })

      // Se o registro for bem-sucedido, criar perfil do usuário
      if (data.user && !error) {
        // Criar perfil do usuário
        const { error: profileError } = await supabase.from("user_profiles").insert({
          id: data.user.id,
          username,
          focus_points: 100,
          recreation_points: 50,
          current_mood: "normal",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Erro ao criar perfil do usuário:", profileError)
          return { error: profileError, user: null }
        }
      }

      return { error, user: data.user }
    } catch (error) {
      console.error("Erro ao registrar:", error)
      return { error, user: null }
    }
  }

  // Função para logout
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/login")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  // Função para redefinir senha
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      return { error }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error)
      return { error }
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
