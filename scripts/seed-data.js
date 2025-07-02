import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"

const sql = neon(process.env.DATABASE_URL)

async function seedDatabase() {
  try {
    console.log("Starting database seeding...")

    // Create demo organization
    const organizations = await sql`
      INSERT INTO organizations (name, code, type, state_id, contact_info)
      VALUES 
        ('VR4Deaf Texas', 'VR4DEAF-TX', 'vr_vendor', 1, '{"phone": "555-0123", "email": "contact@vr4deaf-tx.org"}'),
        ('VR4Deaf Florida', 'VR4DEAF-FL', 'vr_vendor', 2, '{"phone": "555-0124", "email": "contact@vr4deaf-fl.org"}'),
        ('AI Business Solutions', 'AI-BIZ-001', 'ai_service', 3, '{"phone": "555-0125", "email": "contact@aibusiness.com"}')
      RETURNING id
    `

    const [txOrgId, flOrgId, aiOrgId] = organizations.map((org) => org.id)

    // Create demo users
    const hashedPassword = await bcrypt.hash("Demo123!", 12)

    const users = await sql`
      INSERT INTO users (name, email, password_hash, user_type, organization_id, permissions)
      VALUES 
        ('John Vendor', 'vendor@vr4deaf.org', ${hashedPassword}, 'vendor', ${txOrgId}, ARRAY['client_management', 'billing', 'reporting']),
        ('Sarah Client', 'client@example.com', ${hashedPassword}, 'client', NULL, ARRAY['profile_view']),
        ('Admin User', 'admin@vr4deaf.org', ${hashedPassword}, 'admin', NULL, ARRAY['admin']),
        ('Jane Counselor', 'counselor@vr4deaf.org', ${hashedPassword}, 'vendor', ${flOrgId}, ARRAY['client_management'])
      RETURNING id
    `

    const [vendorId, clientId, adminId, counselorId] = users.map((user) => user.id)

    // Create demo clients
    const clients = await sql`
      INSERT INTO clients (
        user_id, organization_id, service_type, state_id, disability_type,
        business_idea, accommodation_needs, support_level, vr_counselor,
        target_audience, industry
      )
      VALUES 
        (
          ${clientId}, ${txOrgId}, 'vr-vendor', 1, 'Deaf/Hard of Hearing',
          'ASL interpretation services for healthcare facilities',
          'Visual communication tools, ASL interpreters for meetings',
          'comprehensive', 'Dr. Smith',
          'Healthcare facilities, Medical practices', 'Healthcare Services'
        ),
        (
          ${clientId}, ${aiOrgId}, 'ai-powered', 3, 'Deaf/Hard of Hearing',
          'Online deaf education platform with visual learning tools',
          'Captioning, visual alerts, ASL content',
          'simple', '',
          'Deaf students, Educational institutions', 'Education Technology'
        )
      RETURNING id
    `

    // Create milestones for VR client
    const vrClientId = clients[0].id
    await sql`
      INSERT INTO milestones (client_id, name, description, fee, status, milestone_order, vr_approval_required)
      VALUES 
        (${vrClientId}, 'SSESP', 'Self-Employment Feasibility Study', 153.00, 'completed', 1, true),
        (${vrClientId}, 'Start-Up', 'Business plan development and initial setup', 765.00, 'in-progress', 2, true),
        (${vrClientId}, 'Maintenance', 'Ongoing business support and development', 1530.00, 'not-started', 3, true),
        (${vrClientId}, 'Stability', 'Business stabilization and growth planning', 2295.00, 'not-started', 4, true),
        (${vrClientId}, 'Closure', 'Successful transition to independent operation', 3032.00, 'not-started', 5, true)
    `

    // Create milestones for AI client
    const aiClientId = clients[1].id
    await sql`
      INSERT INTO milestones (client_id, name, description, fee, status, milestone_order, vr_approval_required)
      VALUES 
        (${aiClientId}, 'Discovery', 'AI-Powered Idea Validation & Planning', 0.00, 'completed', 1, false),
        (${aiClientId}, 'Planning', 'AI-Assisted Business Planning', 0.00, 'completed', 2, false),
        (${aiClientId}, 'Launch', 'Business Setup & Launch', 0.00, 'in-progress', 3, false),
        (${aiClientId}, 'Growth', 'Scaling & Optimization', 0.00, 'not-started', 4, false)
    `

    // Create sample billing records
    await sql`
      INSERT INTO billing_records (client_id, milestone_id, amount, status, due_date)
      SELECT 
        m.client_id, 
        m.id, 
        m.fee, 
        CASE WHEN m.status = 'completed' THEN 'paid' ELSE 'pending' END,
        CURRENT_DATE + INTERVAL '30 days'
      FROM milestones m 
      WHERE m.fee > 0 AND m.status = 'completed'
    `

    // Create sample activity logs
    await sql`
      INSERT INTO activity_logs (user_id, client_id, action, description)
      VALUES 
        (${vendorId}, ${vrClientId}, 'milestone_completed', 'SSESP milestone completed successfully'),
        (${vendorId}, ${vrClientId}, 'milestone_started', 'Start-Up milestone initiated'),
        (${clientId}, ${aiClientId}, 'profile_updated', 'Updated business idea and accommodation needs')
    `

    console.log("Database seeding completed successfully!")
    console.log("Demo accounts created:")
    console.log("- Vendor: vendor@vr4deaf.org / Demo123!")
    console.log("- Client: client@example.com / Demo123!")
    console.log("- Admin: admin@vr4deaf.org / Demo123!")
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  }
}

// Run seeding
seedDatabase()
