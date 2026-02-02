"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Facebook, Share2 } from "lucide-react"
import type { Meme } from "@/lib/types"

interface MemeOfDayProps {
  meme: Meme | null
}

export function MemeOfDay({ meme }: MemeOfDayProps) {
  const { language, t } = useLanguage()

  if (!meme) {
    return null
  }

  const caption = language === "af" ? meme.caption_af : meme.caption

  return (
    <section className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{t("home.meme.title")}</h2>
        </div>

        <Card className="mx-auto max-w-2xl overflow-hidden border-border bg-card">
          <CardContent className="p-0">
            <div className="relative aspect-square">
              <Image src={meme.image_url || "/placeholder.svg"} alt={caption} fill className="object-cover" />
            </div>
            <div className="space-y-4 p-6">
              <p className="text-center font-serif text-xl font-medium text-foreground md:text-2xl">{caption}</p>

              <div className="flex items-center justify-center gap-4">
                {meme.facebook_link && (
                  <a href={meme.facebook_link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Facebook className="h-4 w-4" />
                      {t("memes.facebook")}
                    </Button>
                  </a>
                )}
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  {t("memes.share")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
