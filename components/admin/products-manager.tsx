"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/types"

interface ProductsManagerProps {
  initialProducts: Product[]
}

export function ProductsManager({ initialProducts }: ProductsManagerProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    name_af: "",
    description: "",
    description_af: "",
    price: "",
    image_url: "",
    category: "",
    sizes: "",
    in_stock: true,
    featured: false,
  })

  const resetForm = () => {
    setFormData({
      name: "",
      name_af: "",
      description: "",
      description_af: "",
      price: "",
      image_url: "",
      category: "",
      sizes: "",
      in_stock: true,
      featured: false,
    })
    setEditingProduct(null)
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      name_af: product.name_af || "",
      description: product.description || "",
      description_af: product.description_af || "",
      price: (product.price / 100).toString(),
      image_url: product.image_url || "",
      category: product.category || "",
      sizes: product.sizes?.join(", ") || "",
      in_stock: product.in_stock ?? true,
      featured: product.featured ?? false,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()
    const priceInCents = Math.round(parseFloat(formData.price) * 100)
    const sizesArray = formData.sizes ? formData.sizes.split(",").map((s) => s.trim()) : null

    const productData = {
      name: formData.name,
      name_af: formData.name_af || null,
      description: formData.description || null,
      description_af: formData.description_af || null,
      price: priceInCents,
      image_url: formData.image_url || null,
      category: formData.category || null,
      sizes: sizesArray,
      in_stock: formData.in_stock,
      featured: formData.featured,
    }

    try {
      if (editingProduct) {
        const { data, error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id)
          .select()
          .single()

        if (error) throw error

        setProducts(products.map((p) => (p.id === editingProduct.id ? data : p)))
        toast({ title: "Product updated successfully" })
      } else {
        const { data, error } = await supabase
          .from("products")
          .insert(productData)
          .select()
          .single()

        if (error) throw error

        setProducts([data, ...products])
        toast({ title: "Product created successfully" })
      }

      setIsDialogOpen(false)
      resetForm()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (product: Product) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    const supabase = createClient()
    const { error } = await supabase.from("products").delete().eq("id", product.id)

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      return
    }

    setProducts(products.filter((p) => p.id !== product.id))
    toast({ title: "Product deleted successfully" })
  }

  const formatPrice = (cents: number) => `R${(cents / 100).toFixed(2)}`

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your store products</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                {editingProduct ? "Update the product details below" : "Fill in the product details below"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name (English)</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name_af">Name (Afrikaans)</Label>
                    <Input
                      id="name_af"
                      value={formData.name_af}
                      onChange={(e) => setFormData({ ...formData, name_af: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (English)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_af">Description (Afrikaans)</Label>
                    <Textarea
                      id="description_af"
                      value={formData.description_af}
                      onChange={(e) => setFormData({ ...formData, description_af: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (ZAR)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., T-Shirts, Hoodies"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sizes">Sizes (comma separated)</Label>
                  <Input
                    id="sizes"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="S, M, L, XL"
                  />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="in_stock"
                      checked={formData.in_stock}
                      onCheckedChange={(checked) => setFormData({ ...formData, in_stock: checked })}
                    />
                    <Label htmlFor="in_stock">In Stock</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : editingProduct ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No products yet. Add your first product to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative bg-muted">
                {product.image_url ? (
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                  </div>
                  <div className="flex gap-1">
                    {product.featured && <Badge>Featured</Badge>}
                    {!product.in_stock && <Badge variant="secondary">Out of Stock</Badge>}
                  </div>
                </div>
                {product.category && (
                  <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                )}
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(product)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
