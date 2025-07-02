import type { MetadataRoute } from "next"
import { stateConfigs } from "@/lib/states/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vr4deaf.org"

  // Main site pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/automation`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vendor-services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/resume-builder`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ]

  // State-specific pages
  const statePages = Object.entries(stateConfigs).map(([code, config]) => ({
    url: `https://${code.toLowerCase()}.vr4deaf.org`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // State service pages
  const stateServicePages = Object.entries(stateConfigs).flatMap(([code, config]) => [
    {
      url: `https://${code.toLowerCase()}.vr4deaf.org/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `https://${code.toLowerCase()}.vr4deaf.org/vr-offices`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ])

  return [...mainPages, ...statePages, ...stateServicePages]
}
