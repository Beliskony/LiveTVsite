"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Square, Settings, Users, Eye } from "lucide-react"
import type { ILive } from "@/interfaces/Live"
import { formatViews } from "@/utilitaires/FormatViews"
import { isHlsLink } from "@/utilitaires/mediaUtils"
import { extractHourFromDateTime } from "@/utilitaires/FormatHeure"
import { HlsPlayer } from "@/components/mediaComponent/HlsPlayer"

interface LivePreviewProps {
  showControls?: boolean
}

export function LivePreview({ showControls = false }: LivePreviewProps) {
  const [isLive, setIsLive] = useState(true)
  const [liveData, setLiveData] = useState<ILive | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)



  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("https://api.yeshouatv.com/api/lives", {
          method: "GET",
          headers: {Authorization: `Bearer ${token}`}
        })

        if (!res.ok) {
          throw new Error("Erreur lors du chargement des données du live.")
        }

        const data = await res.json()
        if (Array.isArray(data.data) && data.data.length > 0) {
          setLiveData(data.data[0]) // ✅ le premier live
        } else {
          setLiveData(null)
        }
      } catch (err) {
        console.error(err)
        setError("Impossible de récupérer les données du live.")
      } finally {
        setLoading(false)
      }
    }

    fetchLiveData()

      const interval = setInterval(fetchLiveData, 2000)
      return () => clearInterval(interval)
  }, [])


  if (loading) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between p-4">
          <CardTitle className="flex items-center gap-2">
            <span className="max-sm:hidden">Aperçu Live </span>
            <Badge className="bg-muted text-muted-foreground animate-pulse">Chargement...</Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-full" />
        </div>
      </CardContent>
    </Card>
  )
}


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between p-4">
          <CardTitle className="flex items-center gap-2">
           <span className="max-sm:hidden">Aperçu Live </span>
            {isLive && <Badge className="bg-red-100 text-red-800 animate-pulse">🔴 EN DIRECT</Badge>}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Eye className="h-4 w-4" />
            {formatViews(liveData?.viewers?? 0)} spectateurs
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Aperçu vidéo simulé */}
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
         {liveData?.lien ? (  
           isHlsLink(liveData?.lien) ? (
            <HlsPlayer url={liveData.lien!} />
           ) :(
          <iframe
            src={`${liveData?.lien}?autoplay=1&loop=1`}
            title={liveData?.title}
            className="w-full h-full rounded-md"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
          )
          ) : (
            <div className="text-white text-center text-sm">Aucun live n’est actuellement disponible.</div>
          )}
        </div>

        {/* Informations du programme actuel */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-1">{liveData?.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{extractHourFromDateTime(liveData?.startTime ?? "")} à {extractHourFromDateTime(liveData?.endingTime ?? "")}</p>
          
           <div className="text-sm text-gray-600 overflow-y-auto max-h-24">
              {liveData?.description}
           </div>
          
        </div>

        {/* Contrôles de diffusion */}
        {showControls && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant={isLive ? "destructive" : "default"}
                size="sm"
                onClick={() => setIsLive(!isLive)}
                className="flex items-center gap-2"
              >
                {isLive ? (
                  <>
                    <Square className="h-4 w-4" />
                    Arrêter le live
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Démarrer le live
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
            </div>

          </div>
        )}
      </CardContent>
    </Card>
  )
}
