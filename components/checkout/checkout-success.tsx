"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"

export function CheckoutSuccess() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { language } = useLanguage()
  const { clearCart } = useCart()
  const [orderNumber, setOrderNumber] = useState<string>("")

  const t = {
    title: language === "af" ? "Bestelling Bevestig!" : "Order Confirmed!",
    subtitle: language === "af"
      ? "Dankie vir jou bestelling. Jy sal binnekort 'n bevestigings-e-pos ontvang."
      : "Thank you for your order. You will receive a confirmation email shortly.",
    orderNumber: language === "af" ? "Bestelling Nommer" : "Order Number",
    whatNext: language === "af" ? "Wat Volgende?" : "What's Next?",
    step1: language === "af"
      ? "Jy sal 'n bevestigings-e-pos ontvang"
      : "You will receive a confirmation email",
    step2: language === "af"
      ? "Ons sal jou bestelling voorberei"
      : "We will prepare your order",
    step3: language === "af"
      ? "Jou bestelling sal binne 3-5 werksdae afgelewer word"
      : "Your order will be delivered within 3-5 business days",
    continueShopping: language === "af" ? "Gaan Voort Met Inkopies" : "Continue Shopping",
    viewMemes: language === "af" ? "Sien Meer Memes" : "View More Memes",
  }

  useEffect(() => {
    clearCart()
    if (sessionId) {
      setOrderNumber(sessionId.slice(-8).toUpperCase())
    }
  }, [sessionId, clearCart])

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-white shadow-[0_0_32px_rgba(255,255,255,0.25)]">
            <CheckCircle className="w-10 h-10" style={{ color: "var(--ink)" }} />
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight text-foreground mb-3">
            {t.title}
          </h1>
          <div className="mx-auto brand-rule mb-5" />
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
            {t.subtitle}
          </p>
        </div>

        {orderNumber && (
          <Card className="mb-6 border-dashed">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">{t.orderNumber}</p>
              <p className="text-2xl font-mono font-bold text-foreground">#{orderNumber}</p>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-display font-bold text-lg mb-5 flex items-center gap-2">
              <Package className="w-5 h-5" />
              {t.whatNext}
            </h2>
            <ul className="space-y-4">
              {[t.step1, t.step2, t.step3].map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: "var(--charcoal)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground pt-0.5">{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/shop">
              {t.continueShopping}
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-dashed">
            <Link href="/memes">{t.viewMemes}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
