import type { Metadata } from "next"
import FundingInfo from "@/components/funding-info"
import VrRequestGuide from "@/components/vr-request-guide"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "VR Funding | VR4DEAF",
  description: "Understanding vocational rehabilitation funding for deaf individuals",
}

export default function FundingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">VR Funding Information</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive guide to vocational rehabilitation funding options and how to maximize your benefits.
            </p>
          </div>
          <FundingInfo />
          <div className="mt-20">
            <VrRequestGuide />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
