import UnifiedMilestoneTracker from "@/components/milestone-tracker"
import PlatformSelector from "@/components/platform-selector"
import { Building2, Bot } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
          VR4Deaf Business Development Platform
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Comprehensive business development support for the deaf and hard-of-hearing community. VR Vendor/CBTAC
          services for Texas & Florida, AI-powered planning with nationwide coverage. Includes complete VR office
          contact directory for all 50 states.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/20 px-3 py-2 rounded-full">
            <Building2 className="h-4 w-4 text-blue-600" />
            <span>VR Vendor/CBTAC (TX/FL)</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/20 px-3 py-2 rounded-full">
            <Bot className="h-4 w-4 text-purple-600" />
            <span>AI-Powered (Nationwide)</span>
          </div>
        </div>
      </header>

      <section aria-labelledby="platform-selector-heading">
        <h2 id="platform-selector-heading" className="sr-only">
          Platform Selector
        </h2>
        <PlatformSelector />
      </section>

      <section aria-labelledby="unified-milestone-tracker-heading">
        <h2 id="unified-milestone-tracker-heading" className="sr-only">
          Unified Business Development Milestone Tracker
        </h2>
        <UnifiedMilestoneTracker />
      </section>

      <footer className="mt-16 pt-8 border-t text-center text-sm text-gray-500">
        <p>🎯 VR Vendor/CBTAC Compliant • 🤖 AI-Powered Innovation • ♿ Accessibility-First Design</p>
        <p className="mt-2">Empowering deaf and hard-of-hearing entrepreneurs nationwide</p>
      </footer>
    </main>
  )
}
