export interface Product {
  id: string
  name: string
  name_af: string
  description: string | null
  description_af: string | null
  price_cents: number
  category: "tshirts" | "hoodies" | "caps" | "stickers"
  image_url: string | null
  sizes: string[]
  colors: string[]
  is_limited_drop: boolean
  is_featured: boolean
  stock_quantity: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Meme {
  id: string
  caption: string
  caption_af: string
  image_url: string
  facebook_link: string | null
  is_featured: boolean
  is_meme_of_day: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
  size?: string
  color?: string
}

export interface ShippingAddress {
  id: string
  user_id: string
  full_name: string
  street_address: string
  city: string
  province: string
  postal_code: string
  country: string
  phone: string | null
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string | null
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled"
  total_cents: number
  shipping_address: {
    full_name: string
    street_address: string
    city: string
    province: string
    postal_code: string
    country: string
    phone?: string
  }
  email: string
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  quantity: number
  size: string | null
  color: string | null
  price_cents: number
  created_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  language_preference: "af" | "en"
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface EmailSubscriber {
  id: string
  email: string
  language_preference: "af" | "en"
  is_active: boolean
  created_at: string
}
