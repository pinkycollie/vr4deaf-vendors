"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { webhookConfigs } from "./webhook-config"
import { Copy, CheckCircle, XCircle, Activity, Database, Search, Key, Shield, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function WebhookDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [signingKeyDialog, setSigningKeyDialog] = useState<string | null>(null)
  const [signingKey, setSigningKey] = useState("")

  const filteredConfigs = webhookConfigs.filter(
    (config) =>
      config.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const handleSigningKeySubmit = async (toolId: string) => {
    try {
      const response = await fetch("/api/webhooks/configure-signing-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId, signingKey }),
      })

      if (response.ok) {
        // Update local config
        const config = webhookConfigs.find((c) => c.id === toolId)
        if (config) {
          config.signingKeySet = true
        }
        setSigningKeyDialog(null)
        setSigningKey("")
      } else {
        console.error("Failed to configure signing key")
      }
    } catch (error) {
      console.error("Error configuring signing key:", error)
    }
  }

  const categoryStats = webhookConfigs.reduce(
    (acc, config) => {
      acc[config.category] = (acc[config.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const activeWebhooks = webhookConfigs.filter((config) => config.isActive).length
  const securedWebhooks = webhookConfigs.filter((config) => config.signingKeySet).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">VR4Deaf.org Webhook Dashboard</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage webhook endpoints and signing keys for WrapifAI integration. Configure your tools with these URLs
              and add the generated signing keys for security [^2].
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Webhooks</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{webhookConfigs.length}</div>
              <p className="text-xs text-muted-foreground">AI tools configured</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Webhooks</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeWebhooks}</div>
              <p className="text-xs text-muted-foreground">Currently receiving data</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Secured Webhooks</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{securedWebhooks}</div>
              <p className="text-xs text-muted-foreground">With signing keys</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Status</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{webhookConfigs.length - securedWebhooks}</div>
              <p className="text-xs text-muted-foreground">Need signing keys</p>
            </CardContent>
          </Card>
        </div>

        {/* Security Alert */}
        {securedWebhooks < webhookConfigs.length && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-800">Action Required: Configure Signing Keys</h3>
                  <p className="text-sm text-orange-700 mt-1">
                    {webhookConfigs.length - securedWebhooks} webhooks need signing keys from WrapifAI for secure
                    operation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Webhooks</TabsTrigger>
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="career">Career</TabsTrigger>
              <TabsTrigger value="workplace">Workplace</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search webhooks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {filteredConfigs.map((config) => (
                <Card key={config.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {config.isActive ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <CardTitle className="text-lg">{config.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {config.category}
                        </Badge>
                        {config.signingKeySet ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <Shield className="h-3 w-3 mr-1" />
                            Secured
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="bg-orange-100 text-orange-800">
                            <Key className="h-3 w-3 mr-1" />
                            Needs Key
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(config.webhookUrl)}
                          className="flex items-center space-x-2"
                        >
                          <Copy className="h-4 w-4" />
                          <span>{copiedUrl === config.webhookUrl ? "Copied!" : "Copy URL"}</span>
                        </Button>
                        {!config.signingKeySet && (
                          <Dialog
                            open={signingKeyDialog === config.id}
                            onOpenChange={(open) => setSigningKeyDialog(open ? config.id : null)}
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                <Key className="h-4 w-4" />
                                <span>Add Key</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Configure Signing Key</DialogTitle>
                                <DialogDescription>
                                  Enter the signing key generated by WrapifAI for {config.title}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="signingKey">Signing Key from WrapifAI</Label>
                                  <Input
                                    id="signingKey"
                                    value={signingKey}
                                    onChange={(e) => setSigningKey(e.target.value)}
                                    placeholder="Enter the signing key..."
                                    type="password"
                                  />
                                </div>
                                <Button
                                  onClick={() => handleSigningKeySubmit(config.id)}
                                  disabled={!signingKey.trim()}
                                  className="w-full"
                                >
                                  Configure Signing Key
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                    <CardDescription>{config.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Webhook URL for WrapifAI:</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded border text-sm font-mono break-all">
                          {config.webhookUrl}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Expected Fields:</label>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {config.expectedFields.map((field, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Category-specific tabs would go here - similar structure */}
        </Tabs>

        {/* Integration Instructions */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">WrapifAI Integration Setup</h3>
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h4 className="text-lg font-semibold mb-3">Step-by-Step Setup:</h4>
                <ol className="space-y-2 text-sm opacity-90">
                  <li>1. Copy the webhook URL for each AI tool</li>
                  <li>2. In WrapifAI, paste the URL in your tool's webhook settings</li>
                  <li>3. WrapifAI will generate a signing key for security</li>
                  <li>4. Copy the signing key and click "Add Key" here</li>
                  <li>5. Test the webhook connection in WrapifAI</li>
                  <li>6. Verify data is being received securely</li>
                </ol>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Security Features:</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• HMAC-SHA256 signature verification</li>
                  <li>• Secure signing key storage</li>
                  <li>• Request validation and sanitization</li>
                  <li>• Cultural competency compliance monitoring [^2]</li>
                  <li>• Real-time security alerts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
