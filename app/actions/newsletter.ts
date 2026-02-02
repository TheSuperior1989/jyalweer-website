"use server"

import { createClient } from "@/lib/supabase/server"

export async function subscribeToNewsletter(email: string, language: "af" | "en") {
  const supabase = await createClient()

  const { error } = await supabase.from("email_subscribers").insert({
    email,
    language_preference: language,
  })

  if (error) {
    if (error.code === "23505") {
      // Duplicate email - treat as success
      return { success: true }
    }
    return { success: false, error: error.message }
  }

  return { success: true }
}
