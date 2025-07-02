import type React from "react"
import Link from "next/link"
import { ArrowLeft, FileText, Code, Database, Bot } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to VR4DEAF
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-semibold">Documentation</h1>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <aside className="md:col-span-1">
            <nav className="space-y-2">
              <h2 className="text-lg font-semibold mb-4">Documentation</h2>

              <Link
                href="/docs"
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <FileText className="h-4 w-4" />
                Overview
              </Link>

              <Link
                href="/docs/technical-implementation"
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <Code className="h-4 w-4" />
                Technical Implementation
              </Link>

              <Link
                href="/docs/api-reference"
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <Database className="h-4 w-4" />
                API Reference
              </Link>

              <Link
                href="/docs/vuri-ai"
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <Bot className="h-4 w-4" />
                Vuri AI System
              </Link>
            </nav>
          </aside>

          <main className="md:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  )
}
