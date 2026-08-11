import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type LogoSize = "sm" | "md" | "lg" | "xl" | "hero"

const sizeMap: Record<
  LogoSize,
  { box: string; img: number; showWordmark?: boolean }
> = {
  sm: { box: "h-9 w-9", img: 36 },
  md: { box: "h-11 w-11", img: 44 },
  lg: { box: "h-14 w-14", img: 56 },
  xl: { box: "h-20 w-20", img: 80 },
  hero: { box: "h-56 w-56 md:h-72 md:w-72", img: 288 },
}

interface LogoProps {
  size?: LogoSize
  href?: string | null
  showWordmark?: boolean
  className?: string
  priority?: boolean
  /** When true, logo sits in a diamond frame matching brand mark */
  framed?: boolean
}

export function Logo({
  size = "md",
  href = "/",
  showWordmark = false,
  className,
  priority = false,
  framed = false,
}: LogoProps) {
  const { box, img } = sizeMap[size]

  const mark = (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden bg-[#16191f] shadow-lg ring-1 ring-white/10",
        framed ? "rounded-sm rotate-0" : "rounded-xl",
        box,
        className
      )}
    >
      <Image
        src="/images/jyalweer-logo.jpg"
        alt="Jy Alweer? Grap blad"
        width={img}
        height={img}
        className="h-full w-full object-cover"
        priority={priority}
      />
    </span>
  )

  const content = (
    <span className="inline-flex items-center gap-2.5 group">
      {framed ? (
        <span className="relative inline-flex items-center justify-center p-1.5">
          {/* Outer dashed diamond */}
          <span
            aria-hidden
            className="absolute inset-0 rotate-45 rounded-[2px] border border-dashed border-foreground/25"
          />
          {/* Inner solid diamond ring */}
          <span
            aria-hidden
            className="absolute inset-1 rotate-45 rounded-[2px] border border-foreground/40"
          />
          <span className="relative z-10">{mark}</span>
        </span>
      ) : (
        mark
      )}
      {showWordmark && (
        <span className="hidden sm:flex flex-col leading-none group-hover:opacity-90 transition-opacity">
          <span className="font-display text-lg font-black tracking-tight text-foreground">
            Jy Alweer?
          </span>
          <span className="mt-0.5 text-sm text-muted-foreground font-script tracking-wide">
            Grap blad
          </span>
        </span>
      )}
    </span>
  )

  if (href === null) return content

  return (
    <Link href={href} className="inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
      {content}
    </Link>
  )
}
