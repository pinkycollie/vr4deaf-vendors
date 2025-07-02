import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...")

    // Seed states
    await seedStates()

    // Seed organizations
    await seedOrganizations()

    // Seed users
    await seedUsers()

    // Seed sample opportunities
    await seedOpportunities()

    // Seed sample business insights
    await seedBusinessInsights()

    console.log("✅ Database seeding completed successfully!")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

async function seedStates() {
  console.log("📍 Seeding states...")

  const states = [
    { name: "Alabama", abbreviation: "AL", vr_program_type: "standard", has_cbtac: true },
    { name: "Alaska", abbreviation: "AK", vr_program_type: "standard", has_cbtac: true },
    { name: "Arizona", abbreviation: "AZ", vr_program_type: "standard", has_cbtac: true },
    { name: "Arkansas", abbreviation: "AR", vr_program_type: "standard", has_cbtac: true },
    { name: "California", abbreviation: "CA", vr_program_type: "standard", has_cbtac: true },
    { name: "Colorado", abbreviation: "CO", vr_program_type: "standard", has_cbtac: true },
    { name: "Connecticut", abbreviation: "CT", vr_program_type: "standard", has_cbtac: true },
    { name: "Delaware", abbreviation: "DE", vr_program_type: "standard", has_cbtac: true },
    { name: "Florida", abbreviation: "FL", vr_program_type: "enhanced", has_cbtac: true },
    { name: "Georgia", abbreviation: "GA", vr_program_type: "standard", has_cbtac: true },
    { name: "Hawaii", abbreviation: "HI", vr_program_type: "standard", has_cbtac: true },
    { name: "Idaho", abbreviation: "ID", vr_program_type: "standard", has_cbtac: true },
    { name: "Illinois", abbreviation: "IL", vr_program_type: "standard", has_cbtac: true },
    { name: "Indiana", abbreviation: "IN", vr_program_type: "standard", has_cbtac: true },
    { name: "Iowa", abbreviation: "IA", vr_program_type: "standard", has_cbtac: true },
    { name: "Kansas", abbreviation: "KS", vr_program_type: "standard", has_cbtac: true },
    { name: "Kentucky", abbreviation: "KY", vr_program_type: "standard", has_cbtac: true },
    { name: "Louisiana", abbreviation: "LA", vr_program_type: "standard", has_cbtac: true },
    { name: "Maine", abbreviation: "ME", vr_program_type: "standard", has_cbtac: true },
    { name: "Maryland", abbreviation: "MD", vr_program_type: "standard", has_cbtac: true },
    { name: "Massachusetts", abbreviation: "MA", vr_program_type: "standard", has_cbtac: true },
    { name: "Michigan", abbreviation: "MI", vr_program_type: "standard", has_cbtac: true },
    { name: "Minnesota", abbreviation: "MN", vr_program_type: "standard", has_cbtac: true },
    { name: "Mississippi", abbreviation: "MS", vr_program_type: "standard", has_cbtac: true },
    { name: "Missouri", abbreviation: "MO", vr_program_type: "standard", has_cbtac: true },
    { name: "Montana", abbreviation: "MT", vr_program_type: "standard", has_cbtac: true },
    { name: "Nebraska", abbreviation: "NE", vr_program_type: "standard", has_cbtac: true },
    { name: "Nevada", abbreviation: "NV", vr_program_type: "standard", has_cbtac: true },
    { name: "New Hampshire", abbreviation: "NH", vr_program_type: "standard", has_cbtac: true },
    { name: "New Jersey", abbreviation: "NJ", vr_program_type: "standard", has_cbtac: true },
    { name: "New Mexico", abbreviation: "NM", vr_program_type: "standard", has_cbtac: true },
    { name: "New York", abbreviation: "NY", vr_program_type: "standard", has_cbtac: true },
    { name: "North Carolina", abbreviation: "NC", vr_program_type: "standard", has_cbtac: true },
    { name: "North Dakota", abbreviation: "ND", vr_program_type: "standard", has_cbtac: true },
    { name: "Ohio", abbreviation: "OH", vr_program_type: "standard", has_cbtac: true },
    { name: "Oklahoma", abbreviation: "OK", vr_program_type: "standard", has_cbtac: true },
    { name: "Oregon", abbreviation: "OR", vr_program_type: "standard", has_cbtac: true },
    { name: "Pennsylvania", abbreviation: "PA", vr_program_type: "standard", has_cbtac: true },
    { name: "Rhode Island", abbreviation: "RI", vr_program_type: "standard", has_cbtac: true },
    { name: "South Carolina", abbreviation: "SC", vr_program_type: "standard", has_cbtac: true },
    { name: "South Dakota", abbreviation: "SD", vr_program_type: "standard", has_cbtac: true },
    { name: "Tennessee", abbreviation: "TN", vr_program_type: "standard", has_cbtac: true },
    { name: "Texas", abbreviation: "TX", vr_program_type: "enhanced", has_cbtac: true },
    { name: "Utah", abbreviation: "UT", vr_program_type: "standard", has_cbtac: true },
    { name: "Vermont", abbreviation: "VT", vr_program_type: "standard", has_cbtac: true },
    { name: "Virginia", abbreviation: "VA", vr_program_type: "standard", has_cbtac: true },
    { name: "Washington", abbreviation: "WA", vr_program_type: "standard", has_cbtac: true },
    { name: "West Virginia", abbreviation: "WV", vr_program_type: "standard", has_cbtac: true },
    { name: "Wisconsin", abbreviation: "WI", vr_program_type: "standard", has_cbtac: true },
    { name: "Wyoming", abbreviation: "WY", vr_program_type: "standard", has_cbtac: true },
  ]

  for (const state of states) {
    await sql`
      INSERT INTO states (name, abbreviation, vr_program_type, has_cbtac)
      VALUES (${state.name}, ${state.abbreviation}, ${state.vr_program_type}, ${state.has_cbtac})
      ON CONFLICT (abbreviation) DO NOTHING
    `
  }

  console.log(`✅ Seeded ${states.length} states`)
}

