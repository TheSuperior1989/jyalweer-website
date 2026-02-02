import { createClient } from "@/lib/supabase/server"
import { MemesManager } from "@/components/admin/memes-manager"

export default async function AdminMemesPage() {
  const supabase = await createClient()
  const { data: memes } = await supabase
    .from("memes")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <MemesManager initialMemes={memes || []} />
    </div>
  )
}
