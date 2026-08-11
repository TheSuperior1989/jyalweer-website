"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage()

  const t = {
    title: language === "af" ? "Teken In" : "Sign In",
    subtitle: language === "af" 
      ? "Teken in om jou bestelling te volg en meer"
      : "Sign in to track your orders and more",
    email: language === "af" ? "E-pos" : "Email",
    password: language === "af" ? "Wagwoord" : "Password",
    signIn: language === "af" ? "Teken In" : "Sign In",
    signingIn: language === "af" ? "Teken tans in..." : "Signing in...",
    noAccount: language === "af" ? "Nog nie 'n rekening nie?" : "Don't have an account?",
    signUp: language === "af" ? "Registreer" : "Sign Up",
    forgotPassword: language === "af" ? "Wagwoord vergeet?" : "Forgot password?",
    errorTitle: language === "af" ? "Fout" : "Error",
    errorMessage: language === "af" ? "Ongeldige e-pos of wagwoord" : "Invalid email or password",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({
          title: t.errorTitle,
          description: t.errorMessage,
          variant: "destructive",
        })
        return
      }

      // Redirect admins to dashboard, everyone else to account
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", data.user.id)
        .single()

      router.push(profile?.is_admin ? "/admin" : "/account")
      router.refresh()
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
    <div className="min-h-screen flex items-center justify-center px-4 py-16 section-charcoal relative overflow-hidden">
      <span aria-hidden className="diamond-deco right-[12%] top-[15%] hidden sm:block" />
      <span aria-hidden className="diamond-deco-solid left-[10%] bottom-[18%] hidden sm:block" />
      <Card className="w-full max-w-md relative z-10 border-border shadow-2xl">
        <CardHeader className="text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-1 mb-4 group">
            <span className="font-display text-2xl font-black tracking-tight text-foreground group-hover:opacity-80 transition-opacity">
              Jy Alweer?
            </span>
            <span className="font-script text-lg text-muted-foreground">Grap blad</span>
          </Link>
          <CardTitle className="text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t.password}</Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-foreground/70 hover:text-foreground hover:underline"
                >
                  {t.forgotPassword}
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t.signingIn : t.signIn}
              {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              {t.noAccount}{" "}
              <Link href="/auth/sign-up" className="text-foreground hover:underline font-semibold">
                {t.signUp}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
