import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { verifyToken } from "@/lib/auth-utils"

const sql = neon(process.env.DATABASE_URL!)

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await verifyToken(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const milestoneId = params.id
    const { status, notes } = await request.json()

    // Validate status
    const validStatuses = ["not-started", "in-progress", "completed", "on-hold"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Check if user has permission to update this milestone
    const milestones = await sql`
      SELECT m.*, c.organization_id, c.user_id as client_user_id
      FROM milestones m
      JOIN clients c ON m.client_id = c.id
      WHERE m.id = ${milestoneId}
    `

    if (milestones.length === 0) {
      return NextResponse.json({ error: "Milestone not found" }, { status: 404 })
    }

    const milestone = milestones[0]
    const { userId, userType, organizationId } = authResult.user

    // Check permissions
    const hasPermission =
      (userType === "vendor" && milestone.organization_id === organizationId) ||
      (userType === "client" && milestone.client_user_id === userId) ||
      userType === "admin"

    if (!hasPermission) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Update milestone
    const updatedMilestone = await sql`
      UPDATE milestones 
      SET 
        status = ${status},
        notes = ${notes || milestone.notes},
        completed_at = ${status === "completed" ? "NOW()" : null},
        updated_at = NOW()
      WHERE id = ${milestoneId}
      RETURNING *
    `

    // Log the activity
    await sql`
      INSERT INTO activity_logs (
        user_id, client_id, milestone_id, action, description, created_at
      )
      VALUES (
        ${userId}, ${milestone.client_id}, ${milestoneId}, 'milestone_updated',
        ${`Milestone status changed to ${status}`}, NOW()
      )
    `

    // If VR milestone completed, trigger billing
    if (status === "completed" && milestone.vr_approval_required && milestone.fee > 0) {
      await sql`
        INSERT INTO billing_records (
          client_id, milestone_id, amount, status, due_date, created_at
        )
        VALUES (
          ${milestone.client_id}, ${milestoneId}, ${milestone.fee}, 'pending',
          ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()}, NOW()
        )
      `
    }

    return NextResponse.json({
      success: true,
      milestone: updatedMilestone[0],
    })
  } catch (error) {
    console.error("Error updating milestone:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
