import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Oor Ons | Jy Alweer?",
  description: "Leer meer oor Jy Alweer? - Suid-Afrika se gunsteling meme merchandise winkel",
}

export default function OorOnsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Oor Ons</h1>
        <p className="text-xl text-muted-foreground">
          Welkom by Jy Alweer? - waar Suid-Afrikaanse humor en kwaliteit merchandise ontmoet!
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Ons Storie</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Jy Alweer? is gebore uit 'n liefde vir Suid-Afrikaanse humor en die begeerte om ons unieke kultuur te vier. 
                Ons het begin as 'n Facebook-bladsy wat die snaaksste en mees herkenbare Suid-Afrikaanse memes deel, 
                en het vinnig gegroei tot 'n gemeenskap van duisende Suid-Afrikaners wat saam lag.
              </p>
              <p>
                Vandag bring ons daardie humor na jou alledaagse lewe met ons reeks van hooggehalte merchandise. 
                Van T-hemde tot mokke, elke item is ontwerp om 'n glimlag op jou gesig te bring en jou Suid-Afrikaanse 
                trots te vier.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Ons Missie</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Ons missie is eenvoudig: om Suid-Afrikaners regoor die wêreld te laat lag en trots te voel oor 
                ons unieke kultuur. Ons glo dat humor ons bymekaar bring, en dat 'n goeie lag die beste medisyne is.
              </p>
              <p>
                Elke produk wat ons verkoop is versigtig gekies en ontwerp om die beste van Suid-Afrikaanse humor 
                te verteenwoordig, terwyl ons verseker dat kwaliteit nooit gekompromitteer word nie.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Hoekom Jy Alweer?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🇿🇦</div>
                <div>
                  <h3 className="font-semibold mb-1">100% Suid-Afrikaans</h3>
                  <p className="text-sm text-muted-foreground">
                    Ons is trots Suid-Afrikaans en vier ons kultuur elke dag.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">✨</div>
                <div>
                  <h3 className="font-semibold mb-1">Kwaliteit Produkte</h3>
                  <p className="text-sm text-muted-foreground">
                    Ons gebruik slegs die beste materiale vir ons merchandise.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">😂</div>
                <div>
                  <h3 className="font-semibold mb-1">Outentieke Humor</h3>
                  <p className="text-sm text-muted-foreground">
                    Ons memes en ontwerpe is eg Suid-Afrikaans en herkenbaar.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🚚</div>
                <div>
                  <h3 className="font-semibold mb-1">Vinnige Aflewering</h3>
                  <p className="text-sm text-muted-foreground">
                    Ons lewer regoor Suid-Afrika met betroubare koeriers.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Kontak Ons</h2>
            <p className="text-muted-foreground mb-4">
              Het jy 'n vraag, opmerking, of wil jy net hallo sê? Ons hoor graag van jou!
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>📧 Email: info@jyalweer.co.za</p>
              <p>📱 Facebook: <a href="https://www.facebook.com/JyAlweer" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">@JyAlweer</a></p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-8">
          <p className="text-lg font-semibold mb-2">Dankie dat jy deel is van die Jy Alweer? familie! 🎉</p>
          <p className="text-muted-foreground">Kom ons lag saam!</p>
        </div>
      </div>
    </div>
  )
}

