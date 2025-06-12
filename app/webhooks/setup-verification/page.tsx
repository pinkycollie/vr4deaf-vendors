"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle, Copy, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

export default function WebhookSetupVerification() {
  const [webhookStatus, setWebhookStatus] = useState<{
    endpointActive: boolean
    signingKeyConfigured: boolean
    recentActivity: boolean
  }>({
    endpointActive: false,
    signingKeyConfigured: false,
    recentActivity: false,
  })

  const [copiedUrl, setCopiedUrl] = useState(false)

  const correctWebhookUrl = "https://vr4deaf.org/api/webhooks/deaf-individual-assessment"
  const incorrectUrl = "https://vr4deaf.org/deaf-individual-assessment"

  useEffect(() => {
    // Check webhook status
    checkWebhookStatus()
  }, [])

  const checkWebhookStatus = async () => {
    try {
      const response = await fetch("/api/webhooks/deaf-individual-assessment")
      const data = await response.json()

      setWebhookStatus({
        endpointActive: response.ok,
        signingKeyConfigured: data.signingKeyConfigured || false,
        recentActivity: false, // Would check logs for recent activity
      })
    } catch (error) {
      console.error("Error checking webhook status:", error)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedUrl(true)
      setTimeout(() => setCopiedUrl(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Webhook Setup Verification</h1>
          <p className="text-lg text-gray-600">
            Verify your WrapifAI webhook configuration for the Deaf Individual Assessment Tool
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm">
                {webhookStatus.endpointActive ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span>Endpoint Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={webhookStatus.endpointActive ? "default" : "destructive"}>
                {webhookStatus.endpointActive ? "Active" : "Inactive"}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm">
                {webhookStatus.signingKeyConfigured ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                )}
                <span>Signing Key</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={webhookStatus.signingKeyConfigured ? "default" : "secondary"}>
                {webhookStatus.signingKeyConfigured ? "Configured" : "Missing"}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm">
                {webhookStatus.recentActivity ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={webhookStatus.recentActivity ? "default" : "outline"}>
                {webhookStatus.recentActivity ? "Active" : "No Data"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Correct vs Incorrect URLs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>URL Configuration</span>
            </CardTitle>
            <CardDescription>Make sure you're using the correct webhook URL in WrapifAI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-800 mb-1">❌ Incorrect URL (404 Error)</h4>
                  <code className="text-sm text-red-700 bg-red-100 px-2 py-1 rounded">{incorrectUrl}</code>
                  <p className="text-sm text-red-600 mt-1">This is the tool page, not the webhook endpoint!</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-green-800 mb-1">✅ Correct Webhook URL</h4>
                  <code className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded break-all">
                    {correctWebhookUrl}
                  </code>
                  <p className="text-sm text-green-600 mt-1">Use this URL in your WrapifAI webhook settings</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(correctWebhookUrl)} className="ml-4">
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedUrl ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Setup Steps</CardTitle>
            <CardDescription>Follow these steps to configure your webhook properly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Configure Webhook in WrapifAI</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Go to your WrapifAI tool settings and add the webhook URL
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://app.wrapifai.com/p/deaf-individual-comprehensive-assessment-tool-cfd7bd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open WrapifAI Tool
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Copy Signing Key</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    WrapifAI will generate a signing key after you add the webhook URL
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Configure Signing Key</h4>
                  <p className="text-sm text-gray-600 mb-2">Add the signing key to VR4DEAF webhook dashboard</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/webhooks">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Webhook Dashboard
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <div>
                  <h4 className="font-medium">Test the Connection</h4>
                  <p className="text-sm text-gray-600 mb-2">Send a test webhook to verify everything is working</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/webhooks/test">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Test Webhook
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/webhooks/logs">View Webhook Logs</a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/webhooks/test">Test Webhook Endpoint</a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/docs/api-reference">API Documentation</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Check</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={checkWebhookStatus} className="w-full">
                Refresh Status
              </Button>
              <p className="text-sm text-gray-600 mt-2 text-center">Last checked: {new Date().toLocaleTimeString()}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
