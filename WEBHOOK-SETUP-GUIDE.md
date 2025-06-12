# 🔗 VR4DEAF Webhook Setup Guide

## ❌ **Current Issue**
You're using: `https://vr4deaf.org/deaf-individual-assessment`
This is the **tool page** (for users), not the webhook endpoint!

## ✅ **Correct Webhook URL**
Use this URL in WrapifAI: `https://vr4deaf.org/api/webhooks/deaf-individual-assessment`

## 📋 **Step-by-Step Setup**

### 1. **In WrapifAI Dashboard**
- Go to your tool settings: https://app.wrapifai.com/p/deaf-individual-comprehensive-assessment-tool-cfd7bd
- Find the "Webhooks" or "Integrations" section
- Enter webhook URL: `https://vr4deaf.org/api/webhooks/deaf-individual-assessment`
- WrapifAI will generate a signing key for you

### 2. **Copy the Signing Key**
- After adding the webhook URL, WrapifAI will show you a signing key
- Copy this key (it looks like: `wh_1234567890abcdef...`)

### 3. **Configure Signing Key in VR4DEAF**
- Go to: https://vr4deaf.org/webhooks
- Find "Deaf Individual Assessment Tool"
- Click "Add Key" button
- Paste the signing key from WrapifAI
- Click "Configure Signing Key"

### 4. **Test the Connection**
- In WrapifAI, use their "Test Webhook" feature
- Or go to: https://vr4deaf.org/webhooks/test
- Select "deaf-individual-assessment"
- Send a test payload

## 🔍 **URL Breakdown**

| Purpose | URL | Description |
|---------|-----|-------------|
| **Tool Page** | `https://vr4deaf.org/tools/deaf-individual-assessment` | Where users take the assessment |
| **Webhook Endpoint** | `https://vr4deaf.org/api/webhooks/deaf-individual-assessment` | Where WrapifAI sends data |
| **Webhook Dashboard** | `https://vr4deaf.org/webhooks` | Manage webhook settings |

## 🛡️ **Security Setup**

### Required Headers from WrapifAI:
\`\`\`
Content-Type: application/json
X-WrapifAI-Signature: sha256=your_signature_here
\`\`\`

### Expected Payload Format:
\`\`\`json
{
  "eventType": "assessment_completed",
  "clientId": "client_123",
  "assessmentId": "assess_456",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "culturalAssessment": {
      "aslProficiency": "fluent",
      "communicationPreferences": ["ASL", "written"],
      "culturalIdentityLevel": "strong_deaf_identity"
    },
    "vocationalAssessment": {
      "interests": ["technology", "education"],
      "skillLevelRating": 4
    },
    "accommodationAssessment": {
      "jobRoleDescription": "Software Developer",
      "neededAccommodations": ["Sign language interpreter", "Visual alerts"]
    }
  }
}
\`\`\`

## ✅ **Verification Checklist**

- [ ] Webhook URL: `https://vr4deaf.org/api/webhooks/deaf-individual-assessment`
- [ ] Signing key configured in VR4DEAF dashboard
- [ ] Test webhook sends successfully
- [ ] Data appears in webhook logs
- [ ] Assessment processing triggers correctly

## 🚨 **Common Mistakes**

1. **Wrong URL**: Using tool page instead of API endpoint
2. **Missing Signature**: Not configuring the signing key
3. **Wrong Headers**: Not sending X-WrapifAI-Signature header
4. **Invalid JSON**: Malformed payload data

## 📞 **Need Help?**

If you're still having issues:
1. Check webhook logs: https://vr4deaf.org/webhooks/logs
2. Test the endpoint: https://vr4deaf.org/webhooks/test
3. Verify signing key is configured properly
\`\`\`

Now let me create a quick setup verification page:
