import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { MemesPageContent } from "@/components/memes/memes-page-content"
import type { Meme } from "@/lib/types"

export const metadata: Metadata = {
  title: "Memes",
  description: "Blaai deur ons versameling van die snaakste Suid-Afrikaanse memes",
}

export default async function MemesPage() {
  const supabase = await createClient()
  let memes: Meme[] = []

  try {
    const { data: memesData, error } = await supabase
      .from("memes")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (!error) {
      memes = (memesData as Meme[]) || []
    }
  } catch {
    // Table might not exist yet
  }

  return <MemesPageContent memes={memes} />
}
