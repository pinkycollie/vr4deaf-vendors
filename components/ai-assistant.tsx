"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, X, Building2, Sparkles, Brain } from "lucide-react"
import { useChat } from "@ai-sdk/react"

export default function UnifiedAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your enhanced business development assistant powered by Claude AI and Business Magician API. I provide advanced insights for VR Vendor/CBTAC services in Texas & Florida, plus AI-powered planning with nationwide coverage. I specialize in accessibility integration and supporting the deaf and hard-of-hearing community with cutting-edge business intelligence. How can I assist you today?",
      },
    ],
  })

  const quickSuggestions = [
    "Generate business insights with AI analysis",
    "VR vs AI-powered services comparison",
    "Texas/Florida VR compliance tracking",
    "Market analysis for deaf entrepreneurs",
    "Accessibility-first business strategies",
    "Financial projections with VR funding",
  ]

  const handleQuickSuggestion = (suggestion: string) => {
    handleInputChange({ target: { value: suggestion } } as any)
  }

  const generateBusinessInsights = async () => {
    setIsGeneratingInsights(true)
    try {
      // This would typically get user input for business type, location, etc.
      const response = await fetch("/api/business-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: "service",
          location: "nationwide",
          targetMarket: "deaf_community",
          goals: ["accessibility", "growth", "compliance"],
        }),
      })

      if (response.ok) {
        const insights = await response.json()
        // Add insights to chat
        handleInputChange({
          target: { value: `Show me detailed business insights: ${JSON.stringify(insights, null, 2)}` },
        } as any)
      }
    } catch (error) {
      console.error("Failed to generate insights:", error)
    } finally {
      setIsGeneratingInsights(false)
    }
  }

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full h-16 w-16 shadow-lg transition-transform hover:scale-105 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600"
            aria-label="Open Enhanced Business Development Assistant"
          >
            <div className="flex items-center relative">
              <Building2 className="h-5 w-5" aria-hidden="true" />
              <Brain className="h-4 w-4 -ml-1" aria-hidden="true" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" aria-hidden="true" />
            </div>
          </Button>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="fixed inset-0 bg-transparent -z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />

          <Card className="w-80 md:w-96 shadow-xl border-2 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 text-purple-600" />
                  <Brain className="h-4 w-4 text-blue-600 -ml-1" />
                </div>
                <div className="flex flex-col">
                  <span>Business Development Assistant</span>
                  <div className="flex gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      Claude AI
                    </Badge>
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      Business Magician
                    </Badge>
                  </div>
                </div>
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
                className="h-[320px] overflow-y-auto space-y-4 pr-2 scroll-smooth"
                aria-live="polite"
                aria-atomic="true"
                aria-relevant="additions"
              >
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200"
                      }`}
                      role={message.role === "assistant" ? "status" : "none"}
                    >
                      <span className="sr-only">{message.role === "user" ? "You:" : "Assistant:"}</span>
                      {message.content}
                    </div>
                  </div>
                ))}
                {(isLoading || isGeneratingInsights) && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                        <span className="text-sm text-gray-600">
                          {isGeneratingInsights ? "Generating business insights..." : "Thinking..."}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {messages.length === 1 && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <p className="text-xs text-muted-foreground font-medium">Enhanced AI Capabilities:</p>
                  </div>
                  <Button
                    onClick={generateBusinessInsights}
                    disabled={isGeneratingInsights}
                    className="w-full text-xs bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isGeneratingInsights ? "Generating..." : "Generate Business Insights"}
                  </Button>
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs hover:bg-purple-50 hover:border-purple-300 bg-transparent"
                        onClick={() => handleQuickSuggestion(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2 bg-gradient-to-r from-purple-50 to-blue-50">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  placeholder="Ask about VR services, AI insights, or business analysis..."
                  value={input}
                  onChange={handleInputChange}
                  className="flex-1 border-purple-200 focus:border-purple-400"
                  aria-label="Message to assistant"
                  disabled={isLoading || isGeneratingInsights}
                />
                <Button
                  type="submit"
                  size="icon"
                  aria-label="Send message"
                  disabled={isLoading || isGeneratingInsights}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </Button>
              </form>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-full text-xs hover:bg-purple-50"
              >
                Close Assistant
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
