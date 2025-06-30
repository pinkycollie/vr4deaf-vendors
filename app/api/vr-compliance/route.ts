export async function POST(req: Request) {
  try {
    const { clientId, milestoneData, state } = await req.json()

    // Business Magician API for compliance tracking
    const complianceResponse = await fetch(`${process.env.API_BASE_URL}/vr-compliance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEAF_AUTH_API_KEY}`,
        "X-API-Key": process.env.DEAF_AUTH_API_KEY,
      },
      body: JSON.stringify({
        client_id: clientId,
        milestone_data: milestoneData,
        state: state,
        program_type: state === "TX" || state === "FL" ? "VR_CBTAC" : "AI_POWERED",
      }),
    })

    if (!complianceResponse.ok) {
      throw new Error("VR Compliance API request failed")
    }

    const complianceData = await complianceResponse.json()

    const enhancedCompliance = {
      status: complianceData.compliance_status || "pending",
      milestoneProgress: {
        ssesp: complianceData.milestones?.ssesp || { completed: false, fee: 153 },
        startup: complianceData.milestones?.startup || { completed: false, fee: 765 },
        maintenance: complianceData.milestones?.maintenance || { completed: false, fee: 1530 },
        stability: complianceData.milestones?.stability || { completed: false, fee: 2295 },
        closure: complianceData.milestones?.closure || { completed: false, fee: 3032 },
      },
      documentation: {
        required: complianceData.required_docs || [],
        submitted: complianceData.submitted_docs || [],
        pending: complianceData.pending_docs || [],
      },
      nextSteps: complianceData.next_actions || [],
      vrCounselorNotes: complianceData.counselor_notes || "",
      accessibilityAccommodations: complianceData.accommodations || [],
    }

    return Response.json(enhancedCompliance)
  } catch (error) {
    console.error("VR Compliance API error:", error)
    return Response.json({ error: "Failed to fetch compliance data" }, { status: 500 })
  }
}
