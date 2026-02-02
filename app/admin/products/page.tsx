import { createClient } from "@/lib/supabase/server"
import { ProductsManager } from "@/components/admin/products-manager"

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <ProductsManager initialProducts={products || []} />
    </div>
  )
}
