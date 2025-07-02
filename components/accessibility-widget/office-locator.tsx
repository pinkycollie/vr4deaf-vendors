"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface OfficeLocatorProps {
  onClose: () => void
}

interface Office {
  id: number
  name: string
  address: string
  phone: string
  email: string
  distance?: string
}

// Sample VR office data
const sampleOffices: Office[] = [
  {
    id: 1,
    name: "Central City VR Office",
    address: "123 Main St, Central City, ST 12345",
    phone: "(555) 123-4567",
    email: "central@vr-services.gov",
  },
  {
    id: 2,
    name: "Westside Rehabilitation Center",
    address: "456 West Ave, Westside, ST 12346",
    phone: "(555) 234-5678",
    email: "westside@vr-services.gov",
  },
  {
    id: 3,
    name: "Eastside VR Services",
    address: "789 East Blvd, Eastside, ST 12347",
    phone: "(555) 345-6789",
    email: "eastside@vr-services.gov",
  },
  {
    id: 4,
    name: "North County Vocational Office",
    address: "101 North Rd, Northtown, ST 12348",
    phone: "(555) 456-7890",
    email: "north@vr-services.gov",
  },
  {
    id: 5,
    name: "South District Rehabilitation",
    address: "202 South St, Southville, ST 12349",
    phone: "(555) 567-8901",
    email: "south@vr-services.gov",
  },
]

export default function OfficeLocator({ onClose }: OfficeLocatorProps) {
  const [zipCode, setZipCode] = useState("")
  const [searchResults, setSearchResults] = useState<Office[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = () => {
    if (zipCode.trim() === "") return

    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Add random distances to offices for demo purposes
      const results = sampleOffices.map((office) => ({
        ...office,
        distance: `${Math.floor(Math.random() * 20) + 1} miles`,
      }))

      // Sort by "distance"
      results.sort((a, b) => {
        const distA = Number.parseInt(a.distance?.split(" ")[0] || "0")
        const distB = Number.parseInt(b.distance?.split(" ")[0] || "0")
        return distA - distB
      })

      setSearchResults(results)
      setHasSearched(true)
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col h-[500px] max-h-[80vh]">
      <div className="flex items-center justify-between p-4 bg-green-600 text-white">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          <h3 className="font-semibold">VR Office Locator</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-green-700">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="p-4">
        <p className="text-sm mb-4">
          Find the nearest Vocational Rehabilitation office to get assistance with funding and services.
        </p>

        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter ZIP code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={zipCode.trim() === "" || isLoading}>
            {isLoading ? (
              <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="sr-only">Search</span>
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="flex-1 overflow-y-auto">
          {hasSearched && searchResults.length === 0 ? (
            <div className="text-center py-8">
              <p>No offices found near this ZIP code.</p>
              <p className="text-sm text-muted-foreground mt-2">Try a different ZIP code or contact support.</p>
            </div>
          ) : hasSearched ? (
            <div className="space-y-4">
              <h4 className="font-medium">Offices near {zipCode}</h4>
              {searchResults.map((office) => (
                <div key={office.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h5 className="font-semibold">{office.name}</h5>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{office.distance}</span>
                  </div>
                  <p className="text-sm mt-1">{office.address}</p>
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MapPin className="h-4 w-4 mr-1" /> Directions
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Contact
                    </Button>
                  </div>
                </div>
              ))}

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-800">Need more options?</h5>
                <p className="text-sm text-blue-700 mt-1">
                  Visit MBTQ Universe for additional resources and services beyond what's available at these VR offices.
                </p>
                <Button size="sm" variant="link" className="p-0 mt-2 text-blue-600">
                  Visit MBTQ Universe
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>Enter your ZIP code to find nearby VR offices</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
