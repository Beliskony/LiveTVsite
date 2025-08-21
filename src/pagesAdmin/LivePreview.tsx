"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Square, Settings, Users, Eye } from "lucide-react"
import { liveData } from "@/data/liveData"
import { formatViews } from "@/utilitaires/FormatViews"
import LiveVideo from "@/components/mediaComponent/LiveVideo"

interface LivePreviewProps {
  showControls?: boolean
}

export function LivePreview({ showControls = false }: LivePreviewProps) {
  const [isLive, setIsLive] = useState(true)

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
            {formatViews(liveData.viewers?? 0)} spectateurs
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Aperçu vidéo simulé */}
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
           <iframe
          src={`${liveData.lien}?autoplay=1&loop=1`}
          title={liveData.title}
          className="w-full h-full rounded-md"
          allow="autoplay; fullscreen; picture-in-picture"
        />
        </div>

        {/* Informations du programme actuel */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-1">{liveData.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{liveData.startTime} à {liveData.endingTime}</p>
          
           <div className="text-sm text-gray-600 overflow-y-auto max-h-24">
              {liveData.description}
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
