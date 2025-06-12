import type React from "react"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "VR4Deaf | Vocational Rehabilitation for Deaf Communities",
  description: "Comprehensive vocational rehabilitation platform designed specifically for deaf communities",
  keywords: "vocational rehabilitation, deaf, ASL, employment, accessibility, career development",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
