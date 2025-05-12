"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

interface AmbientSoundsProps {
  scene: "warRoom" | "qg" | "shop"
}

export function AmbientSounds({ scene }: AmbientSoundsProps) {
  const [enabled, setEnabled] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) return

    // Definir o arquivo de áudio com base na cena (simulado)
    let audioFile = ""
    switch (scene) {
      case "warRoom":
        audioFile = "/sounds/ambient.mp3" // Arquivo fictício
        break
      case "qg":
        audioFile = "/sounds/ambient.mp3" // Arquivo fictício
        break
      case "shop":
        audioFile = "/sounds/ambient.mp3" // Arquivo fictício
        break
    }

    // Simular a existência do arquivo
    audioRef.current.src =
      "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
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

  const toggleSounds = () => {
    setEnabled(!enabled)
  }

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
