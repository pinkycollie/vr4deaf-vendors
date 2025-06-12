export interface WebhookLog {
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

// In-memory storage for demo (replace with database in production)
const webhookLogs: WebhookLog[] = []

export class WebhookLogger {
  static async log(logData: Omit<WebhookLog, "id" | "timestamp">): Promise<string> {
    const log: WebhookLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      ...logData,
    }

    webhookLogs.unshift(log) // Add to beginning for latest first

    // Keep only last 1000 logs in memory (in production, use database with proper retention)
    if (webhookLogs.length > 1000) {
      webhookLogs.splice(1000)
    }

    // In production, save to database:
    // await db.webhookLogs.create({ data: log })

    console.log(`Webhook logged: ${log.toolId} - ${log.responseStatus} - ${log.responseTime}ms`)
    return log.id
  }

  static async getLogs(filters?: {
    toolId?: string
    status?: number
    limit?: number
    offset?: number
    startDate?: Date
    endDate?: Date
  }): Promise<{ logs: WebhookLog[]; total: number }> {
    let filteredLogs = [...webhookLogs]

    if (filters?.toolId) {
      filteredLogs = filteredLogs.filter((log) => log.toolId === filters.toolId)
    }

    if (filters?.status) {
      filteredLogs = filteredLogs.filter((log) => log.responseStatus === filters.status)
    }

    if (filters?.startDate) {
      filteredLogs = filteredLogs.filter((log) => log.timestamp >= filters.startDate!)
    }

    if (filters?.endDate) {
      filteredLogs = filteredLogs.filter((log) => log.timestamp <= filters.endDate!)
    }

    const total = filteredLogs.length
    const offset = filters?.offset || 0
    const limit = filters?.limit || 50

    const paginatedLogs = filteredLogs.slice(offset, offset + limit)

    return { logs: paginatedLogs, total }
  }

  static async getStats(toolId?: string): Promise<{
    totalRequests: number
    successRate: number
    averageResponseTime: number
    errorCount: number
    lastRequest?: Date
  }> {
    let logs = webhookLogs
    if (toolId) {
      logs = logs.filter((log) => log.toolId === toolId)
    }

    const totalRequests = logs.length
    const successfulRequests = logs.filter((log) => log.responseStatus >= 200 && log.responseStatus < 300).length
    const successRate = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0
    const averageResponseTime =
      totalRequests > 0 ? logs.reduce((sum, log) => sum + log.responseTime, 0) / totalRequests : 0
    const errorCount = logs.filter((log) => log.responseStatus >= 400).length
    const lastRequest = logs.length > 0 ? logs[0].timestamp : undefined

    return {
      totalRequests,
      successRate,
      averageResponseTime,
      errorCount,
      lastRequest,
    }
  }
}
