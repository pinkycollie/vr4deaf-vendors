"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Bot, Briefcase, Building, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "VR Services", href: "/services", icon: Briefcase },
    { name: "All States", href: "/states", icon: Users },
    { name: "VR Funding", href: "/funding", icon: Building },
    { name: "Documentation", href: "/docs", icon: Bot },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-texas-red-600 to-texas-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">VR4DEAF</span>
              <span className="text-xs text-muted-foreground leading-none">AI-Powered VR Platform</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="outline" className="hidden sm:flex border-texas-red-300 text-texas-red-700">
            <Bot className="mr-1 h-3 w-3" />
            AI-Powered
          </Badge>

          <ThemeToggle />

          <Button asChild className="hidden md:flex bg-texas-red-600 hover:bg-texas-red-700">
            <Link href="/automation">Start VR Journey</Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-texas-red-600 to-texas-blue-600 rounded-lg flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg leading-none">VR4DEAF</span>
                    <span className="text-xs text-muted-foreground leading-none">AI-Powered VR Platform</span>
                  </div>
                </div>

                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 text-sm font-medium p-2 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <Button asChild className="bg-texas-red-600 hover:bg-texas-red-700">
                  <Link href="/automation" onClick={() => setIsOpen(false)}>
                    Start VR Journey
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
