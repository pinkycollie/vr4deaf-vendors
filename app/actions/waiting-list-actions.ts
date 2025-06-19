"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

// Mock database for demo purposes
const waitingList: any[] = []

const waitingListSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().optional(),
  preferredContact: z.enum(["email", "phone", "text", "videophone"]),
  communicationPreference: z.enum(["asl", "written", "both"]),
  state: z.string().min(2, { message: "State is required" }),
  county: z.string().optional(),
  serviceInterest: z.array(z.string()).min(1, { message: "Select at least one service" }),
  vrClientStatus: z.enum(["current", "former", "never", "unsure"]),
  additionalNotes: z.string().optional(),
})

export async function addToWaitingList(formData: FormData) {
  try {
    const validatedFields = waitingListSchema.parse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      preferredContact: formData.get("preferredContact"),
      communicationPreference: formData.get("communicationPreference"),
      state: formData.get("state"),
      county: formData.get("county") || undefined,
      serviceInterest: formData.getAll("serviceInterest"),
      vrClientStatus: formData.get("vrClientStatus"),
      additionalNotes: formData.get("additionalNotes") || undefined,
    })

    // In a real app, you would save to a database
    const newEntry = {
      id: `wl-${Date.now()}`,
      ...validatedFields,
      createdAt: new Date(),
      status: "pending",
    }

    waitingList.push(newEntry)

    revalidatePath("/waiting-list")
    revalidatePath("/admin/waiting-list")

    return { success: true, message: "Successfully added to waiting list" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Failed to add to waiting list. Please try again.",
    }
  }
}

export async function getWaitingList() {
  // In a real app, you would fetch from a database
  return waitingList
}

export async function updateWaitingListStatus(id: string, status: string, adminNotes?: string) {
  // In a real app, you would update in a database
  const entryIndex = waitingList.findIndex((entry) => entry.id === id)

  if (entryIndex !== -1) {
    waitingList[entryIndex] = {
      ...waitingList[entryIndex],
      status,
      adminNotes: adminNotes || waitingList[entryIndex].adminNotes,
    }

    revalidatePath("/admin/waiting-list")
    return { success: true }
  }

  return { success: false, message: "Entry not found" }
}

export async function getWaitingListStats() {
  // In a real app, you would calculate this from database queries
  const stats = {
    total: waitingList.length,
    byState: {} as Record<string, number>,
    byStatus: {} as Record<string, number>,
    byVrClientStatus: {} as Record<string, number>,
  }

  waitingList.forEach((entry) => {
    // Count by state
    stats.byState[entry.state] = (stats.byState[entry.state] || 0) + 1

    // Count by status
    stats.byStatus[entry.status] = (stats.byStatus[entry.status] || 0) + 1

    // Count by VR client status
    stats.byVrClientStatus[entry.vrClientStatus] = (stats.byVrClientStatus[entry.vrClientStatus] || 0) + 1
  })

  return stats
}
