import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Versendingsbeleid | Jy Alweer?",
  description: "Lees meer oor ons versendingsbeleid en afleweringsopsies",
}

export default function VersendingsbeleidPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Versendingsbeleid</h1>
        <p className="text-xl text-muted-foreground">
          Alles wat jy moet weet oor ons versending en aflewering
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Versendingsopsies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ons bied vinnige en betroubare versending regoor Suid-Afrika aan. Ons werk saam met 
                gerespekteerde koeriers om te verseker dat jou bestelling veilig en betyds by jou aankom.
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">Standaard Aflewering</h3>
                  <p className="text-sm">3-5 werksdae | R80 - R120 (afhangend van area)</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">Vinnige Aflewering</h3>
                  <p className="text-sm">1-2 werksdae | R150 - R200 (beskikbaar in hoofstede)</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">Gratis Versending</h3>
                  <p className="text-sm">Op bestellings bo R500 (standaard aflewering)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Verwerkingstyd</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Alle bestellings word binne 1-2 werksdae verwerk. Jy sal 'n bevestigingsepos ontvang 
                sodra jou bestelling gestuur is, met 'n spoornommer om jou pakkie te volg.
              </p>
              <p className="text-sm">
                <strong>Let wel:</strong> Verwerkingstyd is addisioneel tot afleweringstyd. 
                Byvoorbeeld, 'n standaard aflewering van 3-5 werksdae begin eers nadat jou bestelling verwerk is.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Afleweringsareas</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ons lewer tans slegs binne Suid-Afrika. Ons dek die volgende areas:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Alle hoofstede (Johannesburg, Kaapstad, Durban, Pretoria, ens.)</li>
                <li>Groot dorpe en stede</li>
                <li>Landelike areas (kan langer neem)</li>
              </ul>
              <p className="text-sm">
                Vir internasionale bestellings, kontak ons asseblief by info@jyalweer.co.za
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Spoor Jou Bestelling</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Sodra jou bestelling gestuur is, sal jy 'n epos ontvang met:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Bevestiging dat jou bestelling gestuur is</li>
                <li>'n Spoornommer</li>
                <li>'n Skakel na die koerier se webwerf om jou pakkie te volg</li>
              </ul>
              <p>
                Jy kan ook jou bestelling se status nagaan deur in te teken op jou rekening en na 
                "My Bestellings" te gaan.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Afleweringsprobleme</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                As jou pakkie nie binne die verwagte tyd aankom nie, of as daar enige probleme is:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Gaan eers jou spoornommer na op die koerier se webwerf</li>
                <li>Maak seker dat jou afleweringsadres korrek is</li>
                <li>Kontak ons by info@jyalweer.co.za met jou bestellingsnommer</li>
              </ol>
              <p className="mt-4">
                Ons sal ons bes doen om enige probleme so gou as moontlik op te los.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Belangrike Notas</h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  ⚠️ <strong>Openbare vakansiedae:</strong> Bestellings wat tydens openbare vakansiedae 
                  geplaas word, sal op die volgende werksdag verwerk word.
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  📦 <strong>Beskadigde pakkies:</strong> As jou pakkie beskadig aankom, moenie dit 
                  aanvaar nie. Kontak ons onmiddellik sodat ons 'n vervanging kan reël.
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  🏠 <strong>Niemand tuis:</strong> As niemand tuis is om die pakkie te ontvang nie, 
                  sal die koerier 'n kennisgewing los. Jy kan dan reël om dit by die naaste depot op te tel.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Het jy nog vrae oor versending?
          </p>
          <a href="/kontak" className="text-primary hover:underline font-semibold">
            Kontak Ons →
          </a>
        </div>
      </div>
    </div>
  )
}

