"use client"

import React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js"
import { createCheckoutSession } from "@/app/actions/stripe"
import { Loader2 } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const provinces = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
]

interface ShippingFormData {
  fullName: string
  email: string
  streetAddress: string
  city: string
  province: string
  postalCode: string
  phone: string
}

export function CheckoutForm() {
  const { language, t } = useLanguage()
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()

  const [step, setStep] = useState<"shipping" | "payment">("shipping")
  const [isLoading, setIsLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [shippingData, setShippingData] = useState<ShippingFormData>({
    fullName: "",
    email: "",
    streetAddress: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
  })

  useEffect(() => {
    if (items.length === 0 && step === "shipping") {
      router.push("/cart")
    }
  }, [items, router, step])

  const formatPrice = (cents: number) => {
    return `R${(cents / 100).toFixed(2)}`
  }

  const shippingCost = totalPrice >= 100000 ? 0 : 9900
  const total = totalPrice + shippingCost

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const cartItems = items.map((item) => ({
        productId: item.product.id,
        name: language === "af" ? item.product.name_af : item.product.name,
        priceCents: item.product.price_cents,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      }))

      const result = await createCheckoutSession({
        items: cartItems,
        shipping: shippingData,
        shippingCost,
      })

      if (result.clientSecret) {
        setClientSecret(result.clientSecret)
        setStep("payment")
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckoutComplete = useCallback(() => {
    clearCart()
    router.push("/checkout/success")
  }, [clearCart, router])

  if (items.length === 0 && step === "shipping") {
    return null
  }

  return (
    <>
      <h1 className="mb-8 font-serif text-3xl font-bold text-foreground md:text-4xl">{t("checkout.title")}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === "shipping" ? (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-serif">{t("checkout.shipping.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="fullName">{t("checkout.shipping.fullName")}</Label>
                      <Input
                        id="fullName"
                        value={shippingData.fullName}
                        onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="email">{t("auth.login.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingData.email}
                        onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="streetAddress">{t("checkout.shipping.address")}</Label>
                      <Input
                        id="streetAddress"
                        value={shippingData.streetAddress}
                        onChange={(e) => setShippingData({ ...shippingData, streetAddress: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">{t("checkout.shipping.city")}</Label>
                      <Input
                        id="city"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="province">{t("checkout.shipping.province")}</Label>
                      <Select
                        value={shippingData.province}
                        onValueChange={(value) => setShippingData({ ...shippingData, province: value })}
                        required
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder={language === "af" ? "Kies provinsie" : "Select province"} />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="postalCode">{t("checkout.shipping.postalCode")}</Label>
                      <Input
                        id="postalCode"
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">{t("checkout.shipping.phone")}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {language === "af" ? "Laai..." : "Loading..."}
                      </>
                    ) : (
                      <>
                        {language === "af" ? "Gaan voort na Betaling" : "Continue to Payment"}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-serif">{t("checkout.payment.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                {clientSecret && (
                  <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      onComplete: handleCheckoutComplete,
                    }}
                  >
                    <EmbeddedCheckout />
                  </EmbeddedCheckoutProvider>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-border bg-card">
            <CardHeader>
              <CardTitle className="font-serif">
                {language === "af" ? "Jou Bestelling" : "Your Order"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => {
                const name = language === "af" ? item.product.name_af : item.product.name
                const itemKey = `${item.product.id}-${item.size}-${item.color}`

                return (
                  <div key={itemKey} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-foreground">{name}</span>
                      <span className="text-muted-foreground"> x{item.quantity}</span>
                      {(item.size || item.color) && (
                        <p className="text-xs text-muted-foreground">
                          {item.size && item.size}
                          {item.size && item.color && " / "}
                          {item.color && item.color}
                        </p>
                      )}
                    </div>
                    <span className="text-foreground">
                      {formatPrice(item.product.price_cents * item.quantity)}
                    </span>
                  </div>
                )
              })}

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                <span className="text-foreground">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("cart.shipping")}</span>
                <span className="text-foreground">
                  {shippingCost === 0
                    ? language === "af"
                      ? "Gratis"
                      : "Free"
                    : formatPrice(shippingCost)}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between font-semibold">
                <span className="text-foreground">{t("cart.total")}</span>
                <span className="text-xl text-foreground">{formatPrice(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
