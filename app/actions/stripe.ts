"use server"

import { stripe } from "@/lib/stripe"

export interface CartItemForCheckout {
  id: string
  name: string
  priceInCents: number
  quantity: number
  size?: string
  image?: string
}

export async function createCheckoutSession(
  items: CartItemForCheckout[],
  shippingAddress: {
    name: string
    email: string
    address: string
    city: string
    province: string
    postalCode: string
    phone: string
  }
) {
  if (!items || items.length === 0) {
    return { error: "No items in cart" }
  }

  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "zar",
        product_data: {
          name: item.name + (item.size ? ` (${item.size})` : ""),
        },
        unit_amount: item.priceInCents,
      },
      quantity: item.quantity,
    }))

    // Add shipping cost (flat rate)
    lineItems.push({
      price_data: {
        currency: "zar",
        product_data: {
          name: "Shipping / Versending",
        },
        unit_amount: 6500, // R65 shipping
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cart`,
      customer_email: shippingAddress.email,
      metadata: {
        shipping_name: shippingAddress.name,
        shipping_address: shippingAddress.address,
        shipping_city: shippingAddress.city,
        shipping_province: shippingAddress.province,
        shipping_postal_code: shippingAddress.postalCode,
        shipping_phone: shippingAddress.phone,
      },
    })

    return { url: session.url }
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
