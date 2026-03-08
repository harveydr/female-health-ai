"use client"

import { useState, useEffect } from "react"

export type Mode = "normal" | "preconception" | "pregnancy"

const modeLabels: Record<Mode, string> = {
  normal: "普通模式",
  preconception: "备孕模式",
  pregnancy: "孕期模式",
}

export function useMode() {
  const [mode, setModeState] = useState<Mode>("normal")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem("health-mode") as Mode
    if (savedMode && ["normal", "preconception", "pregnancy"].includes(savedMode)) {
      setModeState(savedMode)
    }
    setIsLoaded(true)
  }, [])

  const setMode = (newMode: Mode) => {
    setModeState(newMode)
    localStorage.setItem("health-mode", newMode)
  }

  return {
    mode,
    setMode,
    modeLabel: modeLabels[mode],
    isLoaded,
  }
}
