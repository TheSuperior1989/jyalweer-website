"use client"

import { useLanguage } from "@/lib/language-context"
import { FacebookFeed } from "@/components/memes/facebook-feed"

export function FacebookSection() {
  const { language } = useLanguage()
  const af = language === "af"

  return (
    <section className="py-16 md:py-20 bg-muted/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Social
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight md:text-4xl text-foreground">
            {af ? "Vars van Facebook" : "Fresh from Facebook"}
          </h2>
          <div className="mx-auto mt-3 brand-rule" />
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            {af
              ? "Volg ons vir daaglikse memes en opdaterings"
              : "Follow us for daily memes and updates"}
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-2 shadow-sm">
            <FacebookFeed height={600} />
          </div>
        </div>
      </div>
    </section>
  )
}
