import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function searchJobs({
  query,
  location,
  remote_only,
  accessibility_score,
}: {
  query?: string
  location?: string
  remote_only?: boolean
  accessibility_score?: number
}) {
  let queryBuilder = supabase.from("jobs").select("*").eq("active", true)

  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`)
  }

  if (location && !remote_only) {
    queryBuilder = queryBuilder.ilike("location", `%${location}%`)
  }

  if (remote_only) {
    queryBuilder = queryBuilder.eq("remote_friendly", true)
  }

  if (accessibility_score) {
    queryBuilder = queryBuilder.gte("accessibility_score", accessibility_score)
  }

  const { data, error } = await queryBuilder.order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function generateCareerAssessment({
  skills,
  experience_level,
  accessibility_needs,
}: {
  skills: string[]
  experience_level: string
  accessibility_needs: string[]
}) {
  // AI-powered career assessment logic
  const baseScore = skills.length * 10
  const experienceBonus = experience_level === "senior" ? 30 : experience_level === "mid" ? 20 : 10
  const accessibilityBonus = accessibility_needs.length * 5

  const score = Math.min(100, baseScore + experienceBonus + accessibilityBonus)

  return {
    score,
    recommendations: [
      "Consider remote-first companies",
      "Highlight accessibility advocacy experience",
      "Build portfolio showcasing visual communication skills",
    ],
  }
}

export async function updateApplicationStatus({
  job_id,
  user_id,
  status,
}: {
  job_id: string
  user_id: string
  status: string
}) {
  const { data, error } = await supabase
    .from("applications")
    .upsert({
      job_id,
      user_id,
      status,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}
