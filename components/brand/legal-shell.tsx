import type { ReactNode } from "react"

interface LegalShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

/** Shared charcoal-band chrome for policy / legal pages */
export function LegalShell({ title, subtitle, children }: LegalShellProps) {
  return (
    <>
      <div className="page-hero-band">
        <span aria-hidden className="diamond-deco right-10 top-10 hidden md:block" />
        <div className="relative mx-auto max-w-4xl px-4">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-white/40">
            Grap blad · Policy
          </p>
          <h1 className="font-display text-4xl font-black tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          <div className="mt-4 brand-rule" />
          {subtitle && (
            <p className="mt-5 text-lg text-white/55 leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="page-shell-narrow">
        <div className="space-y-5">{children}</div>
      </div>
    </>
  )
}
