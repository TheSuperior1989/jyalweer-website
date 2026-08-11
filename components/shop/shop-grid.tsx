"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShoppingBag } from "lucide-react"
import { PageHeader } from "@/components/brand/page-header"
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

export function ShopGrid({
  products,
  categories,
  initialCategory = "all",
  initialSort = "featured",
}: ShopGridProps) {
  const allTab = { value: "all", labelAf: "Alle Produkte", labelEn: "All Products" }
  const categoryTabs = [
    allTab,
    ...categories.map((c) => ({ value: c.slug, labelAf: c.name_af, labelEn: c.name })),
  ]
  const { language, t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  const formatPrice = (cents: number) => `R${(cents / 100).toFixed(2)}`

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
      <PageHeader
        kicker={language === "af" ? "Winkel" : "Shop"}
        title={t("shop.title")}
        subtitle={
          language === "af"
            ? "Ontdek ons versameling van Jy Alweer? produkte — hemde, truie, pette en meer."
            : "Discover our collection of Jy Alweer? products — tees, hoodies, caps and more."
        }
      />

      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categoryTabs.map((cat) => {
            const active =
              initialCategory === cat.value ||
              (initialCategory === undefined && cat.value === "all")
            return (
              <Button
                key={cat.value}
                variant={active ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters("category", cat.value)}
                className={active ? "" : "border-dashed"}
              >
                {language === "af" ? cat.labelAf : cat.labelEn}
              </Button>
            )
          })}
        </div>

        <Select
          value={initialSort || "featured"}
          onValueChange={(value) => updateFilters("sort", value)}
        >
          <SelectTrigger className="w-[200px] rounded-xl border-border bg-card">
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
        <div className="rounded-2xl border border-dashed border-border bg-muted/40 py-24 text-center space-y-6">
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
          <Button variant="outline" className="border-dashed" onClick={() => updateFilters("category", "all")}>
            {language === "af" ? "Wys alles" : "Show all"}
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const name = language === "af" ? product.name_af : product.name
            const description =
              language === "af" ? product.description_af : product.description

            return (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card card-lift"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
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
                      <ShoppingBag className="h-10 w-10 text-white/25" />
                    </div>
                  )}
                  <div className="absolute left-3 top-3 flex flex-col gap-2">
                    {product.is_limited_drop && (
                      <Badge variant="punch">{t("shop.limitedDrop")}</Badge>
                    )}
                    {product.stock_quantity === 0 && (
                      <Badge variant="secondary">{t("shop.outOfStock")}</Badge>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-black/40">
                    <span className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-xl">
                      {language === "af" ? "Sien produk" : "View product"}
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5 p-4">
                  <h3 className="font-semibold text-foreground line-clamp-1">{name}</h3>
                  {description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                  )}
                  <p className="font-bold text-foreground pt-0.5">
                    {formatPrice(product.price_cents)}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
