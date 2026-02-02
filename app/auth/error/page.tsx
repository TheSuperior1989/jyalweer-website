"use client"

import Link from "next/link"
import { AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export default function AuthErrorPage() {
  const { language } = useLanguage()

  const t = {
    title: language === "af" ? "Verifikasie Fout" : "Authentication Error",
    subtitle: language === "af" 
      ? "Iets het verkeerd gegaan tydens verifikasie"
      : "Something went wrong during authentication",
    instruction: language === "af"
      ? "Dit kan wees omdat die skakel verval het of reeds gebruik is. Probeer asseblief weer."
      : "This could be because the link has expired or has already been used. Please try again.",
    tryAgain: language === "af" ? "Probeer Weer" : "Try Again",
    backToHome: language === "af" ? "Terug na Tuisblad" : "Back to Home",
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t.instruction}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link href="/auth/login">
              {t.tryAgain}
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
