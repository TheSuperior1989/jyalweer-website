import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terugsendings & Terugbetalings | Jy Alweer?",
  description: "Ons terugsendings en terugbetalingsbeleid",
}

export default function TerugsendingesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Terugsendings & Terugbetalings</h1>
        <p className="text-xl text-muted-foreground">
          Ons wil hê jy moet 100% tevrede wees met jou aankoop
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Ons Terugsendings Beleid</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ons verstaan dat soms dinge nie uitwerk soos beplan nie. Daarom bied ons 'n eenvoudige 
                en regverdige terugsendings beleid aan.
              </p>
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                <p className="font-semibold text-foreground">
                  Jy het 14 dae vanaf ontvangs van jou bestelling om items terug te stuur.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Voorwaardes vir Terugsendings</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Om vir 'n terugbetaling of omruiling te kwalifiseer, moet items:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Binne 14 dae na ontvangs teruggestuur word</li>
                <li>In hul oorspronklike toestand wees (ongedra, ongewas, met etikette)</li>
                <li>In die oorspronklike verpakking wees (waar moontlik)</li>
                <li>Vergesel word van die oorspronklike bewys van aankoop</li>
              </ul>
              <div className="mt-4 bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Let wel:</strong> Ons kan nie items aanvaar wat gedra, gewas, of beskadig is nie, 
                  tensy die item foutief of beskadig ontvang is.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Hoe om Terug te Stuur</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Volg hierdie eenvoudige stappe:</p>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>
                  <strong>Kontak Ons:</strong> Stuur 'n epos na info@jyalweer.co.za met jou 
                  bestellingsnommer en rede vir terugstuur
                </li>
                <li>
                  <strong>Wag vir Goedkeuring:</strong> Ons sal jou terugstuur binne 24 uur goedkeur 
                  en instruksies stuur
                </li>
                <li>
                  <strong>Verpak die Item:</strong> Verpak die item veilig in die oorspronklike verpakking
                </li>
                <li>
                  <strong>Stuur Terug:</strong> Stuur die item terug na die adres wat ons verskaf. 
                  Hou asseblief die spoornommer
                </li>
                <li>
                  <strong>Ontvang Terugbetaling:</strong> Sodra ons die item ontvang en inspekteer het, 
                  sal ons jou terugbetaling verwerk
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Terugbetalings</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Sodra ons jou teruggestuurde item ontvang en inspekteer het, sal ons jou per epos 
                in kennis stel of jou terugbetaling goedgekeur of afgekeur is.
              </p>
              <div className="space-y-3 mt-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">Goedgekeurde Terugbetalings</h3>
                  <p className="text-sm">
                    Sal binne 5-10 werksdae verwerk word na jou oorspronklike betaalmetode
                  </p>
                </div>
                <div className="border-l-4 border-muted-foreground pl-4">
                  <h3 className="font-semibold text-foreground mb-1">Gedeeltelike Terugbetalings</h3>
                  <p className="text-sm">
                    Kan toegepas word vir items wat tekens van gebruik toon of nie in oorspronklike 
                    toestand is nie
                  </p>
                </div>
              </div>
              <p className="text-sm mt-4">
                <strong>Let wel:</strong> Afhangend van jou bank, kan dit 'n paar ekstra dae neem 
                voor die terugbetaling in jou rekening verskyn.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Omruilings</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ons ruil slegs items om as hulle foutief of beskadig is. As jy 'n item vir 'n ander 
                grootte of kleur wil omruil, moet jy die oorspronklike item terugstuur en 'n nuwe 
                bestelling plaas.
              </p>
              <p>
                Vir foutiewe of beskadigde items, kontak ons onmiddellik by info@jyalweer.co.za 
                met foto's van die item.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Versendingskoste</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="space-y-3">
                <div className="bg-green-50 dark:bg-green-950 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-sm">
                    ✅ <strong>Ons fout:</strong> As die item foutief of beskadig is, sal ons die 
                    terugstuur versendingskoste dek
                  </p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 p-4 rounded">
                  <p className="text-sm">
                    ⚠️ <strong>Jou keuse:</strong> As jy van gedagte verander het, is jy 
                    verantwoordelik vir die terugstuur versendingskoste
                  </p>
                </div>
              </div>
              <p className="text-sm">
                Oorspronklike versendingskoste word nie terugbetaal nie, tensy die item foutief of 
                beskadig was.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Uitgeslote Items</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Die volgende items kan nie teruggestuur word nie:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Items op uitverkoping of afslag (tensy foutief of beskadig)</li>
                <li>Persoonlike items of items wat op bestelling gemaak is</li>
                <li>Items sonder oorspronklike etikette of verpakking</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Het jy vrae oor terugsendings?
          </p>
          <a href="/kontak" className="text-primary hover:underline font-semibold">
            Kontak Ons →
          </a>
        </div>
      </div>
    </div>
  )
}

