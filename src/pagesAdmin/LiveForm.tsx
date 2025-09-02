"use client"

import { useState } from "react"
import { Save, Eye, EyeOff, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ILive } from "@/interfaces/Live"
import { liveData } from "@/data/liveData"

interface LiveSettingsProps {
  onSave?: (data: ILive) => void
  onClose: () => void
}

export function LiveForm({ onSave, onClose }: LiveSettingsProps) {
  const [config, setConfig] = useState<ILive>(liveData)
  const [showStreamUrl, setShowStreamUrl] = useState(false)

  const handleSave = () => {
    if (onSave) {
      onSave(config)
    }
    alert("Configuration du live sauvegardée ✅")
  }

  return (
    <Card className="w-full mb-6 p-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Configuration du Live</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* URL du Stream */}
        <div className="space-y-2">
          <Label htmlFor="stream-url">URL du Stream RTMP</Label>
          <div className="relative">
            <Input
              id="stream-url"
              type={showStreamUrl ? "text" : "password"}
              value={config.lien ?? ""}
              onChange={(e) => setConfig({ ...config, lien: e.target.value })}
              placeholder="rtmp://live.example.com/stream/key"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowStreamUrl(!showStreamUrl)}
            >
              {showStreamUrl ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Informations du programme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="program-title">Titre du programme</Label>
            <Input
              id="program-title"
              type="text"
              value={config.title ?? ""}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              placeholder="Nom du programme en cours"
            />
          </div>
        </div>

        {/* Horaires de diffusion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-time">Heure de début</Label>
            <Input
              id="start-time"
              type="time"
              value={config.startTime ?? ""}
              onChange={(e) => setConfig({ ...config, startTime: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-time">Heure de fin</Label>
            <Input
              id="end-time"
              type="time"
              value={config.endingTime ?? ""}
              onChange={(e) => setConfig({ ...config, endingTime: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={config.description ?? ""}
            onChange={(e) => setConfig({ ...config, description: e.target.value })}
            rows={3}
            placeholder="Description du programme en cours"
          />
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end gap-3">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Sauvegarder
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
