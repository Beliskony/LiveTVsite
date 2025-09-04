import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import events from "@/data/eventsEglise"

export function CalendarSectionPre() {
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const timer = setTimeout(()=> setLoading(false), 2000)
      return () => clearTimeout(timer)
    })

    if (loading) return (
      <section className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        {/* Titre de section */}
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-10 w-2/3 mx-auto bg-gray-500/35" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-gray-500/35" />
        </div>

        {/* Grille de cartes */}
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                {/* Jour + icône */}
                <div className="flex items-center gap-2 p-2 mb-2">
                  <Skeleton className="h-5 w-5 rounded-full bg-gray-500/35" />
                  <Skeleton className="h-4 w-20 bg-gray-500/35" />
                </div>

                {/* Titre et description */}
                <CardTitle className="space-y-2">
                  <Skeleton className="h-6 w-3/4 bg-gray-500/35" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-full bg-gray-500/35" />
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Horaires */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-gray-500/35" />
                  <Skeleton className="h-4 w-24 bg-gray-500/35" />
                </div>

                {/* Description */}
                <Skeleton className="h-4 w-full bg-gray-500/35" />
                <Skeleton className="h-4 w-5/6 bg-gray-500/35" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    )

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-sans text-4xl font-bold text-foreground mb-4">Programme de culte</h2>
          <p className="font-serif text-lg text-muted-foreground">
            Rejoignez-nous pour ces moments de partage et de communion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-2 p-2 text-primary mb-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-serif text-sm">{event.day}</span>
                </div>
                <CardTitle className="font-sans">{event.title}</CardTitle>
                <CardDescription className="font-serif">{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-serif text-sm">{event.time}</span>
                </div>
                <p className="font-serif text-sm text-muted-foreground mb-4 leading-relaxed">
                  {event.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
