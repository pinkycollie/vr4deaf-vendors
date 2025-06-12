import { ProvidersDirectory } from "@/components/providers-directory"

export default function ProvidersPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Service Providers</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connect with qualified VR professionals who understand deaf culture and communication needs.
        </p>
      </div>

      <ProvidersDirectory />
    </div>
  )
}
