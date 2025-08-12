"use client"
import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgramData } from "@/data/programData"

export default function HeroSliderVideo() {
  const options: EmblaOptionsType = {
    loop: true,
    align: "center",
    slidesToScroll: 1,
  }

  const autoplayOption = Autoplay({
    delay: 4000,
    stopOnInteraction: false,
  })

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplayOption])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  const onInit = useCallback(
    (emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList())
      onSelect(emblaApi)
    },
    [onSelect],
  )

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onInit)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onInit)
    }
  }, [emblaApi, onInit, onSelect])

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">

      {/* Carousel Container */}
      <div className="overflow-hidden h-[400px] rounded-xl" ref={emblaRef}>
        <div className="flex">
          {ProgramData.map((program) => (
            <div key={program.id} className="flex-shrink-0 w-full h-[350px] px-2">
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/20 hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-0">
                  <div className="relative w-full h-[350px] justify-center aspect-video overflow-hidden">
                    <img
                      src={program.sourceIm || "/placeholder.svg"}
                      alt={program.id}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute bottom-5 left-0 right-0 p-6 text-white">
                      <Badge
                        variant="secondary"
                        className="mb-3 bg-primary/20 text-primary-foreground border-primary/30 backdrop-blur-sm"
                      >
                        {program.category}
                      </Badge>

                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {program.title}
                      </h3>

                      <p className="text-sm text-wrap w-full text-gray-200 line-clamp-2 max-w-2xl">{program.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 space-x-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-primary scale-110 shadow-lg"
                : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