async function seedOrganizations() {
  console.log("🏢 Seeding organizations...")

  const organizations = [
    {
      name: "VR4Deaf Platform",
      type: "ai-service",
      location: "Nationwide",
      contact_email: "admin@vr4deaf.org",
      contact_phone: "(555) 123-4567",
      google_workspace_domain: "vr4deaf.org",
      settings: {
        features: ["ai-powered", "vr-integration", "accessibility-first"],
        branding: { primary_color: "#6366f1", secondary_color: "#8b5cf6" },
      },
    },
    {
      name: "Texas VR Vendor Network",
      type: "vr-vendor",
      location: "Texas",
      contact_email: "info@txvrvendor.org",
      contact_phone: "(512) 555-0123",
      google_workspace_domain: "txvrvendor.org",
      settings: {
        features: ["vr-vendor", "milestone-tracking", "compliance"],
        state_specific: { fee_schedule: "texas", cbtac_integration: true },
      },
    },
    {
      name: "Florida CBTAC Services",
      type: "cbtac",
      location: "Florida",
      contact_email: "support@flcbtac.org",
      contact_phone: "(305) 555-0456",
      google_workspace_domain: "flcbtac.org",
      settings: {
        features: ["cbtac", "business-support", "deaf-services"],
        specializations: ["deaf-hoh", "business-development", "self-employment"],
      },
    },
  ]

  for (const org of organizations) {
    await sql`
      INSERT INTO organizations (name, type, location, contact_email, contact_phone, google_workspace_domain, settings)
      VALUES (${org.name}, ${org.type}, ${org.location}, ${org.contact_email}, ${org.contact_phone}, ${org.google_workspace_domain}, ${JSON.stringify(org.settings)})
    `
  }

  console.log(`✅ Seeded ${organizations.length} organizations`)
}

