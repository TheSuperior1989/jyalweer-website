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
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Minus, Plus, ShoppingCart, Check } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductDetailsProps {
  product: Product
  relatedProducts: Product[]
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

  const formatPrice = (cents: number) => {
    return `R${(cents / 100).toFixed(2)}`
  }

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
      description: `${quantity}x ${name}`,
    })

    setTimeout(() => setIsAdded(false), 2000)
  }

  const isOutOfStock = product.stock_quantity === 0

  return (
    <>
      <Button variant="ghost" className="mb-8 gap-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        {language === "af" ? "Terug" : "Back"}
      </Button>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="sticky top-24">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card">
              {product.image_url ? (
                <Image src={product.image_url || "/placeholder.svg"} alt={name} fill className="object-cover" priority />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              {product.is_limited_drop && (
                <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">
                  {t("shop.limitedDrop")}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">{name}</h1>
            <p className="text-3xl font-bold text-foreground">{formatPrice(product.price_cents)}</p>
          </div>

          {description && (
            <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
          )}

          {product.sizes.length > 0 && (
            <div className="space-y-4">
              <Label className="text-base font-medium">{t("shop.size")}</Label>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-3"
              >
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border-2 border-border bg-card text-sm font-medium transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-muted"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {product.colors.length > 0 && (
            <div className="space-y-4">
              <Label className="text-base font-medium">{t("shop.color")}</Label>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-3"
              >
                {product.colors.map((color) => (
                  <div key={color}>
                    <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                    <Label
                      htmlFor={`color-${color}`}
                      className="flex h-12 cursor-pointer items-center justify-center rounded-lg border-2 border-border bg-card px-4 text-sm font-medium transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-muted"
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div className="space-y-4">
            <Label className="text-base font-medium">{t("shop.quantity")}</Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= product.stock_quantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full gap-2"
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

          {isOutOfStock && (
            <p className="text-center text-sm text-muted-foreground">
              {language === "af"
                ? "Hierdie produk is tans uit voorraad"
                : "This product is currently out of stock"}
            </p>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
            {language === "af" ? "Verwante Produkte" : "Related Products"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => {
              const relatedName = language === "af" ? relatedProduct.name_af : relatedProduct.name

              return (
                <Link key={relatedProduct.id} href={`/shop/${relatedProduct.id}`}>
                  <Card className="group h-full overflow-hidden border-border bg-card transition-all hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden">
                        {relatedProduct.image_url ? (
                          <Image
                            src={relatedProduct.image_url || "/placeholder.svg"}
                            alt={relatedName}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <span className="text-muted-foreground">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-1 p-4">
                        <h3 className="font-medium text-foreground line-clamp-1">{relatedName}</h3>
                        <p className="font-semibold text-foreground">
                          {formatPrice(relatedProduct.price_cents)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
