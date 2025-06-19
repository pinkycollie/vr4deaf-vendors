import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Waiting List Confirmation | VR4Deaf",
  description: "Thank you for joining the VR4Deaf waiting list.",
}

export default function WaitingListConfirmationPage() {
  return (
    <div className="container py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Thank You!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            You have been successfully added to our waiting list. We will contact you when space becomes available.
          </p>
          <p className="text-sm text-muted-foreground">
            Please check your email for a confirmation message with additional information.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
