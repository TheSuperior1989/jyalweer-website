import type { Metadata } from "next"
import { CheckoutForm } from "@/components/checkout/checkout-form"

export const metadata: Metadata = {
  title: "Betaal",
  description: "Voltooi jou bestelling",
}

export default function CheckoutPage() {
  return (
    <div className="page-shell max-w-5xl">
      <CheckoutForm />
    </div>
  )
}
