import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { ShopGrid } from "@/components/shop/shop-grid"
import type { Category, Product } from "@/lib/types"

export const metadata: Metadata = {
  title: "Shop",
  description: "Koop Jy Alweer? hemde, truie, pette en meer",
}

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  let products: Product[] = []
  let categories: Category[] = []

  try {
    const { data: catData } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true })
    categories = catData || []
  } catch {
    // categories table may not exist yet
  }

  try {
    let query = supabase.from("products").select("*").eq("is_active", true).gt("stock_quantity", 0)

    if (params.category && params.category !== "all") {
      query = query.eq("category", params.category)
    }

    switch (params.sort) {
      case "newest":
        query = query.order("created_at", { ascending: false })
        break
      case "priceAsc":
        query = query.order("price_cents", { ascending: true })
        break
      case "priceDesc":
        query = query.order("price_cents", { ascending: false })
        break
      default:
        query = query.order("is_featured", { ascending: false }).order("created_at", { ascending: false })
    }

    const { data: productsData, error } = await query

    if (!error) {
      products = (productsData as Product[]) || []
    }
  } catch (e) {
    // Table might not exist yet
  }

  return (
    <div className="page-shell">
      <ShopGrid products={products} categories={categories} initialCategory={params.category} initialSort={params.sort} />
    </div>
  )
}