async function seedUsers() {
  console.log("👥 Seeding users...")

  // Get organization IDs
  const orgs = await sql`SELECT id, name FROM organizations`
  const vr4deafOrg = orgs.find((o) => o.name === "VR4Deaf Platform")
  const txVendorOrg = orgs.find((o) => o.name === "Texas VR Vendor Network")
  const flCbtacOrg = orgs.find((o) => o.name === "Florida CBTAC Services")

  const users = [
    {
      organization_id: vr4deafOrg.id,
      email: "admin@vr4deaf.org",
      name: "System Administrator",
      user_type: "admin",
      phone: "(555) 123-4567",
      profile_data: {
        role: "platform-admin",
        permissions: ["all"],
        specializations: ["system-management", "user-support"],
      },
    },
    {
      organization_id: txVendorOrg.id,
      email: "vendor@txvrvendor.org",
      name: "Texas VR Vendor",
      user_type: "vendor",
      phone: "(512) 555-0123",
      profile_data: {
        role: "vr-vendor",
        certifications: ["VR-certified", "CBTAC-approved"],
        specializations: ["deaf-services", "business-development"],
      },
    },
    {
      organization_id: flCbtacOrg.id,
      email: "specialist@flcbtac.org",
      name: "Florida Business Specialist",
      user_type: "specialist",
      phone: "(305) 555-0456",
      profile_data: {
        role: "business-specialist",
        certifications: ["CBTAC-certified", "ASL-fluent"],
        specializations: ["self-employment", "deaf-community"],
      },
    },
    {
      organization_id: vr4deafOrg.id,
      email: "demo.client@example.com",
      name: "Demo Client",
      user_type: "client",
      phone: "(555) 999-0001",
      profile_data: {
        role: "client",
        disability_type: "deaf-hoh",
        communication_preferences: ["ASL", "written"],
      },
    },
  ]

  for (const user of users) {
    await sql`
      INSERT INTO users (organization_id, email, name, user_type, phone, profile_data)
      VALUES (${user.organization_id}, ${user.email}, ${user.name}, ${user.user_type}, ${user.phone}, ${JSON.stringify(user.profile_data)})
    `
  }

  console.log(`✅ Seeded ${users.length} users`)
}

