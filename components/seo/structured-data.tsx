import Script from "next/script"
import {
  generateOrganizationSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
} from "@/lib/seo/schema-generator"

interface StructuredDataProps {
  type?: "organization" | "service" | "faq" | "localbusiness"
  stateName?: string
  vrOffice?: any
}

export function StructuredData({ type = "organization", stateName, vrOffice }: StructuredDataProps) {
  let schema = {}

  switch (type) {
    case "organization":
      schema = generateOrganizationSchema()
      break
    case "service":
      schema = generateServiceSchema(stateName || "United States")
      break
    case "faq":
      schema = generateFAQSchema()
      break
    case "localbusiness":
      schema = generateLocalBusinessSchema(stateName || "US", vrOffice)
      break
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
