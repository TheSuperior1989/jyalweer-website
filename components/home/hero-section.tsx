"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Nuwe items elke week</span>
            </div>

            <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
              <span className="text-balance">{t("home.hero.title")}</span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t("home.hero.subtitle")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/shop">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  {t("home.hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/memes">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  {t("home.hero.browse")}
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-md">
              <div className="absolute inset-0 rotate-6 rounded-2xl bg-accent/20" />
              <div className="absolute inset-0 -rotate-3 rounded-2xl bg-primary/20" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <Image
                  src="/images/screenshot-202026-02-02-20183618.png"
                  alt="Jy Alweer? Meme"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
