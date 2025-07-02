"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Search } from "lucide-react"
import DualAudienceHero from "@/components/dual-audience-hero"

const states = [
  { name: "Alabama", code: "AL", slug: "alabama" },
  { name: "Alaska", code: "AK", slug: "alaska" },
  { name: "Arizona", code: "AZ", slug: "arizona" },
  { name: "Arkansas", code: "AR", slug: "arkansas" },
  { name: "California", code: "CA", slug: "california" },
  { name: "Colorado", code: "CO", slug: "colorado" },
  { name: "Connecticut", code: "CT", slug: "connecticut" },
  { name: "Delaware", code: "DE", slug: "delaware" },
  { name: "Florida", code: "FL", slug: "florida" },
  { name: "Georgia", code: "GA", slug: "georgia" },
  { name: "Hawaii", code: "HI", slug: "hawaii" },
  { name: "Idaho", code: "ID", slug: "idaho" },
  { name: "Illinois", code: "IL", slug: "illinois" },
  { name: "Indiana", code: "IN", slug: "indiana" },
  { name: "Iowa", code: "IA", slug: "iowa" },
  { name: "Kansas", code: "KS", slug: "kansas" },
  { name: "Kentucky", code: "KY", slug: "kentucky" },
  { name: "Louisiana", code: "LA", slug: "louisiana" },
  { name: "Maine", code: "ME", slug: "maine" },
  { name: "Maryland", code: "MD", slug: "maryland" },
  { name: "Massachusetts", code: "MA", slug: "massachusetts" },
  { name: "Michigan", code: "MI", slug: "michigan" },
  { name: "Minnesota", code: "MN", slug: "minnesota" },
  { name: "Mississippi", code: "MS", slug: "mississippi" },
  { name: "Missouri", code: "MO", slug: "missouri" },
  { name: "Montana", code: "MT", slug: "montana" },
  { name: "Nebraska", code: "NE", slug: "nebraska" },
  { name: "Nevada", code: "NV", slug: "nevada" },
  { name: "New Hampshire", code: "NH", slug: "new-hampshire" },
  { name: "New Jersey", code: "NJ", slug: "new-jersey" },
  { name: "New Mexico", code: "NM", slug: "new-mexico" },
  { name: "New York", code: "NY", slug: "new-york" },
  { name: "North Carolina", code: "NC", slug: "north-carolina" },
  { name: "North Dakota", code: "ND", slug: "north-dakota" },
  { name: "Ohio", code: "OH", slug: "ohio" },
  { name: "Oklahoma", code: "OK", slug: "oklahoma" },
  { name: "Oregon", code: "OR", slug: "oregon" },
  { name: "Pennsylvania", code: "PA", slug: "pennsylvania" },
  { name: "Rhode Island", code: "RI", slug: "rhode-island" },
  { name: "South Carolina", code: "SC", slug: "south-carolina" },
  { name: "South Dakota", code: "SD", slug: "south-dakota" },
  { name: "Tennessee", code: "TN", slug: "tennessee" },
  { name: "Texas", code: "TX", slug: "texas" },
  { name: "Utah", code: "UT", slug: "utah" },
  { name: "Vermont", code: "VT", slug: "vermont" },
  { name: "Virginia", code: "VA", slug: "virginia" },
  { name: "Washington", code: "WA", slug: "washington" },
  { name: "West Virginia", code: "WV", slug: "west-virginia" },
  { name: "Wisconsin", code: "WI", slug: "wisconsin" },
  { name: "Wyoming", code: "WY", slug: "wyoming" },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <DualAudienceHero />

      {/* State Selector Section */}
      <section id="states" className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-blue-600 text-white">
              <MapPin className="h-4 w-4 mr-2" />
              50 States Available
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Choose Your State for VR Services
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Access state-specific VR programs, funding information, and local resources tailored to your location.
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredStates.map((state) => (
              <Card key={state.code}\
