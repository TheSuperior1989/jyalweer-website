"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, Link2, X, ImageIcon, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  bucket?: string
  folder?: string
  label?: string
}

export function ImageUpload({
  value,
  onChange,
  bucket = "images",
  folder = "uploads",
  label = "Image",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<"upload" | "url">("upload")
  const [urlInput, setUrlInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are accepted.")
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File must be under 10 MB.")
        return
      }

      setError(null)
      setIsUploading(true)

      const supabase = createClient()
      const ext = file.name.split(".").pop() ?? "jpg"
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, { contentType: file.type, upsert: false })

      if (uploadError) {
        setError(uploadError.message)
        setIsUploading(false)
        return
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      onChange(data.publicUrl)
      setIsUploading(false)
    },
    [bucket, folder, onChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) uploadFile(file)
    },
    [uploadFile]
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
    e.target.value = ""
  }

  const handleUrlCommit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setUrlInput("")
    }
  }

  const clearImage = () => {
    onChange("")
    setError(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1 text-sm w-fit">
        <button
          type="button"
          onClick={() => setTab("upload")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-colors",
            tab === "upload" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Upload className="h-3.5 w-3.5" />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setTab("url")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-colors",
            tab === "url" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Link2 className="h-3.5 w-3.5" />
          URL
        </button>
      </div>

      {tab === "upload" && (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50",
            isUploading && "pointer-events-none opacity-70"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium">Uploading...</p>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Drop image here or <span className="text-primary">click to browse</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, WebP — max 10 MB</p>
              </div>
            </>
          )}
        </div>
      )}

      {tab === "url" && (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleUrlCommit())}
          />
          <Button type="button" variant="outline" onClick={handleUrlCommit} disabled={!urlInput.trim()}>
            Set
          </Button>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}

      {value && (
        <div className="relative mt-2 overflow-hidden rounded-lg border border-border bg-muted">
          <div className="relative aspect-square w-full max-w-[200px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-end justify-end p-2">
              <button
                type="button"
                onClick={clearImage}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm hover:opacity-90"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1.5 border-t border-border bg-background px-3 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
            <p className="text-xs text-muted-foreground truncate max-w-[160px]">{value.split("/").pop()}</p>
          </div>
        </div>
      )}
    </div>
  )
}
