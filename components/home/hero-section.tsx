"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Zap } from "lucide-react"
import type { Meme, Product } from "@/lib/types"

interface HeroSectionProps {
  memeOfDay?: Meme | null
  featuredProduct?: Product | null
}

export function HeroSection({ memeOfDay, featuredProduct }: HeroSectionProps) {
  const { t, language } = useLanguage()
  const af = language === "af"

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />

      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--lime)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-20 h-64 w-64 rounded-full opacity-15 blur-2xl"
        style={{ background: "var(--terra)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-32 lg:py-40">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left: copy */}
          <div className="space-y-8">
            {/* Pill badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <Zap className="h-3.5 w-3.5 fill-primary text-primary animate-sparkle" />
              <span>Nuwe items elke week · New drops weekly</span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up delay-100 font-display text-5xl font-black leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-8xl">
              <span className="block">Jy</span>
              <span
                className="block relative"
                style={{ WebkitTextStroke: "2px var(--foreground)", color: "transparent" }}
              >
                Alweer?
                {/* Lime underline squiggle */}
                <svg
                  aria-hidden
                  viewBox="0 0 300 18"
                  className="absolute -bottom-2 left-0 w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12 C 30 4, 60 18, 90 10 S 150 2, 180 10 S 240 18, 270 10 S 295 4, 298 8"
                    stroke="var(--lime)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Sub */}
            <p className="animate-fade-up delay-200 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t("home.hero.subtitle")}
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-300 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-foreground text-background hover:bg-foreground/90 font-bold text-base px-8"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {t("home.hero.cta")}
                </Button>
              </Link>
              <Link href="/memes">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 font-semibold text-base px-8 bg-transparent border-2"
                >
                  {t("home.hero.browse")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="animate-fade-up delay-400 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="text-base">😂</span>
                <span className="font-medium text-foreground">50k+</span>
                <span>{af ? "volgelinge op Facebook" : "followers on Facebook"}</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="text-base">🇿🇦</span>
                <span>{af ? "100% Suid-Afrikaans" : "100% South African"}</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="text-base">🚚</span>
                <span>{af ? "Gratis versending oor R1000" : "Free shipping over R1000"}</span>
              </div>
            </div>
          </div>

          {/* Right: floating logo + decoration */}
          <div className="relative flex items-center justify-center">
            <div className="relative h-80 w-80 md:h-[420px] md:w-[420px]">
              {/* Rotating ring */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full border-2 border-dashed animate-spin-slow"
                style={{ borderColor: "var(--lime)", opacity: 0.5 }}
              />
              {/* Lime filled disc */}
              <div
                aria-hidden
                className="absolute inset-8 rounded-full"
                style={{ background: "var(--lime)", opacity: 0.08 }}
              />

              {/* Central logo mark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="relative flex h-52 w-52 md:h-64 md:w-64 items-center justify-center rounded-3xl border-2 border-border bg-card shadow-2xl animate-float"
                >
                  <Image
                    src="/images/JyAlweerGrapBlad.svg"
                    alt="Jy Alweer? Logo"
                    width={160}
                    height={160}
                    className="h-36 w-36 md:h-44 md:w-44 object-contain"
                    priority
                  />
                  {/* Corner badge */}
                  <span
                    className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-card text-sm font-black shadow-md"
                    style={{ background: "var(--lime)" }}
                    aria-hidden
                  >
                    ?
                  </span>
                </div>
              </div>

              {/* Floating meme-of-day tag */}
              <Link
                href="/memes"
                className="absolute -left-4 top-12 animate-fade-in delay-500 rounded-xl border border-border bg-card shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-40"
              >
                {memeOfDay?.image_url ? (
                  <>
                    <div className="relative h-24 w-full">
                      <Image
                        src={memeOfDay.image_url}
                        alt="Meme of the day"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="px-3 py-1.5">
                      <p className="text-xs font-semibold text-foreground">Jy Alweer?</p>
                      <p className="text-xs text-muted-foreground">😂 {af ? "Meme van die dag" : "Meme of the day"}</p>
                    </div>
                  </>
                ) : (
                  <div className="px-3 py-2">
                    <p className="text-xs font-semibold text-foreground">Jy Alweer?</p>
                    <p className="text-xs text-muted-foreground">😂 {af ? "Meme van die dag" : "Meme of the day"}</p>
                  </div>
                )}
              </Link>
              {/* Floating featured product card */}
              {featuredProduct && (
                <Link
                  href={`/shop/${featuredProduct.id}`}
                  className="absolute -right-4 bottom-16 animate-fade-in delay-400 rounded-xl border border-border bg-card shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-40"
                >
                  {featuredProduct.image_url && (
                    <div className="relative h-20 w-full">
                      <Image
                        src={featuredProduct.image_url}
                        alt={featuredProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="px-3 py-1.5">
                    <p className="text-xs font-bold" style={{ color: "var(--terra)" }}>
                      {featuredProduct.is_limited_drop
                        ? (af ? "🔥 Beperkte Uitgawe" : "🔥 Limited Drop")
                        : (af ? "⭐ Uitgelig" : "⭐ Featured")}
                    </p>
                    <p className="text-xs font-medium text-foreground line-clamp-1">{featuredProduct.name}</p>
                    <p className="text-xs text-muted-foreground">{af ? "Bestel nou" : "Order now"}</p>
                  </div>
                </Link>
              )}
            </div>

            {/* Hero image if available — otherwise the decorated logo */}
            <div className="absolute inset-0 opacity-0 pointer-events-none">
              <Image
                src="/images/screenshot-202026-02-02-20183618.png"
                alt="Jy Alweer? Meme"
                fill
                className="object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
