import { Liveblocks } from "@liveblocks/node"

interface RoomMetadata {
  type: string
  userId: string
  businessContext?: string
  [key: string]: any
}

interface BroadcastEvent {
  type: string
  data: any
  timestamp: string
  userId: string
}

class LiveblocksClient {
  private client: Liveblocks

  constructor() {
    this.client = new Liveblocks({
      secret: process.env.LIVEBLOCKS_SECRET_KEY!,
    })
  }

  async createRoom(config: { id: string; defaultAccesses: string[]; metadata: RoomMetadata }): Promise<any> {
    try {
      const room = await this.client.createRoom(config.id, {
        defaultAccesses: config.defaultAccesses,
        metadata: config.metadata,
      })

      // Initialize room with default structure
      await this.initializeRoomStructure(config.id, config.metadata.type)

      return {
        id: room.id,
        metadata: room.metadata,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/collaboration/${config.id}`,
        success: true,
      }
    } catch (error) {
      console.error("Error creating Liveblocks room:", error)
      throw new Error("Failed to create collaboration room")
    }
  }

  async updateRoom(roomId: string, data: any): Promise<any> {
    try {
      // Update room metadata
      await this.client.updateRoom(roomId, {
        metadata: {
          ...data,
          lastUpdated: new Date().toISOString(),
        },
      })

      // Broadcast update to connected users
      await this.broadcastEvent(roomId, {
        type: "room-update",
        data,
        timestamp: new Date().toISOString(),
        userId: "system",
      })

      return { success: true, updatedAt: new Date().toISOString() }
    } catch (error) {
      console.error("Error updating Liveblocks room:", error)
      throw new Error("Failed to update collaboration room")
    }
  }

  async broadcastEvent(roomId: string, event: BroadcastEvent): Promise<any> {
    try {
      // Note: Liveblocks broadcasting is typically done from the client side
      // This is a server-side simulation for system events
      await this.client.broadcastEvent(roomId, event, {
        shouldQueueEventIfNoOneIsPresent: true,
      })

      return { success: true, eventId: `evt_${Date.now()}` }
    } catch (error) {
      console.error("Error broadcasting event:", error)
      throw new Error("Failed to broadcast event")
    }
  }

  async getConnectedUsers(roomId: string): Promise<any[]> {
    try {
      const room = await this.client.getRoom(roomId)
      // Note: Active connections are typically tracked client-side
      // This would return stored user presence data
      return []
    } catch (error) {
      console.error("Error getting connected users:", error)
      return []
    }
  }

  async getRoomHistory(roomId: string, limit = 50): Promise<any[]> {
    try {
      // Get room storage history (if available)
      const room = await this.client.getRoom(roomId)
      return []
    } catch (error) {
      console.error("Error getting room history:", error)
      return []
    }
  }

  async createCommandCenter(
    userId: string,
    type: "vr-assessment" | "business-planning" | "opportunity-matching",
  ): Promise<any> {
    try {
      const roomId = `command-center-${userId}-${Date.now()}`

      const room = await this.createRoom({
        id: roomId,
        defaultAccesses: ["room:write"],
        metadata: {
          type: "command-center",
          userId,
          centerType: type,
          createdAt: new Date().toISOString(),
        },
      })

      // Set up command center specific structure
      await this.initializeCommandCenter(roomId, type)

      return {
        roomId,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/command-center/${roomId}`,
        type,
        success: true,
      }
    } catch (error) {
      console.error("Error creating command center:", error)
      throw new Error("Failed to create command center")
    }
  }

  async updateOpportunities(roomId: string, opportunities: any[]): Promise<any> {
    try {
      await this.updateRoom(roomId, {
        opportunities,
        opportunitiesUpdated: new Date().toISOString(),
        totalOpportunities: opportunities.length,
      })

      // Broadcast opportunity update
      await this.broadcastEvent(roomId, {
        type: "opportunities-updated",
        data: { count: opportunities.length, preview: opportunities.slice(0, 3) },
        timestamp: new Date().toISOString(),
        userId: "system",
      })

      return { success: true, count: opportunities.length }
    } catch (error) {
      console.error("Error updating opportunities:", error)
      throw new Error("Failed to update opportunities")
    }
  }

