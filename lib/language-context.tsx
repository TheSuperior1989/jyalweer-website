"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "af" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  af: {
    // Navigation
    "nav.home": "Tuis",
    "nav.memes": "Memes",
    "nav.shop": "Winkel",
    "nav.about": "Oor Ons",
    "nav.contact": "Kontak",
    "nav.account": "My Rekening",
    "nav.login": "Teken In",
    "nav.signup": "Registreer",
    "nav.logout": "Teken Uit",
    "nav.cart": "Mandjie",
    "nav.admin": "Admin",

    // Home
    "home.hero.title": "Jy Alweer?",
    "home.hero.subtitle": "Die amptelike tuiste van Suid-Afrika se gunsteling memes",
    "home.hero.cta": "Koop Nou",
    "home.hero.browse": "Blaai Deur Memes",
    "home.meme.title": "Meme van die Dag",
    "home.featured.title": "Uitgeligte Produkte",
    "home.featured.viewAll": "Sien Alle Produkte",
    "home.newsletter.title": "Bly Op Hoogte",
    "home.newsletter.subtitle": "Ontvang nuwe memes en spesiale aanbiedings in jou inkassie",
    "home.newsletter.placeholder": "Jou e-pos adres",
    "home.newsletter.button": "Teken In",
    "home.newsletter.success": "Dankie! Jy is nou ingeteken.",

    // Shop
    "shop.title": "Winkel",
    "shop.filter.all": "Alle Produkte",
    "shop.filter.tshirts": "Hemde",
    "shop.filter.hoodies": "Truie",
    "shop.filter.caps": "Pette",
    "shop.filter.stickers": "Plakkers",
    "shop.sort.featured": "Uitgelig",
    "shop.sort.newest": "Nuutste",
    "shop.sort.priceAsc": "Prys: Laag na Hoog",
    "shop.sort.priceDesc": "Prys: Hoog na Laag",
    "shop.addToCart": "Voeg by Mandjie",
    "shop.outOfStock": "Uit Voorraad",
    "shop.limitedDrop": "Beperkte Uitgawe",
    "shop.size": "Grootte",
    "shop.color": "Kleur",
    "shop.quantity": "Hoeveelheid",

    // Memes
    "memes.title": "Memes Galery",
    "memes.share": "Deel",
    "memes.facebook": "Sien op Facebook",

    // Cart
    "cart.title": "Jou Mandjie",
    "cart.empty": "Jou mandjie is leeg",
    "cart.continueShopping": "Gaan voort met inkopies",
    "cart.subtotal": "Subtotaal",
    "cart.shipping": "Versending",
    "cart.total": "Totaal",
    "cart.checkout": "Betaal Nou",
    "cart.remove": "Verwyder",

    // Checkout
    "checkout.title": "Betaal",
    "checkout.shipping.title": "Versending Inligting",
    "checkout.shipping.fullName": "Volle Naam",
    "checkout.shipping.address": "Straatadres",
    "checkout.shipping.city": "Stad",
    "checkout.shipping.province": "Provinsie",
    "checkout.shipping.postalCode": "Poskode",
    "checkout.shipping.phone": "Telefoon",
    "checkout.payment.title": "Betaling",
    "checkout.success": "Bestelling Suksesvol!",
    "checkout.success.message": "Dankie vir jou bestelling. Jy sal binnekort 'n bevestigings e-pos ontvang.",

    // Account
    "account.title": "My Rekening",
    "account.orders": "My Bestellings",
    "account.addresses": "Afleweringsadresse",
    "account.settings": "Instellings",
    "account.noOrders": "Jy het nog geen bestellings nie",

    // Auth
    "auth.login.title": "Teken In",
    "auth.login.email": "E-pos",
    "auth.login.password": "Wagwoord",
    "auth.login.button": "Teken In",
    "auth.login.noAccount": "Het jy nie 'n rekening nie?",
    "auth.signup.title": "Registreer",
    "auth.signup.fullName": "Volle Naam",
    "auth.signup.button": "Registreer",
    "auth.signup.hasAccount": "Het jy reeds 'n rekening?",
    "auth.forgotPassword": "Wagwoord vergeet?",

    // Footer
    "footer.about": "Oor Ons",
    "footer.contact": "Kontak",
    "footer.privacy": "Privaatheidsbeleid",
    "footer.terms": "Terme en Voorwaardes",
    "footer.shipping": "Versendingsbeleid",
    "footer.returns": "Terugsendings",
    "footer.copyright": "Alle regte voorbehou.",

    // Common
    "common.loading": "Laai...",
    "common.error": "Iets het verkeerd gegaan",
    "common.retry": "Probeer weer",
    "common.save": "Stoor",
    "common.cancel": "Kanselleer",
    "common.delete": "Verwyder",
    "common.edit": "Wysig",
    "common.close": "Sluit",
    "common.search": "Soek",
    "common.currency": "R",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.memes": "Memes",
    "nav.shop": "Shop",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.account": "My Account",
    "nav.login": "Sign In",
    "nav.signup": "Sign Up",
    "nav.logout": "Sign Out",
    "nav.cart": "Cart",
    "nav.admin": "Admin",

    // Home
    "home.hero.title": "Jy Alweer?",
    "home.hero.subtitle": "The official home of South Africa's favorite memes",
    "home.hero.cta": "Shop Now",
    "home.hero.browse": "Browse Memes",
    "home.meme.title": "Meme of the Day",
    "home.featured.title": "Featured Products",
    "home.featured.viewAll": "View All Products",
    "home.newsletter.title": "Stay Updated",
    "home.newsletter.subtitle": "Get new memes and special offers in your inbox",
    "home.newsletter.placeholder": "Your email address",
    "home.newsletter.button": "Subscribe",
    "home.newsletter.success": "Thanks! You are now subscribed.",

    // Shop
    "shop.title": "Shop",
    "shop.filter.all": "All Products",
    "shop.filter.tshirts": "T-Shirts",
    "shop.filter.hoodies": "Hoodies",
    "shop.filter.caps": "Caps",
    "shop.filter.stickers": "Stickers",
    "shop.sort.featured": "Featured",
    "shop.sort.newest": "Newest",
    "shop.sort.priceAsc": "Price: Low to High",
    "shop.sort.priceDesc": "Price: High to Low",
    "shop.addToCart": "Add to Cart",
    "shop.outOfStock": "Out of Stock",
    "shop.limitedDrop": "Limited Edition",
    "shop.size": "Size",
    "shop.color": "Color",
    "shop.quantity": "Quantity",

    // Memes
    "memes.title": "Memes Gallery",
    "memes.share": "Share",
    "memes.facebook": "View on Facebook",

    // Cart
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.continueShopping": "Continue Shopping",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.remove": "Remove",

    // Checkout
    "checkout.title": "Checkout",
    "checkout.shipping.title": "Shipping Information",
    "checkout.shipping.fullName": "Full Name",
    "checkout.shipping.address": "Street Address",
    "checkout.shipping.city": "City",
    "checkout.shipping.province": "Province",
    "checkout.shipping.postalCode": "Postal Code",
    "checkout.shipping.phone": "Phone",
    "checkout.payment.title": "Payment",
    "checkout.success": "Order Successful!",
    "checkout.success.message": "Thank you for your order. You will receive a confirmation email shortly.",

    // Account
    "account.title": "My Account",
    "account.orders": "My Orders",
    "account.addresses": "Shipping Addresses",
    "account.settings": "Settings",
    "account.noOrders": "You have no orders yet",

    // Auth
    "auth.login.title": "Sign In",
    "auth.login.email": "Email",
    "auth.login.password": "Password",
    "auth.login.button": "Sign In",
    "auth.login.noAccount": "Don't have an account?",
    "auth.signup.title": "Sign Up",
    "auth.signup.fullName": "Full Name",
    "auth.signup.button": "Sign Up",
    "auth.signup.hasAccount": "Already have an account?",
    "auth.forgotPassword": "Forgot password?",

    // Footer
    "footer.about": "About Us",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",
    "footer.shipping": "Shipping Policy",
    "footer.returns": "Returns",
    "footer.copyright": "All rights reserved.",

    // Common
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.retry": "Try again",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.close": "Close",
    "common.search": "Search",
    "common.currency": "R",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("af")

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored && (stored === "af" || stored === "en")) {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
