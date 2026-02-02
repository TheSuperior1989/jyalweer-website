import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProductDetails } from "@/components/shop/product-details"
import type { Product } from "@/lib/types"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  
  try {
    const supabase = await createClient()
    const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error || !product) {
      return {
        title: "Product Not Found | Jy Alweer?",
      }
    }

    return {
      title: `${product.name} | Jy Alweer?`,
      description: product.description || `Koop ${product.name} by Jy Alweer?`,
    }
  } catch (e) {
    return {
      title: "Product Not Found | Jy Alweer?",
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  
  try {
    const supabase = await createClient()
    const { data: productData, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error || !productData) {
      notFound()
    }

    const product = productData as Product

    // Fetch related products
    let relatedProducts: Product[] = []
    try {
      const { data: relatedData } = await supabase
        .from("products")
        .select("*")
        .eq("category", product.category)
        .eq("in_stock", true)
        .neq("id", id)
        .limit(4)

      relatedProducts = (relatedData as Product[]) || []
    } catch (e) {
      // Related products fetch failed
    }

    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <ProductDetails product={product} relatedProducts={relatedProducts} />
      </div>
    )
  } catch (e) {
    notFound()
  }
}
