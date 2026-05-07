import type { Metadata } from "next"
import { OorOnsContent } from "@/components/pages/oor-ons-content"

export const metadata: Metadata = {
  title: "Oor Ons",
  description: "Die storie agter Jy Alweer? — Suid-Afrika se meme-merk wat nie op pad is nie.",
}

export default function OorOnsPage() {
  return <OorOnsContent />
}
