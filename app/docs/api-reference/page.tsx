import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Key, Zap, AlertCircle } from "lucide-react"

export const metadata = {
  title: "API Reference | VR4DEAF Documentation",
  description: "Complete API documentation for integrating with VR4DEAF services",
}

export default function ApiReferencePage() {
  const vrOfficeEndpoints = [
    {
      method: "GET",
      path: "/api/vr-offices",
      description: "Retrieve a list of Vocational Rehabilitation offices by location",
      parameters: [
        { name: "zipCode", type: "string", required: true, description: "ZIP code to search around" },
        { name: "radius", type: "number", required: false, description: "Search radius in miles (default: 25)" },
        { name: "state", type: "string", required: false, description: "State abbreviation (e.g., TX)" },
        { name: "limit", type: "number", required: false, description: "Maximum results to return (default: 10)" },
      ],
      response: {
        type: "array",
        description: "Array of VR office objects",
        example: `{
  "offices": [
    {
      "id": "tx-dallas-001",
      "name": "Dallas VR Office",
      "address": "123 Main St, Dallas, TX 75201",
      "phone": "(214) 555-0123",
      "email": "dallas@twc.state.tx.us",
      "distance": 5.2,
      "services": ["job-placement", "training", "counseling"],
      "hours": {
        "monday": "8:00 AM - 5:00 PM",
        "tuesday": "8:00 AM - 5:00 PM"
      }
    }
  ],
  "total": 5,
  "radius": 25
}`,
      },
    },
    {
      method: "GET",
      path: "/api/vr-offices/{id}",
      description: "Get detailed information about a specific VR office",
      parameters: [{ name: "id", type: "string", required: true, description: "Unique office identifier" }],
      response: {
        type: "object",
        description: "Detailed VR office information",
        example: `{
  "id": "tx-dallas-001",
  "name": "Dallas VR Office",
  "address": "123 Main St, Dallas, TX 75201",
  "phone": "(214) 555-0123",
  "email": "dallas@twc.state.tx.us",
  "website": "https://twc.texas.gov/offices/dallas",
  "services": ["job-placement", "training", "counseling"],
  "specialties": ["deaf-services", "asl-interpretation"],
  "staff": [
    {
      "name": "Sarah Johnson",
      "title": "Senior Counselor",
      "specialties": ["deaf-employment"]
    }
  ]
}`,
      },
    },
  ]

  const contactEndpoints = [
    {
      method: "POST",
      path: "/api/contact",
      description: "Submit a contact form inquiry",
      parameters: [
        { name: "name", type: "string", required: true, description: "Full name" },
        { name: "email", type: "string", required: true, description: "Email address" },
        { name: "phone", type: "string", required: false, description: "Phone number" },
        {
          name: "service",
          type: "string",
          required: true,
          description: "Service category: job-seeker, self-employment, small-business",
        },
        { name: "message", type: "string", required: true, description: "Inquiry message" },
        { name: "vrClient", type: "boolean", required: false, description: "Is VR client" },
        { name: "ticketToWork", type: "boolean", required: false, description: "Ticket to Work participant" },
      ],
      response: {
        type: "object",
        description: "Submission confirmation",
        example: `{
  "id": "contact_12345",
  "status": "submitted",
  "message": "Thank you for your inquiry. We'll contact you within 24 hours.",
  "estimatedResponse": "2024-01-15T10:00:00Z"
}`,
      },
    },
    {
      method: "GET",
      path: "/api/contact/{id}",
      description: "Get status of a contact inquiry",
      parameters: [{ name: "id", type: "string", required: true, description: "Contact inquiry ID" }],
      response: {
        type: "object",
        description: "Contact inquiry status",
        example: `{
  "id": "contact_12345",
  "status": "in-progress",
  "submittedAt": "2024-01-14T15:30:00Z",
  "lastUpdated": "2024-01-14T16:45:00Z",
  "assignedTo": "Sarah Johnson",
  "notes": "Initial assessment completed"
}`,
      },
    },
  ]

  const servicesEndpoints = [
    {
      method: "GET",
      path: "/api/services",
      description: "Get available services by category and location",
      parameters: [
        {
          name: "category",
          type: "string",
          required: false,
          description: "Service category: job-seeker, self-employment, small-business",
        },
        { name: "location", type: "string", required: false, description: "ZIP code or city" },
        { name: "vrEligible", type: "boolean", required: false, description: "Filter VR-eligible services" },
        { name: "aslSupport", type: "boolean", required: false, description: "Filter ASL-supported services" },
      ],
      response: {
        type: "array",
        description: "Array of service objects",
        example: `{
  "services": [
    {
      "id": "resume-builder-ai",
      "name": "AI-Powered Resume Builder",
      "category": "job-seeker",
      "description": "Create professional resumes with AI assistance",
      "vrEligible": true,
      "aslSupport": true,
      "pricing": {
        "free": true,
        "vrFunded": true,
        "premium": "$29/month"
      }
    }
  ]
}`,
      },
    },
    {
      method: "GET",
      path: "/api/services/{id}",
      description: "Get detailed information about a specific service",
      parameters: [{ name: "id", type: "string", required: true, description: "Service identifier" }],
      response: {
        type: "object",
        description: "Detailed service information",
        example: `{
  "id": "resume-builder-ai",
  "name": "AI-Powered Resume Builder",
  "category": "job-seeker",
  "description": "Create professional resumes with AI assistance tailored for deaf job seekers",
  "features": ["AI optimization", "ATS compatibility", "ASL video integration"],
  "requirements": ["VR eligibility assessment"],
  "timeline": "1-2 weeks",
  "outcomes": ["Professional resume", "Interview preparation"]
}`,
      },
    },
  ]

  const vuriEndpoints = [
    {
      method: "POST",
      path: "/api/vuri/chat",
      description: "Send a message to the Vuri AI assistant",
      parameters: [
        { name: "message", type: "string", required: true, description: "User message" },
        { name: "context", type: "object", required: false, description: "Conversation context" },
        { name: "sessionId", type: "string", required: false, description: "Session identifier" },
        { name: "userProfile", type: "object", required: false, description: "User profile for personalization" },
      ],
      response: {
        type: "object",
        description: "AI response with message and actions",
        example: `{
  "message": "I can help you find VR funding options. What type of service are you interested in?",
  "sessionId": "session_12345",
  "actions": [
    {
      "type": "quick_reply",
      "text": "Job placement services",
      "action": "funding-job"
    },
    {
      "type": "redirect",
      "text": "Find VR office",
      "url": "/api/vr-offices"
    }
  ],
  "context": {
    "topic": "vr-funding",
    "userIntent": "information-seeking"
  }
}`,
      },
    },
    {
      method: "GET",
      path: "/api/vuri/sessions/{sessionId}",
      description: "Get conversation history for a session",
      parameters: [{ name: "sessionId", type: "string", required: true, description: "Session identifier" }],
      response: {
        type: "object",
        description: "Session conversation history",
        example: `{
  "sessionId": "session_12345",
  "startedAt": "2024-01-14T15:30:00Z",
  "messages": [
    {
      "timestamp": "2024-01-14T15:30:00Z",
      "sender": "user",
      "message": "I need help with VR funding"
    },
    {
      "timestamp": "2024-01-14T15:30:05Z",
      "sender": "vuri",
      "message": "I can help you with VR funding information..."
    }
  ]
}`,
      },
    },
  ]

  const specialistEndpoints = [
    {
      method: "GET",
      path: "/api/specialists",
      description: "Find job and business specialists",
      parameters: [
        { name: "type", type: "string", required: true, description: "Specialist type: job, business" },
        { name: "location", type: "string", required: true, description: "City, state or ZIP code" },
        { name: "specialty", type: "string", required: false, description: "Specific specialty area" },
        { name: "aslProficient", type: "boolean", required: false, description: "ASL proficiency required" },
      ],
      response: {
        type: "array",
        description: "Array of specialist objects",
        example: `{
  "specialists": [
    {
      "id": "specialist_001",
      "name": "Sarah Johnson",
      "title": "Senior Job Placement Specialist",
      "company": "Career Connect",
      "location": "Fort Worth, TX",
      "rating": 4.9,
      "specialties": ["deaf-employment", "resume-building"],
      "certifications": ["Certified Career Counselor", "ASL Proficient"],
      "availability": "accepting-clients"
    }
  ]
}`,
      },
    },
    {
      method: "POST",
      path: "/api/specialists/{id}/referral",
      description: "Generate a referral contract with a specialist",
      parameters: [
        { name: "id", type: "string", required: true, description: "Specialist identifier" },
        { name: "clientInfo", type: "object", required: true, description: "Client information" },
        { name: "serviceType", type: "string", required: true, description: "Type of service needed" },
      ],
      response: {
        type: "object",
        description: "Referral contract details",
        example: `{
  "referralId": "ref_12345",
  "contractUrl": "https://api.vr4deaf.com/contracts/ref_12345.pdf",
  "status": "pending-signature",
  "expiresAt": "2024-01-21T15:30:00Z",
  "nextSteps": [
    "Review and sign contract",
    "Specialist will contact within 48 hours"
  ]
}`,
      },
    },
  ]

  const fundingEndpoints = [
    {
      method: "GET",
      path: "/api/funding/eligibility",
      description: "Check VR funding eligibility",
      parameters: [
        { name: "state", type: "string", required: true, description: "State abbreviation" },
        { name: "serviceType", type: "string", required: true, description: "Type of service" },
        { name: "disabilityType", type: "string", required: false, description: "Disability category" },
      ],
      response: {
        type: "object",
        description: "Eligibility assessment",
        example: `{
  "eligible": true,
  "confidence": 0.95,
  "requirements": [
    "Disability affects ability to work",
    "Need VR services for employment",
    "Able to benefit from services"
  ],
  "nextSteps": [
    "Contact local VR office",
    "Complete application",
    "Schedule assessment"
  ],
  "estimatedFunding": {
    "min": 500,
    "max": 5000,
    "currency": "USD"
  }
}`,
      },
    },
    {
      method: "POST",
      path: "/api/funding/calculator",
      description: "Calculate potential VR funding amounts",
      parameters: [
        { name: "serviceCategory", type: "string", required: true, description: "Service category" },
        { name: "location", type: "string", required: true, description: "State or ZIP code" },
        { name: "services", type: "array", required: true, description: "List of requested services" },
      ],
      response: {
        type: "object",
        description: "Funding calculation results",
        example: `{
  "totalEstimate": {
    "min": 1500,
    "max": 8000,
    "currency": "USD"
  },
  "breakdown": [
    {
      "service": "job-training",
      "estimate": { "min": 500, "max": 2000 },
      "vrCoverage": "full"
    },
    {
      "service": "assistive-technology",
      "estimate": { "min": 1000, "max": 6000 },
      "vrCoverage": "partial"
    }
  ]
}`,
      },
    },
  ]

  const businessEndpoints = [
    {
      method: "POST",
      path: "/api/business/formation",
      description: "Initiate automated business formation process",
      parameters: [
        { name: "businessName", type: "string", required: true, description: "Proposed business name" },
        { name: "businessType", type: "string", required: true, description: "LLC, Corporation, etc." },
        { name: "state", type: "string", required: true, description: "State of incorporation" },
        { name: "ownerInfo", type: "object", required: true, description: "Owner information" },
      ],
      response: {
        type: "object",
        description: "Formation process status",
        example: `{
  "formationId": "form_12345",
  "status": "initiated",
  "steps": [
    {
      "step": "name-check",
      "status": "completed",
      "result": "available"
    },
    {
      "step": "filing",
      "status": "in-progress",
      "estimatedCompletion": "2024-01-16T10:00:00Z"
    }
  ],
  "documents": [
    {
      "type": "articles-of-organization",
      "status": "pending",
      "url": null
    }
  ]
}`,
      },
    },
    {
      method: "GET",
      path: "/api/business/formation/{id}",
      description: "Get business formation status",
      parameters: [{ name: "id", type: "string", required: true, description: "Formation process ID" }],
      response: {
        type: "object",
        description: "Current formation status",
        example: `{
  "formationId": "form_12345",
  "status": "completed",
  "businessEntity": {
    "name": "ABC Consulting LLC",
    "ein": "12-3456789",
    "state": "TX",
    "filingDate": "2024-01-16"
  },
  "documents": [
    {
      "type": "articles-of-organization",
      "url": "https://api.vr4deaf.com/documents/form_12345_articles.pdf"
    }
  ]
}`,
      },
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">API Reference</h1>
        <p className="text-lg text-muted-foreground">
          Complete API documentation for integrating with VR4DEAF services and accessing platform data.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Key className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>API authentication and security</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              All API requests require authentication using API keys. Contact our team to obtain API access credentials.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Base URL</CardTitle>
                <CardDescription>API endpoint base URL</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">https://api.vr4deaf.com/v1</code>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="vr-offices" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="vr-offices">VR Offices</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="vuri">Vuri AI</TabsTrigger>
            <TabsTrigger value="specialists">Specialists</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
          </TabsList>

          <TabsContent value="vr-offices">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">VR Office Endpoints</h2>
              {vrOfficeEndpoints.map((endpoint, index) => (
                <EndpointCard key={index} endpoint={endpoint} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Contact Endpoints</h2>
              {contactEndpoints.map((endpoint, index) => (
                <EndpointCard key={index} endpoint={endpoint} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Services Endpoints</h2>
              {servicesEndpoints.map((endpoint, index) => (
                <EndpointCard key={index} endpoint={endpoint} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vuri">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Vuri AI Endpoints</h2>
              {vuriEndpoints.map((endpoint, index) => (
                <EndpointCard key={index} endpoint={endpoint} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="specialists">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Specialist Directory Endpoints</h2>
              {specialistEndpoints.map((endpoint, index) => (
                <EndpointCard key={index} endpoint={endpoint} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="funding">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">VR Funding Endpoints</h2>
              {fundingEndpoints.map((endpoint, index) => (
                <EndpointCard key={index} endpoint={endpoint} />
              ))}
              {businessEndpoints.map((endpoint, index) => (
                <EndpointCard key={index + 100} endpoint={endpoint} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Rate Limiting</CardTitle>
                <CardDescription>API usage limits and guidelines</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Standard Limits</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 1000 requests per hour</li>
                  <li>• 100 requests per minute</li>
                  <li>• 10 concurrent connections</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Headers</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• X-RateLimit-Limit</li>
                  <li>• X-RateLimit-Remaining</li>
                  <li>• X-RateLimit-Reset</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Error Handling</CardTitle>
                <CardDescription>Standard error responses and codes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">HTTP Status Codes</h4>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <code>200</code>
                    <span className="text-sm">Success</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <code>400</code>
                    <span className="text-sm">Bad Request</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <code>401</code>
                    <span className="text-sm">Unauthorized</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <code>404</code>
                    <span className="text-sm">Not Found</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <code>429</code>
                    <span className="text-sm">Rate Limited</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <code>500</code>
                    <span className="text-sm">Internal Server Error</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Error Response Format</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    {`{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is missing required parameters",
    "details": {
      "missing_fields": ["zipCode", "serviceType"]
    },
    "timestamp": "2024-01-14T15:30:00Z"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EndpointCard({ endpoint }: { endpoint: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>{endpoint.method}</Badge>
          <code className="text-sm font-mono">{endpoint.path}</code>
        </div>
        <CardDescription>{endpoint.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Parameters</h4>
            <div className="space-y-2">
              {endpoint.parameters.map((param: any, i: number) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono">{param.name}</code>
                      <Badge variant="outline" className="text-xs">
                        {param.type}
                      </Badge>
                      {param.required && (
                        <Badge variant="destructive" className="text-xs">
                          required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{param.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Response</h4>
            <p className="text-sm text-muted-foreground mb-2">{endpoint.response.description}</p>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{endpoint.response.example}</pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
