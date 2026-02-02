import { createClient } from "@/lib/supabase/server"
import { SubscribersManager } from "@/components/admin/subscribers-manager"

export default async function AdminSubscribersPage() {
  const supabase = await createClient()
  const { data: subscribers } = await supabase
    .from("email_subscribers")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <SubscribersManager initialSubscribers={subscribers || []} />
    </div>
  )
}
