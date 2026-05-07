import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/home/hero-section"
import { MemeOfDay } from "@/components/home/meme-of-day"
import { FeaturedProducts } from "@/components/home/featured-products"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { FacebookSection } from "@/components/home/facebook-section"
import type { Meme, Product } from "@/lib/types"

export default async function HomePage() {
  const supabase = await createClient()

  let meme: Meme | null = null
  let products: Product[] = []
  let heroProduct: Product | null = null

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
      .eq("is_featured", true)
      .eq("is_active", true)
      .limit(4)
      .order("created_at", { ascending: false })

    if (!productsError) {
      products = (productsData as Product[]) || []
    }
  } catch (e) {
    // Table might not exist yet
  }

  try {
    // Hero product: prefer limited drop, fall back to any featured
    const { data: limitedData } = await supabase
      .from("products")
      .select("*")
      .eq("is_limited_drop", true)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (limitedData) {
      heroProduct = limitedData as Product
    } else {
      const { data: featuredData } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()
      if (featuredData) heroProduct = featuredData as Product
    }
  } catch (e) {
    // no product available
  }

  return (
    <>
      <HeroSection memeOfDay={meme} featuredProduct={heroProduct} />
      <MemeOfDay meme={meme} />
      <FeaturedProducts products={products} />

      <FacebookSection />

      <NewsletterSection />
    </>
  )
}
