const express = require("express")
const router = express.Router()
const { submitReferral, getReferrals, getReferral, updateReferral } = require("../controllers/referral.controller")
const { protect, authorize } = require("../middleware/auth.middleware")

// Public route for submitting referrals
router.post("/", submitReferral)

// Protected routes
router.get("/", protect, authorize("admin", "business-specialist", "counselor"), getReferrals)
router.get("/:id", protect, authorize("admin", "business-specialist", "counselor"), getReferral)
router.put("/:id", protect, authorize("admin", "business-specialist", "counselor"), updateReferral)

module.exports = router
