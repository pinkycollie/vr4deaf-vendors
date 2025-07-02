import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { verifyToken } from "@/lib/auth-utils"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyToken(request)
    if (!authResult.success || authResult.user.userType !== "vendor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { organizationId } = authResult.user

    // VR Compliance checks
    const complianceChecks = await sql`
      SELECT 
        c.id as client_id,
        c.business_idea,
        u.name as client_name,
        s.name as state_name,
        COUNT(m.id) as total_milestones,
        COUNT(CASE WHEN m.status = 'completed' AND m.vr_approval_required THEN 1 END) as approved_milestones,
        COUNT(CASE WHEN m.status = 'completed' AND m.vr_approval_required AND m.completed_at > m.due_date THEN 1 END) as overdue_completions,
        MAX(CASE WHEN m.status = 'in-progress' AND m.due_date < NOW() THEN m.due_date END) as next_overdue_date,
        SUM(CASE WHEN m.status = 'completed' THEN m.fee ELSE 0 END) as total_billed,
        COUNT(CASE WHEN br.status = 'pending' THEN 1 END) as pending_payments
      FROM clients c
      JOIN users u ON c.user_id = u.id
      JOIN states s ON c.state_id = s.id
      LEFT JOIN milestones m ON c.id = m.client_id
      LEFT JOIN billing_records br ON c.id = br.client_id
      WHERE c.organization_id = ${organizationId}
      AND c.service_type = 'vr-vendor'
      GROUP BY c.id, c.business_idea, u.name, s.name
    `

    // Fee schedule compliance
    const feeCompliance = await sql`
      SELECT 
        m.name as milestone_name,
        m.fee as charged_fee,
        fs.min_fee,
        fs.max_fee,
        CASE 
          WHEN m.fee < fs.min_fee THEN 'under_minimum'
          WHEN m.fee > fs.max_fee THEN 'over_maximum'
          ELSE 'compliant'
        END as compliance_status
      FROM milestones m
      JOIN clients c ON m.client_id = c.id
      JOIN fee_schedules fs ON m.name = fs.milestone_name AND c.state_id = fs.state_id
      WHERE c.organization_id = ${organizationId}
      AND c.service_type = 'vr-vendor'
    `

    // Documentation requirements
    const documentationStatus = await sql`
      SELECT 
        c.id as client_id,
        u.name as client_name,
        COUNT(d.id) as total_documents,
        COUNT(CASE WHEN d.status = 'approved' THEN 1 END) as approved_documents,
        COUNT(CASE WHEN d.required = true AND d.status != 'approved' THEN 1 END) as missing_required_docs
      FROM clients c
      JOIN users u ON c.user_id = u.id
      LEFT JOIN documents d ON c.id = d.client_id
      WHERE c.organization_id = ${organizationId}
      AND c.service_type = 'vr-vendor'
      GROUP BY c.id, u.name
    `

    // Calculate overall compliance score
    const overallCompliance = {
      totalClients: complianceChecks.length,
      compliantClients: complianceChecks.filter((c) => c.overdue_completions === 0 && c.pending_payments === 0).length,
      feeCompliance:
        (feeCompliance.filter((f) => f.compliance_status === "compliant").length / Math.max(feeCompliance.length, 1)) *
        100,
      documentationCompliance:
        (documentationStatus.filter((d) => d.missing_required_docs === 0).length /
          Math.max(documentationStatus.length, 1)) *
        100,
    }

    return NextResponse.json({
      complianceChecks,
      feeCompliance,
      documentationStatus,
      overallCompliance,
    })
  } catch (error) {
    console.error("Error fetching compliance data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
