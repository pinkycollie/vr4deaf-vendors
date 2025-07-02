import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

// Form validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("ZIP code is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  disabilityType: Yup.array().min(1, "Please select at least one disability type"),
  disabilityDescription: Yup.string().required("Please describe how your disability affects your ability to work"),
  employmentStatus: Yup.string().required("Please select your current employment status"),
  employmentGoals: Yup.string().required("Please describe your employment goals"),
  consentToContact: Yup.boolean().oneOf([true], "You must consent to be contacted"),
});

const disabilityTypes = [
  { id: "physical", label: "Physical disability" },
  { id: "visual", label: "Visual impairment" },
  { id: "hearing", label: "Hearing impairment" },
  { id: "cognitive", label: "Cognitive disability" },
  { id: "mental", label: "Mental health condition" },
  { id: "learning", label: "Learning disability" },
  { id: "developmental", label: "Developmental disability" },
  { id: "chronic", label: "Chronic health condition" },
  { id: "other", label: "Other" },
];

const employmentStatuses = [
  { value: "unemployed", label: "Unemployed" },
  { value: "employed-full-time", label: "Employed Full-Time" },
  { value: "employed-part-time", label: "Employed Part-Time" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "student", label: "Student" },
  { value: "retired", label: "Retired" },
];

const referralSources = [
  { value: "friend", label: "Friend or Family Member" },
  { value: "doctor", label: "Doctor or Healthcare Provider" },
  { value: "school", label: "School or Educational Institution" },
  { value: "employer", label: "Employer" },
  { value: "social-services", label: "Social Services Agency" },
  { value: "online", label: "Online Search" },
  { value: "social-media", label: "Social Media" },
  { value: "other", label: "Other" },
];

const steps = [
  "Introduction",
  "Personal Information",
  "Disability Information",
  "Employment Information",
  "Additional Information",
];

const VRInterestForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      dateOfBirth: "",
      disabilityType: [],
      disabilityDescription: "",
      employmentStatus: "",
      employmentGoals: "",
      howDidYouHear: "",
      additionalComments: "",
      consentToContact: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);

      try {
        // Replace axios.post with google.script.run
        google.script.run
          .withSuccessHandler(() => {
            setIsSubmitted(true);
          })
          .withFailureHandler((err) => {
            setError(err.message || "An error occurred. Please try again.");
          })
          .processVRReferral(values); // Call your Apps Script function
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleNext = async () => {
    const fieldsToValidate = {
      1: ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode", "dateOfBirth"],
      2: ["disabilityType", "disabilityDescription"],
      3: ["employmentStatus", "employmentGoals"],
      4: ["consentToContact"],
    };

    if (activeStep === 0) {
      setActiveStep(activeStep + 1);
      return;
    }

    if (activeStep === steps.length - 1) {
      await formik.validateForm();
      if (formik.isValid) {
        formik.submitForm();
      }
      return;
    }

    const currentFields = fieldsToValidate[activeStep];
    const errors = {};

    for (const field of currentFields) {
      try {
        await validationSchema.validateAt(field, formik.values);
      } catch (err) {
        errors[field] = err.message;
      }
    }

    formik.setErrors({ ...formik.errors, ...errors });

    if (Object.keys(errors).length === 0) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleDisabilityTypeChange = (event) => {
    const { value, checked } = event.target;
    const { disabilityType } = formik.values;

    if (checked) {
      formik.setFieldValue("disabilityType", [...disabilityType, value]);
    } else {
      formik.setFieldValue(
        "disabilityType",
        disabilityType.filter((type) => type !== value)
      );
    }
  };

  if (isSubmitted) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom color="primary">
              Thank You for Your Interest!
            </Typography>
            <Typography variant="body1" paragraph>
              Your information has been successfully submitted.
            </Typography>
            <Typography variant="body1" paragraph>
              A VR staff member will contact you within 3-5 business days to discuss your interest in VR services.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              If you have any questions, please call our toll-free number at 1-800-123-4567.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Welcome to Start My VR!
              </Typography>
              <Typography variant="body1" paragraph>
                Thank you for your interest in Texas Workforce Solutions-Vocational Rehabilitation (VR) Services.
              </Typography>
              <Typography variant="body1" paragraph>
                By completing the online self-referral, you are taking the first step in your Vocational Rehabilitation
                journey.
              </Typography>
              <Typography variant="body1" paragraph>
                ✓ If you have a physical, mental, or emotional disability that affects your ability to obtain or
                maintain employment, you may be eligible for our services to help you in finding and retaining
                meaningful employment.
              </Typography>
              <Typography variant="body1" paragraph>
                ✓ Please complete the form fields so that we may connect you with a counselor who
