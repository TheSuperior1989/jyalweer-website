"use client"

import { useState } from "react"
import { ShoppingCart, Clock, Package, Truck, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface Order {
  id: string
  user_id: string | null
  stripe_session_id: string | null
  status: string
  total_amount: number
  shipping_address: any
  created_at: string
  profiles?: {
    first_name: string | null
    last_name: string | null
  } | null
}

interface OrdersManagerProps {
  initialOrders: Order[]
}

const statusOptions = [
  { value: "pending", label: "Pending", icon: Clock },
  { value: "processing", label: "Processing", icon: Package },
  { value: "shipped", label: "Shipped", icon: Truck },
  { value: "delivered", label: "Delivered", icon: Check },
]

export function OrdersManager({ initialOrders }: OrdersManagerProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const { toast } = useToast()

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId)

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      return
    }

    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    toast({ title: "Order status updated" })
  }

  const formatPrice = (cents: number) => `R${(cents / 100).toFixed(2)}`

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "outline"; className?: string }> = {
      pending: { variant: "secondary" },
      processing: { variant: "default" },
      shipped: { variant: "outline" },
      delivered: { variant: "default", className: "bg-green-500 hover:bg-green-600" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No orders yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">
                      Order #{order.stripe_session_id?.slice(-8).toUpperCase() || "N/A"}
                    </CardTitle>
                    <CardDescription>{formatDate(order.created_at)}</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(order.status)}
                    <span className="text-xl font-bold">{formatPrice(order.total_amount || 0)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Customer</h4>
                    {order.profiles ? (
                      <p className="font-medium">
                        {order.profiles.first_name} {order.profiles.last_name}
                      </p>
                    ) : order.shipping_address?.name ? (
                      <p className="font-medium">{order.shipping_address.name}</p>
                    ) : (
                      <p className="text-muted-foreground">Guest checkout</p>
                    )}
                    {order.shipping_address?.email && (
                      <p className="text-sm text-muted-foreground">{order.shipping_address.email}</p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Shipping Address</h4>
                    {order.shipping_address ? (
                      <div className="text-sm">
                        <p>{order.shipping_address.address}</p>
                        <p>
                          {order.shipping_address.city}, {order.shipping_address.province}
                        </p>
                        <p>{order.shipping_address.postal_code}</p>
                        {order.shipping_address.phone && (
                          <p className="mt-1">Tel: {order.shipping_address.phone}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">No address provided</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Update Status:</span>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <span className="flex items-center gap-2">
                              <option.icon className="h-4 w-4" />
                              {option.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
