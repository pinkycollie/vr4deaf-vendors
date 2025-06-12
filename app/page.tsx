import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Services } from "@/components/services"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <CTA />
    </div>
  )
}
