"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/lib/types"

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { language, t } = useLanguage()

  if (products.length === 0) {
    return null
  }

  const formatPrice = (cents: number) => {
    return `R${(cents / 100).toFixed(2)}`
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{t("home.featured.title")}</h2>
          <Link href="/shop">
            <Button variant="ghost" className="gap-2">
              {t("home.featured.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const name = language === "af" ? product.name_af : product.name
            const description = language === "af" ? product.description_af : product.description

            return (
              <Link key={product.id} href={`/shop/${product.id}`}>
                <Card className="group h-full overflow-hidden border-border bg-card transition-all hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      {product.image_url ? (
                        <Image
                          src={product.image_url || "/placeholder.svg"}
                          alt={name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <span className="text-muted-foreground">No image</span>
                        </div>
                      )}
                      {product.is_limited_drop && (
                        <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
                          {t("shop.limitedDrop")}
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2 p-4">
                      <h3 className="font-medium text-foreground line-clamp-1">{name}</h3>
                      {description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                      )}
                      <p className="font-semibold text-foreground">{formatPrice(product.price_cents)}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
