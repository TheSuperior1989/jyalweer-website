import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/home/hero-section"
import { MemeOfDay } from "@/components/home/meme-of-day"
import { FeaturedProducts } from "@/components/home/featured-products"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { FacebookPagePlugin } from "@/components/memes/facebook-feed"
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

      {/* Facebook Feed Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Fresh from Facebook</h2>
            <p className="text-muted-foreground">
              Follow us for daily memes and updates
            </p>
          </div>
          <div className="flex justify-center">
            <FacebookPagePlugin width={500} height={600} />
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  )
}
