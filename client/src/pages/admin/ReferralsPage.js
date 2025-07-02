"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import axios from "axios"
import { format } from "date-fns"

const ReferralsPage = () => {
  const [referrals, setReferrals] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReferral, setSelectedReferral] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [statusValue, setStatusValue] = useState("")

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axios.get("/api/referrals")
        setReferrals(response.data.data)
      } catch (error) {
        console.error("Error fetching referrals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReferrals()
  }, [])

  const handleStatusChange = async () => {
    try {
      await axios.put(`/api/referrals/${selectedReferral._id}`, {
        status: statusValue,
      })

      // Update the local state
      setReferrals(referrals.map((ref) => (ref._id === selectedReferral._id ? { ...ref, status: statusValue } : ref)))

      setDialogOpen(false)
    } catch (error) {
      console.error("Error updating referral status:", error)
    }
  }

  const handleViewDetails = (referral) => {
    setSelectedReferral(referral)
    setStatusValue(referral.status)
    setDialogOpen(true)
  }

  const columns = [
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "disabilityType",
      headerName: "Disability Types",
      width: 200,
      valueGetter: (params) => params.row.disabilityType.join(", "),
    },
    {
      field: "createdAt",
      headerName: "Submission Date",
      width: 180,
      valueGetter: (params) => format(new Date(params.row.createdAt), "MM/dd/yyyy hh:mm a"),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      valueGetter: (params) => params.row.status.charAt(0).toUpperCase() + params.row.status.slice(1),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => handleViewDetails(params.row)}>
          View Details
        </Button>
      ),
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          VR Interest Form Submissions
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={referrals}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              loading={loading}
              getRowId={(row) => row._id}
              disableSelectionOnClick
            />
          </div>
        </CardContent>
      </Card>

      {selectedReferral && (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Referral Details</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Typography variant="subtitle2">First Name:</Typography>
              <Typography>{selectedReferral.firstName}</Typography>

              <Typography variant="subtitle2">Last Name:</Typography>
              <Typography>{selectedReferral.lastName}</Typography>

              <Typography variant="subtitle2">Email:</Typography>
              <Typography>{selectedReferral.email}</Typography>

              <Typography variant="subtitle2">Phone:</Typography>
              <Typography>{selectedReferral.phone}</Typography>

              <Typography variant="subtitle2">Address:</Typography>
              <Typography>{`${selectedReferral.address}, ${selectedReferral.city}, ${selectedReferral.state} ${selectedReferral.zipCode}`}</Typography>

              <Typography variant="subtitle2">Date of Birth:</Typography>
              <Typography>{format(new Date(selectedReferral.dateOfBirth), "MM/dd/yyyy")}</Typography>

              <Typography variant="subtitle2">Disability Types:</Typography>
              <Typography>{selectedReferral.disabilityType.join(", ")}</Typography>

              <Typography variant="subtitle2">Disability Description:</Typography>
              <Typography sx={{ gridColumn: "span 2" }}>{selectedReferral.disabilityDescription}</Typography>

              <Typography variant="subtitle2">Employment Status:</Typography>
              <Typography>{selectedReferral.employmentStatus}</Typography>

              <Typography variant="subtitle2">Employment Goals:</Typography>
              <Typography sx={{ gridColumn: "span 2" }}>{selectedReferral.employmentGoals}</Typography>

              <Typography variant="subtitle2">How They Heard About VR:</Typography>
              <Typography>{selectedReferral.howDidYouHear || "Not specified"}</Typography>

              <Typography variant="subtitle2">Additional Comments:</Typography>
              <Typography sx={{ gridColumn: "span 2" }}>{selectedReferral.additionalComments || "None"}</Typography>

              <Typography variant="subtitle2">Submission Date:</Typography>
              <Typography>{format(new Date(selectedReferral.createdAt), "MM/dd/yyyy hh:mm a")}</Typography>

              <Typography variant="subtitle2">Current Status:</Typography>
              <Typography>
                {selectedReferral.status.charAt(0).toUpperCase() + selectedReferral.status.slice(1)}
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Update Status</InputLabel>
                <Select value={statusValue} label="Update Status" onChange={(e) => setStatusValue(e.target.value)}>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="contacted">Contacted</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleStatusChange} variant="contained" color="primary">
              Update Status
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  )
}

export default ReferralsPage
