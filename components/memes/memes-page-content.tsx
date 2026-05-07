"use client"

import { useLanguage } from "@/lib/language-context"
import { MemesGallery } from "@/components/memes/memes-gallery"
import { FacebookFeed } from "@/components/memes/facebook-feed"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Meme } from "@/lib/types"

interface MemesPageContentProps {
  memes: Meme[]
}

export function MemesPageContent({ memes }: MemesPageContentProps) {
  const { language } = useLanguage()
  const af = language === "af"

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {af ? "Memes Galery" : "Memes Gallery"}
        </h1>
        <p className="text-muted-foreground">
          {af
            ? "Geniet die nuutste memes van die Jy Alweer? Facebook-bladsy"
            : "Enjoy the latest memes from the Jy Alweer? Facebook page"}
        </p>
      </div>

      <Tabs defaultValue="facebook" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="facebook">
            {af ? "Facebook-voer" : "Live Facebook Feed"}
          </TabsTrigger>
          <TabsTrigger value="gallery">
            {af ? "Gestoorde Galery" : "Saved Gallery"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="facebook" className="mt-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {af
                ? "Hierdie voer wys die nuutste plasings direk van die Jy Alweer? Facebook-bladsy. Altyd op datum met die varsste memes! 🔥"
                : "This feed shows the latest posts directly from the Jy Alweer? Facebook page. Always up-to-date with the freshest memes! 🔥"}
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
