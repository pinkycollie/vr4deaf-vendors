"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Code, Accessibility, AlertTriangle } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function MCPMiddlewareDemo() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<string>("")
  const [userId, setUserId] = useState("user123")
  const [content, setContent] = useState(
    "Welcome to the MBTQ ecosystem. This platform provides accessible tools for Deaf developers and professionals.",
  )
  const [fallbackStrategy, setFallbackStrategy] = useState<"default" | "cost-optimized" | "fast">("default")
  const [error, setError] = useState<string | null>(null)

  const callMCPTool = async (toolName: string, params: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/mcp-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolName,
          params: {
            ...params,
            fallbackStrategy, // Add fallback strategy to all requests
          },
        }),
      })
      const data = await response.json()

      if (!data.success) {
        setError(data.error || "Unknown error occurred")
        setResults("")
      } else {
        setResults(data.result)
      }
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : String(error)}`)
      setResults("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MBTQ Ecosystem MCP Middleware</h1>
        <p className="text-muted-foreground">
          Model Context Protocol middleware with AI model fallbacks for reliability
        </p>
      </div>

      {/* Fallback Strategy Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>AI Model Fallback Strategy</CardTitle>
          <CardDescription>Select how the system should handle AI model fallbacks</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={fallbackStrategy}
            onValueChange={(value) => setFallbackStrategy(value as "default" | "cost-optimized" | "fast")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="default" />
              <Label htmlFor="default" className="cursor-pointer">
                <span className="font-medium">Capability-Optimized</span>
                <p className="text-sm text-muted-foreground">Best quality results</p>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cost-optimized" id="cost-optimized" />
              <Label htmlFor="cost-optimized" className="cursor-pointer">
                <span className="font-medium">Cost-Optimized</span>
                <p className="text-sm text-muted-foreground">Balance cost and quality</p>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fast" id="fast" />
              <Label htmlFor="fast" className="cursor-pointer">
                <span className="font-medium">Fast Response</span>
                <p className="text-sm text-muted-foreground">Prioritize speed</p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Tabs defaultValue="accessibility" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accessibility" className="flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="devsl" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            DevSL
          </TabsTrigger>
          <TabsTrigger value="fallback-demo" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Test Fallbacks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accessibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Content Transformation</CardTitle>
              <CardDescription>
                Transform content for Deaf accessibility with ASL descriptions and visual cues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="content">Content to Transform</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter content to make accessible"
                  rows={4}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>ASL Description</Badge>
                <Badge>Visual Summary</Badge>
                <Badge>Gesture Cues</Badge>
                <Badge>Simplified Text</Badge>
              </div>
              <Button
                onClick={() =>
                  callMCPTool("transform_content_accessibility", {
                    content,
                    sourceFormat: "text",
                    targetFormats: ["asl_description", "visual_summary", "gesture_cues", "simplified_text"],
                  })
                }
                disabled={loading}
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Transform for Accessibility
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devsl" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>DevSL Code Generation</CardTitle>
              <CardDescription>Generate accessible code with visual-first development patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="codeDescription">Code Description</Label>
                  <Input
                    id="codeDescription"
                    placeholder="Describe what you want to build"
                    defaultValue="Accessible navigation menu"
                  />
                </div>
                <div>
                  <Label>Language</Label>
                  <Select defaultValue="typescript">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Accessibility Level</Label>
                <Select defaultValue="full_asl">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="enhanced">Enhanced</SelectItem>
                    <SelectItem value="full_asl">Full ASL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() =>
                  callMCPTool("generate_devsl_code", {
                    description: "Accessible navigation menu",
                    language: "typescript",
                    accessibilityLevel: "full_asl",
                  })
                }
                disabled={loading}
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate DevSL Code
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fallback-demo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Fallback System</CardTitle>
              <CardDescription>
                Simulate failures to test the fallback system between different AI models
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Failure Rate</Label>
                  <Select defaultValue="high">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (25%)</SelectItem>
                      <SelectItem value="medium">Medium (50%)</SelectItem>
                      <SelectItem value="high">High (75%)</SelectItem>
                      <SelectItem value="extreme">Extreme (90%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Failure Type</Label>
                  <Select defaultValue="mixed">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="timeout">Timeouts</SelectItem>
                      <SelectItem value="quota">Quota Exceeded</SelectItem>
                      <SelectItem value="unavailable">Service Unavailable</SelectItem>
                      <SelectItem value="mixed">Mixed Errors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={() =>
                  callMCPTool("test_fallbacks", {
                    prompt: "Test the fallback system with simulated failures",
                    failureRate: "high",
                    failureType: "mixed",
                  })
                }
                disabled={loading}
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Test Fallback System
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <Card className="mt-6 border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {results && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>MCP Middleware Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-auto">{results}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
