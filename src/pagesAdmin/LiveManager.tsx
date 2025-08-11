"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Square, Settings, Users, Eye } from "lucide-react"

interface LivePreviewProps {
  showControls?: boolean
}

export function LivePreview({ showControls = false }: LivePreviewProps) {
  const [isLive, setIsLive] = useState(true)
  const [viewers] = useState(1234)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Aperçu Live
            {isLive && <Badge className="bg-red-100 text-red-800 animate-pulse">🔴 EN DIRECT</Badge>}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Eye className="h-4 w-4" />
            {viewers.toLocaleString()} spectateurs
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Aperçu vidéo simulé */}
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
          <div className="text-center text-white z-10">
            <div className="text-6xl mb-4">📺</div>
            <p className="text-lg font-medium">Flux Live TV</p>
            <p className="text-sm opacity-75">Signal en cours...</p>
          </div>
          {isLive && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-600 text-white">LIVE</Badge>
            </div>
          )}
        </div>

        {/* Informations du programme actuel */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-1">Programme actuel</h4>
          <p className="text-sm text-gray-600 mb-2">Journal du soir - 20:00 à 21:00</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {viewers.toLocaleString()} spectateurs
            </span>
            <span>Durée: 25:30 / 60:00</span>
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

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-medium text-green-800">Qualité du signal</p>
                <p className="text-green-600">Excellente (1080p)</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-medium text-blue-800">Débit</p>
                <p className="text-blue-600">5.2 Mbps</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
