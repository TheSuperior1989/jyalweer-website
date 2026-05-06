"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const shopLinks = [
    { href: "/shop?category=tshirts", label: "Hemde / T-Shirts" },
    { href: "/shop?category=hoodies", label: "Truie / Hoodies" },
    { href: "/shop?category=caps", label: "Pette / Caps" },
    { href: "/shop?category=stickers", label: "Plakkers / Stickers" },
  ]

  const infoLinks = [
    { href: "/oor-ons", label: "Oor Ons" },
    { href: "/kontak", label: "Kontak" },
    { href: "/versendingsbeleid", label: "Versendingsbeleid" },
    { href: "/terugsendings", label: "Terugsendings" },
  ]

  const legalLinks = [
    { href: "/privaatheidsbeleid", label: "Privaatheidsbeleid" },
    { href: "/terme-en-voorwaardes", label: "Terme en Voorwaardes" },
  ]

  return (
    <footer className="border-t border-border bg-background">
      {/* Top band */}
      <div className="h-1 w-full" style={{ background: "var(--lime)" }} />

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <Image
                src="/images/JyAlweerGrapBlad.svg"
                alt="Jy Alweer?"
                width={40}
                height={40}
                className="shrink-0 transition-transform group-hover:scale-105"
              />
              <span className="font-display text-xl font-black tracking-tight text-foreground">
                Jy Alweer?
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Die amptelike tuiste van Suid-Afrika se snaakste memes.{" "}
              <span className="text-foreground font-medium">Lag jy alweer?</span>
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://www.facebook.com/JyAlweer", Icon: Facebook, label: "Facebook" },
                { href: "https://instagram.com/jyalweer", Icon: Instagram, label: "Instagram" },
                { href: "https://twitter.com/jyalweer", Icon: Twitter, label: "Twitter" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-foreground hover:text-foreground hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
              Winkel
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground hover-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
              Inligting
            </h3>
            <ul className="space-y-2.5">
              {infoLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground hover-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + trust signals */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
              Regsake
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground hover-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust signals */}
            <div className="mt-6 space-y-2 rounded-xl border border-border bg-muted/50 p-3">
              <p className="text-xs font-semibold text-foreground">Veilige betaling</p>
              <div className="flex flex-wrap gap-1.5">
                {["Visa", "MC", "Stripe"].map((brand) => (
                  <span
                    key={brand}
                    className="rounded border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {year} Jy Alweer? — {t("footer.copyright")}
          </p>
          <p className="text-sm text-muted-foreground">
            Gemaak met <span className="text-foreground">❤</span> in Suid-Afrika
          </p>
        </div>
      </div>
    </footer>
  )
}
