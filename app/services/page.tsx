import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Services from "@/components/services"

/**
 * SEO metadata for the Services page
 */
export const metadata: Metadata = {
  title: "Services | VR4DEAF",
  description:
    "Explore all AI-powered vocational rehabilitation services VR4DEAF offers to deaf job-seekers, entrepreneurs, and partnering VR agencies across the United States.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-20">
        <div className="container px-4">
          <section className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              AI-powered, ASL-first services designed to help deaf individuals succeed in employment, self-employment,
              or small-business growth, while giving agencies and vendors the tools they need to serve them better.
            </p>
          </section>

          {/* Re-use the Services component that lists all offerings */}
          <Services />
        </div>
      </main>

      <Footer />
    </div>
  )
}
