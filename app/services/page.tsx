import { ServicesDirectory } from "@/components/services-directory"

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">VR Services Directory</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find culturally responsive vocational rehabilitation services designed specifically for deaf individuals.
        </p>
      </div>

      <ServicesDirectory />
    </div>
  )
}