async function seedOpportunities() {
  console.log("💼 Seeding opportunities...")

  const opportunities = [
    {
      title: "ASL Interpreter - Remote Customer Service",
      description:
        "Remote customer service position providing ASL interpretation services for deaf and hard-of-hearing customers. Flexible schedule, competitive pay, and comprehensive benefits.",
      opportunity_type: "job",
      industry: "Customer Service",
      location: "Remote",
      remote_friendly: true,
      accessibility_features: ["ASL-primary", "video-communication", "flexible-schedule", "deaf-friendly"],
      requirements: ["ASL fluency", "Customer service experience", "Video communication skills", "Reliable internet"],
      compensation_range: "$18-25/hour",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      contact_info: { email: "hiring@aslservices.com", phone: "(555) 123-ASL1" },
      source: "VR4Deaf Network",
      match_criteria: {
        disability_types: ["deaf-hoh"],
        skills: ["ASL", "customer-service"],
        work_preferences: ["remote", "flexible"],
      },
    },
    {
      title: "Deaf-Owned Consulting Business Opportunity",
      description:
        "Start your own accessibility consulting business helping companies become more inclusive for deaf employees and customers. Comprehensive training and ongoing support provided.",
      opportunity_type: "self-employment",
      industry: "Consulting",
      location: "Nationwide",
      remote_friendly: true,
      accessibility_features: ["deaf-owned-preferred", "ASL-support", "visual-materials", "flexible-meetings"],
      requirements: ["Business interest", "Communication skills", "Willingness to learn", "Entrepreneurial spirit"],
      compensation_range: "$30,000-100,000+ annually",
      deadline: null,
      contact_info: { email: "opportunities@deafconsulting.org", website: "https://deafconsulting.org" },
      source: "Business Magician API",
      match_criteria: {
        disability_types: ["deaf-hoh"],
        interests: ["business", "consulting", "accessibility"],
        goals: ["self-employment", "entrepreneurship"],
      },
    },
    {
      title: "Accessible Web Design Freelance Projects",
      description:
        "Multiple freelance web design projects focused on creating accessible websites for deaf and disabled communities. Projects range from small business sites to large organizational platforms.",
      opportunity_type: "contract",
      industry: "Technology",
      location: "Remote",
      remote_friendly: true,
      accessibility_features: ["screen-reader-compatible", "visual-design-focus", "async-communication"],
      requirements: ["Web design experience", "Accessibility knowledge", "Portfolio of work", "Communication skills"],
      compensation_range: "$2,000-15,000 per project",
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      contact_info: { email: "projects@accessibleweb.design", portfolio_required: true },
      source: "Freelance Network",
      match_criteria: {
        skills: ["web-design", "accessibility", "technology"],
        work_preferences: ["freelance", "project-based", "remote"],
      },
    },
    {
      title: "Deaf Community Center - Social Enterprise",
      description:
        "Opportunity to establish a deaf community center that provides services, events, and business incubation for deaf entrepreneurs. Seeking passionate individuals to lead this social enterprise.",
      opportunity_type: "business",
      industry: "Community Services",
      location: "Multiple Cities Available",
      remote_friendly: false,
      accessibility_features: ["deaf-community-focused", "ASL-environment", "visual-communication", "community-impact"],
      requirements: [
        "Community leadership experience",
        "Business management skills",
        "Passion for deaf community",
        "Fundraising ability",
      ],
      compensation_range: "Revenue sharing + impact",
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      contact_info: { email: "expansion@deafcenters.org", phone: "(555) DEAF-CTR" },
      source: "Community Partners",
      match_criteria: {
        disability_types: ["deaf-hoh"],
        interests: ["community-service", "leadership", "social-impact"],
        goals: ["business-ownership", "community-impact"],
      },
    },
    {
      title: "Virtual Reality Accessibility Tester",
      description:
        "Part-time position testing VR applications and games for accessibility features for deaf and hard-of-hearing users. Help shape the future of inclusive technology.",
      opportunity_type: "job",
      industry: "Technology",
      location: "Remote",
      remote_friendly: true,
      accessibility_features: ["visual-feedback", "haptic-testing", "flexible-hours", "tech-forward"],
      requirements: [
        "Interest in technology",
        "Attention to detail",
        "Feedback skills",
        "VR experience helpful but not required",
      ],
      compensation_range: "$20-30/hour",
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
      contact_info: { email: "accessibility@vrtech.com", website: "https://vrtech.com/careers" },
      source: "Tech Partners",
      match_criteria: {
        disability_types: ["deaf-hoh", "multiple"],
        interests: ["technology", "gaming", "accessibility"],
        skills: ["testing", "feedback", "technology"],
      },
    },
  ]

  for (const opportunity of opportunities) {
    await sql`
      INSERT INTO opportunities (
        title, description, opportunity_type, industry, location, remote_friendly,
        accessibility_features, requirements, compensation_range, deadline,
        contact_info, source, match_criteria
      )
      VALUES (
        ${opportunity.title}, ${opportunity.description}, ${opportunity.opportunity_type},
        ${opportunity.industry}, ${opportunity.location}, ${opportunity.remote_friendly},
        ${opportunity.accessibility_features}, ${opportunity.requirements},
        ${opportunity.compensation_range}, ${opportunity.deadline},
        ${JSON.stringify(opportunity.contact_info)}, ${opportunity.source},
        ${JSON.stringify(opportunity.match_criteria)}
      )
    `
  }

  console.log(`✅ Seeded ${opportunities.length} opportunities`)
}

