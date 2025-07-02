import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "VR4DEAF | #1 AI-Powered Vocational Rehabilitation Platform for Deaf Communities",
    template: "%s | VR4DEAF - Leading VR Services for Deaf Employment",
  },
  description:
    "🥇 #1 AI-powered vocational rehabilitation platform for deaf individuals. 85% success rate. Free VR-funded services. Job placement, self-employment, business development. Serving all 50 states with ASL support.",
  keywords: [
    "vocational rehabilitation deaf",
    "VR services deaf community",
    "deaf employment services",
    "AI vocational rehabilitation",
    "deaf job placement",
    "VR counseling deaf",
    "deaf workforce development",
    "ASL vocational services",
    "deaf self employment",
    "deaf business development",
    "state VR programs deaf",
    "disability employment services",
    "deaf career services",
    "vocational training deaf",
    "deaf job coaching",
  ],
  authors: [{ name: "360 Magicians", url: "https://mbtquniverse.com" }],
  creator: "360 Magicians",
  publisher: "VR4DEAF Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vr4deaf.org"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "es-US": "/es",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vr4deaf.org",
    title: "VR4DEAF | #1 AI-Powered Vocational Rehabilitation Platform for Deaf Communities",
    description:
      "🥇 #1 AI-powered vocational rehabilitation platform for deaf individuals. 85% success rate. Free VR-funded services across all 50 states.",
    siteName: "VR4DEAF",
    images: [
      {
        url: "/og-image-vr4deaf.jpg",
        width: 1200,
        height: 630,
        alt: "VR4DEAF - #1 AI-Powered Vocational Rehabilitation Platform for Deaf Communities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VR4DEAF | #1 AI-Powered Vocational Rehabilitation Platform",
    description:
      "🥇 #1 AI-powered VR platform for deaf individuals. 85% success rate. Free services across all 50 states.",
    images: ["/og-image-vr4deaf.jpg"],
    creator: "@VR4DEAF",
    site: "@VR4DEAF",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "vr4deaf-google-verification-code",
    yandex: "vr4deaf-yandex-verification-code",
    bing: "vr4deaf-bing-verification-code",
  },
  category: "Disability Services",
  classification: "Vocational Rehabilitation Services",
  other: {
    "google-site-verification": "vr4deaf-google-verification-code",
    "msvalidate.01": "vr4deaf-bing-verification-code",
    "yandex-verification": "vr4deaf-yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://vr4deaf.org" />

        {/* Hreflang for international SEO */}
        <link rel="alternate" hrefLang="en-us" href="https://vr4deaf.org" />
        <link rel="alternate" hrefLang="x-default" href="https://vr4deaf.org" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
