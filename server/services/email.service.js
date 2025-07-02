const nodemailer = require("nodemailer")

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Send referral confirmation to client
exports.sendReferralConfirmation = async (email, { firstName, lastName }) => {
  const message = {
    from: `${process.env.EMAIL_FROM}`,
    to: email,
    subject: "Thank You for Your Interest in VR Services",
    html: `
      <h1>Thank You, ${firstName}!</h1>
      <p>We have received your interest form for Texas Workforce Solutions-Vocational Rehabilitation Services.</p>
      <p>A VR staff member will contact you within 3-5 business days to discuss your interest in VR services.</p>
      <p>If you have any questions, please call our toll-free number at 1-800-123-4567.</p>
      <p>Regards,<br>Texas Workforce Solutions-VR Services Team</p>
    `,
  }

  await transporter.sendMail(message)
}

// Send notification to counselors
exports.sendReferralNotification = async (counselors, referral) => {
  const counselorEmails = counselors.map((counselor) => counselor.email)

  const message = {
    from: `${process.env.EMAIL_FROM}`,
    to: counselorEmails,
    subject: "New VR Interest Form Submission",
    html: `
      <h1>New VR Interest Form Submission</h1>
      <p>A new client has submitted an interest form:</p>
      <ul>
        <li><strong>Name:</strong> ${referral.firstName} ${referral.lastName}</li>
        <li><strong>Email:</strong> ${referral.email}</li>
        <li><strong>Phone:</strong> ${referral.phone}</li>
        <li><strong>Disability Types:</strong> ${referral.disabilityType.join(", ")}</li>
        <li><strong>Employment Status:</strong> ${referral.employmentStatus}</li>
      </ul>
      <p>Please log in to the system to view the full details and take appropriate action.</p>
    `,
  }

  await transporter.sendMail(message)
}
