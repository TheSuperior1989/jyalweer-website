"use client"

import React from "react"

import { useState } from "react"
import { Plus, Pencil, Trash2, ImageIcon as ImageIconIcon, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import type { Meme } from "@/lib/types"

interface MemesManagerProps {
  initialMemes: Meme[]
}

export function MemesManager({ initialMemes }: MemesManagerProps) {
  const [memes, setMemes] = useState<Meme[]>(initialMemes)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMeme, setEditingMeme] = useState<Meme | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    title_af: "",
    description: "",
    description_af: "",
    image_url: "",
    is_meme_of_day: false,
  })

  const resetForm = () => {
    setFormData({
      title: "",
      title_af: "",
      description: "",
      description_af: "",
      image_url: "",
      is_meme_of_day: false,
    })
    setEditingMeme(null)
  }

  const openEditDialog = (meme: Meme) => {
    setEditingMeme(meme)
    setFormData({
      title: meme.title,
      title_af: meme.title_af || "",
      description: meme.description || "",
      description_af: meme.description_af || "",
      image_url: meme.image_url,
      is_meme_of_day: meme.is_meme_of_day ?? false,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    const memeData = {
      title: formData.title,
      title_af: formData.title_af || null,
      description: formData.description || null,
      description_af: formData.description_af || null,
      image_url: formData.image_url,
      is_meme_of_day: formData.is_meme_of_day,
    }

    try {
      // If setting as meme of day, unset others first
      if (formData.is_meme_of_day) {
        await supabase.from("memes").update({ is_meme_of_day: false }).eq("is_meme_of_day", true)
      }

      if (editingMeme) {
        const { data, error } = await supabase
          .from("memes")
          .update(memeData)
          .eq("id", editingMeme.id)
          .select()
          .single()

        if (error) throw error

        setMemes(memes.map((m) => (m.id === editingMeme.id ? data : { ...m, is_meme_of_day: formData.is_meme_of_day ? false : m.is_meme_of_day })))
        toast({ title: "Meme updated successfully" })
      } else {
        const { data, error } = await supabase
          .from("memes")
          .insert(memeData)
          .select()
          .single()

        if (error) throw error

        setMemes([data, ...memes.map((m) => ({ ...m, is_meme_of_day: formData.is_meme_of_day ? false : m.is_meme_of_day }))])
        toast({ title: "Meme created successfully" })
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

  const handleDelete = async (meme: Meme) => {
    if (!confirm("Are you sure you want to delete this meme?")) return

    const supabase = createClient()
    const { error } = await supabase.from("memes").delete().eq("id", meme.id)

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      return
    }

    setMemes(memes.filter((m) => m.id !== meme.id))
    toast({ title: "Meme deleted successfully" })
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Memes</h1>
          <p className="text-muted-foreground">Manage your meme gallery</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Meme
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMeme ? "Edit Meme" : "Add New Meme"}</DialogTitle>
              <DialogDescription>
                {editingMeme ? "Update the meme details below" : "Fill in the meme details below"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title (English)</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title_af">Title (Afrikaans)</Label>
                    <Input
                      id="title_af"
                      value={formData.title_af}
                      onChange={(e) => setFormData({ ...formData, title_af: e.target.value })}
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
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_meme_of_day"
                    checked={formData.is_meme_of_day}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_meme_of_day: checked })}
                  />
                  <Label htmlFor="is_meme_of_day">Set as Meme of the Day</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : editingMeme ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {memes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ImageIconIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No memes yet. Add your first meme to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {memes.map((meme) => (
            <Card key={meme.id} className="overflow-hidden">
              <div className="aspect-square relative bg-muted">
                <ImageIconIcon
                  src={meme.image_url || "/placeholder.svg"}
                  alt={meme.title}
                  className="object-cover"
                />
                {meme.is_meme_of_day && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-500 text-yellow-950">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Meme of Day
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{meme.title}</h3>
                {meme.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{meme.description}</p>
                )}
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(meme)}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(meme)}>
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
