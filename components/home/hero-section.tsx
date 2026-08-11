"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react"
import type { Meme, Product } from "@/lib/types"

interface HeroSectionProps {
  memeOfDay?: Meme | null
  featuredProduct?: Product | null
}

export function HeroSection({ memeOfDay, featuredProduct }: HeroSectionProps) {
  const { t, language } = useLanguage()
  const af = language === "af"

  return (
    <section className="relative overflow-hidden section-charcoal">
      {/* Subtle radial wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,255,255,0.07) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 15% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,14,18,0.2) 0%, transparent 30%, transparent 70%, rgba(12,14,18,0.55) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Left: copy */}
          <div className="space-y-8">
            {/* Pill badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-dashed border-white/25 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/75 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-white animate-sparkle" />
              <span>Nuwe items elke week · New drops weekly</span>
            </div>

            {/* Headline — mirrors logo hierarchy: JY / ALWEER? */}
            <h1 className="animate-fade-up delay-100 font-display font-black leading-[0.92] tracking-tight text-white">
              <span className="block text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-white/90">
                JY
              </span>
              <span className="mt-1 block text-5xl md:text-7xl lg:text-8xl">
                ALWEER?
              </span>
              <span className="mt-4 block font-script text-3xl md:text-4xl font-normal text-white/90 tracking-wide">
                Grap blad
                <span
                  aria-hidden
                  className="mt-1.5 block h-[2px] w-32 md:w-40 bg-white/80 rounded-full"
                />
              </span>
            </h1>

            <p className="animate-fade-up delay-200 max-w-md text-lg leading-relaxed text-white/60 md:text-xl">
              {t("home.hero.subtitle")}
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-300 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop">
                <Button size="lg" className="w-full sm:w-auto gap-2 font-bold text-base px-8">
                  <ShoppingBag className="h-4 w-4" />
                  {t("home.hero.cta")}
                </Button>
              </Link>
              <Link href="/memes">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 font-semibold text-base px-8 border-dashed"
                >
                  {t("home.hero.browse")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="animate-fade-up delay-400 flex flex-wrap items-center gap-5 text-sm text-white/50">
              <div className="flex items-center gap-1.5">
                <span className="text-base">😂</span>
                <span className="font-semibold text-white/90">50k+</span>
                <span>{af ? "volgelinge op Facebook" : "followers on Facebook"}</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/15" />
              <div className="flex items-center gap-1.5">
                <span className="text-base">🇿🇦</span>
                <span>{af ? "100% Suid-Afrikaans" : "100% South African"}</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/15" />
              <div className="flex items-center gap-1.5">
                <span className="text-base">🚚</span>
                <span>{af ? "Gratis versending oor R1000" : "Free shipping over R1000"}</span>
              </div>
            </div>
          </div>

          {/* Right: logo mark in diamond frame */}
          <div className="relative flex items-center justify-center min-h-[340px] md:min-h-[440px]">
            {/* Soft ambient glow behind logo */}
            <div
              aria-hidden
              className="absolute h-72 w-72 md:h-96 md:w-96 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
              }}
            />

            {/* Floating logo with brand diamond language */}
            <div className="relative animate-float">
              {/* Outer dashed diamond */}
              <div
                aria-hidden
                className="absolute -inset-6 md:-inset-8 rotate-45 rounded-sm border border-dashed border-white/35"
              />
              {/* Inner solid diamond */}
              <div
                aria-hidden
                className="absolute -inset-2 md:-inset-3 rotate-45 rounded-sm border-2 border-white/80 neon-glow"
              />

              {/* Logo plate */}
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/images/jyalweer-logo.jpg"
                  alt="Jy Alweer? Grap blad"
                  width={360}
                  height={360}
                  className="h-64 w-64 md:h-80 md:w-80 object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating meme-of-day tag */}
            <Link
              href="/memes"
              className="absolute left-0 top-6 md:-left-2 md:top-10 animate-fade-in delay-500 rounded-xl border border-white/15 bg-[#16191f]/95 shadow-xl overflow-hidden hover:border-white/30 transition-colors w-36 md:w-40 backdrop-blur-sm"
            >
              {memeOfDay?.image_url ? (
                <>
                  <div className="relative h-20 w-full">
                    <Image
                      src={memeOfDay.image_url}
                      alt="Meme of the day"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-3 py-1.5">
                    <p className="text-xs font-semibold text-white">Jy Alweer?</p>
                    <p className="text-xs text-white/50">
                      😂 {af ? "Meme van die dag" : "Meme of the day"}
                    </p>
                  </div>
                </>
              ) : (
                <div className="px-3 py-2.5">
                  <p className="text-xs font-semibold text-white">Jy Alweer?</p>
                  <p className="text-xs text-white/50">
                    😂 {af ? "Meme van die dag" : "Meme of the day"}
                  </p>
                </div>
              )}
            </Link>

            {/* Floating featured product card */}
            {featuredProduct && (
              <Link
                href={`/shop/${featuredProduct.id}`}
                className="absolute right-0 bottom-8 md:-right-2 md:bottom-12 animate-fade-in delay-400 rounded-xl border border-white/15 bg-[#16191f]/95 shadow-xl overflow-hidden hover:border-white/30 transition-colors w-36 md:w-40 backdrop-blur-sm"
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
                  <p className="text-xs font-bold text-white">
                    {featuredProduct.is_limited_drop
                      ? af
                        ? "🔥 Beperkte Uitgawe"
                        : "🔥 Limited Drop"
                      : af
                        ? "⭐ Uitgelig"
                        : "⭐ Featured"}
                  </p>
                  <p className="text-xs font-medium text-white line-clamp-1">
                    {featuredProduct.name}
                  </p>
                  <p className="text-xs text-white/50">
                    {af ? "Bestel nou" : "Order now"}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Streetwear ticker — brand wordmark on repeat */}
      <div className="relative border-t border-white/10 bg-[#0d1015] py-3 marquee-strip">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="mx-6 font-display text-sm font-bold uppercase tracking-[0.3em] text-white/70">
                    Jy Alweer?
                  </span>
                  <span className="inline-block h-1.5 w-1.5 rotate-45 border border-white/40" />
                  <span className="mx-6 font-script text-base text-white/50">
                    Grap blad
                  </span>
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-white/40" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
