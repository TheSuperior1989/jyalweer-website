"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product, CartItem } from "./types"

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void
  removeItem: (productId: string, size?: string, color?: string) => void
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {
        localStorage.removeItem("cart")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity = 1, size?: string, color?: string) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      )

      if (existingIndex >= 0) {
        const updated = [...current]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      }

      return [...current, { product, quantity, size, color }]
    })
  }

  const removeItem = (productId: string, size?: string, color?: string) => {
    setItems((current) =>
      current.filter((item) => !(item.product.id === productId && item.size === size && item.color === color))
    )
  }

  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeItem(productId, size, color)
      return
    }

    setItems((current) =>
      current.map((item) =>
        item.product.id === productId && item.size === size && item.color === color ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.product.price_cents * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
