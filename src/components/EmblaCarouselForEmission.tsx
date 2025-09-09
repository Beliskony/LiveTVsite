"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState, useRef } from "react"
import type { IProgramme } from "@/interfaces/Programme"

export function EmissionCarouselForEmission() {
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [error, setError] = useState("")


 const fetchProgrammes = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("https://api.yeshouatv.com/api/list_programmes_for_user", {
        method: "GET",
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error("Erreur lors du chargement des programmes")
      }

      const result = await res.json()

      if (!Array.isArray(result.data)) {
        throw new Error("La réponse API ne contient pas un tableau de programmes.")
      }

      const programmesWithArrayWhen = result.data.map((prog: any) => ({
        ...prog,
        when: typeof prog.when === "string" ? prog.when.split(",").map((d: string) => d.trim()) : prog.when,
      }))

      setProgrammes(programmesWithArrayWhen)
    } catch (error) {
      setError("Erreur lors du chargement des programmes")
      console.error("Erreur Api: ", error)
    }
  }

  // Appel initial
  useEffect(() => {
    fetchProgrammes()

  const interval = setInterval(() => {
    fetchProgrammes() // refetch every 5 sec
    }, 5000)

    return() => clearInterval(interval)

  }, [])


  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, playOnInit: true })
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi){
       autoplay.current.stop()
       emblaApi.scrollPrev()
       autoplay.current.play()
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi){
       autoplay.current.stop()
       emblaApi.scrollNext()
       autoplay.current.play()
      }
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi){
         autoplay.current.stop()
         emblaApi.scrollTo(index)
         autoplay.current.play()
        }
    },
    [emblaApi],
  )

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on("reInit", onInit)
    emblaApi.on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <div className="relative w-full h-[600px] font-normal text-[22px] lg:h-screen md:h-[500px] overflow-hidden mt-0">
      {/* Carousel */}
      <div
        className="embla h-full"
        ref={emblaRef}
        onMouseEnter={() => emblaApi?.plugins()?.autoplay?.stop()}
        onMouseLeave={() => emblaApi?.plugins()?.autoplay?.play()}
      >
        <div className="embla__container flex h-full">
          {programmes.map((emission, index) => (
            <div key={emission.id} className="embla__slide flex-none w-full h-full relative overflow-hidden">
              {/* Background with gradient overlay */}
              <div
                className="absolute inset-0 bg-cover object-fill bg-no-repeat bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${emission.couverture || "/placeholder.svg"})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center h-full">
                <div className="container mx-auto px-6 flex items-center justify-center max-sm:text-center md:justify-between lg:justify-between max-sm:mt-52">
                  {/* Left content */}
                  <div className={`embla__slide flex-none w-full h-full relative overflow-hidden transition-all duration-700 ease-out ${
                    selectedIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}>
                    {/* Logo */}
                    <div className="mb-8 max-sm:hidden justify-self-center md:justify-self-start">
                      <img src={emission.couverture || "/placeholder.svg"} alt="Logo" className="h-24 w-24 object-fill" />
                    </div>

                    {/* Title and subtitle */}
                    <h1 className="text-white text-5xl max-sm:text-2xl font-bold mb-4 max-sm:mb-2 break-words line-clamp-2 overflow-hidden">{emission.nom}</h1>
                    <p className="text-white/90 text-xl max-sm:text-lg mb-8 max-sm:mb-2 break-words line-clamp-3 overflow-hidden">{emission.description}</p>

                    {/* CTA Button */}
                    <Button
                      size="lg"
                      className="bg-transparent border-2 border-white text-white hover:bg-gray-900 hover:text-blue-600 transition-all duration-300 px-8 max-sm:px-3 py-3 max-sm:py-1 text-lg rounded-full"
                    >
                      {emission.genre}
                    </Button>
                  </div>

                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute max-sm:hidden left-6 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 w-12 h-12"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute max-sm:hidden right-6 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 w-12 h-12"
        onClick={scrollNext}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Pagination dots */}
      <div className="absolute max-sm:bottom-1.5 max-sm:right-0 bottom-8 right-10 -translate-x-1/2 z-20 flex space-x-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-6 h-2 duration-300 ${
              index === selectedIndex ? "bg-gray-900" : "bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
