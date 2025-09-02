import { useEffect, useState } from "react"
import { Heart, Users, BookOpen } from "lucide-react"
import { Skeleton } from "../ui/skeleton"

export function AboutSection() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return (
    <section className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche (texte + icônes) */}
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4 bg-gray-500/35" /> {/* Titre */}
            <Skeleton className="h-20 w-full bg-gray-500/35" /> {/* Paragraphe */}
            
            {/* 3 blocs (Amour, Communauté, Enseignement) */}
            <div className="grid grid-cols-3 md:grid-cols-2 gap-4 mb-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center border rounded bg-white p-4 shadow">
                  <Skeleton className="h-8 w-8 mx-auto mb-2 rounded-full bg-gray-500/35" />
                  <Skeleton className="h-4 w-1/2 mx-auto bg-gray-500/35" />
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite (image) */}
          <div className="relative">
            <Skeleton className="rounded-lg w-full h-[500px] bg-gray-500/35" />
          </div>
        </div>
      </div>
    </section>
  )


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
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
              <div className="text-center border rounded bg-white p-4 max-sm:p-2 shadow">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-serif text-sm text-muted-foreground">Amour</p>
              </div>
              <div className="text-center border rounded bg-white p-4 max-sm:p-2 shadow">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-serif text-sm text-muted-foreground">Communauté</p>
              </div>
              <div className="text-center border rounded bg-white p-4 max-sm:p-2 shadow">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-serif text-sm text-muted-foreground">Enseignement</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://i.pinimg.com/1200x/40/f9/84/40f984447a4a82cea5925778e530ea9e.jpg"
              alt="Notre communauté en prière"
              className="rounded-lg shadow-lg w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
