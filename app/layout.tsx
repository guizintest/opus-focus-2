import type React from "react"
import type { Metadata } from "next"
import { Inter, Cinzel } from "next/font/google"
import "./globals.css"
import { SoundProvider } from "@/contexts/sound-context"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Guardião do Foco | Conquer Focus",
  description: "Transforme sua produtividade em uma jornada de conquista",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${cinzel.variable} font-sans bg-aoe-dark-blue text-aoe-light`}>
        <SoundProvider>
          <div className="flex min-h-screen h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <TopBar />
              <main className="flex-1 p-4 overflow-y-auto">{children}</main>
            </div>
          </div>
        </SoundProvider>
      </body>
    </html>
  )
}
