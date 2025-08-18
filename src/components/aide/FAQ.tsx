import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/arccordion"
import { X } from "lucide-react"
import { Link } from "react-router-dom"

interface FAQModalProps {
  onClose: () => void;
}
export default function FAQModal({onClose}: FAQModalProps) {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Questions Fréquentes</h1>
          <p className="text-muted-foreground text-lg">
            Trouvez rapidement les réponses à vos questions sur notre plateforme de streaming
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
            <CardDescription>Les questions les plus courantes de nos utilisateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Comment créer un compte ?</AccordionTrigger>
                <AccordionContent>
                  Cliquez sur "S'inscrire" en haut de la page, remplissez le formulaire avec votre nom, email et mot de passe,
                  puis cliquez sur "S'inscrire".
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Quels sont les formats vidéo supportés ?</AccordionTrigger>
                <AccordionContent>
                  Notre plateforme supporte les formats MP4, WebM et HLS. Les vidéos sont automatiquement optimisées
                  pour votre connexion internet et votre appareil.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Puis-je regarder sur plusieurs appareils ?</AccordionTrigger>
                <AccordionContent>
                  Oui, votre compte peut être utilisé sur plusieurs appareils différents.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Comment télécharger des vidéos pour un visionnage hors ligne ?</AccordionTrigger>
                <AccordionContent>
                  cette option sera disponible dans une prochaine mise à jour. Actuellement, vous pouvez
                  regarder des vidéos en streaming uniquement. Nous travaillons sur une fonctionnalité de téléchargement
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Problèmes de lecture ou de buffering ?</AccordionTrigger>
                <AccordionContent>
                  Vérifiez votre connexion internet (minimum 1 Mbps recommandé). Fermez les autres applications
                  utilisant internet, redémarrez votre navigateur ou l'application. Si le problème persiste, contactez
                  notre support.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
