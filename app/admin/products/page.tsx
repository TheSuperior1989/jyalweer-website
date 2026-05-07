import { createClient } from "@/lib/supabase/server"
import { ProductsManager } from "@/components/admin/products-manager"

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: false }),
    supabase.from("categories").select("*").order("sort_order", { ascending: true }),
  ])

  return (
    <div className="p-8">
      <ProductsManager initialProducts={products || []} initialCategories={categories || []} />
    </div>
  )
}
