"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Briefcase,
  Building,
  Code,
  Database,
  Shield,
  Home,
  Calculator,
  GraduationCap,
  Lightbulb,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ChevronUp,
  Mail,
  Globe,
  Eye,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EcosystemFooter() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    alert(`Thank you for subscribing with ${email}!`)
    setEmail("")
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="border-t bg-gray-100 relative">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute right-8 -top-6 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      {/* Compact Accessibility and Language Controls */}
      <div className="bg-gray-200 py-1">
        <div className="container px-4 md:px-6 flex flex-wrap justify-between items-center text-[10px]">
          <div className="flex items-center space-x-3">
            <button className="flex items-center gap-1 text-gray-700 hover:text-primary">
              <Eye className="h-3 w-3" />
              <span>Accessibility</span>
            </button>
            <button className="flex items-center gap-1 text-gray-700 hover:text-primary">
              <Globe className="h-3 w-3" />
              <span>ASL/English</span>
            </button>
          </div>
          <div>
            <button className="flex items-center gap-1 text-gray-700 hover:text-primary">
              <Menu className="h-3 w-3" />
              <span>Ecosystem</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container py-8 px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Column 1: About MBTQ Ecosystem */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">MBTQ</span>
              </div>
              <h3 className="text-lg font-bold">MBTQ Ecosystem</h3>
            </div>
            <p className="text-sm text-gray-600">
              A comprehensive ecosystem of tools and platforms designed to empower Deaf individuals through accessible
              technology, real-time synchronization, and gesture-native AI.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" className="text-gray-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://linkedin.com" className="text-gray-500 hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://github.com" className="text-gray-500 hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>

            {/* Simplified Newsletter Subscription */}
            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Subscribe to newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-8 text-xs"
                />
                <Button type="submit" size="sm" className="h-8 px-2">
                  <Mail className="h-3 w-3" />
                </Button>
              </form>
            </div>
          </div>

          {/* Column 2: Core Platforms */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Core Platforms</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://mbtquniverse.com"
                  className="text-sm text-gray-600 hover:text-primary flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>MBTQUniverse.com</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://mbtq.dev"
                  className="text-sm text-gray-600 hover:text-primary flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
                    <Code className="h-4 w-4 text-green-600" />
                  </div>
                  <span>MBTQ.dev (DevSL)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://pinksync.io"
                  className="text-sm text-gray-600 hover:text-primary flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-pink-100 rounded-md flex items-center justify-center">
                    <Database className="h-4 w-4 text-pink-600" />
                  </div>
                  <span>PinkSync.io</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://vr4deaf.com"
                  className="text-sm text-gray-600 hover:text-primary flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-purple-600" />
                  </div>
                  <span>VR4Deaf</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: 360 Magicians & MBTQ Group */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">360 Magicians</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/job-magician" className="text-sm text-gray-600 hover:text-primary flex items-center gap-2">
                  <div className="w-6 h-6 bg-amber-100 rounded-md flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-amber-600" />
                  </div>
                  <span>360 Job Magician</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/business-magician"
                  className="text-sm text-gray-600 hover:text-primary flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-amber-100 rounded-md flex items-center justify-center">
                    <Building className="h-4 w-4 text-amber-600" />
                  </div>
                  <span>360 Business Magician</span>
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-bold mt-6">MBTQ Group</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/real-estate" className="text-sm text-gray-600 hover:text-primary flex items-center gap-2">
                  <div className="w-6 h-6 bg-cyan-100 rounded-md flex items-center justify-center">
                    <Home className="h-4 w-4 text-cyan-600" />
                  </div>
                  <span>Real Estate</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tax-insurance"
                  className="text-sm text-gray-600 hover:text-primary flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-cyan-100 rounded-md flex items-center justify-center">
                    <Calculator className="h-4 w-4 text-cyan-600" />
                  </div>
                  <span>Tax & Insurance</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: R&D and Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">R&D Initiatives</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/fibonrose" className="text-sm text-gray-600 hover:text-primary flex items-center gap-2">
                  <div className="w-6 h-6 bg-rose-100 rounded-md flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-rose-600" />
                  </div>
                  <span>FibonRose</span>
                </Link>
              </li>
              <li>
                <Link href="/deafauth" className="text-sm text-gray-600 hover:text-primary flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-100 rounded-md flex items-center justify-center">
                    <Shield className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span>DeafAuth</span>
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-bold mt-6">Contact Us</h3>
            <address className="not-italic text-sm text-gray-600">
              <p>
                Email:{" "}
                <a href="mailto:info@mbtq.com" className="hover:text-primary">
                  info@mbtq.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+15555555555" className="hover:text-primary">
                  555-555-5555
                </a>
              </p>
              <p>Address: 123 Deaf Tech Way, Innovation City, TX 78701</p>
            </address>
          </div>
        </div>

        {/* Simplified Ecosystem Diagram */}
        <div className="py-4 border-t border-gray-200 mb-4">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <Database className="h-4 w-4 text-pink-600" />
              </div>
              <span className="text-xs">PinkSync.io</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-xs">MBTQUniverse</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Code className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-xs">MBTQ.dev</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-amber-600" />
              </div>
              <span className="text-xs">360 Magicians</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-xs">VR4Deaf</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-sm text-gray-500">© 2025 MBTQ Ecosystem. All rights reserved.</span>
            </div>
            <nav className="flex flex-wrap gap-4 sm:gap-6 justify-center">
              <Link href="/privacy" className="text-xs text-gray-500 hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-gray-500 hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-xs text-gray-500 hover:text-primary">
                Accessibility Statement
              </Link>
              <Link href="/sitemap" className="text-xs text-gray-500 hover:text-primary">
                Sitemap
              </Link>
            </nav>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              <span className="font-medium">360 Magicians</span> | Part of MBTQ Ecosystem
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