async function seedBusinessInsights() {
  console.log("💡 Seeding business insights...")

  const insights = [
    {
      request_hash: "deaf_consulting_business_2024",
      insights_data: {
        marketSize: "$2.8B (Accessibility Services Market)",
        trends: [
          "Increasing corporate focus on DEI initiatives",
          "Growing demand for ASL interpretation services",
          "Remote work driving need for digital accessibility",
          "Government compliance requirements expanding",
        ],
        opportunities: [
          "Underserved deaf business community",
          "Limited ASL-integrated consulting services",
          "Corporate training market expansion",
          "Technology accessibility consulting growth",
        ],
        competitors: [
          "General accessibility consulting firms",
          "Large HR consulting companies",
          "Specialized disability service providers",
        ],
        uniqueSellingPoints: [
          "Authentic deaf community perspective",
          "Cultural competency and ASL fluency",
          "Lived experience with accessibility challenges",
          "Deep understanding of deaf workplace needs",
        ],
        startupCosts: {
          "Business Registration & Legal": 2000,
          "Technology & Equipment": 5000,
          "Marketing & Branding": 3000,
          "Professional Development": 2000,
          "Working Capital": 8000,
        },
        revenueProjections: {
          "Year 1": 45000,
          "Year 2": 85000,
          "Year 3": 150000,
          "Year 5": 300000,
        },
        immediateActions: [
          "Complete VR eligibility assessment",
          "Develop service portfolio and pricing",
          "Build professional network in deaf community",
          "Create accessible marketing materials",
        ],
        shortTermGoals: [
          "Secure first 3 consulting clients",
          "Establish partnerships with VR agencies",
          "Develop standardized service offerings",
          "Build online presence and reputation",
        ],
        longTermVision: [
          "Become recognized leader in deaf accessibility consulting",
          "Expand team with other deaf professionals",
          "Develop training programs and certifications",
          "Create national network of deaf consultants",
        ],
        vrFundingEligible: true,
      },
      source: "business-magician",
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
    {
      request_hash: "deaf_tech_startup_2024",
      insights_data: {
        marketSize: "$13.2B (Assistive Technology Market)",
        trends: [
          "AI-powered accessibility tools growing rapidly",
          "Video communication technology advancement",
          "Mobile-first accessibility solutions",
          "Integration with mainstream platforms increasing",
        ],
        opportunities: [
          "Gap in deaf-designed technology solutions",
          "Enterprise accessibility software market",
          "Educational technology for deaf students",
          "Gaming accessibility innovations",
        ],
        competitors: [
          "Large tech companies with accessibility features",
          "Specialized assistive technology companies",
          "Open-source accessibility projects",
        ],
        uniqueSellingPoints: [
          "Deaf-led design and development",
          "User-centered accessibility approach",
          "Community-driven feature development",
          "Cultural authenticity in solutions",
        ],
        startupCosts: {
          "Technology Development": 25000,
          "Legal & IP Protection": 8000,
          "Marketing & User Acquisition": 15000,
          "Team & Contractors": 30000,
          "Operations & Infrastructure": 12000,
        },
        revenueProjections: {
          "Year 1": 75000,
          "Year 2": 250000,
          "Year 3": 750000,
          "Year 5": 2500000,
        },
        immediateActions: [
          "Validate technology concept with deaf community",
          "Develop minimum viable product (MVP)",
          "Secure initial funding through VR or grants",
          "Build technical team with accessibility expertise",
        ],
        shortTermGoals: [
          "Launch beta version with 100 users",
          "Establish partnerships with deaf organizations",
          "Secure seed funding or VR support",
          "Develop go-to-market strategy",
        ],
        longTermVision: [
          "Become leading deaf-owned tech company",
          "Expand product line to serve broader disability community",
          "Establish research and development center",
          "Create employment opportunities for deaf technologists",
        ],
        vrFundingEligible: true,
      },
      source: "business-magician",
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  ]

  for (const insight of insights) {
    await sql`
      INSERT INTO business_insights (request_hash, insights_data, source, expires_at)
      VALUES (${insight.request_hash}, ${JSON.stringify(insight.insights_data)}, ${insight.source}, ${insight.expires_at})
    `
  }

  console.log(`✅ Seeded ${insights.length} business insights`)
}

// Run the seeding
seedDatabase()
