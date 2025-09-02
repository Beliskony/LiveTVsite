import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "../ui/skeleton"

export function PastorSection() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(()=> setLoading(false), 2000)
    return () => clearTimeout(timer)
  })

  if (loading) return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        {/* Titre & sous-titre */}
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-10 w-1/2 mx-auto bg-gray-500/35" />
          <Skeleton className="h-6 w-2/3 mx-auto bg-gray-500/35" />
        </div>

        {/* Carte du pasteur */}
        <Card className="max-w-4xl mx-auto ">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Image ronde du pasteur */}
              <div className="md:col-span-1 flex justify-center">
                <Skeleton className="w-64 h-64 rounded-full bg-gray-500/35" />
              </div>

              {/* Texte à droite */}
              <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-6 w-1/2 bg-gray-500/35" /> {/* Nom */}
                <Skeleton className="h-5 w-2/3 bg-gray-500/35" /> {/* Badge */}
                <Skeleton className="h-4 w-full bg-gray-500/35" />
                <Skeleton className="h-4 w-full bg-gray-500/35" />
                <Skeleton className="h-4 w-3/4 bg-gray-500/35" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )


  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-sans text-4xl font-bold text-foreground mb-4">Rencontrez Notre Pasteur</h2>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
            Un guide spirituel dévoué au service de notre communauté
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <img
                  src="https://i.pinimg.com/1200x/fe/2d/ff/fe2dff0828d03677b6d1d0eb092c67b5.jpg"
                  alt="Pasteur Martin Dubois"
                  className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg"
                />
              </div>
              <div className="md:col-span-2">
                <h3 className="font-sans text-2xl font-bold text-foreground mb-2">Pasteur Martin Dubois</h3>
                <Badge variant="secondary" className="mb-4">
                  Pasteur principal depuis 2010
                </Badge>
                <p className="font-serif text-muted-foreground mb-4 leading-relaxed">
                  Le Pasteur Martin Dubois guide notre communauté avec sagesse et compassion depuis plus de 13 ans.
                  Diplômé en théologie de l'Institut Biblique de Paris, il a consacré sa vie à l'enseignement de la
                  Parole et à l'accompagnement spirituel de chacun.
                </p>
                <p className="font-serif text-muted-foreground leading-relaxed">
                  "Mon cœur bat pour voir chaque personne découvrir l'amour transformateur de Dieu et grandir dans sa
                  foi, peu importe d'où elle vient."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
