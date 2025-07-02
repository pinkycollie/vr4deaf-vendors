import { Card, CardContent } from "@/components/ui/card"

export function FormIntroduction() {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Welcome to Start My VR!</h2>
          <p className="text-muted-foreground">
            Thank you for your interest in Texas Workforce Solutions-Vocational Rehabilitation (VR) Services.
          </p>
        </div>

        <p>
          By completing the online self-referral, you are taking the first step in your Vocational Rehabilitation
          journey.
        </p>

        <div className="space-y-2">
          <p className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✓</span>
            <span>
              If you have a physical, mental, or emotional disability that affects your ability to obtain or maintain
              employment, you may be eligible for our services to help you in finding and retaining meaningful
              employment.
            </span>
          </p>

          <p className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✓</span>
            <span>
              Please complete the form fields so that we may connect you with a counselor who can tell you more about
              how the VR process works.
            </span>
          </p>

          <p className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✓</span>
            <span>
              Once your information has been received, you will be contacted by VR staff to schedule time to discuss
              your interest in vocational rehabilitation (VR) services. If you would like, a friend or family member may
              join you in this conversation.
            </span>
          </p>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg mt-4">
          <h3 className="font-semibold mb-2">Eligibility for VR services is based on these four factors:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              You have a physical, cognitive, or mental impairment documented by the appropriately qualified
              professional (doctor, psychologist or other)
            </li>
            <li>Your documented impairment causes a substantial barrier to getting or keeping employment</li>
            <li>You can benefit from vocational rehabilitation services that lead to an employment outcome</li>
            <li>You require vocational rehabilitation services to prepare for, secure, retain or regain employment</li>
          </ol>
        </div>

        <p className="text-center text-muted-foreground mt-4">Click "Next" to begin your application.</p>
      </CardContent>
    </Card>
  )
}
