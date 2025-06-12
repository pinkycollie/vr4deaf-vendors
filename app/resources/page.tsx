import { ResourcesLibrary } from "@/components/resources-library"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Resources Library</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Access guides, templates, and educational materials in ASL and written English.
        </p>
      </div>

      <ResourcesLibrary />
    </div>
  )
}
