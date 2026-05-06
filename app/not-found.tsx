import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ShoppingBag, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center section-ink relative overflow-hidden">
      {/* Decorative bg */}
      <div
        aria-hidden
        className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none"
        style={{ color: "var(--lime)" }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "var(--lime)" }}
      />

      <div className="relative z-10 space-y-8 max-w-lg">
        {/* Giant 404 */}
        <div className="relative">
          <p
            className="font-display text-[10rem] font-black leading-none tracking-tighter select-none"
            style={{
              WebkitTextStroke: "2px var(--lime)",
              color: "transparent",
              opacity: 0.8,
            }}
            aria-hidden
          >
            404
          </p>
          {/* Sparkle accent */}
          <span
            className="absolute -right-2 top-4 text-4xl animate-float"
            aria-hidden
          >
            😅
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="font-display text-3xl font-black md:text-4xl" style={{ color: "var(--ink-foreground)" }}>
            Jy Alweer?
          </h1>
          <p className="text-xl font-semibold" style={{ color: "var(--lime)" }}>
            Hierdie bladsy bestaan nie.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "rgba(250,246,236,0.65)" }}>
            Of jy het die verkeerde URL getik, of iemand het die bladsy gesteel.{" "}
            <span style={{ color: "rgba(250,246,236,0.45)" }}>
              (Waarskynlik jy.)
            </span>
          </p>
        </div>

        {/* Meme card */}
        <div
          className="rounded-2xl border p-5 text-left mx-auto max-w-xs"
          style={{ borderColor: "rgba(250,246,236,0.12)", background: "rgba(250,246,236,0.06)" }}
        >
          <p className="text-sm font-medium mb-1" style={{ color: "rgba(250,246,236,0.5)" }}>
            Jy: "Ek gaan seker hierdie bladsy kry"
          </p>
          <p className="font-display text-lg font-bold" style={{ color: "var(--lime)" }}>
            Die internet:
          </p>
          <p className="text-2xl mt-1">🙅‍♂️ 404</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 font-bold"
              style={{ background: "var(--lime)", color: "var(--ink)" }}
            >
              <Home className="h-4 w-4" />
              Tuisblad
            </Button>
          </Link>
          <Link href="/shop">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 font-semibold"
              style={{ borderColor: "rgba(250,246,236,0.25)", color: "var(--ink-foreground)", background: "transparent" }}
            >
              <ShoppingBag className="h-4 w-4" />
              Winkel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
