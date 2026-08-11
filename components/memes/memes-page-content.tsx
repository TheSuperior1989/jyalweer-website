"use client"

import { useLanguage } from "@/lib/language-context"
import { MemesGallery } from "@/components/memes/memes-gallery"
import { FacebookFeed } from "@/components/memes/facebook-feed"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/brand/page-header"
import type { Meme } from "@/lib/types"

interface MemesPageContentProps {
  memes: Meme[]
}

export function MemesPageContent({ memes }: MemesPageContentProps) {
  const { language } = useLanguage()
  const af = language === "af"

  return (
    <>
      <PageHeader
        variant="band"
        kicker="😂 Memes"
        title={af ? "Memes Galery" : "Memes Gallery"}
        subtitle={
          af
            ? "Geniet die nuutste memes van die Jy Alweer? Facebook-bladsy"
            : "Enjoy the latest memes from the Jy Alweer? Facebook page"
        }
      />

      <div className="page-shell">
        <Tabs defaultValue="facebook" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 h-11 rounded-xl bg-muted p-1">
            <TabsTrigger value="facebook" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {af ? "Facebook-voer" : "Live Facebook Feed"}
            </TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {af ? "Gestoorde Galery" : "Saved Gallery"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="facebook" className="mt-8">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground max-w-2xl">
                {af
                  ? "Hierdie voer wys die nuutste plasings direk van die Jy Alweer? Facebook-bladsy. Altyd op datum met die varsste memes! 🔥"
                  : "This feed shows the latest posts directly from the Jy Alweer? Facebook page. Always up-to-date with the freshest memes! 🔥"}
              </p>
              <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-2 shadow-sm">
                <FacebookFeed />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-8">
            <MemesGallery memes={memes} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
