import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { ShopGrid } from "@/components/shop/shop-grid"
import type { Product } from "@/lib/types"

export const metadata: Metadata = {
  title: "Shop | Jy Alweer?",
  description: "Koop Jy Alweer? hemde, truie, pette en meer",
}

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  let products: Product[] = []

  try {
    let query = supabase.from("products").select("*").eq("in_stock", true)

    if (params.category && params.category !== "all") {
      query = query.eq("category", params.category)
    }

    switch (params.sort) {
      case "newest":
        query = query.order("created_at", { ascending: false })
        break
      case "priceAsc":
        query = query.order("price", { ascending: true })
        break
      case "priceDesc":
        query = query.order("price", { ascending: false })
        break
      default:
        query = query.order("featured", { ascending: false }).order("created_at", { ascending: false })
    }

    const { data: productsData, error } = await query

    if (!error) {
      products = (productsData as Product[]) || []
    }
  } catch (e) {
    // Table might not exist yet
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <ShopGrid products={products} initialCategory={params.category} initialSort={params.sort} />
    </div>
  )
}
