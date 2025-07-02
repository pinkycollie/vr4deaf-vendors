import type { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface DisabilityInfoFormProps {
  form: UseFormReturn<any>
}

const disabilityTypes = [
  { id: "physical", label: "Physical disability" },
  { id: "visual", label: "Visual impairment" },
  { id: "hearing", label: "Hearing impairment" },
  { id: "cognitive", label: "Cognitive disability" },
  { id: "mental", label: "Mental health condition" },
  { id: "learning", label: "Learning disability" },
  { id: "developmental", label: "Developmental disability" },
  { id: "chronic", label: "Chronic health condition" },
  { id: "other", label: "Other" },
]

export function DisabilityInfoForm({ form }: DisabilityInfoFormProps) {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold mb-6">Disability Information</h2>
        <Form {...form}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="disabilityType"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Type of Disability*</FormLabel>
                    <FormDescription>Select all that apply to you</FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {disabilityTypes.map((type) => (
                      <FormField
                        key={type.id}
                        control={form.control}
                        name="disabilityType"
                        render={({ field }) => {
                          return (
                            <FormItem key={type.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(type.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, type.id])
                                      : field.onChange(field.value?.filter((value: string) => value !== type.id))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{type.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disabilityDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How does your disability affect your ability to work?*</FormLabel>
                  <FormDescription>
                    Please describe the challenges you face in finding or maintaining employment due to your disability.
                  </FormDescription>
                  <FormControl>
                    <Textarea placeholder="Please describe..." className="min-h-[120px]" {...field} />
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
