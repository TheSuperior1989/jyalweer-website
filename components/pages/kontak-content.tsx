"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/contact/contact-form"
import { useLanguage } from "@/lib/language-context"

export function KontakContent() {
  const { language } = useLanguage()
  const af = language === "af"

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{af ? "Kontak Ons" : "Contact Us"}</h1>
        <p className="text-xl text-muted-foreground">
          {af
            ? "Ons hoor graag van jou! Stuur vir ons 'n boodskap en ons sal so gou as moontlik antwoord."
            : "We'd love to hear from you! Send us a message and we'll get back to you as soon as possible."}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{af ? "Kontak Inligting" : "Contact Information"}</CardTitle>
              <CardDescription>{af ? "Bereik ons op enige van hierdie maniere" : "Reach us in any of these ways"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📧</div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:info@jyalweer.co.za" className="text-sm text-primary hover:underline">
                    info@jyalweer.co.za
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-semibold">Facebook</h3>
                  <a href="https://www.facebook.com/JyAlweer" className="text-sm text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    @JyAlweer
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">⏰</div>
                <div>
                  <h3 className="font-semibold">{af ? "Besigheidsure" : "Business Hours"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {af ? "Maandag - Vrydag: 9:00 - 17:00" : "Monday - Friday: 9:00 - 17:00"}<br />
                    {af ? "Naweek: Gesluit" : "Weekend: Closed"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{af ? "Gereelde Vrae" : "Frequently Asked Questions"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">
                  {af ? "Hoe lank neem aflewering?" : "How long does delivery take?"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {af
                    ? "Gewoonlik 3-5 werksdae binne Suid-Afrika. Sien ons versendingsbeleid vir meer inligting."
                    : "Usually 3-5 working days within South Africa. See our shipping policy for more information."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  {af ? "Kan ek my bestelling terugsend?" : "Can I return my order?"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {af
                    ? "Ja! Ons aanvaar terugsendings binne 14 dae. Sien ons terugsendings beleid vir besonderhede."
                    : "Yes! We accept returns within 14 days. See our returns policy for details."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  {af ? "Watter betaalmetodes aanvaar julle?" : "What payment methods do you accept?"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {af
                    ? "Ons aanvaar alle groot krediet- en debietkaarte via ons veilige betaalpoort."
                    : "We accept all major credit and debit cards via our secure payment gateway."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{af ? "Stuur vir Ons 'n Boodskap" : "Send Us a Message"}</CardTitle>
              <CardDescription>
                {af ? "Vul die vorm in en ons sal binnekort antwoord" : "Fill in the form and we'll reply soon"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
