"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const milestones = {
  af: [
    { year: "2019", emoji: "💡", title: "Die begin", body: "Iemand het 'n meme gepos. Mense het gelag. Jy Alweer? is gebore." },
    { year: "2021", emoji: "📈", title: "Die gemeenskap groei", body: "10 000 volgelinge. Die kommentaar afdeling word 'n plek waar Suid-Afrikaners saam lag, stry, en mekaar herken." },
    { year: "2023", emoji: "👕", title: "Merchandise — want die memes moet draagbaar wees", body: "Die eerste hemde is gedruk. Binne 'n week uitverkoop. Blykbaar wil mense hê ander mense moet sien dat hulle Jy Alweer? ken." },
    { year: "2024", emoji: "🚀", title: "Die amptelike winkel", body: "jyalweer.co.za is gebore. Produkte, nuwe memes elke week, en 'n gemeenskap wat groter word as wat enige iemand verwag het." },
  ],
  en: [
    { year: "2019", emoji: "💡", title: "The beginning", body: "Someone posted a meme. People laughed. Jy Alweer? was born." },
    { year: "2021", emoji: "📈", title: "The community grows", body: "10,000 followers. The comment section becomes a place where South Africans laugh, argue, and recognise each other." },
    { year: "2023", emoji: "👕", title: "Merchandise — because memes should be wearable", body: "The first shirts were printed. Sold out within a week. Turns out people want others to see they know Jy Alweer?." },
    { year: "2024", emoji: "🚀", title: "The official shop", body: "jyalweer.co.za was born. Products, new memes every week, and a community growing bigger than anyone expected." },
  ],
}

const stats = {
  af: [
    { value: "50k+", label: "Facebook volgelinge" },
    { value: "100%", label: "Suid-Afrikaans" },
    { value: "R65", label: "Vlak versending" },
    { value: "😂", label: "Lag per minuut" },
  ],
  en: [
    { value: "50k+", label: "Facebook followers" },
    { value: "100%", label: "South African" },
    { value: "R65", label: "Flat shipping" },
    { value: "😂", label: "Laughs per minute" },
  ],
}

const values = {
  af: [
    { emoji: "🇿🇦", title: "Trots Suid-Afrikaans", body: "Ons vier ons kultuur, ons taal, en ons unieke humor elke dag. Sonder verskoning." },
    { emoji: "✊", title: "Kwaliteit of niks", body: "As jy 'n hemp koop, wil jy hê dit moet nog steek na 50 was. Ons ook." },
    { emoji: "😂", title: "Humor is ernstige besigheid", body: "Ons neem ons lag baie ernstig. Elke meme is gekies met sorg. Elke produk met bedoeling." },
    { emoji: "🤝", title: "Gemeenskap eerste", body: "Jy is nie net 'n koper nie. Jy is deel van 'n beweging van mense wat dieselfde dinge snaaks vind." },
  ],
  en: [
    { emoji: "🇿🇦", title: "Proudly South African", body: "We celebrate our culture, our language, and our unique humour every day. Without apology." },
    { emoji: "✊", title: "Quality or nothing", body: "If you buy a shirt, you want it to hold up after 50 washes. So do we." },
    { emoji: "😂", title: "Humour is serious business", body: "We take our laughs very seriously. Every meme is chosen with care. Every product with intention." },
    { emoji: "🤝", title: "Community first", body: "You're not just a buyer. You're part of a movement of people who find the same things funny." },
  ],
}

