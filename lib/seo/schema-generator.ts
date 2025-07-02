export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VR4DEAF",
    description: "AI-powered vocational rehabilitation platform for deaf community",
    url: "https://vr4deaf.org",
    logo: "https://vr4deaf.org/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-VR4DEAF",
      contactType: "customer service",
      availableLanguage: ["English", "ASL"],
    },
    sameAs: ["https://twitter.com/vr4deaf", "https://linkedin.com/company/vr4deaf"],
    serviceArea: {
      "@type": "Country",
      name: "United States",
    },
  }
}

export function generateServiceSchema(stateName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Vocational Rehabilitation Services for Deaf - ${stateName}`,
    description: `Comprehensive VR services including job placement, training, and business development for deaf individuals in ${stateName}`,
    provider: {
      "@type": "Organization",
      name: "VR4DEAF",
    },
    serviceType: "Vocational Rehabilitation",
    audience: {
      "@type": "Audience",
      audienceType: "Deaf and Hard of Hearing Community",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `https://${stateName.toLowerCase()}.vr4deaf.org`,
      availableLanguage: ["English", "ASL"],
    },
  }
}

export function generateLocalBusinessSchema(stateCode: string, vrOffice: any) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: vrOffice.name,
    description: `VR office serving deaf community in ${vrOffice.city}, ${stateCode}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: vrOffice.address,
      addressLocality: vrOffice.city,
      addressRegion: stateCode,
      postalCode: vrOffice.zipCode,
      addressCountry: "US",
    },
    telephone: vrOffice.phone,
    url: `https://${stateCode.toLowerCase()}.vr4deaf.org`,
    serviceArea: {
      "@type": "State",
      name: stateCode,
    },
  }
}

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is vocational rehabilitation for deaf individuals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vocational rehabilitation (VR) helps deaf individuals prepare for, find, and maintain employment through funding for training, job placement services, and workplace accommodations.",
        },
      },
      {
        "@type": "Question",
        name: "How does AI improve VR services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI enhances VR services by providing intelligent job matching, automated application assistance, personalized career guidance, and efficient connection with appropriate VR offices.",
        },
      },
    ],
  }
}
