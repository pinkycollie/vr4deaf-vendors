import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

interface AuthUser {
  userId: number
  email: string
  userType: string
  organizationId?: number
  permissions: string[]
}

interface AuthResult {
  success: boolean
  user?: AuthUser
  error?: string
}

export async function verifyToken(request: NextRequest): Promise<AuthResult> {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { success: false, error: "Missing or invalid authorization header" }
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.SESSION_SECRET!) as any

    return {
      success: true,
      user: {
        userId: decoded.userId,
        email: decoded.email,
        userType: decoded.userType,
        organizationId: decoded.organizationId,
        permissions: decoded.permissions || [],
      },
    }
  } catch (error) {
    return { success: false, error: "Invalid or expired token" }
  }
}

export function hasPermission(user: AuthUser, requiredPermission: string): boolean {
  return user.permissions.includes(requiredPermission) || user.permissions.includes("admin")
}

export function canAccessClient(user: AuthUser, clientOrganizationId: number, clientUserId: number): boolean {
  if (user.userType === "admin") return true
  if (user.userType === "vendor" && user.organizationId === clientOrganizationId) return true
  if (user.userType === "client" && user.userId === clientUserId) return true
  return false
}
