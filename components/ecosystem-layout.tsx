import type React from "react"
import { EcosystemFooter } from "./ecosystem-footer"

interface EcosystemLayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
}

export function EcosystemLayout({ children, header }: EcosystemLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {header}
      <main className="flex-1">{children}</main>
      <EcosystemFooter />
    </div>
  )
}
