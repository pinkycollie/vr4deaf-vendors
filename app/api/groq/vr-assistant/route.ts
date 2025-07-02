import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"
import { groqFunctions, executeGroqFunction } from "@/lib/groq/groq-functions"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are VURI, the AI assistant for VR4DEAF, a comprehensive vocational rehabilitation platform for deaf individuals. You have access to advanced functions to help with:

- VR program eligibility assessment across all 50 states
- Job matching with deaf-friendly employers
- Business viability analysis for self-employment
- Resume optimization for deaf job seekers
- VR funding calculations and applications
- Workplace accommodation recommendations
- Labor market analysis and trends
- Client outcome tracking and success prediction

Always prioritize deaf culture, ASL accessibility, and employment success. Use function calls to provide accurate, data-driven responses. Be encouraging and supportive while being informative and practical.

Context: ${context || "General VR assistance"}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.1-70b-versatile",
      tools: groqFunctions,
      tool_choice: "auto",
      temperature: 0.7,
      max_tokens: 2048,
    })

    const responseMessage = completion.choices[0]?.message

    if (!responseMessage) {
      throw new Error("No response from Groq")
    }

    // Handle function calls
    if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
      const functionResults = []

      for (const toolCall of responseMessage.tool_calls) {
        if (toolCall.type === "function") {
          try {
            const functionName = toolCall.function.name
            const functionArgs = JSON.parse(toolCall.function.arguments)

            const result = await executeGroqFunction(functionName, functionArgs)

            functionResults.push({
              id: toolCall.id,
              name: functionName,
              result: result,
            })
          } catch (error) {
            console.error(`Error executing function ${toolCall.function.name}:`, error)
            functionResults.push({
              id: toolCall.id,
              name: toolCall.function.name,
              error: "Function execution failed",
            })
          }
        }
      }

      // Generate final response with function results
      const finalCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are VURI, the AI assistant for VR4DEAF. Based on the function results provided, give a comprehensive and helpful response to the user. Format the information clearly and provide actionable next steps.`,
          },
          {
            role: "user",
            content: message,
          },
          {
            role: "assistant",
            content: responseMessage.content || "I'll help you with that using my VR4DEAF functions.",
            tool_calls: responseMessage.tool_calls,
          },
          {
            role: "tool",
            content: JSON.stringify(functionResults),
            tool_call_id: responseMessage.tool_calls[0].id,
          },
        ],
        model: "llama-3.1-70b-versatile",
        temperature: 0.7,
        max_tokens: 2048,
      })

      return NextResponse.json({
        response:
          finalCompletion.choices[0]?.message?.content ||
          "I apologize, but I encountered an issue processing your request.",
        functionCalls: functionResults,
        usage: finalCompletion.usage,
      })
    }

    return NextResponse.json({
      response: responseMessage.content || "I apologize, but I encountered an issue processing your request.",
      usage: completion.usage,
    })
  } catch (error) {
    console.error("Groq API error:", error)
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
