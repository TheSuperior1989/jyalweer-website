import { Suspense } from "react"
import { CheckoutSuccess } from "@/components/checkout/checkout-success"

export const metadata = {
  title: "Order Confirmed | Jy Alweer?",
  description: "Your order has been confirmed",
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <CheckoutSuccess />
    </Suspense>
  )
}
