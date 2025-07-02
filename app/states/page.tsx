import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MultiStateInfo from "@/components/multi-state-info"
import StateSelector from "@/components/state-selector"

export const metadata: Metadata = {
  title: "All States | VR4DEAF",
  description: "VR4DEAF availability and rollout across all 50 US states",
}

export default function StatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">VR4DEAF Across America</h1>
            <p className="text-lg text-muted-foreground">
              Explore VR4DEAF availability in your state and learn about our nationwide expansion plan.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-16">
            <StateSelector onStateChange={(state) => console.log("Selected state:", state)} showDetails={true} />
          </div>

          <MultiStateInfo />
        </div>
      </main>
      <Footer />
    </div>
  )
}
