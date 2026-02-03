import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Kontak Ons | Jy Alweer?",
  description: "Kom in kontak met die Jy Alweer? span",
}

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Kontak Ons</h1>
        <p className="text-xl text-muted-foreground">
          Ons hoor graag van jou! Stuur vir ons 'n boodskap en ons sal so gou as moontlik antwoord.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kontak Inligting</CardTitle>
              <CardDescription>Bereik ons op enige van hierdie maniere</CardDescription>
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
                  <a 
                    href="https://www.facebook.com/JyAlweer" 
                    className="text-sm text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @JyAlweer
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">⏰</div>
                <div>
                  <h3 className="font-semibold">Besigheidsure</h3>
                  <p className="text-sm text-muted-foreground">
                    Maandag - Vrydag: 9:00 - 17:00<br />
                    Naweek: Gesluit
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gereelde Vrae</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Hoe lank neem aflewering?</h3>
                <p className="text-sm text-muted-foreground">
                  Gewoonlik 3-5 werksdae binne Suid-Afrika. Sien ons versendingsbeleid vir meer inligting.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Kan ek my bestelling terugsend?</h3>
                <p className="text-sm text-muted-foreground">
                  Ja! Ons aanvaar terugsendings binne 14 dae. Sien ons terugsendings beleid vir besonderhede.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Watter betaalmetodes aanvaar julle?</h3>
                <p className="text-sm text-muted-foreground">
                  Ons aanvaar alle groot krediet- en debietkaarte via ons veilige betaalpoort.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Stuur vir Ons 'n Boodskap</CardTitle>
              <CardDescription>Vul die vorm in en ons sal binnekort antwoord</CardDescription>
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

