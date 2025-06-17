"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, X, Building2, Bot } from "lucide-react"
import { useChat } from "@ai-sdk/react"

export default function UnifiedAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your unified business development assistant. I can help with VR Vendor/CBTAC services for Texas & Florida, or AI-powered planning with nationwide coverage. I specialize in accessibility integration and supporting the deaf and hard-of-hearing community. How can I assist you today?",
      },
    ],
  })

  const quickSuggestions = [
    "VR vs AI-powered services - which is right?",
    "Texas/Florida VR fee schedule explained",
    "AI business planning for accessibility",
    "Accommodation strategies for deaf entrepreneurs",
    "Nationwide AI planning benefits",
  ]

  const handleQuickSuggestion = (suggestion: string) => {
    handleInputChange({ target: { value: suggestion } } as any)
  }

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full h-14 w-14 shadow-lg transition-transform hover:scale-105 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600"
            aria-label="Open Business Development Assistant"
          >
            <div className="flex items-center">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              <Bot className="h-4 w-4 -ml-1" aria-hidden="true" />
            </div>
          </Button>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="fixed inset-0 bg-transparent -z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />

          <Card className="w-80 md:w-96 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  <Bot className="h-4 w-4 text-purple-600 -ml-1" />
                </div>
                Business Development Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                onClick={() => setIsOpen(false)}
                aria-label="Close Assistant"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </CardHeader>
            <CardContent>
              <div
                className="h-[300px] overflow-y-auto space-y-4 pr-2 scroll-smooth"
                aria-live="polite"
                aria-atomic="true"
                aria-relevant="additions"
              >
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[80%] ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                      role={message.role === "assistant" ? "status" : "none"}
                    >
                      <span className="sr-only">{message.role === "user" ? "You:" : "Assistant:"}</span>
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {messages.length === 1 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-muted-foreground">Common questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleQuickSuggestion(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  placeholder="Ask about VR services or AI planning..."
                  value={input}
                  onChange={handleInputChange}
                  className="flex-1"
                  aria-label="Message to assistant"
                />
                <Button type="submit" size="icon" aria-label="Send message">
                  <Send className="h-4 w-4" aria-hidden="true" />
                </Button>
              </form>
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)} className="w-full text-xs">
                Close Assistant
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
