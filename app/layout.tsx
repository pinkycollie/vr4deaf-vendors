import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AIAssistant from "@/components/ai-assistant"
import AccessibilityMenu from "@/components/accessibility-menu"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SaaS & AI App Development Milestones",
  description: "Interactive milestone tracker for SaaS and AI-powered application development",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          /* Accessibility styles */
          .high-contrast-mode {
            --background: #000000;
            --foreground: #ffffff;
            --primary: #ffff00;
            --card: #121212;
            --card-foreground: #ffffff;
            --border: #ffffff;
            --input: #ffffff;
          }
          
          .large-text-mode {
            font-size: 120%;
          }
          
          .reduced-motion * {
            animation: none !important;
            transition: none !important;
          }
          
          /* Focus styles */
          *:focus-visible {
            outline: 3px solid var(--primary);
            outline-offset: 2px;
          }
          
          /* Skip link */
          .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary);
            color: var(--primary-foreground);
            padding: 8px;
            z-index: 100;
            transition: top 0.2s;
          }
          
          .skip-link:focus {
            top: 0;
          }

          /* Simple animations */
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        {/* Skip to main content link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <AIAssistant />
          <AccessibilityMenu />
        </ThemeProvider>
      </body>
    </html>
  )
}
