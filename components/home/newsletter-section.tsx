"use client"

import React from "react"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Mail, Loader2, Check } from "lucide-react"
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
        toast({
          title: t("home.newsletter.success"),
        })
      } else {
        toast({
          title: t("common.error"),
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: t("common.error"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="border-t border-border bg-primary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary-foreground/10 p-4">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <h2 className="mb-4 font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
            {t("home.newsletter.title")}
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/80">{t("home.newsletter.subtitle")}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:gap-2">
            <Input
              type="email"
              placeholder={t("home.newsletter.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading || isSuccess}
              className="h-12 flex-1 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary-foreground"
            />
            <Button
              type="submit"
              disabled={isLoading || isSuccess}
              className="h-12 bg-primary-foreground text-primary hover:bg-primary-foreground/90 sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {t("home.newsletter.success")}
                </>
              ) : (
                t("home.newsletter.button")
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
