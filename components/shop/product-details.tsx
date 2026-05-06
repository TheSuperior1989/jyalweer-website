"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft, Minus, Plus, ShoppingCart, Check, Star,
  Ruler, Shield, Truck, RefreshCw,
} from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductDetailsProps {
  product: Product
  relatedProducts: Product[]
}

const mockReviews = [
  {
    id: 1,
    author: "Pieter van der Merwe",
    rating: 5,
    date: "2024-11-12",
    text: "Kwaliteit is uitstekend! Die hemp sit perfek en die druk is skerp. Ek het al drie vriende van hierdie winkel vertel.",
  },
  {
    id: 2,
    author: "Liezel B.",
    rating: 5,
    date: "2024-10-28",
    text: "Jy Alweer? — ja ek het alweer bestel. Gratis versending by R1000 is 'n bonus. Dankie!",
  },
  {
    id: 3,
    author: "Kobus Steyn",
    rating: 4,
    date: "2024-10-05",
    text: "Super lag-waardige ontwerp. Versending was vinnig. Sal beslis weer koop.",
  },
  {
    id: 4,
    author: "Zanele M.",
    rating: 5,
    date: "2024-09-19",
    text: "Bought as a gift for my friend who is obsessed with Afrikaans memes — she screamed when she opened it. 10/10.",
  },
  {
    id: 5,
    author: "Francois du Plessis",
    rating: 4,
    date: "2024-09-03",
    text: "Goeie kwaliteit stof, kleur bly helder na wasse. Die meme op die hemp is te snaaks.",
  },
]

const sizeGuide = [
  { size: "XS", chest: "84–88", waist: "70–74", hip: "90–94" },
  { size: "S",  chest: "88–92", waist: "74–78", hip: "94–98" },
  { size: "M",  chest: "92–96", waist: "78–82", hip: "98–102" },
  { size: "L",  chest: "96–100", waist: "82–86", hip: "102–106" },
  { size: "XL", chest: "100–108", waist: "86–94", hip: "106–114" },
  { size: "2XL",chest: "108–116", waist: "94–102", hip: "114–122" },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${n <= rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  )
}

