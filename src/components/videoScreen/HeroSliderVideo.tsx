"use client"
import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import { ProgramData } from "../../data/programData"
import { emissionData } from "../../data/emissionsData"
import { ProgramCard } from "./ProgramCard"

export default function HeroSliderVideo() {
  // Options pour Embla Carousel
  const options: EmblaOptionsType = {
    loop: true, // Désactive la boucle infinie
    align: "start", // Aligne les slides au début du viewport
    slidesToScroll: 1, // Défile une slide à la fois
  }

  const autoplayOption = Autoplay(
    {delay: 3000, stopOnInteraction: false},
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplayOption])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  // Met à jour l'index sélectionné et l'état des boutons
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  // Initialise les snaps de défilement et l'état initial
  const onInit = useCallback(
    (emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList())
      onSelect(emblaApi)
    },
    [onSelect],
  )

  // Ajoute les écouteurs d'événements Embla
  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onInit) // Gère le redimensionnement de la fenêtre ou les changements de contenu

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onInit)
    }
  }, [emblaApi, onInit, onSelect])

  return (
    <div className="relative w-full mx-20 p-4">
      {/* Conteneur principal d'Embla */}
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        {/* Conteneur des slides */}
        <div className="embla__container w-full flex space-x-4 touch-action-pan-y">
          {ProgramData.map((program) => (
            <div
              key={program.id}
              // Chaque slide prend 100% de la largeur sur mobile, 50% sur sm, 33.3% sur md, 25% sur lg
              className="embla__slide flex-shrink-0 w-full h-full"
            >
              {/* Le composant EmissionCard remplit la largeur de sa slide parente */}
              <ProgramCard image={program.sourceIm} />
            </div>
          ))}
        </div>
      </div>


      <div className="flex justify-center mt-4 space-x-2">
        {scrollSnaps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === selectedIndex ? "bg-blue-500 scale-110" : "bg-gray-400"}`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
