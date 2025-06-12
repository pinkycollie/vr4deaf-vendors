"use client"

import type React from "react"
import { useState, forwardRef, useImperativeHandle } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PersonalInfoFormProps {
  data: any
  updateData: (data: any) => void
}

export const PersonalInfoForm = forwardRef<{ handleSubmit: () => void }, PersonalInfoFormProps>(
  ({ data, updateData }, ref) => {
    const [formState, setFormState] = useState({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      dateOfBirth: data.dateOfBirth || "",
      gender: data.gender || "",
      address: data.address || "",
      city: data.city || "",
      state: data.state || "",
      zipCode: data.zipCode || "",
      phone: data.phone || "",
      email: data.email || "",
      preferredContact: data.preferredContact || "phone",
      emergencyContactName: data.emergencyContactName || "",
      emergencyContactPhone: data.emergencyContactPhone || "",
      emergencyContactRelationship: data.emergencyContactRelationship || "",
    })

    // Expose the handleSubmit function to the parent component
    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        updateData(formState)
      },
    }))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
      setFormState((prev) => ({ ...prev, [name]: value }))
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
          <p className="text-muted-foreground mb-6">
            Please provide your basic personal information to begin the assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" value={formState.firstName} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" value={formState.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formState.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formState.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" value={formState.address} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" value={formState.city} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" value={formState.state} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input id="zipCode" name="zipCode" value={formState.zipCode} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" value={formState.phone} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preferred Contact Method</Label>
          <RadioGroup
            value={formState.preferredContact}
            onValueChange={(value) => handleSelectChange("preferredContact", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone" />
              <Label htmlFor="phone">Phone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text" id="text" />
              <Label htmlFor="text">Text Message</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Name</Label>
              <Input
                id="emergencyContactName"
                name="emergencyContactName"
                value={formState.emergencyContactName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Phone</Label>
              <Input
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                type="tel"
                value={formState.emergencyContactPhone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="emergencyContactRelationship">Relationship</Label>
            <Input
              id="emergencyContactRelationship"
              name="emergencyContactRelationship"
              value={formState.emergencyContactRelationship}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    )
  },
)

PersonalInfoForm.displayName = "PersonalInfoForm"
