import { Container, Typography, Box } from "@mui/material"
import VRInterestForm from "../../components/client/VRInterestForm"

const InterestFormPage = () => {
  return (
    <Box sx={{ py: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Start My VR Interest Form
        </Typography>
        <VRInterestForm />
      </Container>
    </Box>
  )
}

export default InterestFormPage
