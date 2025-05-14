import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Cinzel } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata = {
  title: "Guardião do Foco",
  description: "Aplicativo gamificado para gerenciamento de foco e produtividade",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${cinzel.variable} font-sans`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
