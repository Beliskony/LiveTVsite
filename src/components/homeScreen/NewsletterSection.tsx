"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Send, Check } from "lucide-react"

const NewsletterSection = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitted(true)
    setIsLoading(false)
    setEmail("")
  }

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 border-t bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <div className="gap-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Mail className="w-4 h-4" />
              Newsletter
            </div>
            <h2 className="text-3xl my-3 font-bold tracking-tight md:text-4xl lg:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Rejoignez notre communauté en ligne !
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles, contenus exclusifs et messages de
              notre équipe.
            </p>
          </div>

          <Card className=" lg:w-[650px] xl:w-[700px] shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              {isSubmitted ? (
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-foreground">Merci pour votre inscription !</h3>
                    <p className="text-sm text-muted-foreground">Vous recevrez bientôt notre première newsletter.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)} className="mt-2">
                    S'inscrire à nouveau
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Entrez votre email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 h-12 bg-background border-border focus:border-primary transition-colors"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !email}
                      className="h-12 px-6 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          S'inscrire
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    En vous inscrivant, vous acceptez notre{" "}
                    <Link
                      to={'#'}
                      className="underline underline-offset-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      Politique de Confidentialité
                    </Link>
                    . Vous pouvez vous désabonner à tout moment.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
