import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privaatheidsbeleid | Jy Alweer?",
  description: "Ons privaatheidsbeleid en hoe ons jou persoonlike inligting beskerm",
}

export default function PrivaatheidsbeleidPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Privaatheidsbeleid</h1>
        <p className="text-xl text-muted-foreground">
          Laas opgedateer: {new Date().toLocaleDateString('af-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4 text-muted-foreground">
              <p>
                By Jy Alweer? respekteer ons jou privaatheid en is ons toegewyd aan die beskerming van jou 
                persoonlike inligting. Hierdie Privaatheidsbeleid verduidelik hoe ons jou inligting versamel, 
                gebruik, en beskerm in ooreenstemming met die Beskerming van Persoonlike Inligting Wet (POPIA).
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">1. Inligting wat Ons Versamel</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Ons versamel die volgende tipes inligting:</p>
              
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">Persoonlike Inligting</h3>
                  <ul className="text-sm list-disc list-inside ml-2 space-y-1">
                    <li>Naam en van</li>
                    <li>E-posadres</li>
                    <li>Telefoonnommer</li>
                    <li>Afleweringsadres</li>
                    <li>Betaalinligting (verwerk veilig deur ons betaalvennoot)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground mb-1">Outomatiese Inligting</h3>
                  <ul className="text-sm list-disc list-inside ml-2 space-y-1">
                    <li>IP-adres</li>
                    <li>Blaaier tipe en weergawe</li>
                    <li>Bladsy besoeke en tyd op webwerf</li>
                    <li>Koekies en soortgelyke tegnologieë</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">2. Hoe Ons Jou Inligting Gebruik</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Ons gebruik jou inligting vir die volgende doeleindes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Om jou bestellings te verwerk en af te lewer</li>
                <li>Om met jou te kommunikeer oor jou bestelling</li>
                <li>Om kliëntediens te verskaf</li>
                <li>Om ons webwerf en dienste te verbeter</li>
                <li>Om bedrieglike aktiwiteite te voorkom</li>
                <li>Om bemarkingskommunikasie te stuur (slegs met jou toestemming)</li>
                <li>Om aan wetlike vereistes te voldoen</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">3. Deel van Inligting</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Ons deel jou persoonlike inligting slegs in die volgende gevalle:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Diensverskaffers:</strong> Koeriers, betaalverwerkers, en ander diensverskaffers 
                wat ons help om ons besigheid te bedryf</li>
                <li><strong>Wetlike Vereistes:</strong> Wanneer dit deur die wet vereis word of om ons 
                regte te beskerm</li>
                <li><strong>Besigheidsoordraging:</strong> In die geval van 'n samesmelting, verkoop, of 
                oordrag van bates</li>
              </ul>
              <p className="mt-4">
                <strong>Ons verkoop of verhuur NOOIT jou persoonlike inligting aan derde partye nie.</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">4. Jou Regte (POPIA)</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Onder POPIA het jy die volgende regte:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Toegang:</strong> Jy kan versoek om 'n kopie van jou persoonlike inligting</li>
                <li><strong>Regstelling:</strong> Jy kan versoek dat ons verkeerde inligting regstel</li>
                <li><strong>Verwydering:</strong> Jy kan versoek dat ons jou inligting verwyder</li>
                <li><strong>Beswaar:</strong> Jy kan beswaar maak teen die verwerking van jou inligting</li>
                <li><strong>Onttrekking:</strong> Jy kan toestemming onttrek vir bemarkingskommunikasie</li>
              </ul>
              <p className="mt-4">
                Om enige van hierdie regte uit te oefen, kontak ons by info@jyalweer.co.za
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">5. Sekuriteit</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ons neem die sekuriteit van jou persoonlike inligting ernstig op. Ons implementeer 
                verskeie sekuriteitsmaatreëls om jou inligting te beskerm:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL-enkripsie vir alle data-oordragte</li>
                <li>Veilige betaalverwerking deur gerespekteerde vennote</li>
                <li>Gereelde sekuriteitsoudits</li>
                <li>Beperkte toegang tot persoonlike inligting</li>
                <li>Veilige data-berging</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">6. Koekies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ons webwerf gebruik koekies om jou ervaring te verbeter. Koekies is klein tekslêers 
                wat op jou toestel gestoor word. Ons gebruik koekies vir:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Essensiele webwerf funksionaliteit</li>
                <li>Om jou voorkeure te onthou</li>
                <li>Om webwerf verkeer te analiseer</li>
                <li>Om jou inkopiemandjie te stoor</li>
              </ul>
              <p className="mt-4">
                Jy kan koekies in jou blaaier instellings deaktiveer, maar dit kan die funksionaliteit 
                van die webwerf beïnvloed.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">7. Kinders se Privaatheid</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ons webwerf is nie bedoel vir kinders onder 18 jaar nie. Ons versamel nie opsetlik 
                persoonlike inligting van kinders nie. As jy glo dat ons per ongeluk inligting van 
                'n kind versamel het, kontak ons asseblief onmiddellik.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">8. Veranderinge aan Hierdie Beleid</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ons mag hierdie Privaatheidsbeleid van tyd tot tyd opdateer. Ons sal jou in kennis 
                stel van enige beduidende veranderinge deur 'n kennisgewing op ons webwerf te plaas 
                of 'n epos te stuur.
              </p>
              <p>
                Die "Laas opgedateer" datum bo aan hierdie bladsy dui aan wanneer die beleid laas 
                gewysig is.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">9. Kontak Ons</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                As jy enige vrae oor hierdie Privaatheidsbeleid het, of as jy jou regte onder POPIA 
                wil uitoefen, kontak ons asseblief:
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p><strong>Jy Alweer?</strong></p>
                <p>📧 Email: info@jyalweer.co.za</p>
                <p>🌐 Webwerf: www.jyalweer.co.za</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

