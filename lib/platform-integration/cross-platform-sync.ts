import { URLBuilder } from "./url-builder"
import { PlatformConfig } from "./platform-config"

interface CrossPlatformData {
  userId: string
  sessionId: string
  currentPlatform: keyof typeof PlatformConfig.platforms
  userContext: {
    role: "client" | "counselor" | "vendor" | "admin"
    preferences: {
      communicationMethod: "ASL" | "spoken" | "written" | "mixed"
      assistiveTech: string[]
      culturalIdentity: "deaf" | "hard-of-hearing" | "hearing" | "deafblind"
    }
    currentWorkflow?: {
      type: "assessment" | "job-placement" | "accommodation-planning"
      step: number
      toolId?: string
    }
  }
}

export class CrossPlatformSync {
  private static instance: CrossPlatformSync
  private syncData: Map<string, CrossPlatformData> = new Map()

  static getInstance(): CrossPlatformSync {
    if (!CrossPlatformSync.instance) {
      CrossPlatformSync.instance = new CrossPlatformSync()
    }
    return CrossPlatformSync.instance
  }

  // Sync user context across platforms
  async syncUserContext(data: CrossPlatformData): Promise<void> {
    try {
      // Store locally
      this.syncData.set(data.userId, data)

      // Sync to all platforms
      const platforms = Object.keys(PlatformConfig.platforms)
      const syncPromises = platforms.map((platform) =>
        this.syncToPlatform(platform as keyof typeof PlatformConfig.platforms, data),
      )

      await Promise.allSettled(syncPromises)

      // Log successful sync
      console.log(`User context synced for ${data.userId} across ${platforms.length} platforms`)
    } catch (error) {
      console.error("Cross-platform sync failed:", error)
      throw new Error("Failed to sync user context across platforms")
    }
  }

  private async syncToPlatform(
    platform: keyof typeof PlatformConfig.platforms,
    data: CrossPlatformData,
  ): Promise<void> {
    const endpoint = URLBuilder.api.userSync(platform)

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Platform-Sync": "true",
        "X-User-ID": data.userId,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Sync failed for platform ${platform}: ${response.statusText}`)
    }
  }

  // Get user context for current platform
  getUserContext(userId: string): CrossPlatformData | null {
    return this.syncData.get(userId) || null
  }

  // Handle platform transitions
  async transitionToPlatform(
    userId: string,
    targetPlatform: keyof typeof PlatformConfig.platforms,
    context?: Partial<CrossPlatformData["userContext"]>,
  ): Promise<string> {
    const currentData = this.getUserContext(userId)

    if (!currentData) {
      throw new Error("User context not found for platform transition")
    }

    // Update context for transition
    const updatedData: CrossPlatformData = {
      ...currentData,
      currentPlatform: targetPlatform,
      userContext: {
        ...currentData.userContext,
        ...context,
      },
    }

    await this.syncUserContext(updatedData)

    // Generate transition URL with context
    return this.generateTransitionURL(targetPlatform, updatedData)
  }

  private generateTransitionURL(platform: keyof typeof PlatformConfig.platforms, data: CrossPlatformData): string {
    const baseUrl = PlatformConfig.platforms[platform].baseUrl
    const params = new URLSearchParams({
      userId: data.userId,
      sessionId: data.sessionId,
      context: btoa(JSON.stringify(data.userContext)),
    })

    return `${baseUrl}?${params.toString()}`
  }
}

// Enhanced URL Builder with sync capabilities
export const EnhancedURLBuilder = {
  ...URLBuilder,

  // Cross-platform navigation with context
  async navigateWithContext(
    targetPlatform: keyof typeof PlatformConfig.platforms,
    userId: string,
    route: string,
    context?: any,
  ): Promise<string> {
    const sync = CrossPlatformSync.getInstance()
    return await sync.transitionToPlatform(targetPlatform, context)
  },

  // Generate contextual deep links
  generateDeepLink(
    platform: keyof typeof PlatformConfig.platforms,
    route: string,
    params: Record<string, string> = {},
  ): string {
    const baseUrl = PlatformConfig.platforms[platform].baseUrl
    const queryParams = new URLSearchParams(params)
    return `${baseUrl}${route}?${queryParams.toString()}`
  },
}
