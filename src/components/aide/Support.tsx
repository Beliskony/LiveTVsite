import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { useState } from "react"
import emailjs from "@emailjs/browser"

interface SupportModalProps {
  onClose: () => void;
}

export default function SupportModal({onClose}: SupportModalProps) {
    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    category: '',
    message: ''
    })
    const [status, setStatus] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      }

     const envoie = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("envoi en cours")

        emailjs.send(
          "service_0l9vtvp",
          "template_5vbohud",
          formData,
          "BWC3FvpTi2fyHBRro"
        )
        .then(() => setStatus("envoyé avec succès"))
        .catch(() => setStatus("erreur lorss de l'envoie"))
    }
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Arrière-plan flouté */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose} // Ferme si on clique dehors
      />

      {/* Contenu de la modal */}
      <div className="relative bg-background rounded-2xl shadow-xl w-[90%] max-w-4xl p-6 z-10">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Support Client</h1>
          <p className="text-muted-foreground text-lg">
            Notre équipe est là pour vous aider. Contactez-nous pour toute question ou problème technique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <Card>
            <CardHeader>
              <CardTitle>Nous Contacter</CardTitle>
              <CardDescription>
                Décrivez votre problème et nous vous répondrons dans les plus brefs délais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="Votre prénom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Votre nom" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="votre@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Problème technique</SelectItem>
                    <SelectItem value="account">Compte utilisateur</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Décrivez votre problème en détail..." className="min-h-[120px]" />
              </div>

              <Button className="w-full">Envoyer le Message</Button>
            </CardContent>
          </Card>

          {/* Informations de contact */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Autres Moyens de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">Email Support</h4>
                  <p className="text-muted-foreground">support@votresite.com</p>
                  <p className="text-sm text-muted-foreground">Réponse sous 24h</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground">Téléphone</h4>
                  <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                  <p className="text-sm text-muted-foreground">Lun-Ven 9h-18h</p>
                </div>

              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Temps de Réponse</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Chat en direct:</span>
                    <span className="text-green-600">Immédiat</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="text-blue-600">24h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Téléphone:</span>
                    <span className="text-green-600">Immédiat</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
