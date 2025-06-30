"use client"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  businessType: string
  currentMilestone: string
  progress: number
  totalValue: number
  paidAmount: number
  status: "active" | "pending" | "completed" | "on-hold"
  vrCounselor: string
  startDate: string
  accommodations: string[]
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    businessType: "ASL Interpretation Services",
    currentMilestone: "Start-Up Phase",
    progress: 35,
    totalValue: 7745,
    paidAmount: 918,
    status: "active",
    vrCounselor: "Maria Rodriguez",
    startDate: "2024-01-15",
    accommodations: ["ASL Interpreter", "Visual Alerts", "Written Communication"]
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@email.com",\
    phone: "(555)
