"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export function CartView() {
  const { language, t } = useLanguage()
  const { items, updateQuantity, removeItem, totalPrice } = useCart()

  const formatPrice = (cents: number) => {
    return `R${(cents / 100).toFixed(2)}`
  }

  const shippingCost = totalPrice >= 100000 ? 0 : 9900 // Free shipping over R1000
  const total = totalPrice + shippingCost

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <ShoppingBag className="mx-auto mb-6 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-4 font-serif text-3xl font-bold text-foreground">{t("cart.title")}</h1>
        <p className="mb-8 text-lg text-muted-foreground">{t("cart.empty")}</p>
        <Link href="/shop">
          <Button size="lg" className="gap-2">
            {t("cart.continueShopping")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <h1 className="mb-8 font-serif text-3xl font-bold text-foreground md:text-4xl">{t("cart.title")}</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-border bg-card">
            <CardContent className="divide-y divide-border p-0">
              {items.map((item, index) => {
                const name = language === "af" ? item.product.name_af : item.product.name
                const itemKey = `${item.product.id}-${item.size}-${item.color}`

                return (
                  <div key={itemKey} className={`flex gap-4 p-6 ${index === 0 ? "" : ""}`}>
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-border">
                      {item.product.image_url ? (
                        <Image
                          src={item.product.image_url || "/placeholder.svg"}
                          alt={name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <span className="text-xs text-muted-foreground">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/shop/${item.product.id}`}
                            className="font-medium text-foreground hover:underline"
                          >
                            {name}
                          </Link>
                          {(item.size || item.color) && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.size && `${t("shop.size")}: ${item.size}`}
                              {item.size && item.color && " / "}
                              {item.color && `${t("shop.color")}: ${item.color}`}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.product.id, item.size, item.color)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">{t("cart.remove")}</span>
                        </Button>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.size, item.color)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-semibold text-foreground">
                          {formatPrice(item.product.price_cents * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <div className="mt-4">
            <Link href="/shop">
              <Button variant="ghost" className="gap-2">
                <ArrowRight className="h-4 w-4 rotate-180" />
                {t("cart.continueShopping")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-border bg-card">
            <CardHeader>
              <CardTitle className="font-serif">
                {language === "af" ? "Bestelling Opsomming" : "Order Summary"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              {totalPrice < 100000 && (
                <p className="text-xs text-muted-foreground">
                  {language === "af"
                    ? `Voeg R${((100000 - totalPrice) / 100).toFixed(2)} by vir gratis versending`
                    : `Add R${((100000 - totalPrice) / 100).toFixed(2)} for free shipping`}
                </p>
              )}
              <Separator />
              <div className="flex items-center justify-between font-semibold">
                <span className="text-foreground">{t("cart.total")}</span>
                <span className="text-xl text-foreground">{formatPrice(total)}</span>
              </div>
              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full gap-2">
                  {t("cart.checkout")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
