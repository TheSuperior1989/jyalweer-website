"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Logo } from "@/components/brand/logo"

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
    <footer className="section-ink relative border-t border-white/10">
      {/* White neon hairline — logo stroke */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 md:col-span-1">
            <Logo size="md" showWordmark={false} href="/" />
            <div>
              <p className="font-display text-lg font-black tracking-tight text-white">
                Jy Alweer?
              </p>
              <p className="mt-0.5 text-lg text-white/55 font-script">Grap blad</p>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Die amptelike tuiste van Suid-Afrika se snaakste memes.{" "}
              <span className="text-white/85 font-medium">Lag jy alweer?</span>
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-dashed border-white/20 text-white/55 transition-all hover:border-white/50 hover:text-white hover:scale-105"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white/90">
              Winkel
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white/90">
              Inligting
            </h3>
            <ul className="space-y-2.5">
              {infoLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + trust */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white/90">
              Regsake
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 rounded-xl border border-dashed border-white/15 bg-white/5 p-3">
              <p className="text-xs font-semibold text-white/80">Veilige betaling</p>
              <div className="flex flex-wrap gap-1.5">
                {["Visa", "MC", "Stripe"].map((brand) => (
                  <span
                    key={brand}
                    className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/45"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/40">
            &copy; {year} Jy Alweer? — {t("footer.copyright")}
          </p>
          <p className="text-sm text-white/40">
            Gemaak met <span className="text-white/80">❤</span> in Suid-Afrika
          </p>
        </div>
      </div>
    </footer>
  )
}
