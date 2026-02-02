import React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export const metadata = {
  title: "Admin Dashboard | Jy Alweer?",
  description: "Admin dashboard for managing Jy Alweer? store",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const isAdmin = user.user_metadata?.is_admin === true

  if (!isAdmin) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar user={user} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
