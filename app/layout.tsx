import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk, Geist_Mono, Pacifico } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/lib/language-context"
import { CartProvider } from "@/lib/cart-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
})
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
/** Script accent matching logo "Grap blad" wordmark */
const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
})

export const metadata: Metadata = {
  title: {
    default: "Jy Alweer? | Suid-Afrikaanse Meme Winkel",
    template: "%s | Jy Alweer?",
  },
  description:
    "Die amptelike tuiste van Jy Alweer? memes. Koop hemde, truie, en pette met jou gunsteling Afrikaanse memes. The official home of Jy Alweer? memes.",
  keywords: [
    "Jy Alweer",
    "Afrikaanse memes",
    "South African memes",
    "Suid-Afrikaanse humor",
    "meme merchandise",
    "Afrikaans t-shirts",
  ],
  authors: [{ name: "Jy Alweer?" }],
  creator: "Jy Alweer?",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://jyalweer.co.za"),
  openGraph: {
    type: "website",
    locale: "af_ZA",
    alternateLocale: "en_ZA",
    url: "https://jyalweer.co.za",
    siteName: "Jy Alweer?",
    title: "Jy Alweer? | Suid-Afrikaanse Meme Winkel",
    description:
      "Die amptelike tuiste van Jy Alweer? memes. Koop hemde, truie, en pette met jou gunsteling Afrikaanse memes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jy Alweer? | Suid-Afrikaanse Meme Winkel",
    description: "Die amptelike tuiste van Jy Alweer? memes.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#1a1f27",
  width: "device-width",
  initialScale: 1,
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Jy Alweer?",
  url: "https://jyalweer.co.za",
  logo: "https://jyalweer.co.za/images/jyalweer-logo.jpg",
  sameAs: [
    "https://www.facebook.com/JyAlweer",
    "https://instagram.com/jyalweer",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@jyalweer.co.za",
    contactType: "customer service",
    areaServed: "ZA",
    availableLanguage: ["Afrikaans", "English"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="af" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} ${pacifico.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <LanguageProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
