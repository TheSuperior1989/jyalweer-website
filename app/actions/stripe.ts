"use server"

import { stripe } from "@/lib/stripe"

export interface CartItemForCheckout {
  productId: string
  name: string
  priceCents: number
  quantity: number
  size?: string
  color?: string
}

export interface CheckoutShipping {
  fullName: string
  email: string
  streetAddress: string
  city: string
  province: string
  postalCode: string
  phone: string
}

export async function createCheckoutSession({
  items,
  shipping,
  shippingCost,
}: {
  items: CartItemForCheckout[]
  shipping: CheckoutShipping
  shippingCost: number
}) {
  if (!items || items.length === 0) {
    return { error: "No items in cart" }
  }

  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "zar",
        product_data: {
          name: item.name + (item.size ? ` (${item.size})` : "") + (item.color ? ` — ${item.color}` : ""),
        },
        unit_amount: item.priceCents,
      },
      quantity: item.quantity,
    }))

    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "zar",
          product_data: {
            name: "Versending / Shipping",
          },
          unit_amount: shippingCost,
        },
        quantity: 1,
      })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      ui_mode: "embedded",
      return_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: shipping.email,
      metadata: {
        shipping_name: shipping.fullName,
        shipping_address: shipping.streetAddress,
        shipping_city: shipping.city,
        shipping_province: shipping.province,
        shipping_postal_code: shipping.postalCode,
        shipping_phone: shipping.phone,
      },
    })

    return { clientSecret: session.client_secret }
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return { error: "Failed to create checkout session" }
  }
}

export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return { session }
  } catch (error) {
    console.error("Error retrieving session:", error)
    return { error: "Failed to retrieve session" }
  }
}
