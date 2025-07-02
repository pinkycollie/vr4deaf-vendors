"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface EmploymentInfoFormProps {
  form: UseFormReturn<any>
}

const employmentStatuses = [
  { value: "unemployed", label: "Unemployed" },
  { value: "employed-full-time", label: "Employed Full-Time" },
  { value: "employed-part-time", label: "Employed Part-Time" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "student", label: "Student" },
  { value: "retired", label: "Retired" },
]

export function EmploymentInfoForm({ form }: EmploymentInfoFormProps) {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold mb-6">Employment Information</h2>
        <Form {...form}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Current Employment Status*</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {employmentStatuses.map((status) => (
                        <FormItem key={status.value} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={status.value} />
                          </FormControl>
                          <FormLabel className="font-normal">{status.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employmentGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are your employment goals?*</FormLabel>
                  <FormDescription>
                    Please describe the type of work you are interested in and any specific career goals you have.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your employment goals..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
