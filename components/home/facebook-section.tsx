"use client"

import { useLanguage } from "@/lib/language-context"
import { FacebookFeed } from "@/components/memes/facebook-feed"

export function FacebookSection() {
  const { language } = useLanguage()
  const af = language === "af"

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {af ? "Vars van Facebook" : "Fresh from Facebook"}
          </h2>
          <p className="text-muted-foreground">
            {af
              ? "Volg ons vir daaglikse memes en opdaterings"
              : "Follow us for daily memes and updates"}
          </p>
        </div>
        <div className="flex justify-center">
          <FacebookFeed height={600} />
        </div>
      </div>
    </section>
  )
}
