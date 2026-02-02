"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Package, Settings, LogOut, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface Order {
  id: string
  stripe_session_id: string
  status: string
  total_amount: number
  created_at: string
}

interface Profile {
  id: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  address: string | null
  city: string | null
  province: string | null
  postal_code: string | null
}

interface AccountDashboardProps {
  user: SupabaseUser | null
  profile: Profile | null
  orders: Order[]
}

export function AccountDashboard({ user, profile, orders }: AccountDashboardProps) {
  const router = useRouter()
  const { language } = useLanguage()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const t = {
    title: language === "af" ? "My Rekening" : "My Account",
    welcome: language === "af" ? "Welkom terug" : "Welcome back",
    orders: language === "af" ? "Bestellings" : "Orders",
    profile: language === "af" ? "Profiel" : "Profile",
    settings: language === "af" ? "Instellings" : "Settings",
    signOut: language === "af" ? "Teken Uit" : "Sign Out",
    signingOut: language === "af" ? "Teken uit..." : "Signing out...",
    noOrders: language === "af" ? "Nog geen bestellings nie" : "No orders yet",
    noOrdersDesc: language === "af" 
      ? "Wanneer jy 'n bestelling plaas, sal dit hier verskyn"
      : "When you place an order, it will appear here",
    startShopping: language === "af" ? "Begin Inkopies" : "Start Shopping",
    orderNumber: language === "af" ? "Bestelling" : "Order",
    date: language === "af" ? "Datum" : "Date",
    status: language === "af" ? "Status" : "Status",
    total: language === "af" ? "Totaal" : "Total",
    firstName: language === "af" ? "Voornaam" : "First Name",
    lastName: language === "af" ? "Van" : "Last Name",
    email: language === "af" ? "E-pos" : "Email",
    phone: language === "af" ? "Telefoon" : "Phone",
    address: language === "af" ? "Adres" : "Address",
    notProvided: language === "af" ? "Nie verskaf nie" : "Not provided",
    pending: language === "af" ? "Wag" : "Pending",
    processing: language === "af" ? "Verwerk" : "Processing",
    shipped: language === "af" ? "Versend" : "Shipped",
    delivered: language === "af" ? "Afgelewer" : "Delivered",
  }

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
      pending: { label: t.pending, variant: "secondary" },
      processing: { label: t.processing, variant: "default" },
      shipped: { label: t.shipped, variant: "outline" },
      delivered: { label: t.delivered, variant: "default" },
    }
    const { label, variant } = statusMap[status] || statusMap.pending
    return <Badge variant={variant}>{label}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "af" ? "af-ZA" : "en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatPrice = (cents: number) => {
    return `R${(cents / 100).toFixed(2)}`
  }

  return (
    <div className="bg-background py-12">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground">
              {t.welcome}, {profile?.first_name || user?.email?.split("@")[0]}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            disabled={isLoggingOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoggingOut ? t.signingOut : t.signOut}
          </Button>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              {t.orders}
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {t.profile}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {t.orders}
                </CardTitle>
                <CardDescription>
                  {orders.length > 0 
                    ? `${orders.length} ${language === "af" ? "bestelling(s)" : "order(s)"}`
                    : t.noOrdersDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground mb-4">{t.noOrders}</p>
                    <Button onClick={() => router.push("/shop")}>
                      {t.startShopping}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-muted">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {t.orderNumber} #{order.stripe_session_id?.slice(-8).toUpperCase()}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatDate(order.created_at)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-6">
                          {getStatusBadge(order.status)}
                          <span className="font-semibold">
                            {formatPrice(order.total_amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t.profile}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t.firstName}</p>
                    <p className="font-medium">{profile?.first_name || t.notProvided}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t.lastName}</p>
                    <p className="font-medium">{profile?.last_name || t.notProvided}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t.email}</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t.phone}</p>
                    <p className="font-medium">{profile?.phone || t.notProvided}</p>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-sm text-muted-foreground">{t.address}</p>
                    <p className="font-medium">
                      {profile?.address 
                        ? `${profile.address}, ${profile.city}, ${profile.province} ${profile.postal_code}`
                        : t.notProvided}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
