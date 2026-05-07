import type { Metadata } from "next"
import { KontakContent } from "@/components/pages/kontak-content"

export const metadata: Metadata = {
  title: "Kontak",
  description: "Kom in kontak met die Jy Alweer? span",
}

export default function KontakPage() {
  return <KontakContent />
}
