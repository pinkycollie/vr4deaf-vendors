// Define types for model configuration
export type ModelConfig = {
  id: string
  name: string
  provider: string
  apiKey?: string
  endpoint?: string
  maxTokens?: number
  temperature?: number
  timeout?: number // in milliseconds
  costPerToken?: number // for cost optimization
}

// Define types for fallback configuration
export type FallbackConfig = {
  models: ModelConfig[]
  maxAttempts?: number
  timeout?: number // overall timeout
  strategy?: "sequential" | "cost-optimized" | "capability-optimized"
  logFallbacks?: boolean
}

// Define types for model response
export type ModelResponse = {
  text: string
  usage?: {
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
  }
  model: string
  fallbacksTriggered?: string[]
}

// Error types for different failure scenarios
export class ModelTimeoutError extends Error {
  constructor(modelId: string) {
    super(`Model ${modelId} timed out`)
    this.name = "ModelTimeoutError"
  }
}

export class ModelQuotaError extends Error {
  constructor(modelId: string) {
    super(`Quota exceeded for model ${modelId}`)
    this.name = "ModelQuotaError"
  }
}

export class ModelUnavailableError extends Error {
  constructor(modelId: string) {
    super(`Model ${modelId} is unavailable`)
    this.name = "ModelUnavailableError"
  }
}

// Main fallback handler function
export async function withFallbacks<T extends Record<string, any>>(
  prompt: string,
  params: T,
  config: FallbackConfig,
  modelHandler: (model: ModelConfig, prompt: string, params: T) => Promise<string>,
): Promise<ModelResponse> {
  const maxAttempts = config.maxAttempts || config.models.length
  const fallbacksTriggered: string[] = []
  let lastError: Error | null = null

  // Sort models based on strategy
  const modelsToTry = [...config.models]
  if (config.strategy === "cost-optimized") {
    modelsToTry.sort((a, b) => (a.costPerToken || 0) - (b.costPerToken || 0))
  }

  // Create a promise that rejects after the overall timeout
  const timeoutPromise = new Promise<never>((_, reject) => {
    if (config.timeout) {
      setTimeout(() => reject(new Error("Overall fallback timeout exceeded")), config.timeout)
    }
  })

  // Try each model in sequence until one succeeds or we run out of attempts
  for (let attempt = 0; attempt < Math.min(maxAttempts, modelsToTry.length); attempt++) {
    const model = modelsToTry[attempt]

    try {
      // Race the model request against its individual timeout
      const modelPromise = modelHandler(model, prompt, params)
      const result = await Promise.race([
        modelPromise,
        timeoutPromise,
        new Promise<never>((_, reject) => {
          if (model.timeout) {
            setTimeout(() => reject(new ModelTimeoutError(model.id)), model.timeout)
          }
        }),
      ])

      // If we get here, the model succeeded
      return {
        text: result,
        model: model.id,
        fallbacksTriggered: fallbacksTriggered.length > 0 ? fallbacksTriggered : undefined,
      }
    } catch (error) {
      // Log the fallback if configured
      if (config.logFallbacks) {
        console.log(`Fallback triggered: ${model.id} -> ${modelsToTry[attempt + 1]?.id || "none"}`, error)
      }

      // Add to fallbacks triggered
      fallbacksTriggered.push(model.id)
      lastError = error as Error

      // Determine if we should continue trying
      if (
        error instanceof ModelTimeoutError ||
        error instanceof ModelQuotaError ||
        error instanceof ModelUnavailableError
      ) {
        // These are recoverable errors, continue to next model
        continue
      } else if (error instanceof Error && error.message === "Overall fallback timeout exceeded") {
        // Overall timeout exceeded, stop trying
        throw error
      } else {
        // For other errors, check if they seem recoverable
        const errorMessage = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase()
        const isRecoverable =
          errorMessage.includes("timeout") ||
          errorMessage.includes("rate limit") ||
          errorMessage.includes("quota") ||
          errorMessage.includes("capacity") ||
          errorMessage.includes("overloaded") ||
          errorMessage.includes("unavailable")

        if (!isRecoverable) {
          // Non-recoverable error, stop trying
          throw error
        }
        // Otherwise continue to next model
      }
    }
  }

  // If we get here, all models failed
  throw new Error(
    `All models failed after ${fallbacksTriggered.length} attempts. Last error: ${
      lastError?.message || "Unknown error"
    }`,
  )
}
