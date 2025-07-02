import type { Metadata } from "next"
import TexasVRServices from "@/components/texas-vr-services"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Texas VR Services | VR4DEAF",
  description: "Vocational rehabilitation services now live in Texas",
}

export default function TexasVRPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Texas VR Services</h1>
            <p className="text-lg text-muted-foreground">
              VR4DEAF is now live in Texas, providing specialized vocational rehabilitation services for deaf
              individuals.
            </p>
          </div>
          <TexasVRServices />
        </div>
      </main>
      <Footer />
    </div>
  )
}
