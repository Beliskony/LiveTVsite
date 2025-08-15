import { Heart, Users, BookOpen } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-sans text-4xl font-bold text-foreground mb-6">Notre Mission</h2>
            <p className="font-serif text-lg text-muted-foreground mb-6 leading-relaxed">
              Depuis plus de 50 ans, l'Église de la Grâce est un phare d'espoir dans notre communauté. Nous croyons en
              l'amour inconditionnel de Dieu et nous nous efforçons de créer un espace où chaque personne peut grandir
              spirituellement et trouver sa place.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-serif text-sm text-muted-foreground">Amour</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-serif text-sm text-muted-foreground">Communauté</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-serif text-sm text-muted-foreground">Enseignement</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="Notre communauté en prière"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
