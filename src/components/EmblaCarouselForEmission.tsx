"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState, useRef } from "react"
import type { IProgramme } from "@/interfaces/Programme"
import { Link } from "react-router-dom"
import getReadableDaysRange from "@/utilitaires/getReadableDaysRange"

const fetchProgrammes = async () => {
  try {
    const res = await fetch("https://chunk.yeshouatv.com/api/list_programmes_for_user")
    if (!res.ok) throw new Error("Erreur lors du chargement des programmes")
    const result = await res.json()
    if (!Array.isArray(result.data)) throw new Error("La réponse API ne contient pas un tableau de programmes.")

    const programmesWithArrayWhen = result.data.map((prog: any) => ({
      ...prog,
      when: typeof prog.when === "string" ? prog.when.split(",").map((d: string) => d.trim()) : prog.when,
    }))
    return programmesWithArrayWhen
  } catch (err) {
    console.error("Erreur API: ", err)
    throw new Error("Erreur lors du chargement des programmes")
  }
}

export function EmissionCarouselForEmission() {
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const loadProgrammes = async () => {
      try {
        const fetchedProgrammes = await fetchProgrammes()
        setProgrammes(fetchedProgrammes)
        setError(null)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(String(err))
        }
      }
    }

    loadProgrammes()
  }, [])

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || programmes.length === 0) return

      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentIndex(index)
      }, 250)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 750)
    },
    [isTransitioning, programmes.length],
  )

  const goToNext = useCallback(() => {
    if (programmes.length === 0) return
    const nextIndex = (currentIndex + 1) % programmes.length
    goToSlide(nextIndex)
  }, [currentIndex, programmes.length, goToSlide])

  const goToPrev = useCallback(() => {
    if (programmes.length === 0) return
    const prevIndex = currentIndex === 0 ? programmes.length - 1 : currentIndex - 1
    goToSlide(prevIndex)
  }, [currentIndex, programmes.length, goToSlide])

  const startAutoplay = useCallback(() => {
    if (isPaused || programmes.length === 0) return

    if (autoplayRef.current) clearTimeout(autoplayRef.current)

    autoplayRef.current = setTimeout(() => {
      goToNext()
    }, 5000)
  }, [isPaused, programmes.length, goToNext])

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  const resetAutoplay = useCallback(() => {
    stopAutoplay()
    startAutoplay()
  }, [stopAutoplay, startAutoplay])

  useEffect(() => {
    if (programmes.length > 0 && !isPaused) {
      startAutoplay()
    }

    return () => stopAutoplay()
  }, [currentIndex, programmes.length, isPaused, startAutoplay, stopAutoplay])

  const handleMouseEnter = () => {
    setIsPaused(true)
    stopAutoplay()
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const handlePrev = () => {
    goToPrev()
    resetAutoplay()
  }

  const handleNext = () => {
    goToNext()
    resetAutoplay()
  }

  const handleDotClick = (index: number) => {
    goToSlide(index)
    resetAutoplay()
  }

  // Nombre max de dots visibles
const MAX_DOTS = 7

// Calcul de la fenêtre de dots autour de l’index courant
const getVisibleDots = () => {
  if (programmes.length <= MAX_DOTS) return programmes.map((_, i) => i)

  const half = Math.floor(MAX_DOTS / 2)
  let start = currentIndex - half
  let end = currentIndex + half

  if (start < 0) {
    start = 0
    end = MAX_DOTS - 1
  } else if (end >= programmes.length) {
    end = programmes.length - 1
    start = end - MAX_DOTS + 1
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}


  const currentProgramme = programmes[currentIndex]

  if (programmes.length === 0) {
    return (
      <div className="relative w-full lg:h-[650px] max-sm:h-[300px] max-sm:mt-16 md:h-[500px] overflow-hidden md:mt-16 bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500">{error ? error : "Chargement..."}</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className="relative w-full lg:h-[650px] max-sm:h-[400px] max-sm:mt-16 font-normal text-[22px] md:h-[500px] overflow-hidden md:mt-16"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full">
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-300 ease-in-out ${
              isTransitioning ? "opacity-50 scale-[1.02]" : "opacity-100 scale-100"
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={currentProgramme?.slide_cover || currentProgramme?.couverture ||"/placeholder.svg?height=650&width=1200&query=tv studio background"}
                alt={currentProgramme?.nom || ""}
                className="absolute inset-0 w-full h-full object-cover object-top max-sm:object-right"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
              />
            </div>
            <div className="absolute inset-0" />

            <div className="relative z-10 flex items-center h-full">
              <div className="container mx-auto px-6 flex items-center justify-center max-sm:text-center md:justify-between lg:justify-between">
                <div className="flex-none w-full h-full relative xl:pl-24 md:pl-9 2xl:pl-14 ">
                  {currentProgramme?.logo && (
                    <img
                      src={currentProgramme.logo}
                      alt={`${currentProgramme.nom} logo`}
                      className="h-36 w-36 max-sm:hidden"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                      }}
                    />
                  )}
                  <div className="max-sm:hidden">
                    <h1 className="text-white md:text-xl xl:text-3xl  font-bold mb-4 break-words line-clamp-2 drop-shadow-lg">
                      {currentProgramme?.nom}
                    </h1>
                    <p className="text-white/90 text-lg mb-8 break-words line-clamp-3 drop-shadow-md items-center flex gap-1.5">
                      {getReadableDaysRange(currentProgramme?.when)} <span className="text-2xl font-bold"> - </span> {currentProgramme?.starting}
                    </p>
                    <Link
                      to={`/programmes/${currentProgramme.id}`}
                      className="bg-transparent border-2 border-white text-white px-8 py-3 text-lg rounded-full drop-shadow-md"
                    >
                      {currentProgramme?.genre}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute max-sm:hidden lg:left-3 xl:left-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-white hover:bg-[#1faae1] w-12 h-12"
          onClick={handlePrev}
        >
          <ChevronLeft className="!h-10 !w-10" strokeWidth={1.5} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute max-sm:hidden md:right-3 xl:right-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-white hover:bg-[#1faae1] w-12 h-12"
          onClick={handleNext}
        >
          <ChevronRight className="!h-10 !w-10" strokeWidth={1.5}/>
        </Button>

        {/* Pagination Dots */}
        <div className="absolute max-sm:bottom-1.5 max-sm:right-1/2 max-sm:translate-x-1/2 bottom-8 right-10 z-20 flex space-x-2">
          {getVisibleDots().map((_, index) => (
            <button
              key={index}
              className={`duration-300 ${
                index === currentIndex ? "bg-[#1faae1] w-6 h-2 " : "bg-white/40 hover:bg-white/60 w-6 h-0.5 "
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Bloc mobile sous le carousel */}
      <div className="md:hidden p-4 flex flex-col justify-center items-center text-white border-x ">
        <img src={currentProgramme.logo} className="w-36 h-36 object-fill max-w-full"/>
        <h1 className="text-lg font-bold mb-2">{currentProgramme?.nom}</h1>
        <p className="text-sm mb-4 flex items-center gap-x-1.5">{getReadableDaysRange(currentProgramme?.when)} <span className="text-2xl font-bold"> - </span> {currentProgramme?.starting}</p>
        <Link
          to={`/programmes/${currentProgramme.id}`}
          className="inline-block border border-white text-white px-3 py-1 text-sm rounded-full"
        >
          {currentProgramme?.genre}
        </Link>
      </div>
    </>
  )
}
