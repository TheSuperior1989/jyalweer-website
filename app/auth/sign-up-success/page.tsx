"use client"

import Link from "next/link"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export default function SignUpSuccessPage() {
  const { language } = useLanguage()

  const t = {
    title: language === "af" ? "Kyk Jou E-pos!" : "Check Your Email!",
    subtitle: language === "af" 
      ? "Ons het 'n bevestigingskakel na jou e-pos gestuur"
      : "We've sent a confirmation link to your email",
    instruction: language === "af"
      ? "Klik op die skakel in die e-pos om jou rekening te aktiveer. Dit kan 'n paar minute neem om te arriveer."
      : "Click the link in the email to activate your account. It may take a few minutes to arrive.",
    checkSpam: language === "af"
      ? "As jy dit nie sien nie, kyk in jou spam-vouer."
      : "If you don't see it, check your spam folder.",
    backToHome: language === "af" ? "Terug na Tuisblad" : "Back to Home",
    signIn: language === "af" ? "Teken In" : "Sign In",
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{t.instruction}</p>
          <p className="text-sm text-muted-foreground">{t.checkSpam}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link href="/auth/login">
              {t.signIn}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/">
              {t.backToHome}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
