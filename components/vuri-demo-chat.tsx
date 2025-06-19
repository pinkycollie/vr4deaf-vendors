"use client"

import { useState } from "react"
import { SendHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  content: string
  sender: "user" | "vuri"
  timestamp: Date
}

export function VuriDemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm VURI, your AI assistant for vocational rehabilitation. How can I help you today?",
      sender: "vuri",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate VURI response
    setTimeout(() => {
      const vuriResponse = getVuriResponse(inputValue)
      const vuriMessage: Message = {
        id: messages.length + 2,
        content: vuriResponse,
        sender: "vuri",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, vuriMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getVuriResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("resume") || input.includes("cv")) {
      return "I can help you build a professional resume that highlights your skills and experiences. Would you like me to guide you through the process or review your existing resume?"
    } else if (input.includes("interview") || input.includes("prepare")) {
      return "Interview preparation is crucial! I can help you practice common interview questions, provide feedback on your responses, and share strategies for addressing questions about accommodations."
    } else if (input.includes("job") || input.includes("work") || input.includes("career")) {
      return "I can help you find job opportunities that match your skills and interests. What type of position are you looking for, and do you have any specific requirements for workplace accommodations?"
    } else if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! I'm here to assist with your vocational rehabilitation journey. I can help with resume building, interview preparation, job searching, and more. What would you like to focus on today?"
    } else {
      return "I'm here to support your vocational rehabilitation journey. I can help with resume building, interview preparation, job searching, skill development, and connecting with Deaf-friendly employers. How can I assist you today?"
    }
  }

  return (
    <div className="flex flex-col h-[500px] rounded-lg border bg-white">
      <div className="border-b p-3 flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/vuri-avatar.png" alt="VURI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">VURI</p>
          <p className="text-xs text-green-600">Online</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-900">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim()}>
            <SendHorizontal className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          This is a demo. Try asking about resume help, interview preparation, or job searching.
        </p>
      </div>
    </div>
  )
}