export function OorOnsContent() {
  const { language } = useLanguage()
  const af = language === "af"

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative section-charcoal py-24 md:py-32 overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-16 h-40 w-40 rotate-45 border border-dashed border-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 bottom-12 h-28 w-28 rotate-45 border border-white/8"
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="relative mx-auto mb-8 inline-flex">
            <div
              aria-hidden
              className="absolute -inset-4 rotate-45 rounded-sm border border-dashed border-white/30"
            />
            <div
              aria-hidden
              className="absolute -inset-1.5 rotate-45 rounded-sm border-2 border-white/70"
            />
            <div className="relative z-10 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
              <Image
                src="/images/jyalweer-logo.jpg"
                alt="Jy Alweer? Grap blad"
                width={96}
                height={96}
                className="h-24 w-24 object-cover"
                priority
              />
            </div>
          </div>
          <h1 className="font-display text-5xl font-black tracking-tight md:text-7xl text-white">
            {af ? "Oor Ons" : "About Us"}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/60">
            {af
              ? <>Ons is nie net 'n meme-bladsy nie. Ons is{" "}<em className="not-italic font-bold text-white underline decoration-dashed decoration-white/50 underline-offset-4">die meme-bladsy</em>{" "}vir Suid-Afrikaners wat weet waarvan ons praat.</>
              : <>We're not just a meme page. We're{" "}<em className="not-italic font-bold text-white underline decoration-dashed decoration-white/50 underline-offset-4">the meme page</em>{" "}for South Africans who know what we're talking about.</>
            }
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {stats[language].map(({ value, label }) => (
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
                {af ? "Ons storie" : "Our story"}
              </p>
              <h2 className="mb-6 font-display text-4xl font-black tracking-tight text-foreground md:text-5xl">
                {af ? "Gebore uit 'n liefde vir lag." : "Born from a love of laughter."}
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                {af ? (
                  <>
                    <p>Jy Alweer? is gebore op 'n gewone dag toe iemand 'n gewone meme gepos het — en die hele Suid-Afrika het herken.{" "}<strong className="text-foreground">Dít is hoe ons werk.</strong>{" "}Nie gedwonge humor nie. Net dinge wat werklik snaaks is vir mense wat hier bly.</p>
                    <p>Ons het begin as 'n Facebook-bladsy. Ons is nou 'n gemeenskap, 'n winkel, en 'n beweging van mense wat dagdag bewys dat Suid-Afrikaanse humor{" "}<em className="text-foreground not-italic font-semibold">sonder weerga</em>{" "}is.</p>
                    <p>Elke produk wat jy van ons koop dra hierdie storie saam. Dra dit, deel dit, en kyk hoe vinnig iemand anders ook lag.</p>
                  </>
                ) : (
                  <>
                    <p>Jy Alweer? was born on an ordinary day when someone posted an ordinary meme — and all of South Africa recognised it.{" "}<strong className="text-foreground">That's how we work.</strong>{" "}No forced humour. Just things that are genuinely funny to people who live here.</p>
                    <p>We started as a Facebook page. We're now a community, a shop, and a movement of people who prove every day that South African humour is{" "}<em className="text-foreground not-italic font-semibold">unmatched</em>.</p>
                    <p>Every product you buy from us carries this story. Wear it, share it, and watch how quickly someone else laughs too.</p>
                  </>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {milestones[language].map(({ year, title, body, emoji }, i) => (
                <div key={year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-card text-base">{emoji}</div>
                    {i < milestones[language].length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                  </div>
                  <div className={`pb-8 ${i === milestones[language].length - 1 ? "pb-0" : ""}`}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1 text-muted-foreground">{year}</p>
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
              {af ? "Ons waardes" : "Our values"}
            </p>
            <h2 className="font-display text-4xl font-black tracking-tight text-foreground md:text-5xl">
              {af ? "Hoekom Jy Alweer?" : "Why Jy Alweer?"}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values[language].map(({ emoji, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 transition-all card-lift">
                <div className="mb-4 text-3xl">{emoji}</div>
                <h3 className="mb-2 font-display text-base font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 section-charcoal relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute right-10 top-10 h-28 w-28 rotate-45 border border-dashed border-white/10"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <p className="font-display text-5xl font-black tracking-tight mb-6 md:text-6xl text-white">
            {af ? <>Klaar gelees?<br /><span className="font-script font-normal tracking-wide text-white/85">Koop iets.</span></> : <>Done reading?<br /><span className="font-script font-normal tracking-wide text-white/85">Buy something.</span></>}
          </p>
          <p className="mb-8 text-lg text-white/55">
            {af
              ? "Die beste manier om deel van die familie te word is om iets te dra wat almal laat weet jy is dit."
              : "The best way to become part of the family is to wear something that lets everyone know you are."}
          </p>
          <Link href="/shop">
            <Button size="lg" className="gap-2 font-bold px-10 text-base">
              {af ? "Sien ons winkel" : "See our shop"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
