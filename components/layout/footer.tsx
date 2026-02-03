"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="font-serif text-2xl font-bold text-foreground">
              Jy Alweer?
            </Link>
            <p className="text-sm text-muted-foreground">
              Die amptelike tuiste van Suid-Afrika se gunsteling memes.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/jyalweer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/jyalweer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/jyalweer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Winkel</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=tshirts" className="text-muted-foreground hover:text-foreground">
                  Hemde / T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=hoodies" className="text-muted-foreground hover:text-foreground">
                  Truie / Hoodies
                </Link>
              </li>
              <li>
                <Link href="/shop?category=caps" className="text-muted-foreground hover:text-foreground">
                  Pette / Caps
                </Link>
              </li>
              <li>
                <Link href="/shop?category=stickers" className="text-muted-foreground hover:text-foreground">
                  Plakkers / Stickers
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Inligting</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/oor-ons" className="text-muted-foreground hover:text-foreground">
                  Oor Ons
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-muted-foreground hover:text-foreground">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/versendingsbeleid" className="text-muted-foreground hover:text-foreground">
                  Versendingsbeleid
                </Link>
              </li>
              <li>
                <Link href="/terugsendings" className="text-muted-foreground hover:text-foreground">
                  Terugsendings
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Regsake / Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privaatheidsbeleid" className="text-muted-foreground hover:text-foreground">
                  Privaatheidsbeleid
                </Link>
              </li>
              <li>
                <Link href="/terme-en-voorwaardes" className="text-muted-foreground hover:text-foreground">
                  Terme en Voorwaardes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Jy Alweer?. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
