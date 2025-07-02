import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { verifyToken } from "@/lib/auth-utils"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyToken(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { userType, organizationId, userId } = authResult.user
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "30d"

    let whereClause = ""
    let params: any[] = []

    if (userType === "vendor") {
      whereClause = "WHERE c.organization_id = $1"
      params = [organizationId]
    } else if (userType === "client") {
      whereClause = "WHERE c.user_id = $1"
      params = [userId]
    }

    // Get date range based on timeframe
    const getDateRange = (timeframe: string) => {
      const now = new Date()
      switch (timeframe) {
        case "7d":
          return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        case "30d":
          return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        case "90d":
          return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        case "1y":
          return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        default:
          return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      }
    }

    const startDate = getDateRange(timeframe)

    // Overall statistics
    const stats = await sql`
      SELECT 
        COUNT(DISTINCT c.id) as total_clients,
        COUNT(DISTINCT CASE WHEN c.service_type = 'vr-vendor' THEN c.id END) as vr_clients,
        COUNT(DISTINCT CASE WHEN c.service_type = 'ai-powered' THEN c.id END) as ai_clients,
        COUNT(m.id) as total_milestones,
        COUNT(CASE WHEN m.status = 'completed' THEN 1 END) as completed_milestones,
        COUNT(CASE WHEN m.status = 'in-progress' THEN 1 END) as active_milestones,
        SUM(CASE WHEN m.status = 'completed' THEN m.fee ELSE 0 END) as total_revenue,
        SUM(m.fee) as potential_revenue,
        AVG(CASE WHEN m.status = 'completed' THEN 
          EXTRACT(days FROM m.completed_at - m.created_at) 
        END) as avg_completion_days
      FROM clients c
      LEFT JOIN milestones m ON c.id = m.client_id
      ${whereClause}
      AND c.created_at >= ${startDate.toISOString()}
    `

    // Monthly revenue trend
    const revenueData = await sql`
      SELECT 
        DATE_TRUNC('month', m.completed_at) as month,
        SUM(m.fee) as revenue,
        COUNT(m.id) as milestones_completed
      FROM milestones m
      JOIN clients c ON m.client_id = c.id
      ${whereClause}
      AND m.status = 'completed'
      AND m.completed_at >= ${startDate.toISOString()}
      GROUP BY DATE_TRUNC('month', m.completed_at)
      ORDER BY month
    `

    // Client distribution by state
    const stateDistribution = await sql`
      SELECT 
        s.name as state_name,
        s.code as state_code,
        COUNT(c.id) as client_count,
        SUM(CASE WHEN m.status = 'completed' THEN m.fee ELSE 0 END) as revenue
      FROM clients c
      JOIN states s ON c.state_id = s.id
      LEFT JOIN milestones m ON c.id = m.client_id
      ${whereClause}
      AND c.created_at >= ${startDate.toISOString()}
      GROUP BY s.name, s.code
      ORDER BY client_count DESC
    `

    // Milestone completion rates
    const milestoneStats = await sql`
      SELECT 
        m.name,
        COUNT(m.id) as total,
        COUNT(CASE WHEN m.status = 'completed' THEN 1 END) as completed,
        AVG(CASE WHEN m.status = 'completed' THEN 
          EXTRACT(days FROM m.completed_at - m.created_at) 
        END) as avg_days_to_complete
      FROM milestones m
      JOIN clients c ON m.client_id = c.id
      ${whereClause}
      AND m.created_at >= ${startDate.toISOString()}
      GROUP BY m.name
      ORDER BY m.milestone_order
    `

    // Recent activity
    const recentActivity = await sql`
      SELECT 
        al.*,
        u.name as user_name,
        c.business_idea,
        m.name as milestone_name
      FROM activity_logs al
      JOIN users u ON al.user_id = u.id
      JOIN clients c ON al.client_id = c.id
      LEFT JOIN milestones m ON al.milestone_id = m.id
      ${whereClause.replace("c.", "c.")}
      AND al.created_at >= ${startDate.toISOString()}
      ORDER BY al.created_at DESC
      LIMIT 20
    `

    return NextResponse.json({
      stats: stats[0],
      revenueData,
      stateDistribution,
      milestoneStats,
      recentActivity,
      timeframe,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
