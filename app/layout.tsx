import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { HapticFeedbackProvider } from "@/contexts/haptic-feedback-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VR4Deaf - Vocational Rehabilitation for Deaf Individuals",
  description:
    "Empowering Deaf individuals with accessible vocational rehabilitation services and job placement support.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HapticFeedbackProvider>
          {children}
          <Toaster />
        </HapticFeedbackProvider>
      </body>
    </html>
  )
}
