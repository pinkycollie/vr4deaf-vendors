export interface WaitingListEntry {
  id: string
  fullName: string
  email: string
  phone?: string
  preferredContact: "email" | "phone" | "text" | "videophone"
  communicationPreference: "asl" | "written" | "both"
  state: string
  county?: string
  serviceInterest: string[]
  vrClientStatus: "current" | "former" | "never" | "unsure"
  additionalNotes?: string
  createdAt: Date
  status: "pending" | "contacted" | "enrolled" | "declined"
  adminNotes?: string
}

export interface WaitingListStats {
  total: number
  byState: Record<string, number>
  byStatus: Record<string, number>
  byVrClientStatus: Record<string, number>
}
