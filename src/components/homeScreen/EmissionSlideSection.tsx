"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { EmissionCard } from "../mediaComponent/EmissionCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "../ui/badge"

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

export default function ProgrammesParJourSlider() {
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  const [selectedDay, setSelectedDay] = useState<number>(todayIndex)
  const [programmes, setProgrammes] = useState<any[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Mise à jour de l'heure chaque minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Récupération des programmes depuis l'API
  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const res = await fetch("https://api.yeshouatv.com/api/list_programmes_for_user")
        if (!res.ok) throw new Error(`Erreur API ${res.status}`)
        const result = await res.json()
        const parsed = result.data.map((prog: any) => ({
          ...prog,
          when:
            typeof prog.when === "string" ? prog.when.split(",").map((d: string) => d.trim().toLowerCase()) : prog.when,
        }))
        setProgrammes(parsed)
      } catch (err) {
        console.error("Erreur API:", err)
      }
    }
    fetchProgrammes()
  }, [])

  // Programmes du jour sélectionné
  const currentDayPrograms = useMemo(() => {
    const dayName = jours[selectedDay].toLowerCase()
    return programmes
      .filter((p) => p.when.includes(dayName))
      .sort((a, b) => {
        const [aH, aM] = a.starting.replace("h", ":").split(":").map(Number)
        const [bH, bM] = b.starting.replace("h", ":").split(":").map(Number)
        return aH * 60 + aM - (bH * 60 + bM)
      })
  }, [programmes, selectedDay])

  // Programmes ordonnés pour le jour sélectionné
  const currentDayProgramsOrdered = useMemo(() => {
    return currentDayPrograms
  }, [currentDayPrograms])

  const scrollNext = () => {
    if (selectedIndex < currentDayProgramsOrdered.length - 1 && !isTransitioning) {
      setIsTransitioning(true)
      setSelectedIndex((prev) => prev + 1)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }

  const scrollPrev = () => {
    if (selectedIndex > 0 && !isTransitioning) {
      setIsTransitioning(true)
      setSelectedIndex((prev) => prev - 1)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }

  const goToSlide = (index: number) => {
    if (index !== selectedIndex && !isTransitioning && index >= 0 && index < currentDayProgramsOrdered.length) {
      setIsTransitioning(true)
      setSelectedIndex(index)
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }

  // Réinit carousel au changement de jour
  useEffect(() => {
    setSelectedIndex(0)
  }, [selectedDay, currentDayProgramsOrdered])

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        {/* Boutons jours */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:justify-start max-sm:px-2 max-sm:no-scrollbar">
          {jours.map((jour, index) => (
            <Button
              key={jour}
              onClick={() => setSelectedDay(index)}
              className={`py-1.5 px-4 justify-center items-center rounded-xl transition-all flex flex-row ${
                selectedDay === index
                  ? "bg-[#1faae1] text-white shadow-xl scale-105"
                  : "bg-gray-800 text-white border border-white/50 hover:bg-[#1faae1]"
              }`}
            >
              <span className="text-sm"> {jour} </span>
            </Button>
          ))}
        </div>

        {/* Titre + flèches */}
        <div className="flex items-center mb-2 gap-4">
          <h1 className="text-white text-xl md:text-2xl font-bold">Programme du {jours[selectedDay]}</h1>
          <hr className="flex-grow border border-white/20" />
          <div className="flex gap-2 max-sm:hidden">
            <Button
              size="icon"
              onClick={scrollPrev}
              disabled={selectedIndex === 0}
              className="bg-white/10 text-white rounded-full hover:bg-[#1faae1] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft />
            </Button>
            <Button
              size="icon"
              onClick={scrollNext}
              disabled={selectedIndex === currentDayProgramsOrdered.length - 1}
              className="bg-white/10 text-white rounded-full hover:bg-[#1faae1] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        {/* Programmes */}
        {programmes.length === 0 ? (
          <div className="text-white text-center mt-10">Chargement des programmes...</div>
        ) : currentDayPrograms.length === 0 ? (
          <div className="text-white text-center mt-10">Aucun programme pour ce jour.</div>
        ) : (
          <>
            <div className="flex flex-row md:hidden">
              {/* Version mobile: Info + EmissionCard */}
              <div className="w-full md:w-1/5 flex flex-col md:hidden">
                {currentDayProgramsOrdered.map((program, i) => {
                  const startHour = program.starting.split("-")[0]
                  return (
                    <div key={program.id} className={`mb-6 flex flex-row justify-center gap-x-10 program-item-${i}`}>
                      <div className="flex flex-col items-start pt-2.5 ">
                        <span className="text-white text-sm bg-[#1faae1] justify-center p-2 h-10 rounded">
                          {startHour}
                        </span>
                        <div className="border-l-2 border-white h-full ml-7"></div>
                      </div>

                      <div className="flex flex-col justify-center">
                        <span className="text-white text-[16px] font-bold pl-5">{program.nom}</span>
                        <span className="text-white text-sm font-extralight pl-5">{program.genre}</span>
                        <EmissionCard contenu={program} textCouleur="hidden" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Desktop version */}
            <div className="flex flex-row max-sm:hidden">
              <div className="flex flex-col w-2/5 items-start justify-center gap-2">
                <div className="rounded-md xl:pl-32 lg:pl-28 md:pl-20 flex items-center justify-center transition-all duration-300 w-full relative">
                  {selectedIndex !== null && (
                    <span className="text-sm font-bold rounded bg-[#1faae1] text-white p-4 z-10 relative">
                      {currentDayProgramsOrdered[selectedIndex].starting.split("-")[0]}
                    </span>
                  )}
                  <hr className="flex-1 w-full border-[#1faae1] border-t-2 mt-0" />
                  
                </div>

              </div>

              <div className="overflow-hidden px-0.5 flex-1">
                <div
                  className="flex gap-2 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${selectedIndex * (290 + 8)}px)`, // 220px width + 8px gap
                    width: `${currentDayProgramsOrdered.length * (290 + 8)}px`,
                  }}
                >
                  {currentDayProgramsOrdered.map((program, i) => {
                    const startHour = program.starting.split("-")[0]
                    const isActive = i === selectedIndex
                    const isPrev = i === selectedIndex - 1
                    const isNext = i === selectedIndex + 1
                    const isVisible = isActive || isPrev || isNext

                    return (
                      <div
                        key={program.id}
                        className={`flex-shrink-0 w-[290px] h-[570px] pt-2.5 transition-all duration-300 cursor-pointer ${
                          isActive ? "opacity-100" : isVisible ? "opacity-70 scale-95" : "opacity-30 scale-85"
                        }`}
                        onClick={() => goToSlide(i)}
                      >
                        <div
                          className={` relative rounded-xl duration-300 ${
                            isActive ? "ring-2 ring-[#1faae1] shadow-lg shadow-[#1faae1]/20" : "ring-0"
                          }`}
                        >

                          {/* ✅ Badge en haut à gauche */}
                            <div className={`absolute top-3 left-48 m-2 z-30 ${isActive ? "hidden transition-all duration-300" : ""}`}>
                              <Badge className="text-white text-sm bg-[#1faae1] justify-center p-2 h-5 rounded">
                                  {startHour}
                              </Badge>
                            </div>
                          <EmissionCard contenu={program} textCouleur="hidden" />
                        </div>

                        <div className="mt-4 font-bold text-sm text-center text-white">
                          <h2 className="truncate">{program.nom}</h2>
                          <Badge className={isActive ? "bg-[#1faae1]" : ""}>{program.genre}</Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
