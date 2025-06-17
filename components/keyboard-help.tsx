"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Keyboard } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function KeyboardHelp() {
  const [isVisible, setIsVisible] = useState(false)
  const [keyPressed, setKeyPressed] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show help when question mark is pressed
      if (e.key === "?" && !e.ctrlKey && !e.altKey && !e.metaKey) {
        setIsVisible((prev) => !prev)
      }

      // Set the currently pressed key for visual feedback
      setKeyPressed(e.key)

      // Clear the pressed key after a short delay
      setTimeout(() => setKeyPressed(null), 500)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const shortcuts = [
    { key: "?", description: "Show/hide keyboard shortcuts" },
    { key: "Tab", description: "Navigate between interactive elements" },
    { key: "Enter/Space", description: "Activate buttons or toggle checkboxes" },
    { key: "1-4", description: "Jump to different stages (when focused on tabs)" },
    { key: "Esc", description: "Close dialogs or menus" },
    { key: "Alt+A", description: "Open accessibility menu" },
  ]

  useEffect(() => {
    // Add keyboard shortcut for accessibility menu
    const handleAccessibilityShortcut = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "a") {
        // This would trigger the accessibility menu
        document
          .querySelector('[aria-label="Open accessibility menu"]')
          ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
      }
    }

    window.addEventListener("keydown", handleAccessibilityShortcut)
    return () => window.removeEventListener("keydown", handleAccessibilityShortcut)
  }, [])

  return (
    <>
      {/* Visual key press indicator */}
      <AnimatePresence>
        {keyPressed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-20 right-1/2 transform translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-md z-50"
          >
            Key pressed: <kbd className="px-2 py-1 bg-gray-700 rounded">{keyPressed}</kbd>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcuts help */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsVisible(false)}
          >
            <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Keyboard className="h-5 w-5" aria-hidden="true" />
                  Keyboard Shortcuts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span>{shortcut.description}</span>
                      <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border">{shortcut.key}</kbd>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small indicator that keyboard shortcuts are available */}
      <div className="fixed bottom-6 right-1/2 transform translate-x-1/2 bg-gray-100 dark:bg-gray-800 text-xs px-2 py-1 rounded-md opacity-70 hover:opacity-100 transition-opacity">
        Press <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">?</kbd> for keyboard shortcuts
      </div>
    </>
  )
}
