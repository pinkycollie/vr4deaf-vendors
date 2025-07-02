import { CheckCircle2 } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Initial Assessment",
      description:
        "We begin with a comprehensive evaluation of your skills, interests, and any barriers to employment you may face.",
    },
    {
      number: "02",
      title: "Personalized Plan",
      description:
        "Based on your assessment, we develop a tailored rehabilitation plan designed to meet your specific needs and goals.",
    },
    {
      number: "03",
      title: "Skills Development",
      description:
        "You'll participate in targeted training programs to develop the skills necessary for your chosen career path.",
    },
    {
      number: "04",
      title: "Job Placement",
      description:
        "We connect you with suitable employment opportunities and provide support during the application and interview process.",
    },
    {
      number: "05",
      title: "Ongoing Support",
      description:
        "Our team continues to provide guidance and assistance as you transition into your new role and beyond.",
    },
  ]

  return (
    <section id="process" className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Proven Process</h2>
          <p className="text-lg text-muted-foreground">
            A structured approach to vocational rehabilitation that has helped hundreds of individuals achieve their
            career goals.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`md:flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse text-right"}`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-muted p-6 rounded-lg shadow-md relative">
                    <div className="absolute top-6 -left-3 md:hidden">
                      <CheckCircle2 className="h-6 w-6 text-primary bg-background rounded-full" />
                    </div>
                    <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                    <h3 className="text-xl font-semibold mt-2 mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>

                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
