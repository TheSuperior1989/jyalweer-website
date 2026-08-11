import type { Metadata } from "next"
import { CartView } from "@/components/cart/cart-view"

export const metadata: Metadata = {
  title: "Mandjie",
  description: "Bekyk jou inkopiemandjie",
}

export default function CartPage() {
  return (
    <div className="page-shell max-w-5xl">
      <CartView />
    </div>
  )
}
