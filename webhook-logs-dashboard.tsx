"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, AlertTriangle, CheckCircle, Eye, Filter, RefreshCw, Search, XCircle, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { webhookConfigs } from "./webhook-config"

interface WebhookLog {
  id: string
  toolId: string
  timestamp: Date
  method: string
  url: string
  headers: Record<string, string>
  payload: any
  responseStatus: number
  responseTime: number
  signatureVerified: boolean
  ipAddress: string
  userAgent: string
  error?: string
  processed: boolean
}

interface WebhookStats {
  totalRequests: number
  successRate: number
  averageResponseTime: number
  errorCount: number
  lastRequest?: Date
}

export default function WebhookLogsDashboard() {
  const [logs, setLogs] = useState<WebhookLog[]>([])
  const [stats, setStats] = useState<WebhookStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTool, setSelectedTool] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null)

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedTool !== "all") params.append("toolId", selectedTool)
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (searchQuery) params.append("search", searchQuery)

      const [logsResponse, statsResponse] = await Promise.all([
        fetch(`/api/webhooks/logs?${params}`),
        fetch(`/api/webhooks/stats${selectedTool !== "all" ? `?toolId=${selectedTool}` : ""}`),
      ])

      const logsData = await logsResponse.json()
      const statsData = await statsResponse.json()

      setLogs(logsData.logs || [])
      setStats(statsData)
    } catch (error) {
      console.error("Error fetching logs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [selectedTool, statusFilter])

  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return <Badge className="bg-green-100 text-green-800">Success</Badge>
    } else if (status >= 400 && status < 500) {
      return <Badge className="bg-orange-100 text-orange-800">Client Error</Badge>
    } else if (status >= 500) {
      return <Badge className="bg-red-100 text-red-800">Server Error</Badge>
    }
    return <Badge variant="outline">{status}</Badge>
  }

  const formatTimestamp = (timestamp: Date) => {
    return new Date(timestamp).toLocaleString()
  }

  const formatResponseTime = (time: number) => {
    return `${time}ms`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Webhook Logs & Monitoring</h1>
              <p className="text-xl text-gray-600">
                Real-time monitoring and analysis of webhook activity for VR4Deaf.org AI tools [^2].
              </p>
            </div>
            <Button onClick={fetchLogs} disabled={loading} className="flex items-center space-x-2">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        {stats && (
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRequests}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.successRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Successful requests</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(stats.averageResponseTime)}ms</div>
                <p className="text-xs text-muted-foreground">Average latency</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Count</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.errorCount}</div>
                <p className="text-xs text-muted-foreground">Failed requests</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="text-sm font-medium">Tool</label>
                <Select value={selectedTool} onValueChange={setSelectedTool}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tools</SelectItem>
                    {webhookConfigs.map((config) => (
                      <SelectItem key={config.id} value={config.id}>
                        {config.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="200">Success (2xx)</SelectItem>
                    <SelectItem value="400">Client Error (4xx)</SelectItem>
                    <SelectItem value="500">Server Error (5xx)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <Button onClick={fetchLogs} className="w-full">
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Webhook Activity</CardTitle>
            <CardDescription>Latest webhook requests and responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Tool</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Signature</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{formatTimestamp(log.timestamp)}</TableCell>
                      <TableCell>
                        <div className="max-w-32 truncate">
                          {webhookConfigs.find((c) => c.id === log.toolId)?.title || log.toolId}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.method}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(log.responseStatus)}</TableCell>
                      <TableCell className="font-mono">{formatResponseTime(log.responseTime)}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                      <TableCell>
                        {log.signatureVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedLog(log)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>Webhook Log Details</DialogTitle>
                              <DialogDescription>Detailed information for webhook request {log.id}</DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-96">
                              <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <h4 className="font-semibold">Request Info</h4>
                                    <div className="text-sm space-y-1">
                                      <div>Tool: {log.toolId}</div>
                                      <div>Method: {log.method}</div>
                                      <div>Status: {log.responseStatus}</div>
                                      <div>Response Time: {log.responseTime}ms</div>
                                      <div>IP: {log.ipAddress}</div>
                                      <div>Signature Verified: {log.signatureVerified ? "Yes" : "No"}</div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">Headers</h4>
                                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                                      {JSON.stringify(log.headers, null, 2)}
                                    </pre>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Payload</h4>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                                    {JSON.stringify(log.payload, null, 2)}
                                  </pre>
                                </div>
                                {log.error && (
                                  <div>
                                    <h4 className="font-semibold text-red-600">Error</h4>
                                    <div className="text-sm text-red-600">{log.error}</div>
                                  </div>
                                )}
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
