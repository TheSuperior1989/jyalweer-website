"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag } from "lucide-react"
import type { Product } from "@/lib/types"

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { language, t } = useLanguage()

  if (products.length === 0) return null

  const formatPrice = (cents: number) => `R${(cents / 100).toFixed(2)}`

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {language === "af" ? "Ons keuses" : "Our picks"}
            </p>
            <h2 className="font-display text-4xl font-black tracking-tight text-foreground md:text-5xl">
              {t("home.featured.title")}
            </h2>
            {/* Underline accent — echoes "Grap blad" underline */}
            <div className="mt-3 brand-rule" />
          </div>
          <Link href="/shop">
            <Button
              variant="ghost"
              className="gap-2 font-semibold text-muted-foreground hover:text-foreground shrink-0"
            >
              {t("home.featured.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => {
            const name = language === "af" ? product.name_af : product.name
            const description =
              language === "af" ? product.description_af : product.description
            const isBig = i === 0

            return (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card transition-all card-lift ${
                  isBig ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-muted ${
                    isBig ? "aspect-[4/3]" : "aspect-square"
                  }`}
                >
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{ background: "var(--charcoal)" }}
                    >
                      <ShoppingBag className="h-12 w-12 text-white/20" />
                    </div>
                  )}

                  <div className="absolute left-3 top-3 flex flex-col gap-2">
                    {product.is_limited_drop && (
                      <Badge variant="punch" className="text-xs">{t("shop.limitedDrop")}</Badge>
                    )}
                    {product.stock_quantity === 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {t("shop.outOfStock")}
                      </Badge>
                    )}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-black/40">
                    <span className="rounded-full px-5 py-2 text-sm font-bold shadow-xl bg-primary text-primary-foreground">
                      {language === "af" ? "Sien produk" : "View product"}
                    </span>
                  </div>
                </div>

                <div className={`p-4 ${isBig ? "p-5" : ""}`}>
                  <h3
                    className={`font-semibold text-foreground line-clamp-1 ${
                      isBig ? "text-lg" : "text-sm"
                    }`}
                  >
                    {name}
                  </h3>
                  {isBig && description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {description}
                    </p>
                  )}
                  <p
                    className={`mt-1 font-bold text-foreground ${
                      isBig ? "text-xl mt-2" : "text-sm"
                    }`}
                  >
                    {formatPrice(product.price_cents)}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/shop">
            <Button size="lg" className="gap-2 font-bold px-10">
              <ShoppingBag className="h-4 w-4" />
              {language === "af" ? "Sien alle produkte" : "Browse all products"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