  async trackUserProgress(roomId: string, userId: string, progress: any): Promise<any> {
    try {
      await this.updateRoom(roomId, {
        userProgress: {
          [userId]: {
            ...progress,
            lastUpdated: new Date().toISOString(),
          },
        },
      })

      // Broadcast progress update
      await this.broadcastEvent(roomId, {
        type: "progress-updated",
        data: { userId, progress },
        timestamp: new Date().toISOString(),
        userId,
      })

      return { success: true }
    } catch (error) {
      console.error("Error tracking user progress:", error)
      throw new Error("Failed to track user progress")
    }
  }

  private async initializeRoomStructure(roomId: string, roomType: string): Promise<void> {
    try {
      const initialStructure = this.getInitialStructureForType(roomType)
      await this.updateRoom(roomId, initialStructure)
    } catch (error) {
      console.error("Error initializing room structure:", error)
    }
  }

  private async initializeCommandCenter(roomId: string, centerType: string): Promise<void> {
    try {
      const commandCenterStructure = {
        type: "command-center",
        centerType,
        panels: this.getCommandCenterPanels(centerType),
        widgets: this.getCommandCenterWidgets(centerType),
        layout: this.getCommandCenterLayout(centerType),
        initialized: true,
        createdAt: new Date().toISOString(),
      }

      await this.updateRoom(roomId, commandCenterStructure)
    } catch (error) {
      console.error("Error initializing command center:", error)
    }
  }

  private getInitialStructureForType(roomType: string): any {
    const baseStructure = {
      initialized: true,
      createdAt: new Date().toISOString(),
      participants: [],
      messages: [],
      documents: [],
    }

    switch (roomType) {
      case "vr-assessment":
        return {
          ...baseStructure,
          assessmentData: {},
          eligibilityStatus: "pending",
          recommendations: [],
          nextSteps: [],
        }
      case "business-planning":
        return {
          ...baseStructure,
          businessPlan: {},
          milestones: [],
          resources: [],
          collaborators: [],
        }
      case "opportunity-matching":
        return {
          ...baseStructure,
          opportunities: [],
          filters: {},
          savedOpportunities: [],
          applications: [],
        }
      default:
        return baseStructure
    }
  }

  private getCommandCenterPanels(centerType: string): any[] {
    const basePanels = [
      { id: "overview", title: "Overview", type: "dashboard" },
      { id: "progress", title: "Progress", type: "progress-tracker" },
      { id: "communications", title: "Communications", type: "chat" },
    ]

    switch (centerType) {
      case "vr-assessment":
        return [
          ...basePanels,
          { id: "assessment-form", title: "Assessment Form", type: "form" },
          { id: "eligibility-status", title: "Eligibility Status", type: "status" },
          { id: "recommendations", title: "Recommendations", type: "list" },
        ]
      case "business-planning":
        return [
          ...basePanels,
          { id: "business-plan", title: "Business Plan", type: "document" },
          { id: "milestones", title: "Milestones", type: "timeline" },
          { id: "resources", title: "Resources", type: "resource-library" },
        ]
      case "opportunity-matching":
        return [
          ...basePanels,
          { id: "opportunities", title: "Opportunities", type: "opportunity-list" },
          { id: "filters", title: "Filters", type: "filter-panel" },
          { id: "applications", title: "Applications", type: "application-tracker" },
        ]
      default:
        return basePanels
    }
  }

  private getCommandCenterWidgets(centerType: string): any[] {
    const baseWidgets = [
      { id: "clock", type: "clock", position: { x: 0, y: 0 } },
      { id: "notifications", type: "notifications", position: { x: 1, y: 0 } },
    ]

    switch (centerType) {
      case "vr-assessment":
        return [
          ...baseWidgets,
          { id: "assessment-progress", type: "progress-bar", position: { x: 0, y: 1 } },
          { id: "specialist-contact", type: "contact-card", position: { x: 1, y: 1 } },
        ]
      case "business-planning":
        return [
          ...baseWidgets,
          { id: "plan-completion", type: "completion-meter", position: { x: 0, y: 1 } },
          { id: "milestone-countdown", type: "countdown", position: { x: 1, y: 1 } },
        ]
      case "opportunity-matching":
        return [
          ...baseWidgets,
          { id: "opportunity-counter", type: "counter", position: { x: 0, y: 1 } },
          { id: "match-score", type: "score-display", position: { x: 1, y: 1 } },
        ]
      default:
        return baseWidgets
    }
  }

  private getCommandCenterLayout(centerType: string): any {
    return {
      type: "grid",
      columns: 12,
      rows: 8,
      responsive: true,
      breakpoints: {
        lg: 1200,
        md: 996,
        sm: 768,
        xs: 480,
      },
    }
  }
}

export const liveBlocksClient = new LiveblocksClient()
