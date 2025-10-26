import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AccessibilityMenu from "@/components/accessibility-menu"
import KeyboardHelp from "@/components/keyboard-help"
import ContrastToggle from "@/components/contrast-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VR4Deaf - Vocational Rehabilitation Business Development Platform",
  description:
    "Empowering deaf entrepreneurs through VR services and AI-powered business development with Claude AI and Business Magician integration",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
          >
            Skip to main content
          </a>
          <main id="main-content">{children}</main>
          <AccessibilityMenu />
          <KeyboardHelp />
          <div className="fixed bottom-4 right-20 z-40">
            <ContrastToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
