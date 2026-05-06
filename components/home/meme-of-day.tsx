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
        await navigator.share({ title: "Jy Alweer?", text: caption, url: meme.facebook_link || window.location.href })
      } catch {
        // cancelled
      }
    }
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--ink)" }}>
      {/* Lime accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--lime)" }} />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy side */}
          <div className="space-y-6 animate-slide-left">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold"
              style={{ background: "var(--lime)", color: "var(--ink)" }}
            >
              <span>😂</span>
              <span>{t("home.meme.title")}</span>
            </div>

            <p
              className="font-display text-4xl font-black leading-tight md:text-5xl"
              style={{ color: "var(--ink-foreground)" }}
            >
              {caption}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {meme.facebook_link && (
                <a href={meme.facebook_link} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    className="gap-2 border-white/20 text-white hover:bg-white/10"
                    variant="outline"
                    style={{ background: "transparent", borderColor: "rgba(255,255,255,0.2)", color: "var(--ink-foreground)" }}
                  >
                    <Facebook className="h-4 w-4" />
                    {t("memes.facebook")}
                  </Button>
                </a>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="gap-2"
                onClick={handleShare}
                style={{ color: "var(--ink-foreground)" }}
              >
                <Share2 className="h-4 w-4" />
                {t("memes.share")}
              </Button>
            </div>
          </div>

          {/* Image side */}
          <div className="animate-slide-right">
            <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl">
              <div
                className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
              />
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
    </section>
  )
}
