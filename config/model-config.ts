import type { FallbackConfig, ModelConfig } from "../lib/model-fallback"

// Define available models
export const availableModels: Record<string, ModelConfig> = {
  // OpenAI models
  gpt4o: {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 15000,
    costPerToken: 0.01,
  },
  gpt4o_mini: {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "openai",
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 10000,
    costPerToken: 0.005,
  },
  gpt35turbo: {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 8000,
    costPerToken: 0.0015,
  },

  // Anthropic models
  claude3opus: {
    id: "claude-3-opus-20240229",
    name: "Claude 3 Opus",
    provider: "anthropic",
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 20000,
    costPerToken: 0.015,
  },
  claude3sonnet: {
    id: "claude-3-sonnet-20240229",
    name: "Claude 3 Sonnet",
    provider: "anthropic",
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 15000,
    costPerToken: 0.008,
  },
  claude3haiku: {
    id: "claude-3-haiku-20240307",
    name: "Claude 3 Haiku",
    provider: "anthropic",
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 10000,
    costPerToken: 0.0025,
  },

  // Mistral models
  mistral_large: {
    id: "mistral-large-latest",
    name: "Mistral Large",
    provider: "mistral",
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 12000,
    costPerToken: 0.008,
  },
  mistral_medium: {
    id: "mistral-medium-latest",
    name: "Mistral Medium",
    provider: "mistral",
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 10000,
    costPerToken: 0.003,
  },
  mistral_small: {
    id: "mistral-small-latest",
    name: "Mistral Small",
    provider: "mistral",
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 8000,
    costPerToken: 0.0015,
  },

  // Local Llama model (fallback)
  llama3_70b: {
    id: "llama-3-70b",
    name: "Llama 3 (70B)",
    provider: "llama",
    endpoint: "http://localhost:8000/v1/chat/completions",
    maxTokens: 4096,
    temperature: 0.7,
    timeout: 30000,
    costPerToken: 0.0001, // Very low cost since it's local
  },
}

// Define fallback configurations for different use cases
export const fallbackConfigs: Record<string, FallbackConfig> = {
  // High-quality content generation with fallbacks
  contentGeneration: {
    models: [
      availableModels.claude3opus,
      availableModels.gpt4o,
      availableModels.claude3sonnet,
      availableModels.mistral_large,
      availableModels.llama3_70b,
    ],
    maxAttempts: 3,
    timeout: 30000,
    strategy: "capability-optimized",
    logFallbacks: true,
  },

  // Cost-optimized configuration
  costOptimized: {
    models: [
      availableModels.mistral_small,
      availableModels.gpt35turbo,
      availableModels.claude3haiku,
      availableModels.llama3_70b,
    ],
    maxAttempts: 4,
    timeout: 20000,
    strategy: "cost-optimized",
    logFallbacks: true,
  },

  // Accessibility-focused configuration
  accessibilityFocused: {
    models: [
      availableModels.claude3opus, // Best for nuanced understanding of accessibility needs
      availableModels.gpt4o,
      availableModels.claude3sonnet,
      availableModels.mistral_large,
      availableModels.llama3_70b,
    ],
    maxAttempts: 3,
    timeout: 25000,
    strategy: "capability-optimized",
    logFallbacks: true,
  },

  // Code generation configuration
  codeGeneration: {
    models: [
      availableModels.gpt4o, // Best for code
      availableModels.claude3opus,
      availableModels.mistral_large,
      availableModels.claude3sonnet,
      availableModels.llama3_70b,
    ],
    maxAttempts: 3,
    timeout: 25000,
    strategy: "capability-optimized",
    logFallbacks: true,
  },

  // Fast response configuration
  fastResponse: {
    models: [
      availableModels.claude3haiku,
      availableModels.gpt35turbo,
      availableModels.mistral_small,
      availableModels.llama3_70b,
    ],
    maxAttempts: 2,
    timeout: 10000,
    strategy: "sequential",
    logFallbacks: true,
  },
}
