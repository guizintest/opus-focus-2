import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Criando o cliente Supabase no lado do servidor
export const getSupabaseServer = () => {
  const cookieStore = cookies()

  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        "x-supabase-cookie": cookieStore.get("sb-auth-token")?.value || "",
      },
    },
  })
}
