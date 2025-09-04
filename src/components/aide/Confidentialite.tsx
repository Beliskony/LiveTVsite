import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/arccordion"
import { X } from "lucide-react"

interface PrivacyPolicyModalProps {
  onClose: () => void
}

export default function PrivacyPolicyModal({ onClose }: PrivacyPolicyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Arrière-plan flouté */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenu de la modal */}
      <div className="relative bg-background rounded-2xl shadow-xl w-[90%] max-w-4xl p-6 z-10 overflow-y-auto max-h-[90vh]">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Politique de Confidentialité</h1>
          <p className="text-muted-foreground text-lg">
            Nous respectons votre vie privée. Voici comment vos données sont utilisées.
          </p>
        </div>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>Notre engagement envers votre vie privée</CardTitle>
            <CardDescription>Dernière mise à jour : 4 septembre 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. Données collectées</AccordionTrigger>
                <AccordionContent>
                  Même sans compte, nous collectons certaines données techniques :
                  <ul className="list-disc ml-5 mt-2">
                    <li>Adresse IP</li>
                    <li>Pages visitées et temps passé</li>
                    <li>Type de navigateur et appareil</li>
                    <li>Cookies (si acceptés)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>2. Utilisation des données</AccordionTrigger>
                <AccordionContent>
                  Vos données nous aident à :
                  <ul className="list-disc ml-5 mt-2">
                    <li>Améliorer l’expérience utilisateur</li>
                    <li>Mesurer l’audience et la performance</li>
                    <li>Garantir la sécurité du site</li>
                    <li>Afficher de la publicité (le cas échéant)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>3. Partage des données</AccordionTrigger>
                <AccordionContent>
                  Nous ne vendons pas vos données. Elles peuvent être partagées avec des prestataires techniques
                  (hébergement, analytics, etc.), dans le respect de la loi et de cette politique.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>4. Cookies</AccordionTrigger>
                <AccordionContent>
                  Des cookies peuvent être utilisés pour :
                  <ul className="list-disc ml-5 mt-2">
                    <li>Fonctionnement du site</li>
                    <li>Mesure d’audience</li>
                    <li>Publicité personnalisée (si applicable)</li>
                  </ul>
                  Vous pouvez gérer vos préférences via les paramètres de votre navigateur ou notre bannière de consentement.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>5. Vos droits</AccordionTrigger>
                <AccordionContent>
                  Vous disposez des droits suivants :
                  <ul className="list-disc ml-5 mt-2">
                    <li>Droit d’accès à vos données</li>
                    <li>Droit de rectification ou suppression</li>
                    <li>Droit à la limitation ou opposition au traitement</li>
                    <li>Droit à la portabilité (si applicable)</li>
                  </ul>
                  Pour exercer vos droits, contactez-nous à <strong>contact@monsite.com</strong>.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>6. Sécurité</AccordionTrigger>
                <AccordionContent>
                  Nous utilisons des mesures techniques et organisationnelles pour protéger vos données
                  contre tout accès non autorisé, perte ou vol.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>7. Modifications de cette politique</AccordionTrigger>
                <AccordionContent>
                  Cette politique peut être mise à jour. La date de dernière modification est toujours indiquée en haut de cette page.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
