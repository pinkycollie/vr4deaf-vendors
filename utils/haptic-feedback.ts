/**
 * Utility functions for providing haptic feedback on mobile devices
 * using the Web Vibration API
 */

// Check if vibration is supported in the browser
export const isVibrationSupported = (): boolean => {
  return "vibrate" in navigator
}

// Vibration patterns for different notification types
export const vibrationPatterns = {
  success: [100, 50, 100], // Short-pause-short for success
  error: [300, 100, 300, 100, 300], // Three longer vibrations for error
  warning: [200, 100, 200], // Medium-pause-medium for warning
  info: [100], // Single short vibration for info
  default: [100], // Default pattern
}

export type VibrationPatternType = keyof typeof vibrationPatterns

/**
 * Trigger haptic feedback with a specific pattern
 * @param pattern The vibration pattern to use
 * @returns boolean indicating if vibration was triggered
 */
export const triggerHapticFeedback = (pattern: VibrationPatternType = "default"): boolean => {
  if (!isVibrationSupported()) {
    return false
  }

  try {
    navigator.vibrate(vibrationPatterns[pattern])
    return true
  } catch (error) {
    console.error("Error triggering vibration:", error)
    return false
  }
}

/**
 * Stop any ongoing vibration
 */
export const stopVibration = (): void => {
  if (isVibrationSupported()) {
    navigator.vibrate(0)
  }
}
