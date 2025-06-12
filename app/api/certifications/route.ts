import { type NextRequest, NextResponse } from "next/server"

// Mock certification data
const certifications = [
  {
    id: "CERT-001",
    vendorId: "VENDOR-001",
    name: "ASL Interpreter Certification",
    category: "Language Services",
    level: "Professional",
    issuingBody: "Registry of Interpreters for the Deaf (RID)",
    certificationNumber: "RID-2024-001234",
    issueDate: "2022-01-15",
    expiryDate: "2026-01-15",
    status: "active",
    renewalRequired: true,
    renewalPeriod: "4 years",
    ceuRequired: 80,
    ceuCompleted: 65,
    lastRenewal: "2022-01-15",
    nextRenewal: "2026-01-15",
    priority: "high",
    required: true,
    documents: ["rid-certificate.pdf", "ceu-transcript.pdf"],
    createdAt: "2022-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  // Add more certifications...
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const vendorId = searchParams.get("vendorId")
  const status = searchParams.get("status")
  const category = searchParams.get("category")

  let filteredCertifications = certifications

  if (vendorId) {
    filteredCertifications = filteredCertifications.filter((cert) => cert.vendorId === vendorId)
  }

  if (status) {
    filteredCertifications = filteredCertifications.filter((cert) => cert.status === status)
  }

  if (category) {
    filteredCertifications = filteredCertifications.filter((cert) => cert.category === category)
  }

  return NextResponse.json({
    success: true,
    data: filteredCertifications,
    total: filteredCertifications.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newCertification = {
      id: `CERT-${Date.now()}`,
      vendorId: body.vendorId,
      name: body.name,
      category: body.category,
      level: body.level || "Professional",
      issuingBody: body.issuingBody,
      certificationNumber: body.certificationNumber,
      issueDate: body.issueDate,
      expiryDate: body.expiryDate,
      status: "pending",
      renewalRequired: body.renewalRequired || true,
      renewalPeriod: body.renewalPeriod,
      ceuRequired: body.ceuRequired || 0,
      ceuCompleted: 0,
      lastRenewal: body.issueDate,
      nextRenewal: body.expiryDate,
      priority: body.priority || "medium",
      required: body.required || false,
      documents: body.documents || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In a real app, save to database
    certifications.push(newCertification)

    return NextResponse.json({
      success: true,
      data: newCertification,
      message: "Certification added successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add certification",
      },
      { status: 500 },
    )
  }
}
