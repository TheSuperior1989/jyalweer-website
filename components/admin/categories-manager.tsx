"use client"

import React, { useState } from "react"
import { Plus, Pencil, Trash2, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import type { Category } from "@/lib/types"

interface CategoriesManagerProps {
  initialCategories: Category[]
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function CategoriesManager({ initialCategories }: CategoriesManagerProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    name_af: "",
    sort_order: "0",
  })

  const resetForm = () => {
    setFormData({ slug: "", name: "", name_af: "", sort_order: "0" })
    setEditingCategory(null)
  }

  const openAddDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      slug: category.slug,
      name: category.name,
      name_af: category.name_af,
      sort_order: category.sort_order.toString(),
    })
    setIsDialogOpen(true)
  }

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: editingCategory ? prev.slug : toSlug(value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()
    const payload = {
      slug: formData.slug,
      name: formData.name,
      name_af: formData.name_af,
      sort_order: parseInt(formData.sort_order, 10) || 0,
    }

    try {
      if (editingCategory) {
        const { data, error } = await supabase
          .from("categories")
          .update(payload)
          .eq("id", editingCategory.id)
          .select()
          .single()

        if (error) throw error
        setCategories(categories.map((c) => (c.id === editingCategory.id ? data : c)))
        toast({ title: "Category updated" })
      } else {
        const { data, error } = await supabase
          .from("categories")
          .insert(payload)
          .select()
          .single()

        if (error) throw error
        setCategories(
          [...categories, data].sort((a, b) => a.sort_order - b.sort_order)
        )
        toast({ title: "Category created" })
      }

      setIsDialogOpen(false)
      resetForm()
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (category: Category) => {
    if (
      !confirm(
        `Delete "${category.name}"? Products in this category will keep the slug but won't match any tab in the shop.`
      )
    )
      return

    const supabase = createClient()
    const { error } = await supabase.from("categories").delete().eq("id", category.id)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
      return
    }

    setCategories(categories.filter((c) => c.id !== category.id))
    toast({ title: "Category deleted" })
  }

  const sorted = [...categories].sort((a, b) => a.sort_order - b.sort_order)

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground">
            Manage shop categories — these drive the filter tabs on the store
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogDescription>
              The slug is the URL value used for filtering (e.g. <code>tshirts</code>).
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name (English)</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_af">Name (Afrikaans)</Label>
                <Input
                  id="name_af"
                  value={formData.name_af}
                  onChange={(e) => setFormData({ ...formData, name_af: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })
                  }
                  required
                  placeholder="e.g. tshirts"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  min="0"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : editingCategory ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {sorted.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Tag className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No categories yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Order</th>
                <th className="px-4 py-3 text-left font-medium">Slug</th>
                <th className="px-4 py-3 text-left font-medium">English</th>
                <th className="px-4 py-3 text-left font-medium">Afrikaans</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((cat) => (
                <tr key={cat.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 text-muted-foreground">{cat.sort_order}</td>
                  <td className="px-4 py-3 font-mono text-xs">{cat.slug}</td>
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cat.name_af}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(cat)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(cat)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
