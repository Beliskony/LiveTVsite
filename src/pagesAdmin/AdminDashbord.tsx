"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "./StatsCard"
import { LivePreview } from "./LivePreview"
import {  BarChart3, Video, Calendar, Radio } from "lucide-react"
import { dashboardStats } from "@/data/dashboardStats"


export function AdminDashboard() {

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
          {dashboardStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
              <StatsCard
                title="Durée Totale"
                value="48h"
                description="Contenu disponible"
                icon={BarChart3}
                trend="up"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3.5">
              <Card className="p-4">
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
