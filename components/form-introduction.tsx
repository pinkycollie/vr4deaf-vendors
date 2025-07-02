import { Card, CardContent } from "@/components/ui/card"

export function FormIntroduction() {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Welcome to VR4DEAF!</h2>
          <p className="text-muted-foreground">
            Thank you for your interest in VR4DEAF - Texas's premier platform for Deaf entrepreneurs and self-employment
            through Vocational Rehabilitation services.
          </p>
        </div>

        <p>
          By completing this self-referral form, you are taking the first step in your entrepreneurial journey with our
          DEAF FIRST approach to vocational rehabilitation.
        </p>

        <div className="space-y-2">
          <p className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✓</span>
            <span>
              If you are Deaf, hard of hearing, or have a disability that affects your ability to obtain traditional
              employment, you may be eligible for our specialized self-employment services designed specifically for the
              Deaf community.
            </span>
          </p>

          <p className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✓</span>
            <span>
              Our platform connects you with Deaf-friendly VR counselors, successful Deaf entrepreneurs, and
              ASL-accessible business training resources.
            </span>
          </p>

          <p className="flex items-start">
            <span className="text-green-500 font-bold mr-2">✓</span>
            <span>
              Once submitted, you'll be matched with a VR counselor who understands Deaf culture and can communicate in
              your preferred method (ASL, written English, or spoken English with interpreters).
            </span>
          </p>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg mt-4">
          <h3 className="font-semibold mb-2">VR4DEAF's DEAF FIRST Eligibility Approach:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              You identify as Deaf, hard of hearing, or have a documented disability that creates barriers to
              traditional employment
            </li>
            <li>
              Your disability or communication needs create substantial barriers to finding or keeping conventional
              employment
            </li>
            <li>You have entrepreneurial interests and can benefit from self-employment focused VR services</li>
            <li>You're committed to building a business that leverages your unique strengths and cultural identity</li>
          </ol>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <h3 className="font-semibold mb-2 text-blue-800">ASL Support Available</h3>
          <p className="text-blue-700">
            All consultations can be conducted in American Sign Language. We also provide written communication options
            and ensure all materials are visually accessible.
          </p>
        </div>

        <p className="text-center text-muted-foreground mt-4">Click "Next" to begin your application.</p>
      </CardContent>
    </Card>
  )
}
