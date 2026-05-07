"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Category, Product } from "@/lib/types"

interface ShopGridProps {
  products: Product[]
  categories: Category[]
  initialCategory?: string
  initialSort?: string
}

const sortOptions = [
  { value: "featured", labelAf: "Uitgelig", labelEn: "Featured" },
  { value: "newest", labelAf: "Nuutste", labelEn: "Newest" },
  { value: "priceAsc", labelAf: "Prys: Laag na Hoog", labelEn: "Price: Low to High" },
  { value: "priceDesc", labelAf: "Prys: Hoog na Laag", labelEn: "Price: High to Low" },
]

export function ShopGrid({ products, categories, initialCategory = "all", initialSort = "featured" }: ShopGridProps) {
  const allTab = { value: "all", labelAf: "Alle Produkte", labelEn: "All Products" }
  const categoryTabs = [
    allTab,
    ...categories.map((c) => ({ value: c.slug, labelAf: c.name_af, labelEn: c.name })),
  ]
  const { language, t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  const formatPrice = (cents: number) => {
    return `R${(cents / 100).toFixed(2)}`
  }

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all" || value === "featured") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`/shop?${params.toString()}`)
  }

  return (
    <>
      <div className="mb-12">
        <h1 className="mb-4 font-display text-4xl font-black tracking-tight text-foreground md:text-5xl">{t("shop.title")}</h1>
        <p className="text-lg text-muted-foreground">
          {language === "af"
            ? "Ontdek ons versameling van Jy Alweer? produkte"
            : "Discover our collection of Jy Alweer? products"}
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categoryTabs.map((cat) => (
            <Button
              key={cat.value}
              variant={initialCategory === cat.value || (initialCategory === undefined && cat.value === "all") ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters("category", cat.value)}
            >
              {language === "af" ? cat.labelAf : cat.labelEn}
            </Button>
          ))}
        </div>

        <Select value={initialSort || "featured"} onValueChange={(value) => updateFilters("sort", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {language === "af" ? option.labelAf : option.labelEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {products.length === 0 ? (
        <div className="py-24 text-center space-y-6">
          <div className="text-6xl">😬</div>
          <div>
            <p className="font-display text-2xl font-black tracking-tight text-foreground">
              {language === "af" ? "Nog niks hier nie" : "Nothing here yet"}
            </p>
            <p className="mt-2 text-muted-foreground">
              {language === "af"
                ? "Ons laai tans nuwe produkte op. Kom gou weer kyk."
                : "We're loading up new products. Check back soon."}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => updateFilters("category", "all")}
          >
            {language === "af" ? "Wys alles" : "Show all"}
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                      <div className="absolute left-3 top-3 flex flex-col gap-2">
                        {product.is_limited_drop && (
                          <Badge className="bg-accent text-accent-foreground">{t("shop.limitedDrop")}</Badge>
                        )}
                        {product.stock_quantity === 0 && (
                          <Badge variant="secondary">{t("shop.outOfStock")}</Badge>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 p-4">
                      <h3 className="font-medium text-foreground line-clamp-1">{name}</h3>
                      {description && <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>}
                      <p className="font-semibold text-foreground">{formatPrice(product.price_cents)}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
