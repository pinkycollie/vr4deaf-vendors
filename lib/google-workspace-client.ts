import { google } from "googleapis"
import { GoogleAuth } from "google-auth-library"

interface TaskData {
  title: string
  description: string
  assignee: string
  priority: "low" | "medium" | "high"
  dueDate: Date
  metadata?: Record<string, any>
}

interface WorkflowData {
  name: string
  steps: Array<{ name: string; duration: string }>
  assignedSpecialist: string
}

class GoogleWorkspaceClient {
  private auth: GoogleAuth
  private tasks: any
  private calendar: any
  private drive: any
  private docs: any
  private sheets: any

  constructor() {
    this.auth = new GoogleAuth({
      scopes: [
        "https://www.googleapis.com/auth/tasks",
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_CLOUD_PROJECT,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
      },
    })

    this.initializeServices()
  }

  private async initializeServices() {
    const authClient = await this.auth.getClient()

    this.tasks = google.tasks({ version: "v1", auth: authClient })
    this.calendar = google.calendar({ version: "v3", auth: authClient })
    this.drive = google.drive({ version: "v3", auth: authClient })
    this.docs = google.docs({ version: "v1", auth: authClient })
    this.sheets = google.sheets({ version: "v4", auth: authClient })
  }

  async createTask(taskData: TaskData): Promise<any> {
    try {
      // Create task in Google Tasks
      const task = await this.tasks.tasks.insert({
        tasklist: "@default",
        requestBody: {
          title: taskData.title,
          notes: `${taskData.description}\n\nPriority: ${taskData.priority}\nAssignee: ${taskData.assignee}`,
          due: taskData.dueDate.toISOString(),
        },
      })

      // Create calendar event for the task
      const calendarEvent = await this.calendar.events.insert({
        calendarId: "primary",
        requestBody: {
          summary: taskData.title,
          description: taskData.description,
          start: {
            dateTime: taskData.dueDate.toISOString(),
            timeZone: "America/New_York",
          },
          end: {
            dateTime: new Date(taskData.dueDate.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour duration
            timeZone: "America/New_York",
          },
          attendees: [{ email: taskData.assignee }],
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 }, // 24 hours before
              { method: "popup", minutes: 60 }, // 1 hour before
            ],
          },
        },
      })

      // Create shared document for task collaboration
      const document = await this.createSharedDocument(taskData)

