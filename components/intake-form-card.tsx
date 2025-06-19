import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export function IntakeFormCard() {
  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>VR Intake Form</CardTitle>
        <CardDescription>Complete this form to begin the vocational rehabilitation process</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-4 bg-yellow-50">
          <p className="text-sm text-amber-800">
            This form will open in JotForm, our secure form provider. Your information will be protected and only shared
            with authorized VR4DEAF: JOB counselors.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">What to expect:</h3>
          <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
            <li>Basic personal information</li>
            <li>Communication preferences</li>
            <li>Employment history</li>
            <li>Career goals</li>
            <li>Accommodation needs</li>
          </ul>
        </div>
        <div className="rounded-lg border p-4 bg-blue-50">
          <p className="text-sm text-blue-800">
            After submitting the form, a VR4DEAF: JOB counselor will contact you within 2 business days to schedule your
            initial assessment.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a
            href="https://form.jotform.com/251397070324151"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Open VR Intake Form
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
