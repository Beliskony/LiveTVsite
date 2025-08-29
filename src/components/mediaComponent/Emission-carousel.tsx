'use client'

import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EmissionCard } from './EmissionCard'
import type { IProgramme } from '@/interfaces/Programme'
import Autoplay from 'embla-carousel-autoplay'

interface EmissionCarouselProps {
  emissions: IProgramme[]
}

const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false })

export default function EmissionCarousel({ emissions }: EmissionCarouselProps) {
  const options: EmblaOptionsType = {
    loop: false,
    align: 'start',
    slidesToScroll: 1,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [Scrollsnaps, setScrollSnaps] = useState<number[]>([])
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(true)
  const [error, setError] = useState("")

   // Fonction pour charger les programmes
  const fetchProgrammes = async () => {
    try {
      const res = await fetch("http://api.yeshouatv.com/api/list_programmes_for_user")

      if (!res.ok) {
        const errorText = await res.text()
        console.error("Erreur API:", errorText)
        throw new Error("Erreur lors du chargement des programmes")
      }

      const result = await res.json()

      if (!Array.isArray(result.data)) {
        throw new Error("La réponse API ne contient pas un tableau de programmes.")
      }

      // Transformer 'when' (string) en tableau
      const programmesWithArrayWhen = result.data.map((prog: any) => ({
        ...prog,
        when: typeof prog.when === "string"
          ? prog.when.split(",").map((d: string) => d.trim())
          : prog.when,
      }))

      setProgrammes(programmesWithArrayWhen)
    } catch (error) {
      setError("Erreur lors du chargement des programmes")
      console.error("Erreur Api: ", error)
    }
  }

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevDisabled(!emblaApi.canScrollPrev())
    setNextDisabled(!emblaApi.canScrollNext())
  }, [])

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect(emblaApi)
  }, [onSelect])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onInit)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onInit)
    }
  }, [emblaApi, onInit, onSelect])

  return (
    <div className="relative w-full max-sm:h-full max-w-6xl mx-auto">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
       <div className="embla__container flex space-x-4 max-sm:space-x-1 touch-action-pan-y touch-pinch-zoom" >

           {emissions.map((emission) => (
              <div
                key={emission.id}>
          <EmissionCard contenu={emission} textCouleur='text-white' />
        </div>
  ))}
</div>

      </div>

      {!prevDisabled && (
      <button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={prevDisabled}
        className=" absolute -left-5 top-2/5 -translate-y-1/2 p-2 bg-gray-800/50 text-white rounded-full max-sm:hidden md:block lg:block xl:block disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      )}

      {!nextDisabled && (
      <button
        onClick={() => emblaApi?.scrollNext()}
        disabled={nextDisabled}
        className="md:block absolute -right-5 top-2/5 -translate-y-1/2 p-2 bg-gray-800/50 text-white rounded-full max-sm:hidden lg:block xl:block disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        {Scrollsnaps.map((_, idx) => (
          <div
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={`w-6 h-3 cursor-pointer transition duration-300 ${
              selectedIndex === idx ? 'bg-gray-800 scale-110' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
