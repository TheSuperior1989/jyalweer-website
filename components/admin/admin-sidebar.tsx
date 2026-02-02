"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  ImageIcon, 
  Mail, 
  Settings, 
  LogOut,
  Home
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface AdminSidebarProps {
  user: User
}

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/memes", icon: ImageIcon, label: "Memes" },
  { href: "/admin/subscribers", icon: Mail, label: "Subscribers" },
]

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <aside className="w-64 border-r bg-background flex flex-col">
      <div className="p-6 border-b">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Jy Alweer?</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          asChild
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            View Site
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground" 
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground truncate">
          {user.email}
        </p>
      </div>
    </aside>
  )
}
