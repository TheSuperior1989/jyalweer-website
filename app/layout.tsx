import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/lib/language-context"
import { CartProvider } from "@/lib/cart-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

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
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7a6a4f" },
    { media: "(prefers-color-scheme: dark)", color: "#2d2820" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="af" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased`}>
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
