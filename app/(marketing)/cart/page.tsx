import type { Metadata } from "next"
import { CartView } from "@/components/cart/cart-view"

export const metadata: Metadata = {
  title: "Mandjie",
  description: "Bekyk jou inkopiemandjie",
}

export default function CartPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <CartView />
    </div>
  )
}
