import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { MemesGallery } from "@/components/memes/memes-gallery"
import { FacebookFeed } from "@/components/memes/facebook-feed"
import type { Meme } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Memes Gallery</h1>
        <p className="text-muted-foreground">
          Enjoy the latest memes from Jy Alweer? Facebook page
        </p>
      </div>

      <Tabs defaultValue="facebook" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="facebook">Live Facebook Feed</TabsTrigger>
          <TabsTrigger value="gallery">Saved Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="facebook" className="mt-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This feed shows the latest posts directly from the Jy Alweer? Facebook page.
              Always up-to-date with the freshest memes! 🔥
            </p>
            <div className="w-full">
              <FacebookFeed />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <MemesGallery memes={memes} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
