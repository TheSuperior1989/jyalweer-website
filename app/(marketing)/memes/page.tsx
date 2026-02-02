import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { MemesGallery } from "@/components/memes/memes-gallery"
import type { Meme } from "@/lib/types"

export const metadata: Metadata = {
  title: "Memes Gallery | Jy Alweer?",
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
  } catch (e) {
    // Table might not exist yet
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <MemesGallery memes={memes} />
    </div>
  )
}
