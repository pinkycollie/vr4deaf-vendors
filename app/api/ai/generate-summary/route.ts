import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { personalInfo, targetRole, experience } = await request.json()

    const prompt = `Create a compelling professional summary for a deaf job seeker applying for a ${targetRole} position. 

Personal Information:
- Name: ${personalInfo.name}
- Location: ${personalInfo.location}
- Experience Level: ${experience?.length || 0} years

Key Requirements:
- Highlight strengths and achievements
- Emphasize communication skills and adaptability
- Include deaf community strengths (visual thinking, attention to detail, etc.)
- Make it ATS-friendly with relevant keywords
- Keep it concise (3-4 sentences)
- Professional and confident tone

Generate a professional summary that showcases their value to employers while being authentic to the deaf experience.`

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer specializing in creating compelling professional summaries for deaf job seekers. Focus on strengths, achievements, and the unique value deaf professionals bring to the workplace.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 300,
    })

    const summary = completion.choices[0]?.message?.content

    if (!summary) {
      throw new Error("No summary generated")
    }

    return NextResponse.json({
      summary: summary.trim(),
      usage: completion.usage,
    })
  } catch (error) {
    console.error("Summary generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate summary",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
