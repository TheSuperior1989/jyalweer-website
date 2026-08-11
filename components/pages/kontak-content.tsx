"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/contact/contact-form"
import { useLanguage } from "@/lib/language-context"
import { PageHeader } from "@/components/brand/page-header"
import { Mail, Facebook, Clock } from "lucide-react"

export function KontakContent() {
  const { language } = useLanguage()
  const af = language === "af"

  return (
    <>
      <PageHeader
        variant="band"
        kicker={af ? "Praat met ons" : "Get in touch"}
        title={af ? "Kontak Ons" : "Contact Us"}
        subtitle={
          af
            ? "Ons hoor graag van jou! Stuur vir ons 'n boodskap en ons sal so gou as moontlik antwoord."
            : "We'd love to hear from you! Send us a message and we'll get back to you as soon as possible."
        }
      />

      <div className="page-shell-narrow">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>{af ? "Kontak Inligting" : "Contact Information"}</CardTitle>
                <CardDescription>
                  {af
                    ? "Bereik ons op enige van hierdie maniere"
                    : "Reach us in any of these ways"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  {
                    Icon: Mail,
                    title: "Email",
                    body: (
                      <a
                        href="mailto:info@jyalweer.co.za"
                        className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
                      >
                        info@jyalweer.co.za
                      </a>
                    ),
                  },
                  {
                    Icon: Facebook,
                    title: "Facebook",
                    body: (
                      <a
                        href="https://www.facebook.com/JyAlweer"
                        className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @JyAlweer
                      </a>
                    ),
                  },
                  {
                    Icon: Clock,
                    title: af ? "Besigheidsure" : "Business Hours",
                    body: (
                      <p className="text-sm text-muted-foreground">
                        {af ? "Maandag - Vrydag: 9:00 - 17:00" : "Monday - Friday: 9:00 - 17:00"}
                        <br />
                        {af ? "Naweek: Gesluit" : "Weekend: Closed"}
                      </p>
                    ),
                  },
                ].map(({ Icon, title, body }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-dashed border-border"
                      style={{ background: "var(--charcoal)" }}
                    >
                      <Icon className="h-4 w-4 text-white/80" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{title}</h3>
                      {body}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>
                  {af ? "Gereelde Vrae" : "Frequently Asked Questions"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  {
                    q: af ? "Hoe lank neem aflewering?" : "How long does delivery take?",
                    a: af
                      ? "Gewoonlik 3-5 werksdae binne Suid-Afrika. Sien ons versendingsbeleid vir meer inligting."
                      : "Usually 3-5 working days within South Africa. See our shipping policy for more information.",
                  },
                  {
                    q: af ? "Kan ek my bestelling terugsend?" : "Can I return my order?",
                    a: af
                      ? "Ja! Ons aanvaar terugsendings binne 14 dae. Sien ons terugsendings beleid vir besonderhede."
                      : "Yes! We accept returns within 14 days. See our returns policy for details.",
                  },
                  {
                    q: af
                      ? "Watter betaalmetodes aanvaar julle?"
                      : "What payment methods do you accept?",
                    a: af
                      ? "Ons aanvaar alle groot krediet- en debietkaarte via ons veilige betaalpoort."
                      : "We accept all major credit and debit cards via our secure payment gateway.",
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="border-l-2 border-white/40 pl-4">
                    <h3 className="font-semibold text-foreground mb-1 text-sm">{q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-border h-fit">
            <CardHeader>
              <CardTitle>
                {af ? "Stuur vir Ons 'n Boodskap" : "Send Us a Message"}
              </CardTitle>
              <CardDescription>
                {af
                  ? "Vul die vorm in en ons sal binnekort antwoord"
                  : "Fill in the form and we'll reply soon"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
