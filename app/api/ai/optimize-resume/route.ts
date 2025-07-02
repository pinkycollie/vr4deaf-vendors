import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { resumeData, targetRole, industry } = await request.json()

    const prompt = `Optimize this resume for a deaf job seeker applying for ${targetRole} positions in the ${industry} industry.

Current Resume Data:
${JSON.stringify(resumeData, null, 2)}

Optimization Requirements:
1. Enhance job descriptions with action verbs and quantified achievements
2. Add relevant keywords for ATS optimization
3. Highlight transferable skills and deaf community strengths
4. Improve formatting and structure suggestions
5. Suggest accommodation statement if appropriate
6. Ensure professional language throughout
7. Focus on results and impact

Provide specific suggestions for improvement and enhanced content.`

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume optimization specialist with deep knowledge of ATS systems, deaf employment best practices, and industry-specific requirements. Provide actionable, specific improvements.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 0.6,
      max_tokens: 1500,
    })

    const optimization = completion.choices[0]?.message?.content

    if (!optimization) {
      throw new Error("No optimization generated")
    }

    return NextResponse.json({
      optimization: optimization.trim(),
      usage: completion.usage,
    })
  } catch (error) {
    console.error("Resume optimization error:", error)
    return NextResponse.json(
      {
        error: "Failed to optimize resume",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
