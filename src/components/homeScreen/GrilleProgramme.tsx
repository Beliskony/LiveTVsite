"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Calendar } from "lucide-react"
import { jours, programmeData } from "@/data/programmeData"

interface ProgramSlot {
  horaire: string
  jours: (string | null)[]
}

export default function TVSchedule() {
  const [selectedDay, setSelectedDay] = useState(0)

  const getDayPrograms = (dayIndex: number) => {
    return programmeData
      .map((slot) => ({
        horaire: slot.horaire,
        programme: slot.jours[dayIndex],
      }))
      .filter((item) => item.programme !== null)
  }

  const currentDayPrograms = getDayPrograms(selectedDay)

  return (
    <div className="min-h-screen p-6 max-sm:px-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl lg:text-4xl font-bold text-white mb-2 text-balance">Programme de la Semaine</h1>
          <p className="text-muted-foreground text-xs lg:text-lg">Découvrez tous nos programmes TV pour cette semaine</p>
        </div>

        {/* Day Navigation - Kept outside scrollable area */}
        <div className="flex flex-wrap gap-2 mb-6">
          {jours.map((jour, index) => (
            <Button
              key={jour}
              variant={selectedDay === index ? "default" : "outline"}
              onClick={() => setSelectedDay(index)}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              {jour}
            </Button>
          ))}
        </div>

        {/* Schedule Grid - Added max height and scroll */}
        <div className="grid gap-4">
          <Card className=" border-border bg-gray-900 p-4 max-sm:px-1">
            <CardHeader className="text-white text-xl">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {jours[selectedDay]}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 max-h-[700px] bg-white overflow-y-auto">
              <div className="divide-y divide-border">
                {currentDayPrograms.map((program, index) => (
                  <div key={index} className="p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Time */}
                      <div className="flex items-center gap-2 text-primary font-semibold min-w-[120px]">
                        <Clock className="w-4 h-4" />
                        {program.horaire}
                      </div>

                      {/* Program Info - Removed badges and buttons */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-card-foreground">{program.programme}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
