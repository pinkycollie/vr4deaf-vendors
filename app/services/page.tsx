import type { Metadata } from "next"
import Services from "@/components/services"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Services | VR4DEAF",
  description: "Comprehensive vocational rehabilitation services for deaf individuals",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive AI-powered services designed specifically for deaf individuals at every stage of their
              career journey.
            </p>
          </div>
          <Services />
        </div>
      </main>
      <Footer />
    </div>
  )
}
