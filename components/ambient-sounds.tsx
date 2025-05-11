"use client"

import { useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { useSound } from "@/contexts/sound-context"

interface AmbientSoundsProps {
  scene: "warRoom" | "qg" | "shop"
}

export function AmbientSounds({ scene }: AmbientSoundsProps) {
  const { enabled, volume, toggleSounds } = useSound()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) return

    // Definir o arquivo de áudio com base na cena
    let audioFile = ""
    switch (scene) {
      case "warRoom":
        audioFile = "/sounds/war-room-ambient.mp3"
        break
      case "qg":
        audioFile = "/sounds/qg-ambient.mp3"
        break
      case "shop":
        audioFile = "/sounds/shop-ambient.mp3"
        break
    }

    audioRef.current.src = audioFile
    audioRef.current.loop = true
    audioRef.current.volume = volume

    if (enabled) {
      audioRef.current.play().catch((error) => {
        console.error("Erro ao reproduzir áudio ambiente:", error)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [scene, enabled, volume])

  useEffect(() => {
    if (!audioRef.current) return

    if (enabled) {
      audioRef.current.play().catch((error) => {
        console.error("Erro ao reproduzir áudio ambiente:", error)
      })
    } else {
      audioRef.current.pause()
    }
  }, [enabled])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  return (
    <div>
      <audio ref={audioRef} />
      <button
        className="w-8 h-8 bg-aoe-panel border border-aoe-border rounded-md flex items-center justify-center text-aoe-light hover:bg-aoe-button"
        onClick={toggleSounds}
        title={enabled ? "Desativar sons" : "Ativar sons"}
      >
        {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
    </div>
  )
}
