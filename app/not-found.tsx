import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ShoppingBag, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center section-charcoal relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 right-1/4 h-48 w-48 rotate-45 border border-dashed border-white/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 left-1/5 h-32 w-32 rotate-45 border border-white/8"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl pointer-events-none bg-white"
      />

      <div className="relative z-10 space-y-8 max-w-lg">
        <div className="relative">
          <p
            className="font-display text-[10rem] font-black leading-none tracking-tighter select-none"
            style={{
              WebkitTextStroke: "2px rgba(255,255,255,0.9)",
              color: "transparent",
              opacity: 0.85,
            }}
            aria-hidden
          >
            404
          </p>
          <span className="absolute -right-2 top-4 text-4xl animate-float" aria-hidden>
            😅
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="font-display text-3xl font-black md:text-4xl text-white">
            Jy Alweer?
          </h1>
          <p className="font-script text-2xl text-white/70">Grap blad</p>
          <p className="text-xl font-semibold text-white">
            Hierdie bladsy bestaan nie.
          </p>
          <p className="text-base leading-relaxed text-white/55">
            Of jy het die verkeerde URL getik, of iemand het die bladsy gesteel.{" "}
            <span className="text-white/35">(Waarskynlik jy.)</span>
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-5 text-left mx-auto max-w-xs">
          <p className="text-sm font-medium mb-1 text-white/45">
            Jy: &quot;Ek gaan seker hierdie bladsy kry&quot;
          </p>
          <p className="font-display text-lg font-bold text-white">
            Die internet:
          </p>
          <p className="text-2xl mt-1">🙅‍♂️ 404</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 font-bold"
            >
              <Home className="h-4 w-4" />
              Tuisblad
            </Button>
          </Link>
          <Link href="/shop">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 font-semibold border-dashed"
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
