interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory rate limiting (use Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>()

export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
  keyGenerator?: (ip: string, toolId?: string) => string
}

export class RateLimiter {
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = {
      keyGenerator: (ip: string, toolId?: string) => (toolId ? `${ip}:${toolId}` : ip),
      ...config,
    }
  }

  async checkLimit(
    ip: string,
    toolId?: string,
  ): Promise<{
    allowed: boolean
    remaining: number
    resetTime: number
    totalHits: number
  }> {
    const key = this.config.keyGenerator!(ip, toolId)
    const now = Date.now()
    const windowStart = now - this.config.windowMs

    // Clean up expired entries
    this.cleanup(windowStart)

    let entry = rateLimitStore.get(key)

    if (!entry || entry.resetTime <= now) {
      // Create new entry or reset expired one
      entry = {
        count: 1,
        resetTime: now + this.config.windowMs,
      }
      rateLimitStore.set(key, entry)

      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: entry.resetTime,
        totalHits: 1,
      }
    }

    // Increment existing entry
    entry.count++
    const allowed = entry.count <= this.config.maxRequests
    const remaining = Math.max(0, this.config.maxRequests - entry.count)

    return {
      allowed,
      remaining,
      resetTime: entry.resetTime,
      totalHits: entry.count,
    }
  }

  private cleanup(windowStart: number): void {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetTime <= windowStart) {
        rateLimitStore.delete(key)
      }
    }
  }

  static createWebhookLimiter(): RateLimiter {
    return new RateLimiter({
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 100, // 100 requests per minute per IP per tool
    })
  }

  static createGlobalLimiter(): RateLimiter {
    return new RateLimiter({
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 500, // 500 requests per minute per IP globally
      keyGenerator: (ip: string) => ip,
    })
  }
}
