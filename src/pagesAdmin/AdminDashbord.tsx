"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "./StatsCard"
import { VideoTable } from "./VideoTable"
import { VideoForm } from "./VideosForm"
import { ProgramTable } from "./ProgramTable"
import { ProgramForm } from "./ProgramForm"
import { LivePreview } from "./LivePreview"
import { Button } from "@/components/ui/button"
import { Plus, BarChart3, Video, Calendar, Radio } from "lucide-react"

export function AdminDashboard() {
  const [showVideoForm, setShowVideoForm] = useState(false)
  const [showProgramForm, setShowProgramForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Administration TV Channel</h1>
          <p className="text-gray-600">Gérez votre contenu et votre programmation</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
     
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard title="Total Vidéos" value="156" description="+12 cette semaine" icon={Video} trend="up" />
              <StatsCard title="Programmes" value="24" description="Cette semaine" icon={Calendar} trend="stable" />
              <StatsCard title="Vues Live" value="1,234" description="Actuellement" icon={Radio} trend="up" />
              <StatsCard
                title="Durée Totale"
                value="48h"
                description="Contenu disponible"
                icon={BarChart3}
                trend="up"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3.5">
              <Card>
                <CardHeader>
                  <CardTitle>Activité Récente</CardTitle>
                  <CardDescription>Dernières actions sur la plateforme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Video className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Nouvelle vidéo ajoutée</p>
                        <p className="text-sm text-gray-600">Il y a 2 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Programme mis à jour</p>
                        <p className="text-sm text-gray-600">Il y a 4 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Radio className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Live démarré</p>
                        <p className="text-sm text-gray-600">Il y a 6 heures</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <LivePreview />
            </div>
         

      </div>
    </div>
  )
}
