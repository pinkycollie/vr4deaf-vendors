import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export function FormSuccess() {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Thank You for Your Interest!</h2>

        <p className="text-lg mb-6">Your information has been successfully submitted.</p>

        <div className="bg-slate-50 p-6 rounded-lg mb-6 max-w-xl">
          <h3 className="font-semibold mb-3">What happens next?</h3>
          <ol className="text-left space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">1.</span>
              <span>
                A VR staff member will contact you within 3-5 business days to discuss your interest in VR services.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">2.</span>
              <span>You will receive a Google Calendar invitation for an initial meeting with a VR counselor.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">3.</span>
              <span>
                The meeting will take place via Google Meet. You can join from your computer or mobile device without
                installing any software.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">4.</span>
              <span>
                During this meeting, the counselor will explain the VR process and help determine if you are eligible
                for services.
              </span>
            </li>
          </ol>
        </div>

        <p className="text-muted-foreground">
          If you have any questions, please call our toll-free number at{" "}
          <span className="font-medium">1-800-123-4567</span>.
        </p>
      </CardContent>

      <CardFooter className="flex justify-center p-6 border-t">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
