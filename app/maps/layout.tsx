import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function MapsLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}
