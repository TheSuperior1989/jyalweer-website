"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage()

  const t = {
    title: language === "af" ? "Registreer" : "Sign Up",
    subtitle: language === "af" 
      ? "Skep 'n rekening om jou bestellings te volg"
      : "Create an account to track your orders",
    firstName: language === "af" ? "Voornaam" : "First Name",
    lastName: language === "af" ? "Van" : "Last Name",
    email: language === "af" ? "E-pos" : "Email",
    password: language === "af" ? "Wagwoord" : "Password",
    passwordHint: language === "af" ? "Minstens 6 karakters" : "At least 6 characters",
    signUp: language === "af" ? "Registreer" : "Sign Up",
    signingUp: language === "af" ? "Registreer tans..." : "Signing up...",
    hasAccount: language === "af" ? "Het reeds 'n rekening?" : "Already have an account?",
    signIn: language === "af" ? "Teken In" : "Sign In",
    errorTitle: language === "af" ? "Fout" : "Error",
    errorMessage: language === "af" ? "Kon nie registreer nie" : "Could not sign up",
    successTitle: language === "af" ? "Sukses" : "Success",
    successMessage: language === "af" 
      ? "Gaan asseblief jou e-pos na om jou rekening te bevestig"
      : "Please check your email to confirm your account",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/account`,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (error) {
        toast({
          title: t.errorTitle,
          description: error.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: t.successTitle,
        description: t.successMessage,
      })
      router.push("/auth/sign-up-success")
    } catch (error) {
      toast({
        title: t.errorTitle,
        description: t.errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-bold text-primary">Jy Alweer?</span>
          </Link>
          <CardTitle className="text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t.firstName}</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t.lastName}</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="jou@epos.co.za"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">{t.passwordHint}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t.signingUp : t.signUp}
              {!isLoading && <UserPlus className="ml-2 h-4 w-4" />}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              {t.hasAccount}{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                {t.signIn}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
