import { CheckCircle, Circle } from "lucide-react"

interface ProgressStep {
  id: string
  title: string
  description: string
  completed: boolean
  current: boolean
}

interface VRProgressTrackerProps {
  currentStep: string
  steps?: ProgressStep[]
}

export function VRProgressTracker({ currentStep, steps }: VRProgressTrackerProps) {
  const defaultSteps: ProgressStep[] = [
    {
      id: "application",
      title: "Application & Referral",
      description: "Initial application or referral to vocational rehabilitation services",
      completed: currentStep !== "application",
      current: currentStep === "application",
    },
    {
      id: "eligibility",
      title: "Eligibility Determination",
      description: "Assessment of disability documentation and service eligibility",
      completed: ["eligibility", "assessment", "ipe", "services", "employment", "closure"].includes(currentStep),
      current: currentStep === "eligibility",
    },
    {
      id: "assessment",
      title: "Assessment",
      description: "Evaluation of aptitudes, interests, and abilities",
      completed: ["assessment", "ipe", "services", "employment", "closure"].includes(currentStep),
      current: currentStep === "assessment",
    },
    {
      id: "ipe",
      title: "Individualized Plan for Employment",
      description: "Development of personalized employment goals and service plan",
      completed: ["ipe", "services", "employment", "closure"].includes(currentStep),
      current: currentStep === "ipe",
    },
    {
      id: "services",
      title: "Service Provision",
      description: "Delivery of training, job search assistance, and support services",
      completed: ["services", "employment", "closure"].includes(currentStep),
      current: currentStep === "services",
    },
    {
      id: "employment",
      title: "Employment & Follow-Up",
      description: "Job placement and ongoing support to ensure success",
      completed: ["employment", "closure"].includes(currentStep),
      current: currentStep === "employment",
    },
    {
      id: "closure",
      title: "Case Closure",
      description: "Successful completion of vocational rehabilitation program",
      completed: currentStep === "closure",
      current: currentStep === "closure",
    },
  ]

  const activeSteps = steps || defaultSteps

  return (
    <div className="w-full">
      <div className="space-y-8">
        {activeSteps.map((step, index) => (
          <div key={step.id} className="relative">
            {index !== activeSteps.length - 1 && (
              <div
                className={`absolute left-5 top-5 h-full w-0.5 ${step.completed ? "bg-primary" : "bg-gray-200"}`}
                aria-hidden="true"
              />
            )}
            <div className="relative flex items-start">
              <div className="flex-shrink-0">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    step.completed
                      ? "bg-primary text-white"
                      : step.current
                        ? "border-2 border-primary bg-white"
                        : "border-2 border-gray-200 bg-white"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <Circle
                      className={`h-6 w-6 ${step.current ? "text-primary" : "text-gray-400"}`}
                      fill={step.current ? "white" : "none"}
                    />
                  )}
                </div>
              </div>
              <div className="ml-4">
                <h3
                  className={`text-lg font-medium ${
                    step.completed ? "text-gray-900" : step.current ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{step.description}</p>
                {step.current && (
                  <div className="mt-2 rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
                    <p>You are currently at this stage</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
