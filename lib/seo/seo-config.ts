// lib/seo/seo-config.ts

export const seoConfig = {
  defaultTitle: "VR4DEAF - AI-Powered Vocational Rehabilitation for Deaf Community",
  defaultDescription:
    "Revolutionary AI-powered platform connecting deaf individuals with vocational rehabilitation services, job placement, and business development opportunities across all 50 states.",
  defaultKeywords: [
    "vocational rehabilitation deaf",
    "VR services deaf community",
    "deaf employment services",
    "AI vocational rehabilitation",
    "deaf job placement",
    "VR funding deaf",
    "deaf business development",
    "ASL employment services",
  ],
  siteUrl: "https://vr4deaf.org",
  siteName: "VR4DEAF",
  twitterHandle: "@vr4deaf",
  locale: "en_US",
}

export const stateKeywords = {
  texas: [
    "Texas vocational rehabilitation deaf",
    "Texas VR services deaf",
    "Texas deaf employment",
    "TWC VR deaf services",
    "Texas deaf job placement",
  ],
  california: [
    "California vocational rehabilitation deaf",
    "California VR services deaf",
    "California deaf employment",
    "DOR California deaf services",
    "California deaf job placement",
  ],
  florida: [
    "Florida vocational rehabilitation deaf",
    "Florida VR services deaf",
    "Florida deaf employment",
    "DVR Florida deaf services",
    "Florida deaf job placement",
  ],
  // Add all 50 states...
}

export function generateStateMetadata(stateCode: string, stateName: string) {
  return {
    title: `${stateName} Vocational Rehabilitation for Deaf | VR4DEAF`,
    description: `AI-powered vocational rehabilitation services for deaf individuals in ${stateName}. Connect with VR offices, access funding, and find employment opportunities.`,
    keywords: stateKeywords[stateCode.toLowerCase()] || [
      `${stateName} vocational rehabilitation deaf`,
      `${stateName} VR services deaf`,
      `${stateName} deaf employment`,
    ],
    openGraph: {
      title: `${stateName} VR Services for Deaf Community`,
      description: `Comprehensive vocational rehabilitation services for deaf individuals in ${stateName}`,
      url: `https://${stateCode.toLowerCase()}.vr4deaf.org`,
      siteName: "VR4DEAF",
      locale: "en_US",
      type: "website",
    },
  }
}
