import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Oor Ons",
  description: "Die storie agter Jy Alweer? — Suid-Afrika se meme-merk wat nie op pad is nie.",
}

const milestones = [
  {
    year: "2019",
    title: "Die begin",
    body: "Iemand het 'n meme gepos. Mense het gelag. Jy Alweer? is gebore.",
    emoji: "💡",
  },
  {
    year: "2021",
    title: "Die gemeenskap groei",
    body: "10 000 volgelinge. Die kommentaar afdeling word 'n plek waar Suid-Afrikaners saam lag, stry, en mekaar herken.",
    emoji: "📈",
  },
  {
    year: "2023",
    title: "Merchandise — want die memes moet draagbaar wees",
    body: "Die eerste hemde is gedruk. Binne 'n week uitverkoop. Blykbaar wil mense hê ander mense moet sien dat hulle Jy Alweer? ken.",
    emoji: "👕",
  },
  {
    year: "2024",
    title: "Die amptelike winkel",
    body: "jyalweer.co.za is gebore. Produkte, nuwe memes elke week, en 'n gemeenskap wat groter word as wat enige iemand verwag het.",
    emoji: "🚀",
  },
]

const stats = [
  { value: "50k+", label: "Facebook volgelinge" },
  { value: "100%", label: "Suid-Afrikaans" },
  { value: "R65", label: "Vlak versending" },
  { value: "😂", label: "Lag per minuut" },
]

const values = [
  {
    emoji: "🇿🇦",
    title: "Trots Suid-Afrikaans",
    body: "Ons vier ons kultuur, ons taal, en ons unieke humor elke dag. Sonder verskoning.",
  },
  {
    emoji: "✊",
    title: "Kwaliteit of niks",
    body: "As jy 'n hemp koop, wil jy hê dit moet nog steek na 50 was. Ons ook.",
  },
  {
    emoji: "😂",
    title: "Humor is ernstige besigheid",
    body: "Ons neem ons lag baie ernstig. Elke meme is gekies met sorg. Elke produk met bedoeling.",
  },
  {
    emoji: "🤝",
    title: "Gemeenskap eerste",
    body: "Jy is nie net 'n koper nie. Jy is deel van 'n beweging van mense wat dieselfde dinge snaaks vind.",
  },
]

export default function OorOnsPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative section-ink py-24 md:py-32">
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--lime)" }} />
        <div
          aria-hidden
          className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none"
          style={{ color: "var(--lime)" }}
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl shadow-2xl"
            style={{ background: "var(--lime)" }}
          >
            <Image
              src="/images/JyAlweerGrapBlad.svg"
              alt="Jy Alweer?"
              width={52}
              height={52}
              className="object-contain"
            />
          </div>
          <h1
            className="font-display text-5xl font-black tracking-tight md:text-7xl"
            style={{ color: "var(--ink-foreground)" }}
          >
            Oor Ons
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed"
            style={{ color: "rgba(250,246,236,0.7)" }}
          >
            Ons is nie net 'n meme-bladsy nie. Ons is{" "}
            <em style={{ color: "var(--lime)", fontStyle: "normal", fontWeight: 700 }}>
              die meme-bladsy
            </em>{" "}
            vir Suid-Afrikaners wat weet waarvan ons praat.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center py-8 px-4 text-center">
                <p className="font-display text-3xl font-black text-foreground md:text-4xl">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Ons storie
              </p>
              <h2 className="mb-6 font-display text-4xl font-black tracking-tight text-foreground md:text-5xl">
                Gebore uit 'n liefde vir lag.
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Jy Alweer? is gebore op 'n gewone dag toe iemand 'n gewone meme gepos het — en die hele Suid-Afrika het herken.{" "}
                  <strong className="text-foreground">Dít is hoe ons werk.</strong>{" "}
                  Nie gedwonge humor nie. Net dinge wat werklik snaaks is vir mense wat hier bly.
                </p>
                <p>
                  Ons het begin as 'n Facebook-bladsy. Ons is nou 'n gemeenskap, 'n winkel, en 'n beweging van mense wat dagdag bewys dat Suid-Afrikaanse humor{" "}
                  <em className="text-foreground not-italic font-semibold">sonder weerga</em>{" "}
                  is.
                </p>
                <p>
                  Elke produk wat jy van ons koop dra hierdie storie saam. Dra dit, deel dit, en kyk hoe vinnig iemand anders ook lag.
                </p>
              </div>
            </div>

            {/* Lore timeline */}
            <div className="space-y-0">
              {milestones.map(({ year, title, body, emoji }, i) => (
                <div key={year} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-card text-base"
                    >
                      {emoji}
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-border my-1" />
                    )}
                  </div>
                  <div className={`pb-8 ${i === milestones.length - 1 ? "pb-0" : ""}`}>
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ color: "var(--terra)" }}
                    >
                      {year}
                    </p>
                    <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Ons waardes
            </p>
            <h2 className="font-display text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Hoekom Jy Alweer?
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ emoji, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 transition-all card-lift"
              >
                <div className="mb-4 text-3xl">{emoji}</div>
                <h3 className="mb-2 font-display text-base font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 section-ink relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none"
          style={{ color: "var(--lime)" }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <p
            className="font-display text-5xl font-black tracking-tight mb-6 md:text-6xl"
            style={{ color: "var(--ink-foreground)" }}
          >
            Klaar gelees?
            <br />
            <span style={{ color: "var(--lime)" }}>Koop iets.</span>
          </p>
          <p className="mb-8 text-lg" style={{ color: "rgba(250,246,236,0.65)" }}>
            Die beste manier om deel van die familie te word is om iets te dra wat almal laat weet jy is dit.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="gap-2 font-bold px-10 text-base"
              style={{ background: "var(--lime)", color: "var(--ink)" }}
            >
              Sien ons winkel
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
