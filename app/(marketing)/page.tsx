import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/home/hero-section"
import { MemeOfDay } from "@/components/home/meme-of-day"
import { FeaturedProducts } from "@/components/home/featured-products"
import { NewsletterSection } from "@/components/home/newsletter-section"
import type { Meme, Product } from "@/lib/types"

export default async function HomePage() {
  const supabase = await createClient()

  let meme: Meme | null = null
  let products: Product[] = []

  try {
    // Fetch meme of the day
    const { data: memeData, error: memeError } = await supabase
      .from("memes")
      .select("*")
      .eq("is_meme_of_day", true)
      .eq("is_active", true)
      .single()

    if (!memeError) {
      meme = memeData as Meme
    }
  } catch (e) {
    // Table might not exist yet
  }

  try {
    // Fetch featured products
    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .eq("in_stock", true)
      .limit(4)
      .order("created_at", { ascending: false })

    if (!productsError) {
      products = (productsData as Product[]) || []
    }
  } catch (e) {
    // Table might not exist yet
  }

  return (
    <>
      <HeroSection />
      <MemeOfDay meme={meme} />
      <FeaturedProducts products={products} />
      <NewsletterSection />
    </>
  )
}
