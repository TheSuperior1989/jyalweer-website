"use client"

import { useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Facebook, Share2, Star, X } from "lucide-react"
import type { Meme } from "@/lib/types"

interface MemesGalleryProps {
  memes: Meme[]
}

export function MemesGallery({ memes }: MemesGalleryProps) {
  const { language, t } = useLanguage()
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null)

  const handleShare = async (meme: Meme) => {
    const caption = language === "af" ? meme.caption_af : meme.caption
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Jy Alweer?",
          text: caption,
          url: meme.facebook_link || window.location.href,
        })
      } catch {
        // User cancelled or share failed
      }
    }
  }

  if (memes.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-lg text-muted-foreground">
          {language === "af" ? "Geen memes gevind nie" : "No memes found"}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
          {t("memes.title")}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {language === "af"
            ? "Geniet Suid-Afrika se snaakste memes. Deel dit met jou vriende!"
            : "Enjoy South Africa's funniest memes. Share them with your friends!"}
        </p>
      </div>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {memes.map((meme) => {
          const caption = language === "af" ? meme.caption_af : meme.caption

          return (
            <Card
              key={meme.id}
              className="mb-6 break-inside-avoid cursor-pointer overflow-hidden border-border bg-card transition-all hover:shadow-lg"
              onClick={() => setSelectedMeme(meme)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={meme.image_url || "/placeholder.svg"}
                    alt={caption}
                    width={400}
                    height={400}
                    className="w-full object-cover"
                  />
                  {meme.is_featured && (
                    <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
                      <Star className="mr-1 h-3 w-3" />
                      {language === "af" ? "Uitgelig" : "Featured"}
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-medium text-foreground line-clamp-2">{caption}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={!!selectedMeme} onOpenChange={() => setSelectedMeme(null)}>
        <DialogContent className="max-w-2xl bg-card">
          <DialogHeader>
            <DialogTitle className="sr-only">Meme</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setSelectedMeme(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          {selectedMeme && (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={selectedMeme.image_url || "/placeholder.svg"}
                  alt={language === "af" ? selectedMeme.caption_af : selectedMeme.caption}
                  width={600}
                  height={600}
                  className="w-full object-cover"
                />
              </div>
              <p className="text-center font-serif text-xl font-medium text-foreground">
                {language === "af" ? selectedMeme.caption_af : selectedMeme.caption}
              </p>
              <div className="flex items-center justify-center gap-4">
                {selectedMeme.facebook_link && (
                  <a href={selectedMeme.facebook_link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Facebook className="h-4 w-4" />
                      {t("memes.facebook")}
                    </Button>
                  </a>
                )}
                <Button variant="ghost" className="gap-2" onClick={() => handleShare(selectedMeme)}>
                  <Share2 className="h-4 w-4" />
                  {t("memes.share")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
