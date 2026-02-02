import { createClient } from "@/lib/supabase/server"
import { AccountDashboard } from "@/components/account/account-dashboard"

export const metadata = {
  title: "My Account | Jy Alweer?",
  description: "Manage your account and view order history",
}

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch user's orders
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single()

  return (
    <AccountDashboard 
      user={user} 
      profile={profile} 
      orders={orders || []} 
    />
  )
}
