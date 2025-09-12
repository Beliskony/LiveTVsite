"use client"

import { useState, useEffect } from "react"
import { StatsCard } from "./StatsCard"
import { LivePreview } from "./LivePreview"
import { Users, Tv, Newspaper, Video } from "lucide-react"



export function AdminDashboard() {
  const [stats, setStats] = useState<{ users: number; programmes: number; articles: number; vidéos: number }>({
    users: 0,
    programmes: 0,
    articles: 0,
    vidéos: 0,
  })

  const [prevStats, setPrevStats] = useState<{ users: number; programmes: number; articles: number; vidéos: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("https://api.yeshouatv.com/api/stat", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "GET"
        })

        if (!res.ok) throw new Error("Erreur lors de la récupération des statistiques")

        const data = await res.json()
        setPrevStats(stats)
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

  const getTrend = (current: number, previous?: number): "up" | "down" | "stable" => {
    if (previous === undefined) return "stable"
    if (current > previous) return "up"
    if (current < previous) return "down"
    return "stable"
  }

  const usersTrend = getTrend(stats.users, prevStats?.users)
  const programmesTrend = getTrend(stats.programmes, prevStats?.programmes)
  const articlesTrend = getTrend(stats.articles, prevStats?.articles)
  const videosTrend = getTrend(stats.vidéos, prevStats?.vidéos)


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
      icon: Users,
      trend: usersTrend,
      trendLabel: "Nombre d'utilisateurs",
    },
    {
      title: "Programmes",
      value: stats.programmes.toString(),
      icon: Tv,
      trend: programmesTrend,
      trendLabel: "Nombre de programmes",
    },
    {
      title: "Articles",
      value: stats.articles.toString(),
      icon: Newspaper,
      trend: articlesTrend,
      trendLabel:"Nombre d'articles",
    },
    {
      title: "Videos",
      value: stats.vidéos.toString(),
      icon: Video,
      trend: videosTrend,
      trendLabel: "Nombre de videos"
    }
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
              icon={stat.icon}
              trend={stat.trend}
              trendLabel={stat.trendLabel}
            />
          ))}
             
            </div>

            <div className="grid grid-cols-1 gap-6 mt-3.5">
              <LivePreview />
            </div>
         

      </div>
    </div>
  )
}
