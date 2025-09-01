"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "./StatsCard"
import { LivePreview } from "./LivePreview"
import {  BarChart3, Video, Calendar, Radio, Users, Tv, Newspaper } from "lucide-react"



export function AdminDashboard() {
  const [stats, setStats] = useState<{ users: number; programmes: number; articles: number }>({
    users: 0,
    programmes: 0,
    articles: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://api.yeshouatv.com/api/stat", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "GET"
        })

        if (!res.ok) throw new Error("Erreur lors de la récupération des statistiques")

        const data = await res.json()
        setStats(data.data)
      } catch (err) {
        console.error(err)
        setError("Impossible de charger les statistiques.")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <p className="p-6 text-gray-500">Chargement des statistiques...</p>
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>
  }

   // Crée un tableau à partir de l'objet stats pour map
  const statsArray = [
    {
      title: "Utilisateurs",
      value: stats.users.toString(),
      description: "Nombre total d'utilisateurs",
      icon: Users,
      trend: "stable" as const,
    },
    {
      title: "Programmes",
      value: stats.programmes.toString(),
      description: "Nombre de programmes",
      icon: Tv,
      trend: "stable" as const,
    },
    {
      title: "Articles",
      value: stats.articles.toString(),
      description: "Nombre d'articles publiés",
      icon: Newspaper,
      trend: "stable" as const,
    },
  ]

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
          {statsArray.map((stat, index) => (
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
