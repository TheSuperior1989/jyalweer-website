"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import { getCheckoutSession } from "@/app/actions/stripe"

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
    // Clear the cart after successful checkout
    clearCart()
    
    // Generate order number from session
    if (sessionId) {
      setOrderNumber(sessionId.slice(-8).toUpperCase())
    }
  }, [sessionId, clearCart])

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t.subtitle}
          </p>
        </div>

        {orderNumber && (
          <Card className="mb-8 border-primary/20">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">{t.orderNumber}</p>
              <p className="text-2xl font-mono font-bold text-primary">#{orderNumber}</p>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              {t.whatNext}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  1
                </span>
                <span className="text-muted-foreground">{t.step1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  2
                </span>
                <span className="text-muted-foreground">{t.step2}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  3
                </span>
                <span className="text-muted-foreground">{t.step3}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/shop">
              {t.continueShopping}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/memes">
              {t.viewMemes}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