      return {
        taskId: task.data.id,
        calendarEventId: calendarEvent.data.id,
        documentId: document.documentId,
        success: true,
      }
    } catch (error) {
      console.error("Error creating task:", error)
      throw new Error("Failed to create task in Google Workspace")
    }
  }

  async createWorkflow(workflowData: WorkflowData): Promise<any> {
    try {
      // Create a project folder in Google Drive
      const folder = await this.drive.files.create({
        requestBody: {
          name: workflowData.name,
          mimeType: "application/vnd.google-apps.folder",
          parents: [process.env.GOOGLE_DRIVE_VR_FOLDER_ID],
        },
      })

      // Create workflow tracking spreadsheet
      const spreadsheet = await this.sheets.spreadsheets.create({
        requestBody: {
          properties: {
            title: `${workflowData.name} - Progress Tracker`,
          },
          sheets: [
            {
              properties: {
                title: "Workflow Steps",
              },
              data: [
                {
                  rowData: [
                    {
                      values: [
                        { userEnteredValue: { stringValue: "Step" } },
                        { userEnteredValue: { stringValue: "Duration" } },
                        { userEnteredValue: { stringValue: "Status" } },
                        { userEnteredValue: { stringValue: "Start Date" } },
                        { userEnteredValue: { stringValue: "End Date" } },
                        { userEnteredValue: { stringValue: "Notes" } },
                      ],
                    },
                    ...workflowData.steps.map((step, index) => ({
                      values: [
                        { userEnteredValue: { stringValue: step.name } },
                        { userEnteredValue: { stringValue: step.duration } },
                        { userEnteredValue: { stringValue: index === 0 ? "In Progress" : "Not Started" } },
                        { userEnteredValue: { stringValue: index === 0 ? new Date().toDateString() : "" } },
                        { userEnteredValue: { stringValue: "" } },
                        { userEnteredValue: { stringValue: "" } },
                      ],
                    })),
                  ],
                },
              ],
            },
          ],
        },
      })

      // Move spreadsheet to project folder
      await this.drive.files.update({
        fileId: spreadsheet.data.spreadsheetId!,
        addParents: folder.data.id,
        removeParents: "root",
      })

      // Share folder with assigned specialist
      await this.drive.permissions.create({
        fileId: folder.data.id!,
        requestBody: {
          role: "writer",
          type: "user",
          emailAddress: workflowData.assignedSpecialist,
        },
      })

      // Create calendar events for each workflow step
      const calendarEvents = []
      let currentDate = new Date()

      for (const step of workflowData.steps) {
        const event = await this.calendar.events.insert({
          calendarId: "primary",
          requestBody: {
            summary: `${workflowData.name} - ${step.name}`,
            description: `Workflow step: ${step.name}\nDuration: ${step.duration}`,
            start: {
              date: currentDate.toISOString().split("T")[0],
            },
            end: {
              date: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 1 week later
            },
            attendees: [{ email: workflowData.assignedSpecialist }],
          },
        })
        calendarEvents.push(event.data.id)
        currentDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000) // Move to next week
      }

      return {
        folderId: folder.data.id,
        spreadsheetId: spreadsheet.data.spreadsheetId,
        calendarEvents,
        success: true,
      }
    } catch (error) {
      console.error("Error creating workflow:", error)
      throw new Error("Failed to create workflow in Google Workspace")
    }
  }

  async syncClientData(data: { clientId: string; data: any; syncType: string }): Promise<any> {
    try {
      // Find or create client folder
      const clientFolder = await this.findOrCreateClientFolder(data.clientId)

      // Update client data spreadsheet
      const spreadsheetId = await this.findOrCreateClientSpreadsheet(data.clientId, clientFolder.id)

      await this.updateClientSpreadsheet(spreadsheetId, data.data)

      return {
        folderId: clientFolder.id,
        spreadsheetId,
        lastSync: new Date().toISOString(),
        success: true,
      }
    } catch (error) {
      console.error("Error syncing client data:", error)
      throw new Error("Failed to sync client data")
    }
  }

  async updateSharedDocuments(clientId: string, documents: any[]): Promise<any> {
    try {
      const results = []

      for (const doc of documents) {
        const document = await this.docs.documents.batchUpdate({
          documentId: doc.id,
          requestBody: {
            requests: doc.updates,
          },
        })
        results.push(document.data)
      }

      return { updatedDocuments: results.length, success: true }
    } catch (error) {
      console.error("Error updating shared documents:", error)
      throw new Error("Failed to update shared documents")
    }
  }

  async syncCalendarEvents(clientId: string, events: any[]): Promise<any> {
    try {
      const results = []

      for (const event of events) {
        if (event.id) {
          // Update existing event
          const updatedEvent = await this.calendar.events.update({
            calendarId: "primary",
            eventId: event.id,
            requestBody: event.data,
          })
          results.push(updatedEvent.data)
        } else {
          // Create new event
          const newEvent = await this.calendar.events.insert({
            calendarId: "primary",
            requestBody: event.data,
          })
          results.push(newEvent.data)
        }
      }

      return { syncedEvents: results.length, success: true }
    } catch (error) {
      console.error("Error syncing calendar events:", error)
      throw new Error("Failed to sync calendar events")
    }
  }

  private async createSharedDocument(taskData: TaskData): Promise<any> {
    try {
      const document = await this.docs.documents.create({
        requestBody: {
          title: `${taskData.title} - Collaboration Document`,
        },
      })

      // Add initial content to the document
      await this.docs.documents.batchUpdate({
        documentId: document.data.documentId!,
        requestBody: {
          requests: [
            {
              insertText: {
                location: { index: 1 },
                text: `${taskData.title}\n\n${taskData.description}\n\nAssigned to: ${taskData.assignee}\nDue Date: ${taskData.dueDate.toDateString()}\nPriority: ${taskData.priority}\n\n--- Collaboration Notes ---\n\n`,
              },
            },
          ],
        },
      })

      // Share document with assignee
      await this.drive.permissions.create({
        fileId: document.data.documentId!,
        requestBody: {
          role: "writer",
          type: "user",
          emailAddress: taskData.assignee,
        },
      })

      return document.data
    } catch (error) {
      console.error("Error creating shared document:", error)
      throw new Error("Failed to create shared document")
    }
  }

  private async findOrCreateClientFolder(clientId: string): Promise<any> {
    try {
      // Search for existing client folder
      const existingFolders = await this.drive.files.list({
        q: `name='Client-${clientId}' and mimeType='application/vnd.google-apps.folder'`,
        parents: [process.env.GOOGLE_DRIVE_CLIENTS_FOLDER_ID],
      })

      if (existingFolders.data.files && existingFolders.data.files.length > 0) {
        return existingFolders.data.files[0]
      }

      // Create new client folder
      const folder = await this.drive.files.create({
        requestBody: {
          name: `Client-${clientId}`,
          mimeType: "application/vnd.google-apps.folder",
          parents: [process.env.GOOGLE_DRIVE_CLIENTS_FOLDER_ID],
        },
      })

      return folder.data
    } catch (error) {
      console.error("Error finding/creating client folder:", error)
      throw new Error("Failed to manage client folder")
    }
  }

  private async findOrCreateClientSpreadsheet(clientId: string, folderId: string): Promise<string> {
    try {
      // Search for existing client spreadsheet
      const existingSheets = await this.drive.files.list({
        q: `name='Client-${clientId}-Data' and mimeType='application/vnd.google-apps.spreadsheet'`,
        parents: [folderId],
      })

      if (existingSheets.data.files && existingSheets.data.files.length > 0) {
        return existingSheets.data.files[0].id!
      }

      // Create new client spreadsheet
      const spreadsheet = await this.sheets.spreadsheets.create({
        requestBody: {
          properties: {
            title: `Client-${clientId}-Data`,
          },
          sheets: [
            {
              properties: {
                title: "Client Information",
              },
            },
            {
              properties: {
                title: "Milestones",
              },
            },
            {
              properties: {
                title: "Communications",
              },
            },
          ],
        },
      })

      // Move to client folder
      await this.drive.files.update({
        fileId: spreadsheet.data.spreadsheetId!,
        addParents: folderId,
        removeParents: "root",
      })

      return spreadsheet.data.spreadsheetId!
    } catch (error) {
      console.error("Error finding/creating client spreadsheet:", error)
      throw new Error("Failed to manage client spreadsheet")
    }
  }

  private async updateClientSpreadsheet(spreadsheetId: string, data: any): Promise<void> {
    try {
      // Update client information sheet
      await this.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "Client Information!A1:Z100",
        valueInputOption: "RAW",
        requestBody: {
          values: this.formatClientDataForSheet(data),
        },
      })
    } catch (error) {
      console.error("Error updating client spreadsheet:", error)
      throw new Error("Failed to update client spreadsheet")
    }
  }

  private formatClientDataForSheet(data: any): any[][] {
    const rows = [
      ["Field", "Value", "Last Updated"],
      ["Name", data.name || "", new Date().toISOString()],
      ["Email", data.email || "", new Date().toISOString()],
      ["Phone", data.phone || "", new Date().toISOString()],
      ["Location", data.location || "", new Date().toISOString()],
      ["Disability Type", data.disabilityType || "", new Date().toISOString()],
      ["Business Idea", data.businessIdea || "", new Date().toISOString()],
      ["Service Type", data.serviceType || "", new Date().toISOString()],
      ["VR Counselor", data.vrCounselor || "", new Date().toISOString()],
      ["CBTAC Provider", data.cbtacProvider || "", new Date().toISOString()],
    ]

    return rows
  }
}

export const googleWorkspaceClient = new GoogleWorkspaceClient()
