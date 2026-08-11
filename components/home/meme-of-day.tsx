"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Facebook, Share2 } from "lucide-react"
import type { Meme } from "@/lib/types"

interface MemeOfDayProps {
  meme: Meme | null
}

export function MemeOfDay({ meme }: MemeOfDayProps) {
  const { language, t } = useLanguage()

  if (!meme) return null

  const caption = language === "af" ? meme.caption_af : meme.caption

  const handleShare = async () => {
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

  return (
    <section className="relative overflow-hidden py-20 md:py-28 section-ink">
      {/* Decorative diamond outlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-12 h-24 w-24 rotate-45 border border-dashed border-white/10 hidden md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-10 bottom-16 h-16 w-16 rotate-45 border border-white/8 hidden md:block"
      />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6 animate-slide-left">
            <div className="inline-flex items-center gap-2 rounded-full badge-punch px-4 py-1.5 text-sm">
              <span>😂</span>
              <span>{t("home.meme.title")}</span>
            </div>

            <p className="font-display text-4xl font-black leading-tight md:text-5xl text-white">
              {caption}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {meme.facebook_link && (
                <a href={meme.facebook_link} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2 border-dashed"
                  >
                    <Facebook className="h-4 w-4" />
                    {t("memes.facebook")}
                  </Button>
                </a>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="gap-2 text-white/80 hover:text-white hover:bg-white/10"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                {t("memes.share")}
              </Button>
            </div>
          </div>

          <div className="animate-slide-right">
            <div className="relative">
              {/* Diamond-inspired frame */}
              <div
                aria-hidden
                className="absolute -inset-3 border border-dashed border-white/15 rounded-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl neon-glow">
                <Image
                  src={meme.image_url || "/placeholder.svg"}
                  alt={caption}
                  width={600}
                  height={600}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
