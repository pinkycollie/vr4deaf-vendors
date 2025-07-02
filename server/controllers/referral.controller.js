const Referral = require("../models/referral.model")
const User = require("../models/user.model")
const emailService = require("../services/email.service")

// @desc    Submit a new VR interest form
// @route   POST /api/referrals
// @access  Public
exports.submitReferral = async (req, res) => {
  try {
    const referral = await Referral.create(req.body)

    // Find available counselors to notify
    const counselors = await User.find({ role: "counselor" }).select("email name")

    if (counselors.length > 0) {
      // Send notification email to counselors
      await emailService.sendReferralNotification(counselors, referral)
    }

    // Send confirmation email to the client
    await emailService.sendReferralConfirmation(referral.email, {
      firstName: referral.firstName,
      lastName: referral.lastName,
    })

    res.status(201).json({
      success: true,
      data: referral,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Get all referrals
// @route   GET /api/referrals
// @access  Private (Admin, Business Specialist, Counselor)
exports.getReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find().sort("-createdAt")

    res.status(200).json({
      success: true,
      count: referrals.length,
      data: referrals,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Get single referral
// @route   GET /api/referrals/:id
// @access  Private (Admin, Business Specialist, Counselor)
exports.getReferral = async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id)

    if (!referral) {
      return res.status(404).json({
        success: false,
        message: "Referral not found",
      })
    }

    res.status(200).json({
      success: true,
      data: referral,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// @desc    Update referral status
// @route   PUT /api/referrals/:id
// @access  Private (Admin, Business Specialist, Counselor)
exports.updateReferral = async (req, res) => {
  try {
    const referral = await Referral.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!referral) {
      return res.status(404).json({
        success: false,
        message: "Referral not found",
      })
    }

    res.status(200).json({
      success: true,
      data: referral,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