export function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const { language, t } = useLanguage()
  const { addItem } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "")
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const name = language === "af" ? product.name_af : product.name
  const description = language === "af" ? product.description_af : product.description

  const formatPrice = (cents: number) => `R${(cents / 100).toFixed(2)}`

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      toast({
        title: language === "af" ? "Kies asseblief 'n grootte" : "Please select a size",
        variant: "destructive",
      })
      return
    }
    if (product.colors.length > 0 && !selectedColor) {
      toast({
        title: language === "af" ? "Kies asseblief 'n kleur" : "Please select a color",
        variant: "destructive",
      })
      return
    }

    addItem(product, quantity, selectedSize, selectedColor)
    setIsAdded(true)
    toast({
      title: language === "af" ? "Bygevoeg by mandjie" : "Added to cart",
      description: `${quantity}× ${name}`,
    })
    setTimeout(() => setIsAdded(false), 2000)
  }

  const isOutOfStock = product.stock_quantity === 0
  const avgRating = (mockReviews.reduce((s, r) => s + r.rating, 0) / mockReviews.length).toFixed(1)

  return (
    <>
      <Button variant="ghost" className="mb-8 gap-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        {language === "af" ? "Terug" : "Back"}
      </Button>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <div className="sticky top-24">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{ background: "var(--lime)", opacity: 0.15 }}
                >
                  <ShoppingCart className="h-16 w-16 text-foreground/30" />
                </div>
              )}
              {product.is_limited_drop && (
                <Badge className="absolute left-4 top-4 badge-lime">
                  {t("shop.limitedDrop")}
                </Badge>
              )}
            </div>
            {/* Placeholder for additional images */}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              REPLACE: Add multiple product photos for gallery view
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Title + price */}
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <StarRating rating={Math.round(parseFloat(avgRating))} />
                <span className="text-sm font-semibold text-foreground">{avgRating}</span>
                <span className="text-sm text-muted-foreground">({mockReviews.length} resensies)</span>
              </div>
            </div>
            <h1 className="font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
              {name}
            </h1>
            <p className="mt-3 text-3xl font-bold text-foreground">{formatPrice(product.price_cents)}</p>
          </div>

          {description && (
            <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
          )}

          {/* Size selector */}
          {product.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">{t("shop.size")}</Label>
                {/* Size guide dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <Ruler className="h-3 w-3" />
                      {language === "af" ? "Maattabel" : "Size guide"}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg bg-card">
                    <DialogHeader>
                      <DialogTitle className="font-display font-bold">
                        {language === "af" ? "Maattabel (cm)" : "Size Guide (cm)"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            {["Grootte", "Bors", "Middel", "Heupe"].map((h) => (
                              <th key={h} className="py-2 px-3 text-left font-semibold text-foreground">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sizeGuide.map(({ size, chest, waist, hip }) => (
                            <tr key={size} className="border-b border-border/50 hover:bg-muted/30">
                              <td className="py-2 px-3 font-medium text-foreground">{size}</td>
                              <td className="py-2 px-3 text-muted-foreground">{chest}</td>
                              <td className="py-2 px-3 text-muted-foreground">{waist}</td>
                              <td className="py-2 px-3 text-muted-foreground">{hip}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {language === "af"
                        ? "Meet jou lyf en vergelyk met die tabel. Twyfel? Kies groter."
                        : "Measure your body and compare. When in doubt, size up."}
                    </p>
                  </DialogContent>
                </Dialog>
              </div>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-2"
              >
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border-2 border-border bg-card text-sm font-semibold transition-all hover:border-foreground peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Color selector */}
          {product.colors.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold">{t("shop.color")}</Label>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-2"
              >
                {product.colors.map((color) => (
                  <div key={color}>
                    <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                    <Label
                      htmlFor={`color-${color}`}
                      className="flex h-11 cursor-pointer items-center justify-center rounded-lg border-2 border-border bg-card px-4 text-sm font-semibold transition-all hover:border-foreground peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background"
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">{t("shop.quantity")}</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-lg font-bold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= product.stock_quantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to cart */}
          <Button
            size="lg"
            className="w-full gap-2 font-bold text-base"
            style={
              !isOutOfStock
                ? { background: "var(--ink)", color: "var(--ink-foreground)" }
                : undefined
            }
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? (
              t("shop.outOfStock")
            ) : isAdded ? (
              <>
                <Check className="h-5 w-5" />
                {language === "af" ? "Bygevoeg!" : "Added!"}
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                {t("shop.addToCart")}
              </>
            )}
          </Button>

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { Icon: Shield, text: language === "af" ? "Veilige betaling" : "Secure checkout" },
              { Icon: Truck, text: language === "af" ? "SA-wyd versending" : "SA-wide shipping" },
              { Icon: RefreshCw, text: language === "af" ? "30 dae teruggawe" : "30-day returns" },
            ].map(({ Icon, text }) => (
              <div
                key={text}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-muted/30 p-3 text-center"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground leading-tight">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-20">
        <Separator className="mb-12" />
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Summary */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              {language === "af" ? "Klante-resensies" : "Customer reviews"}
            </h2>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-display text-5xl font-black text-foreground">{avgRating}</span>
              <div>
                <StarRating rating={Math.round(parseFloat(avgRating))} />
                <p className="text-sm text-muted-foreground mt-1">{mockReviews.length} resensies</p>
              </div>
            </div>
            {/* Rating breakdown */}
            <div className="space-y-2 mt-4">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = mockReviews.filter((r) => r.rating === star).length
                const pct = Math.round((count / mockReviews.length) * 100)
                return (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-4 text-right text-muted-foreground">{star}</span>
                    <Star className="h-3 w-3 fill-primary text-primary shrink-0" />
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-muted-foreground">{pct}%</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Review list */}
          <div className="lg:col-span-2 space-y-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{review.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString(language === "af" ? "af-ZA" : "en-ZA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <Separator className="mb-12" />
          <h2 className="mb-8 font-display text-2xl font-bold text-foreground">
            {language === "af" ? "Verwante produkte" : "Related products"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((related) => {
              const relatedName = language === "af" ? related.name_af : related.name
              return (
                <Link
                  key={related.id}
                  href={`/shop/${related.id}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card card-lift"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    {related.image_url ? (
                      <Image
                        src={related.image_url}
                        alt={relatedName}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <ShoppingCart className="h-8 w-8 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-foreground line-clamp-1">{relatedName}</p>
                    <p className="text-sm font-bold text-foreground mt-1">
                      {formatPrice(related.price_cents)}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
