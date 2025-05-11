"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type SoundEvent =
  | "buttonClick"
  | "territorySelect"
  | "territoryConquer"
  | "fogAttack"
  | "fogDefend"
  | "missionComplete"
  | "victory"
  | "defeat"
  | "notification"
  | "menuOpen"
  | "menuClose"
  | "error"

interface SoundContextType {
  playSound: (event: SoundEvent, options?: { volume?: number; loop?: boolean }) => void
  stopAllSounds: () => void
  toggleSounds: () => void
  adjustVolume: (volume: number) => void
  enabled: boolean
  volume: number
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true)
  const [volume, setVolume] = useState(0.5)

  const toggleSounds = useCallback(() => {
    setEnabled((prev) => !prev)
  }, [])

  const adjustVolume = useCallback((volume: number) => {
    setVolume(volume)
  }, [])

  const playSound = useCallback(
    (event: SoundEvent, options?: { volume?: number; loop?: boolean }) => {
      if (!enabled) return

      const soundPath = `/sounds/${event}.mp3`
      const audio = new Audio(soundPath)

      audio.volume = options?.volume ?? volume
      audio.loop = options?.loop ?? false

      audio.play().catch((error) => {
        console.error(`Failed to play sound: ${event}`, error)
      })
    },
    [enabled, volume],
  )

  const stopAllSounds = useCallback(() => {
    // This is a placeholder as stopping all sounds requires more complex audio management
    console.warn("Stopping all sounds is not fully implemented.")
  }, [])

  return (
    <SoundContext.Provider
      value={{
        enabled,
        volume,
        toggleSounds,
        adjustVolume,
        playSound,
        stopAllSounds,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider")
  }
  return context
}
