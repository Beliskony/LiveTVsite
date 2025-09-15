"use client"

import React, { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { IProgramme } from "@/interfaces/Programme"

export default function ProgrammesPhare() {
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const containerRefDesktop = useRef<HTMLDivElement>(null)
  const slidesRefDesktop = useRef<(HTMLDivElement | null)[]>([])

  const containerRefMobile = useRef<HTMLDivElement>(null)
  const slidesRefMobile = useRef<(HTMLDivElement | null)[]>([])

  // Fetch des programmes
  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const res = await fetch("https://chunk.yeshouatv.com/api/list_programmes_for_user")
        if (!res.ok) throw new Error(`Erreur API ${res.status}`)
        const result = await res.json()

        const parsed: IProgramme[] = result.data.map((prog: any) => ({
          ...prog,
          when: typeof prog.when === "string"
            ? prog.when.split(",").map((d: string) => d.trim().toLowerCase())
            : prog.when,
        }))

        setProgrammes(parsed)
      } catch (err) {
        console.error("Erreur API:", err)
      }
    }

    fetchProgrammes()
  }, [])

  // Scroll automatique desktop
  useEffect(() => {
    const container = containerRefDesktop.current
    const activeSlide = slidesRefDesktop.current[currentIndex]
    if (!container || !activeSlide) return

    const containerWidth = container.offsetWidth
    const activeSlideLeft = activeSlide.offsetLeft
    const activeSlideWidth = activeSlide.offsetWidth
    const scrollPosition = activeSlideLeft - containerWidth / 2 + activeSlideWidth / 2

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    })
  }, [currentIndex])

  // Scroll automatique mobile
useEffect(() => {
  const container = containerRefMobile.current
  const activeSlide = slidesRefMobile.current[currentIndex]

  if (!container || !activeSlide) return

  const containerWidth = container.offsetWidth
  const slideOffset = activeSlide.offsetLeft
  const slideWidth = activeSlide.offsetWidth

  const scrollTo = slideOffset - (containerWidth / 2) + (slideWidth / 2)

  container.scrollTo({
    left: scrollTo,
    behavior: "smooth",
  })
}, [currentIndex])


  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? programmes.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === programmes.length - 1 ? 0 : prev + 1))
  }

  if (programmes.length === 0) {
    return <p className="text-center text-gray-500">Chargement des programmes...</p>
  }

  return (
    <div className="relative max-w-7xl mx-auto py-10">
      {/* Desktop version */}
      <div
        ref={containerRefDesktop}
        className="hidden lg:flex items-center gap-6 overflow-x-auto scroll-smooth px-4 no-scrollbar"
      >
        {programmes.map((prog, index) => {
          const isActive = index === currentIndex
          const isAdjacent =
            Math.abs(index - currentIndex) === 1 ||
            (currentIndex === 0 && index === programmes.length - 1) ||
            (currentIndex === programmes.length - 1 && index === 0)

          return (
            <div
              key={prog.id}
              ref={(el) => {(slidesRefDesktop.current[index] = el)}}
              className="flex-shrink-0"
            >
              {isActive ? (
                <div className="bg-gray-900 w-[800px] min-h-[450px] text-white rounded-2xl shadow-lg px-6 py-4 flex flex-col justify-start transition-all duration-1000 ease-in-out">
                  <div className="flex flex-row w-full py-3 gap-x-1 items-center justify-start">
                    <h2 className="text-lg font-bold mb-2">{prog.nom}</h2>
                    <hr className="border-t-2 text-white w-full max-w-full px-2" />
                  </div>
                  <div className="flex gap-4">
                    <img
                      src={prog.couverture ?? "/placeholder.png"}
                      alt={prog.nom}
                      className="w-[200px] h-[350px] rounded-2xl object-fill"
                    />
                    <div className="relative h-[350px] flex flex-col justify-between w-full">
                      <p className="text-sm px-4 leading-relaxed overflow-hidden overflow-y-auto no-scrollbar">
                        {prog.description}
                      </p>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
                        {programmes.map((_, i) => (
                          <div
                            key={i}
                            className={`h-3 rounded-full transition-all ${
                              i === currentIndex ? "bg-blue-400 w-3" : "bg-gray-500 w-3"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : isAdjacent ? (
                <div
                  className="rounded-2xl overflow-hidden shadow-md cursor-pointer opacity-50 transition-transform hover:scale-105"
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={prog.couverture}
                    alt={prog.nom}
                    className="w-[200px] h-[350px] rounded-2xl object-fill"
                  />
                </div>
              ) : (
                <div className="w-[200px] h-[350px] opacity-0 pointer-events-none" />
              )}
            </div>
          )
        })}
      </div>

      {/* Version Mobile */}
<div ref={containerRefMobile} className="flex  lg:hidden overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 px-4 relative">
  {programmes.map((prog, index) => {
    const isActive = index === currentIndex
    const isAdjacent = Math.abs(index - currentIndex) === 1 || (currentIndex === 0 && index === programmes.length - 1) || (currentIndex === programmes.length - 1 && index === 0)

        return (
            <div key={prog.id} ref={(el) => {(slidesRefMobile.current[index] = el)}} className="flex-shrink-0 w-[250px] snap-center" >
                <div onClick={() => setCurrentIndex(index)} className={`rounded-2xl overflow-hidden shadow-md cursor-pointer transition-transform duration-1000 ease-in-out ${ isActive ? "scale-100 opacity-100" : isAdjacent ? "scale-90 opacity-60" : "scale-80 opacity-30 pointer-events-none" }`} >
                
                    <img src={prog.couverture} alt={prog.nom} className="w-[250px] h-[350px] rounded-2xl object-fill" />
                    <h4 className="w-[230px] text-center text-xs truncate pt-1.5">{prog.nom}</h4>
        
                </div>
            </div>
         )
  })}
</div>
  

      {/* Arrows desktop only */}
      <button onClick={prevSlide} className="flex absolute top-1/2 left-0 -translate-y-1/2 bg-white/30 text-white hover:text-white hover:bg-[#1faae1] p-2 rounded-full shadow" >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={nextSlide} className="flex absolute top-1/2 right-0 -translate-y-1/2 bg-white/30  text-white hover:text-white hover:bg-[#1faae1] p-2 rounded-full shadow" >
        <ChevronRight className="w-6 h-6"/>
      </button>
    </div>
  )
}
