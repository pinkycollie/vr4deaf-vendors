import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType, organizationCode } = await request.json()

    // Validate required fields
    if (!email || !password || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // For vendor login, require organization code
    if (userType === "vendor" && !organizationCode) {
      return NextResponse.json({ error: "Organization code required for vendor access" }, { status: 400 })
    }

    // Query user from database
    const users = await sql`
      SELECT u.*, o.name as organization_name, o.type as organization_type
      FROM users u
      LEFT JOIN organizations o ON u.organization_id = o.id
      WHERE u.email = ${email} AND u.user_type = ${userType}
    `

    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = users[0]

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // For vendors, verify organization code
    if (userType === "vendor") {
      const organizations = await sql`
        SELECT * FROM organizations 
        WHERE code = ${organizationCode} AND id = ${user.organization_id}
      `

      if (organizations.length === 0) {
        return NextResponse.json({ error: "Invalid organization code" }, { status: 401 })
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userType: user.user_type,
        organizationId: user.organization_id,
        permissions: user.permissions || [],
      },
      process.env.SESSION_SECRET!,
      { expiresIn: "24h" },
    )

    // Update last login
    await sql`
      UPDATE users 
      SET last_login = NOW(), updated_at = NOW()
      WHERE id = ${user.id}
    `

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.user_type,
        organizationName: user.organization_name,
        permissions: user.permissions || [],
      },
      token,
    })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
