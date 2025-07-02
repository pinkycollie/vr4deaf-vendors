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

        <h2 className="text-2xl font-bold mb-2">Welcome to the VR4DEAF Community!</h2>

        <p className="text-lg mb-6">Your entrepreneurship journey application has been successfully submitted.</p>

        <div className="bg-slate-50 p-6 rounded-lg mb-6 max-w-xl">
          <h3 className="font-semibold mb-3">Your DEAF FIRST Journey Begins:</h3>
          <ol className="text-left space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">1.</span>
              <span>
                A Deaf-friendly VR counselor will contact you within 3-5 business days using your preferred
                communication method.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">2.</span>
              <span>
                You'll receive a consultation invitation that can include ASL interpretation or written communication as
                needed.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">3.</span>
              <span>
                Your initial meeting will focus on your entrepreneurial goals and how VR4DEAF can support your
                self-employment journey.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">4.</span>
              <span>
                We'll connect you with Deaf business mentors and ASL-accessible training resources tailored to your
                business interests.
              </span>
            </li>
          </ol>
        </div>

        <p className="text-muted-foreground">
          Questions? Contact us at <span className="font-medium">support@vr4deaf.org</span> or call/text{" "}
          <span className="font-medium">1-800-VR4DEAF</span>.
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
