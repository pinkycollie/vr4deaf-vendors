const mongoose = require("mongoose")

const ReferralSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  zipCode: {
    type: String,
    required: [true, "ZIP code is required"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  disabilityType: {
    type: [String],
    required: [true, "At least one disability type is required"],
  },
  disabilityDescription: {
    type: String,
    required: [true, "Disability description is required"],
  },
  employmentStatus: {
    type: String,
    required: [true, "Employment status is required"],
  },
  employmentGoals: {
    type: String,
    required: [true, "Employment goals are required"],
  },
  howDidYouHear: {
    type: String,
  },
  additionalComments: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "contacted", "scheduled", "approved", "rejected"],
    default: "pending",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Referral", ReferralSchema)
