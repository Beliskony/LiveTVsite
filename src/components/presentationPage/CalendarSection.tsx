import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

export function CalendarSectionPre() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-sans text-4xl font-bold text-foreground mb-4">Nos Prochains Événements</h2>
          <p className="font-serif text-lg text-muted-foreground">
            Rejoignez-nous pour ces moments de partage et de communion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Calendar className="h-5 w-5" />
                <span className="font-serif text-sm">Dimanche</span>
              </div>
              <CardTitle className="font-sans">Service Dominical</CardTitle>
              <CardDescription className="font-serif">Culte de louange et enseignement biblique</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span className="font-serif text-sm">10h30 - 12h00</span>
              </div>
              <p className="font-serif text-sm text-muted-foreground mb-4 leading-relaxed">
                Thème: "La joie dans l'épreuve" - Philippiens 4:4-7
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Calendar className="h-5 w-5" />
                <span className="font-serif text-sm">Mercredi</span>
              </div>
              <CardTitle className="font-sans">Étude Biblique</CardTitle>
              <CardDescription className="font-serif">Approfondissement de la Parole en petit groupe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span className="font-serif text-sm">19h30 - 21h00</span>
              </div>
              <p className="font-serif text-sm text-muted-foreground mb-4 leading-relaxed">
                Série: "Les paraboles de Jésus" - Semaine 3
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Calendar className="h-5 w-5" />
                <span className="font-serif text-sm">Samedi</span>
              </div>
              <CardTitle className="font-sans">Repas Communautaire</CardTitle>
              <CardDescription className="font-serif">Moment de partage et de convivialité</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span className="font-serif text-sm">18h00 - 21h00</span>
              </div>
              <p className="font-serif text-sm text-muted-foreground mb-4 leading-relaxed">
                Inscription recommandée - Participation libre
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
