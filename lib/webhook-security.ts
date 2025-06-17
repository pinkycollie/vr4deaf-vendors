import crypto from "crypto"

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
  algorithm = "sha256",
): boolean {
  try {
    // Create expected signature
    const expectedSignature = crypto.createHmac(algorithm, secret).update(payload, "utf8").digest("hex")

    // Compare signatures (timing-safe comparison)
    const expectedBuffer = Buffer.from(`${algorithm}=${expectedSignature}`, "utf8")
    const actualBuffer = Buffer.from(signature, "utf8")

    return expectedBuffer.length === actualBuffer.length && crypto.timingSafeEqual(expectedBuffer, actualBuffer)
  } catch (error) {
    console.error("Signature verification error:", error)
    return false
  }
}

export function extractSignatureFromHeader(signatureHeader: string): string | null {
  // Handle different signature header formats
  // WrapifAI might send: "sha256=abc123" or just "abc123"
  if (signatureHeader.includes("=")) {
    return signatureHeader
  }
  return `sha256=${signatureHeader}`
}

// Store signing keys securely (in production, use environment variables or secure storage)
const signingKeys: Record<string, string> = {}

export function setSigningKey(toolId: string, key: string): void {
  signingKeys[toolId] = key
}

export function getSigningKey(toolId: string): string | undefined {
  return signingKeys[toolId] || process.env[`WEBHOOK_SIGNING_KEY_${toolId.toUpperCase().replace(/-/g, "_")}`]
}
