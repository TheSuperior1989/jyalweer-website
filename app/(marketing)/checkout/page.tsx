import type { Metadata } from "next"
import { CheckoutForm } from "@/components/checkout/checkout-form"

export const metadata: Metadata = {
  title: "Betaal",
  description: "Voltooi jou bestelling",
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <CheckoutForm />
    </div>
  )
}
