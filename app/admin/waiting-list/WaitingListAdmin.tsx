"use client"

import { useState } from "react"
import { CheckCircle, Clock, Download, Filter, MessageSquare, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { updateWaitingListStatus } from "@/app/actions/waiting-list-actions"
import type { WaitingListEntry, WaitingListStats } from "@/types/waiting-list"

interface WaitingListAdminProps {
  initialEntries: WaitingListEntry[]
  initialStats: WaitingListStats
}

export function WaitingListAdmin({ initialEntries, initialStats }: WaitingListAdminProps) {
  const [entries, setEntries] = useState<WaitingListEntry[]>(initialEntries)
  const [stats, setStats] = useState<WaitingListStats>(initialStats)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [stateFilter, setStateFilter] = useState("all")
  const [selectedEntry, setSelectedEntry] = useState<WaitingListEntry | null>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")
  const [newStatus, setNewStatus] = useState("")

  // Filter entries based on search term and filters
  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || entry.status === statusFilter
    const matchesState = stateFilter === "all" || entry.state === stateFilter

    return matchesSearch && matchesStatus && matchesState
  })

  // Get unique states for filter dropdown
  const uniqueStates = Array.from(new Set(entries.map((entry) => entry.state))).sort()

  // Handle status update
  async function handleStatusUpdate() {
    if (!selectedEntry || !newStatus) return

    const result = await updateWaitingListStatus(selectedEntry.id, newStatus, adminNotes)

    if (result.success) {
      // Update local state
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === selectedEntry.id ? { ...entry, status: newStatus as any, adminNotes } : entry,
        ),
      )

      // Update stats
      const updatedStats = { ...stats }
      updatedStats.byStatus[selectedEntry.status] = Math.max(0, (updatedStats.byStatus[selectedEntry.status] || 0) - 1)
      updatedStats.byStatus[newStatus] = (updatedStats.byStatus[newStatus] || 0) + 1
      setStats(updatedStats)

      // Close dialog
      setIsUpdateDialogOpen(false)
      setSelectedEntry(null)
      setAdminNotes("")
      setNewStatus("")
    }
  }

  // Open update dialog
  function openUpdateDialog(entry: WaitingListEntry) {
    setSelectedEntry(entry)
    setAdminNotes(entry.adminNotes || "")
    setNewStatus(entry.status)
    setIsUpdateDialogOpen(true)
  }

  // Export to CSV
  function exportToCsv() {
    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Preferred Contact",
      "Communication Preference",
      "State",
      "County",
      "VR Client Status",
      "Status",
      "Created At",
      "Additional Notes",
      "Admin Notes",
    ]

    const csvRows = [
      headers.join(","),
      ...filteredEntries.map((entry) =>
        [
          `"${entry.fullName}"`,
          `"${entry.email}"`,
          `"${entry.phone || ""}"`,
          `"${entry.preferredContact}"`,
          `"${entry.communicationPreference}"`,
          `"${entry.state}"`,
          `"${entry.county || ""}"`,
          `"${entry.vrClientStatus}"`,
          `"${entry.status}"`,
          `"${entry.createdAt.toLocaleDateString()}"`,
          `"${entry.additionalNotes || ""}"`,
          `"${entry.adminNotes || ""}"`,
        ].join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `waiting-list-${new Date().toISOString().split("T")[0]}.csv`)
    link.click()
  }

  // Get status badge color
  function getStatusBadge(status: string) {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case "contacted":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <MessageSquare className="mr-1 h-3 w-3" /> Contacted
          </Badge>
        )
      case "enrolled":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" /> Enrolled
          </Badge>
        )
      case "declined":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <X className="mr-1 h-3 w-3" /> Declined
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byStatus.pending || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byStatus.contacted || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Enrolled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byStatus.enrolled || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Waiting List Entries</CardTitle>
          <CardDescription>Manage and track applicants on the waiting list.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>

              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {uniqueStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={exportToCsv}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>VR Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No entries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.fullName}</TableCell>
                      <TableCell>
                        <div>{entry.email}</div>
                        {entry.phone && <div className="text-sm text-muted-foreground">{entry.phone}</div>}
                        <div className="text-xs text-muted-foreground mt-1">Prefers: {entry.preferredContact}</div>
                      </TableCell>
                      <TableCell>{entry.state}</TableCell>
                      <TableCell>{entry.vrClientStatus}</TableCell>
                      <TableCell>
                        {entry.createdAt instanceof Date
                          ? entry.createdAt.toLocaleDateString()
                          : new Date(entry.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openUpdateDialog(entry)}>
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Applicant Status</DialogTitle>
            <DialogDescription>
              {selectedEntry && <span>Update status for {selectedEntry.fullName}</span>}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Admin Notes</label>
              <Textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes about this applicant..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
