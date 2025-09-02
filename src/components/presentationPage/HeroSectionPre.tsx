import { useState, useEffect } from "react"
import { Skeleton } from "../ui/skeleton"

export function HeroSectionPre() {
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) // Simule 2s de chargement

    return () => clearTimeout(timer)
  }, [])

  if (loading) return(
        <section className="relative h-screen md:h-[500px] max-sm:h-[400px] flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Background image + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/presentationBG.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />

      {/* Skeleton content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center space-y-4 w-full animate-pulse">
        <Skeleton className="h-14 md:h-24 w-3/4 rounded-xl bg-gray-300/60" />
        <Skeleton className="h-6 md:h-8 w-2/3 rounded-full bg-gray-200/50" />
        <Skeleton className="h-6 md:h-8 w-1/2 rounded-full bg-gray-200/40" />
      </div>
    </section>

  )

  return (

    <section className="relative h-screen md:h-[500px] max-sm:h-[400px] flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/presentationBG.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="font-sans text-white text-5xl md:text-7xl max-sm:text-3xl font-bold mb-6 hover:text-gray-900 hover:scale-125 hover:transition-all hover:ease-in-out hover:delay-100">Église de Yeshoua</h1>
        <p className="font-serif text-white text-xl md:text-2xl max-sm:text-xs mb-8 leading-relaxed">
          Une communauté de foi accueillante où chacun trouve sa place dans l'amour de Dieu
        </p>
      </div>
    </section>

  )
}
