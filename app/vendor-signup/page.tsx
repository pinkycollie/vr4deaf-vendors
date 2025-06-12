"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, FileText, CheckCircle } from "lucide-react"

export default function VendorSignup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    serviceTypes: [],
    specializations: [],
    experience: "",
    certifications: [],
    insurance: false,
    backgroundCheck: false,
  })

  const steps = [
    { number: 1, title: "Business Information", description: "Basic company details" },
    { number: 2, title: "Services & Specializations", description: "VR services you provide" },
    { number: 3, title: "Credentials & Compliance", description: "Required certifications" },
    { number: 4, title: "Review & Submit", description: "Final review" },
  ]

  const serviceTypes = [
    "ASL Interpretation",
    "Job Coaching",
    "Assistive Technology",
    "Vocational Assessment",
    "Skills Training",
    "Supported Employment",
    "Self-Employment Services",
    "Counseling Services",
  ]

  const specializations = [
    "Deaf/Hard of Hearing",
    "Blind/Visually Impaired",
    "Intellectual Disabilities",
    "Mental Health",
    "Physical Disabilities",
    "Autism Spectrum",
    "Traumatic Brain Injury",
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">VR Vendor Registration</h1>
          <p className="text-gray-600 mt-2">Join the Texas Workforce Solutions VR Services network</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {currentStep > step.number ? <CheckCircle className="w-6 h-6" /> : step.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={`text-sm font-medium ${currentStep >= step.number ? "text-blue-600" : "text-gray-500"}`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${currentStep > step.number ? "bg-blue-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Step {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business/Organization Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="Acme Rehabilitation Services"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Primary Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      placeholder="John Smith"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@acmerehab.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="123 Main St, Austin, TX 78701"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>VR Services Provided *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {serviceTypes.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox id={service} />
                        <Label htmlFor={service} className="text-sm">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Disability Specializations *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {specializations.map((spec) => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox id={spec} />
                        <Label htmlFor={spec} className="text-sm">
                          {spec}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience in VR Services *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Required Credentials & Certifications</Label>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Button variant="outline">Upload Business License</Button>
                        <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG up to 10MB</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Button variant="outline">Upload Professional Certifications</Button>
                        <p className="text-sm text-gray-500 mt-2">ASL, CRC, CVE, etc.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Compliance Requirements</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="insurance" />
                      <Label htmlFor="insurance">Professional Liability Insurance (Required)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="background" />
                      <Label htmlFor="background">Background Check Completed (Required)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="training" />
                      <Label htmlFor="training">VR Services Training Completed</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-4">Application Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Business:</strong> {formData.businessName || "Not provided"}
                    </p>
                    <p>
                      <strong>Contact:</strong> {formData.contactPerson || "Not provided"}
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.email || "Not provided"}
                    </p>
                    <p>
                      <strong>Phone:</strong> {formData.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the TWS-VRS Vendor Terms and Conditions *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy" />
                    <Label htmlFor="privacy" className="text-sm">
                      I acknowledge the Privacy Policy and HIPAA requirements *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="updates" />
                    <Label htmlFor="updates" className="text-sm">
                      I agree to receive updates about VR services and requirements
                    </Label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}>Next</Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700">Submit Application</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
