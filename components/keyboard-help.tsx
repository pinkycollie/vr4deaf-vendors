"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Keyboard } from "lucide-react"

export default function KeyboardHelp() {
  const [isOpen, setIsOpen] = useState(false)

  const shortcuts = [
    { key: "Tab", description: "Navigate between interactive elements" },
    { key: "Enter / Space", description: "Activate buttons and links" },
    { key: "Arrow Keys", description: "Navigate within components" },
    { key: "Escape", description: "Close dialogs and menus" },
    { key: "Alt + M", description: "Open accessibility menu" },
    { key: "Alt + S", description: "Skip to main content" },
    { key: "Alt + H", description: "Show keyboard help" },
    { key: "Ctrl + /", description: "Show all keyboard shortcuts" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 left-4 z-40 bg-transparent"
          aria-label="Show keyboard shortcuts"
        >
          <Keyboard className="h-4 w-4 mr-2" />
          Keyboard Help
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Use these keyboard shortcuts to navigate the application efficiently.
          </p>
          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{shortcut.description}</span>
                <kbd className="px-2 py-1 text-xs bg-muted rounded border">{shortcut.key}</kbd>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
