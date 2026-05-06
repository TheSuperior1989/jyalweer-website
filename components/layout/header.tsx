"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, User, Globe, X, Sparkles } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { totalItems } = useCart()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .single()
        setIsAdmin(profile?.is_admin || false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
  }

  const navLinks = [
    { href: "/memes", label: t("nav.memes") },
    { href: "/shop", label: t("nav.shop") },
    { href: "/oor-ons", label: t("nav.about") },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-background p-0">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/images/JyAlweerGrapBlad.svg"
                    alt="Jy Alweer?"
                    width={36}
                    height={36}
                    className="shrink-0"
                  />
                  <span className="font-display text-lg font-bold tracking-tight">
                    Jy Alweer?
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-1 px-4 py-6">
                <Link
                  href="/"
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.home")}
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {user && (
                  <Link
                    href="/account"
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.account")}
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.admin")}
                  </Link>
                )}
              </nav>

              {/* Mobile CTA */}
              <div className="border-t border-border px-4 py-6">
                <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full gap-2 font-bold" size="lg">
                    <Sparkles className="h-4 w-4" />
                    {t("nav.shop")}
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/images/JyAlweerGrapBlad.svg"
              alt="Jy Alweer?"
              width={36}
              height={36}
              className="shrink-0 transition-transform duration-200 group-hover:scale-110"
              priority
            />
            <span className="font-display text-xl font-bold tracking-tight text-foreground hidden sm:block">
              Jy Alweer?
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Change language">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card min-w-32">
              <DropdownMenuItem
                onClick={() => setLanguage("af")}
                className={language === "af" ? "bg-primary/10 font-semibold" : ""}
              >
                🇿🇦 Afrikaans
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={language === "en" ? "bg-primary/10 font-semibold" : ""}
              >
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Link href="/cart" aria-label={t("nav.cart")}>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* User / auth */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label={t("nav.account")}>
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card">
                <DropdownMenuItem asChild>
                  <Link href="/account">{t("nav.account")}</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">{t("nav.admin")}</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleSignOut}>{t("nav.logout")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-sm">
                  {t("nav.login")}
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  size="sm"
                  className="bg-foreground text-background hover:bg-foreground/90 font-semibold text-sm"
                >
                  {t("nav.shop")}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
