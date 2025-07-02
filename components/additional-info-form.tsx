"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface AdditionalInfoFormProps {
  form: UseFormReturn<any>
}

const referralSources = [
  { value: "friend", label: "Friend or Family Member" },
  { value: "doctor", label: "Doctor or Healthcare Provider" },
  { value: "school", label: "School or Educational Institution" },
  { value: "employer", label: "Employer" },
  { value: "social-services", label: "Social Services Agency" },
  { value: "online", label: "Online Search" },
  { value: "social-media", label: "Social Media" },
  { value: "other", label: "Other" },
]

export function AdditionalInfoForm({ form }: AdditionalInfoFormProps) {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
        <Form {...form}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="howDidYouHear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about VR services?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {referralSources.map((source) => (
                        <SelectItem key={source.value} value={source.value}>
                          {source.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalComments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Comments</FormLabel>
                  <FormDescription>Is there anything else you would like us to know?</FormDescription>
                  <FormControl>
                    <Textarea placeholder="Additional comments..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consentToContact"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Consent to Contact*</FormLabel>
                    <FormDescription>
                      I consent to be contacted by Texas Workforce Solutions-Vocational Rehabilitation Services
                      regarding my interest in VR services. I understand that submitting this form does not guarantee
                      eligibility for services.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <p className="text-sm text-muted-foreground mt-6">* Required fields</p>
        </Form>
      </CardContent>
    </Card>
  )
}
