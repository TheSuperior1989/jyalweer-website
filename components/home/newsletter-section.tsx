"use client"

import React, { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Mail, Loader2, Check, Sparkles } from "lucide-react"
import { subscribeToNewsletter } from "@/app/actions/newsletter"

export function NewsletterSection() {
  const { language, t } = useLanguage()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    try {
      const result = await subscribeToNewsletter(email, language)
      if (result.success) {
        setIsSuccess(true)
        setEmail("")
        toast({ title: t("home.newsletter.success") })
      } else {
        toast({ title: t("common.error"), variant: "destructive" })
      }
    } catch {
      toast({ title: t("common.error"), variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28 section-charcoal">
      {/* Diamond decoration — logo language */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 h-64 w-64 rotate-45 border border-dashed border-white/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-12 bottom-8 h-40 w-40 rotate-45 border border-white/8"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative inline-flex items-center justify-center">
              <span
                aria-hidden
                className="absolute -inset-2 rotate-45 rounded-sm border border-dashed border-white/30"
              />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_0_28px_rgba(255,255,255,0.25)]">
                <Sparkles className="h-6 w-6" style={{ color: "var(--ink)" }} />
              </div>
            </div>
          </div>

          <h2
            className="mb-3 font-display text-4xl font-black tracking-tight md:text-5xl"
            style={{ color: "var(--ink-foreground)" }}
          >
            {t("home.newsletter.title")}
          </h2>
          <p className="mb-8 text-lg text-white/55">
            {t("home.newsletter.subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder={t("home.newsletter.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading || isSuccess}
              className="h-12 flex-1 rounded-xl border-white/15 bg-white/8 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/12"
            />
            <Button
              type="submit"
              disabled={isLoading || isSuccess}
              className="h-12 rounded-xl font-bold px-8 shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {language === "af" ? "Ingeteken!" : "Subscribed!"}
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  {t("home.newsletter.button")}
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 text-sm text-white/35">
            {language === "af"
              ? "Geen spam nie. Jy kan enige tyd uitteken."
              : "No spam. Unsubscribe anytime."}
          </p>
        </div>
      </div>
    </section>
  )
}
