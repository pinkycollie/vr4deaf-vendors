"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { isVibrationSupported, triggerHapticFeedback, type VibrationPatternType } from "@/utils/haptic-feedback"

interface HapticFeedbackContextType {
  isSupported: boolean
  isEnabled: boolean
  setEnabled: (enabled: boolean) => void
  triggerFeedback: (pattern?: VibrationPatternType) => boolean
}

const HapticFeedbackContext = createContext<HapticFeedbackContextType | undefined>(undefined)

export function HapticFeedbackProvider({ children }: { children: React.ReactNode }) {
  const [isSupported, setIsSupported] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)

  // Check if vibration is supported on mount
  useEffect(() => {
    setIsSupported(isVibrationSupported())

    // Try to load user preference from localStorage
    const savedPreference = localStorage.getItem("hapticFeedbackEnabled")
    if (savedPreference !== null) {
      setIsEnabled(savedPreference === "true")
    }
  }, [])

  // Save preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("hapticFeedbackEnabled", isEnabled.toString())
  }, [isEnabled])

  const triggerFeedback = (pattern?: VibrationPatternType) => {
    if (!isSupported || !isEnabled) return false
    return triggerHapticFeedback(pattern)
  }

  return (
    <HapticFeedbackContext.Provider
      value={{
        isSupported,
        isEnabled,
        setEnabled: setIsEnabled,
        triggerFeedback,
      }}
    >
      {children}
    </HapticFeedbackContext.Provider>
  )
}

export function useHapticFeedback() {
  const context = useContext(HapticFeedbackContext)
  if (context === undefined) {
    throw new Error("useHapticFeedback must be used within a HapticFeedbackProvider")
  }
  return context
}
