import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terme en Voorwaardes | Jy Alweer?",
  description: "Terme en voorwaardes vir die gebruik van Jy Alweer? webwerf en dienste",
}

export default function TermeEnVoorwaardesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Terme en Voorwaardes</h1>
        <p className="text-xl text-muted-foreground">
          Laas opgedateer: {new Date().toLocaleDateString('af-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4 text-muted-foreground">
              <p>
                Welkom by Jy Alweer? Deur toegang tot en gebruik van hierdie webwerf, stem jy in om 
                gebonde te wees aan hierdie Terme en Voorwaardes. Lees asseblief hierdie terme noukeurig 
                deur voor jy die webwerf gebruik.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">1. Aanvaarding van Terme</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Deur hierdie webwerf te gebruik en/of 'n bestelling te plaas, bevestig jy dat jy:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>18 jaar of ouer is</li>
                <li>Hierdie terme en voorwaardes gelees en verstaan het</li>
                <li>Instem om gebonde te wees aan hierdie terme</li>
                <li>Die wetlike kapasiteit het om 'n bindende kontrak aan te gaan</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">2. Produkte en Pryse</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Alle produkte en pryse op hierdie webwerf is onderhewig aan beskikbaarheid en kan 
                sonder kennisgewing verander.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Pryse word in Suid-Afrikaanse Rand (ZAR) aangedui</li>
                <li>Pryse sluit BTW in waar van toepassing</li>
                <li>Ons behou die reg voor om pryse te wysig sonder voorafkennisgewing</li>
                <li>Produkbeskrywings en beelde is so akkuraat as moontlik, maar klein verskille kan voorkom</li>
                <li>Ons behou die reg voor om bestellings te weier of te kanselleer</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">3. Bestellings en Betaling</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Wanneer jy 'n bestelling plaas:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Jy maak 'n aanbod om die produkte te koop</li>
                <li>Ons behou die reg voor om jou aanbod te aanvaar of te weier</li>
                <li>Bevestiging van jou bestelling word per epos gestuur</li>
                <li>Betaling moet volledig gemaak word voor verwerking</li>
                <li>Ons aanvaar krediet-/debietkaarte via ons veilige betaalpoort</li>
                <li>Alle betalings is onderhewig aan goedkeuring deur die betaalverwerker</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">4. Aflewering</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Aflewering is onderhewig aan ons Versendingsbeleid. Belangrike punte:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Afleweringstye is skattings en nie gewaarborg nie</li>
                <li>Ons is nie verantwoordelik vir vertragings buite ons beheer nie</li>
                <li>Risiko gaan oor na jou sodra die item aan die koerier oorhandig is</li>
                <li>Jy is verantwoordelik om akkurate afleweringsbesonderhede te verskaf</li>
              </ul>
              <p className="mt-4">
                Sien ons <a href="/versendingsbeleid" className="text-primary hover:underline">Versendingsbeleid</a> vir 
                volledige besonderhede.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">5. Terugsendings en Terugbetalings</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ons terugsendings beleid geld vir alle aankope. Sleutel punte:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>14 dae terugstuur periode vanaf ontvangs</li>
                <li>Items moet in oorspronklike toestand wees</li>
                <li>Terugbetalings word verwerk na inspeksie</li>
                <li>Sekere items kan uitgesluit wees</li>
              </ul>
              <p className="mt-4">
                Sien ons <a href="/terugsendings" className="text-primary hover:underline">Terugsendings Beleid</a> vir 
                volledige besonderhede.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">6. Intellektuele Eiendom</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Alle inhoud op hierdie webwerf, insluitend maar nie beperk tot:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Teks, grafika, logo's, ikone</li>
                <li>Beelde, video's, en ander media</li>
                <li>Sagteware en kode</li>
                <li>Ontwerpe en uitleg</li>
              </ul>
              <p className="mt-4">
                ...is die eiendom van Jy Alweer? en word beskerm deur outeursreg en ander intellektuele 
                eiendomswette. Jy mag nie enige inhoud gebruik, kopieer, of versprei sonder ons 
                skriftelike toestemming nie.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">7. Gebruikersgedrag</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Jy stem in om NIE die webwerf te gebruik vir:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Enige onwettige doeleindes</li>
                <li>Om ander te bedrieg of te mislei</li>
                <li>Om skadelike kode of virusse te versprei</li>
                <li>Om die webwerf se funksionaliteit te versteur</li>
                <li>Om ongemagtigde toegang tot ons stelsels te verkry</li>
                <li>Om ander gebruikers se privaatheid te skend</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">8. Beperking van Aanspreeklikheid</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                In die maksimum mate toegelaat deur die wet:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ons is nie aanspreeklik vir enige indirekte, toevallige, of gevolglike skade nie</li>
                <li>Ons totale aanspreeklikheid is beperk tot die bedrag wat jy betaal het</li>
                <li>Ons waarborg nie dat die webwerf foutloos of ononderbroke sal wees nie</li>
                <li>Ons is nie verantwoordelik vir skakels na derde party webwerwe nie</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">9. Vrywaring</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Jy stem in om Jy Alweer?, sy eienaars, werknemers, en agente te vrywaar en skadeloos 
                te hou van enige eise, verliese, of skade wat voortspruit uit:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Jou gebruik van die webwerf</li>
                <li>Jou skending van hierdie terme</li>
                <li>Jou skending van enige regte van 'n derde party</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">10. Wysigings</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ons behou die reg voor om hierdie Terme en Voorwaardes te eniger tyd te wysig. 
                Veranderinge sal op hierdie bladsy geplaas word met 'n opgedateerde datum. Jou 
                voortgesette gebruik van die webwerf na sulke veranderinge beteken dat jy die 
                nuwe terme aanvaar.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">11. Regerende Reg</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hierdie Terme en Voorwaardes word geregeer deur die wette van die Republiek van 
                Suid-Afrika. Enige dispute sal onderhewig wees aan die eksklusiewe jurisdiksie van 
                die Suid-Afrikaanse howe.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">12. Kontak Inligting</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                As jy enige vrae oor hierdie Terme en Voorwaardes het, kontak ons asseblief:
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p><strong>Jy Alweer?</strong></p>
                <p>📧 Email: info@jyalweer.co.za</p>
                <p>🌐 Webwerf: www.jyalweer.co.za</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted p-6 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Deur hierdie webwerf te gebruik, bevestig jy dat jy hierdie Terme en Voorwaardes 
            gelees, verstaan, en aanvaar het.
          </p>
        </div>
      </div>
    </div>
  )
}

