"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Facebook, Share2, Star, Search, X } from "lucide-react"
import type { Meme } from "@/lib/types"

interface MemesGalleryProps {
  memes: Meme[]
}

export function MemesGallery({ memes }: MemesGalleryProps) {
  const { language, t } = useLanguage()
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return memes
    const q = query.toLowerCase()
    return memes.filter((m) => {
      const af = m.caption_af?.toLowerCase() || ""
      const en = m.caption?.toLowerCase() || ""
      return af.includes(q) || en.includes(q)
    })
  }, [memes, query])

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
        // cancelled
      }
    }
  }

  if (memes.length === 0) {
    return (
      <div className="py-32 text-center space-y-4">
        <p className="text-6xl">😅</p>
        <p className="font-display text-xl font-bold text-foreground">
          {language === "af" ? "Nog geen memes nie..." : "No memes yet..."}
        </p>
        <p className="text-muted-foreground">
          {language === "af" ? "Kom later terug — ons is besig om te lag." : "Check back later — we're busy laughing."}
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {language === "af" ? "Ons versameling" : "Our collection"}
            </p>
            <h1 className="font-display text-4xl font-black tracking-tight text-foreground md:text-5xl">
              {t("memes.title")}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {filtered.length} meme{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search */}
        <div className="mt-6 relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={language === "af" ? "Soek memes..." : "Search memes..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 h-11"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <p className="text-4xl">🔍</p>
          <p className="font-display text-lg font-bold text-foreground">
            {language === "af" ? `Geen resultate vir "${query}"` : `No results for "${query}"`}
          </p>
          <Button variant="ghost" onClick={() => setQuery("")} className="gap-1">
            <X className="h-3 w-3" />
            {language === "af" ? "Maak soek skoon" : "Clear search"}
          </Button>
        </div>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((meme, i) => {
            const caption = language === "af" ? meme.caption_af : meme.caption
            return (
              <div
                key={meme.id}
                className="mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-xl border border-border bg-card card-lift group"
                onClick={() => setSelectedMeme(meme)}
                style={{ animationDelay: `${(i % 9) * 50}ms` }}
              >
                <div className="relative">
                  <Image
                    src={meme.image_url || "/placeholder.svg"}
                    alt={caption}
                    width={400}
                    height={400}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  {meme.is_featured && (
                    <Badge
                      className="absolute left-3 top-3 badge-lime gap-1"
                    >
                      <Star className="h-3 w-3 fill-current" />
                      {language === "af" ? "Uitgelig" : "Featured"}
                    </Badge>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 p-4">
                    <div className="flex gap-2">
                      {meme.facebook_link && (
                        <a
                          href={meme.facebook_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 transition-colors"
                          aria-label="View on Facebook"
                        >
                          <Facebook className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleShare(meme) }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 transition-colors"
                        aria-label="Share"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground line-clamp-2">{caption}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={!!selectedMeme} onOpenChange={() => setSelectedMeme(null)}>
        <DialogContent className="max-w-2xl bg-card p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Meme</DialogTitle>
          </DialogHeader>
          {selectedMeme && (
            <>
              <div className="relative">
                <Image
                  src={selectedMeme.image_url || "/placeholder.svg"}
                  alt={language === "af" ? selectedMeme.caption_af : selectedMeme.caption}
                  width={700}
                  height={700}
                  className="w-full object-cover"
                />
              </div>
              <div className="space-y-4 p-6">
                <p className="font-display text-xl font-bold text-foreground text-center">
                  {language === "af" ? selectedMeme.caption_af : selectedMeme.caption}
                </p>
                <div className="flex items-center justify-center gap-3">
                  {selectedMeme.facebook_link && (
                    <a href={selectedMeme.facebook_link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Facebook className="h-4 w-4" />
                        {t("memes.facebook")}
                      </Button>
                    </a>
                  )}
                  <Button
                    variant="ghost"
                    className="gap-2"
                    onClick={() => handleShare(selectedMeme)}
                  >
                    <Share2 className="h-4 w-4" />
                    {t("memes.share")}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
