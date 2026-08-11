import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  kicker?: string
  title: string
  subtitle?: string
  /** charcoal band hero vs inline light header */
  variant?: "band" | "inline"
  align?: "left" | "center"
  className?: string
  children?: ReactNode
}

export function PageHeader({
  kicker,
  title,
  subtitle,
  variant = "inline",
  align = "left",
  className,
  children,
}: PageHeaderProps) {
  if (variant === "band") {
    return (
      <div className={cn("page-hero-band", className)}>
        <span aria-hidden className="diamond-deco right-8 top-8 hidden md:block" />
        <span aria-hidden className="diamond-deco-solid left-10 bottom-6 hidden md:block" />
        <div
          className={cn(
            "relative mx-auto max-w-7xl px-4",
            align === "center" && "text-center"
          )}
        >
          {kicker && (
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-white/45">
              {kicker}
            </p>
          )}
          <h1 className="font-display text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div
            className={cn(
              "mt-4 brand-rule",
              align === "center" && "mx-auto"
            )}
          />
          {subtitle && (
            <p
              className={cn(
                "mt-5 max-w-2xl text-lg leading-relaxed text-white/55",
                align === "center" && "mx-auto"
              )}
            >
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "mb-10 md:mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {kicker && <p className="page-kicker">{kicker}</p>}
      <h1 className="page-title">{title}</h1>
      <div className={cn("mt-3 brand-rule", align === "center" && "mx-auto")} />
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
      {children}
    </div>
  )
}
