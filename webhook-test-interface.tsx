"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, CheckCircle, Clock, Play, RefreshCw, Settings, TestTube, Zap } from "lucide-react"
import { useState } from "react"
import { webhookConfigs } from "./webhook-config"

interface TestResult {
  status: number
  statusText: string
  responseTime: number
  responseData: any
  requestPayload: any
  requestHeaders: Record<string, string>
}

export default function WebhookTestInterface() {
  const [selectedTool, setSelectedTool] = useState<string>("")
  const [customPayload, setCustomPayload] = useState("")
  const [useCustomPayload, setUseCustomPayload] = useState(false)
  const [useSignature, setUseSignature] = useState(true)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [testError, setTestError] = useState<string | null>(null)

  const selectedConfig = webhookConfigs.find((c) => c.id === selectedTool)

  const generateSamplePayload = () => {
    if (!selectedConfig) return ""

    const samplePayload = {
      ...selectedConfig.expectedFields.reduce(
        (acc, field) => {
          acc[field] = `sample_${field}_${Date.now()}`
          return acc
        },
        {} as Record<string, any>,
      ),
      testMode: true,
      timestamp: new Date().toISOString(),
    }

    return JSON.stringify(samplePayload, null, 2)
  }

  const runTest = async () => {
    if (!selectedTool) {
      setTestError("Please select a tool to test")
      return
    }

    setTesting(true)
    setTestError(null)
    setTestResult(null)

    try {
      let testPayload: any = null

      if (useCustomPayload && customPayload) {
        try {
          testPayload = JSON.parse(customPayload)
        } catch (error) {
          throw new Error("Invalid JSON in custom payload")
        }
      }

      const response = await fetch("/api/webhooks/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolId: selectedTool,
          testPayload,
          useSignature,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setTestResult(result.testResult)
      } else {
        setTestError(result.error || "Test failed")
      }
    } catch (error) {
      setTestError(error instanceof Error ? error.message : "Test failed")
    } finally {
      setTesting(false)
    }
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-600"
    if (status >= 400 && status < 500) return "text-orange-600"
    if (status >= 500) return "text-red-600"
    return "text-gray-600"
  }

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (status >= 400) return <AlertCircle className="h-4 w-4 text-red-600" />
    return <Clock className="h-4 w-4 text-gray-600" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Webhook Test Interface</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Test your VR4Deaf.org webhook endpoints to ensure proper integration with WrapifAI tools [^2].
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Test Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Test Configuration</span>
              </CardTitle>
              <CardDescription>Configure your webhook test parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tool Selection */}
              <div>
                <Label htmlFor="tool-select">Select Tool to Test</Label>
                <Select value={selectedTool} onValueChange={setSelectedTool}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a webhook tool" />
                  </SelectTrigger>
                  <SelectContent>
                    {webhookConfigs.map((config) => (
                      <SelectItem key={config.id} value={config.id}>
                        {config.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tool Info */}
              {selectedConfig && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Webhook URL:</span>
                        <Badge variant="outline">{selectedConfig.category}</Badge>
                      </div>
                      <div className="text-sm font-mono bg-white p-2 rounded border">{selectedConfig.webhookUrl}</div>
                      <div>
                        <span className="font-medium">Expected Fields:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedConfig.expectedFields.map((field, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Test Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="use-signature">Include Test Signature</Label>
                  <Switch id="use-signature" checked={useSignature} onCheckedChange={setUseSignature} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="use-custom">Use Custom Payload</Label>
                  <Switch id="use-custom" checked={useCustomPayload} onCheckedChange={setUseCustomPayload} />
                </div>
              </div>

              {/* Custom Payload */}
              {useCustomPayload && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="custom-payload">Custom Test Payload (JSON)</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCustomPayload(generateSamplePayload())}
                      disabled={!selectedConfig}
                    >
                      Generate Sample
                    </Button>
                  </div>
                  <Textarea
                    id="custom-payload"
                    value={customPayload}
                    onChange={(e) => setCustomPayload(e.target.value)}
                    placeholder="Enter custom JSON payload..."
                    className="font-mono text-sm"
                    rows={10}
                  />
                </div>
              )}

              {/* Test Button */}
              <Button
                onClick={runTest}
                disabled={!selectedTool || testing}
                className="w-full flex items-center space-x-2"
                size="lg"
              >
                {testing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                <span>{testing ? "Running Test..." : "Run Webhook Test"}</span>
              </Button>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TestTube className="h-5 w-5" />
                <span>Test Results</span>
              </CardTitle>
              <CardDescription>View the results of your webhook test</CardDescription>
            </CardHeader>
            <CardContent>
              {testError && (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-red-800 font-medium">Test Error</span>
                    </div>
                    <p className="text-red-700 mt-2">{testError}</p>
                  </CardContent>
                </Card>
              )}

              {testResult && (
                <div className="space-y-4">
                  {/* Status Overview */}
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(testResult.status)}
                          <span className="font-medium">Test Completed</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            <span className="text-gray-600">Status:</span>
                            <span className={`ml-1 font-medium ${getStatusColor(testResult.status)}`}>
                              {testResult.status} {testResult.statusText}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600">Time:</span>
                            <span className="ml-1 font-medium">{testResult.responseTime}ms</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detailed Results */}
                  <Tabs defaultValue="response" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="response">Response</TabsTrigger>
                      <TabsTrigger value="request">Request</TabsTrigger>
                      <TabsTrigger value="headers">Headers</TabsTrigger>
                    </TabsList>

                    <TabsContent value="response" className="space-y-4">
                      <div>
                        <Label>Response Data</Label>
                        <ScrollArea className="h-64 w-full border rounded-md p-4">
                          <pre className="text-sm">{JSON.stringify(testResult.responseData, null, 2)}</pre>
                        </ScrollArea>
                      </div>
                    </TabsContent>

                    <TabsContent value="request" className="space-y-4">
                      <div>
                        <Label>Request Payload</Label>
                        <ScrollArea className="h-64 w-full border rounded-md p-4">
                          <pre className="text-sm">{JSON.stringify(testResult.requestPayload, null, 2)}</pre>
                        </ScrollArea>
                      </div>
                    </TabsContent>

                    <TabsContent value="headers" className="space-y-4">
                      <div>
                        <Label>Request Headers</Label>
                        <ScrollArea className="h-64 w-full border rounded-md p-4">
                          <pre className="text-sm">{JSON.stringify(testResult.requestHeaders, null, 2)}</pre>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {!testResult && !testError && !testing && (
                <div className="text-center py-12 text-gray-500">
                  <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a tool and run a test to see results here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Test Cards */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Test All Tools</CardTitle>
            <CardDescription>Run basic connectivity tests for all configured webhooks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {webhookConfigs.slice(0, 6).map((config) => (
                <Card key={config.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{config.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {config.category}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setSelectedTool(config.id)
                        setUseCustomPayload(false)
                        setTimeout(runTest, 100)
                      }}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Quick Test
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
