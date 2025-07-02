import VRInterestForm from "@/components/vr-interest-form"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "VR Interest Form | 360 Business Magician",
  description: "Submit your interest in Texas Workforce Solutions-Vocational Rehabilitation (VR) Services",
}

export default function InterestFormPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto py-8 px-4">
          <VRInterestForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
