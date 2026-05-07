import { createClient } from "@/lib/supabase/server"
import { CategoriesManager } from "@/components/admin/categories-manager"

export default async function AdminCategoriesPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true })

  return (
    <div className="p-8">
      <CategoriesManager initialCategories={categories || []} />
    </div>
  )
}
