import { createClient } from "@/lib/supabase/server"
import { OrdersManager } from "@/components/admin/orders-manager"

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      profiles (first_name, last_name)
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <OrdersManager initialOrders={orders || []} />
    </div>
  )
}
