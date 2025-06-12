"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}
