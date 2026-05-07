"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"

export function ContactForm() {
  const { toast } = useToast()
  const { language } = useLanguage()
  const af = language === "af"
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: af ? "Boodskap gestuur!" : "Message sent!",
        description: af
          ? "Dankie vir jou boodskap. Ons sal binnekort antwoord."
          : "Thank you for your message. We'll get back to you shortly.",
      })

      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch {
      toast({
        title: af ? "Fout" : "Error",
        description: af
          ? "Kon nie boodskap stuur nie. Probeer asseblief weer."
          : "Could not send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{af ? "Naam *" : "Name *"}</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={af ? "Jou naam" : "Your name"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="jou@email.co.za"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{af ? "Onderwerp *" : "Subject *"}</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder={af ? "Waaroor gaan jou boodskap?" : "What is your message about?"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{af ? "Boodskap *" : "Message *"}</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder={af ? "Skryf jou boodskap hier..." : "Write your message here..."}
          rows={6}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting
          ? (af ? "Stuur..." : "Sending...")
          : (af ? "Stuur Boodskap" : "Send Message")}
      </Button>
    </form>
  )
}
