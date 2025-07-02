import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getStateConfig } from "@/lib/states/config"
import { getVROfficesByState } from "@/lib/states/vr-offices"
import StateSpecificServices from "@/components/state-specific-services"

interface StatePageProps {
  params: {
    code: string
  }
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const stateConfig = getStateConfig(params.code)

  if (!stateConfig) {
    return {
      title: "State Not Found | VR4DEAF",
    }
  }

  return {
    title: `${stateConfig.name} VR Services | VR4DEAF`,
    description: `Vocational rehabilitation services for deaf individuals in ${stateConfig.name}`,
  }
}

export default function StatePage({ params }: StatePageProps) {
  const stateConfig = getStateConfig(params.code)
  const vrOffices = getVROfficesByState(params.code)

  if (!stateConfig) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container">
          <StateSpecificServices stateConfig={stateConfig} vrOffices={vrOffices} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
