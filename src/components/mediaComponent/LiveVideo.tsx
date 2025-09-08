import { useState, useEffect, useRef } from "react"
import type { ILive } from "@/interfaces/Live"
import { Skeleton } from "../ui/skeleton"
import { extractHourFromDateTime } from "@/utilitaires/FormatHeure"
import { isHlsLink } from "@/utilitaires/mediaUtils"


const LiveVideo = () => {
  const [lives, setLives] = useState<ILive | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const hasIncrementedView = useRef(false)
  const incrementTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getDeviceId = () => {
    let deviceId = localStorage.getItem("device_id")
    if (!deviceId) {
      deviceId = crypto.randomUUID()
      localStorage.setItem("device_id", deviceId)
    }
    return deviceId
  }

  useEffect(() => {
  const fetchLive = async () => {
    try {
      const res = await fetch("https://api.yeshouatv.com/api/list_live_for_user")
      if (!res.ok) throw new Error("Erreur lors du chargement du live")
      
      const json = await res.json()
      // json.data est un tableau d'objets ILive
      if (Array.isArray(json.data) && json.data.length > 0) {
        setLives(json.data[0])  // On prend le premier live
      } else {
        setLives(null)
      }
    } catch (err) {
      console.error(err)
      setError("Impossible de charger le live pour le moment.")
    } finally {
      setLoading(false)
    }
  }

  fetchLive()
}, [])

  const handleViewIncrement = () => {
  if (hasIncrementedView.current || !lives?.id) return
  const viewedLives = JSON.parse(localStorage.getItem("viewedLives") || "[]")
    if (viewedLives.includes(lives.id)) {
      console.log("Vue déjà comptabilisée localement pour ce live.")
      return
    }

  hasIncrementedView.current = true

  incrementTimeoutRef.current = setTimeout(async () => {
    try {
      const deviceId = getDeviceId()

      const response = await fetch(`https://api.yeshouatv.com/api/lives/${lives.id}/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({device_id: deviceId}),
      })

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`)
      }

      const json = await response.json()

      // Optionnel : si tu veux afficher localement les vues mises à jour
       setLives(prev => prev ? { ...prev, viewers: json.viewers } : prev)

       // Mémorise le live comme "vu"
        const updatedViewed = [...viewedLives, lives.id]
        localStorage.setItem("viewedLives", JSON.stringify(updatedViewed))
    } catch (err) {
      console.error("Erreur lors de l'incrémentation de la vue :", err)
      hasIncrementedView.current = false
    }
  }, 2000)
}

useEffect(() => {
  return () => {
    if (incrementTimeoutRef.current) {
      clearTimeout(incrementTimeoutRef.current)
    }
  }
}, [])

useEffect(() => {
  if (lives?.lien && !isHlsLink(lives.lien)) {
    handleViewIncrement()
  }
}, [lives?.lien])


  if (loading || error) {
    return (
      <div className="w-full h-full flex flex-col lg:flex-row lg:p-16 xl:p-16 gap-4 justify-center items-center">
        <div className="w-full px-5 md:px-5 lg:w-8/12 xl:w-7/12 max-sm:h-[250px] h-[400px] lg:h-[450px]">
          <Skeleton className="w-full h-full rounded-md" />
        </div>
        <div className="w-full px-7 md:px-7 lg:w-4/12 xl:w-5/12 lg:px-2 xl:px-10 text-left">
          <Skeleton className="h-8 max-sm:h-6 w-3/4 mb-4" />
          <Skeleton className="h-6 max-sm:h-5 w-1/2 mb-4" />
          <div className="space-y-2 max-sm:hidden md:hidden lg:block">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!lives) {
  return (
    <div className="text-center text-white w-full py-20">
      <p>Aucun live n’est disponible actuellement.</p>
    </div>
  )
}


  return (
    <div className="w-full h-full flex flex-col xl:flex-row lg:p-16 xl:p-16 gap-4 justify-center items-center">
      {/* Vidéo à gauche */}
      <div className="w-full px-5 md:px-5 xl:w-7/12 max-sm:h-[250px] h-[400px] lg:h-[450px]">
        {lives?.lien ? (
          <iframe
            src={`${lives.lien}?autoplay=1&loop=1`}
            title={lives.title}
            className="w-full h-full rounded-md"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p className="text-white">Aucun live n’est disponible actuellement.</p>
        )}
      </div>

      {/* Infos à droite */}
      <div className="w-full px-7 md:px-7 lg:w-full xl:w-5/12 lg:px-4 xl:px-10 text-white text-left flex flex-col gap-4">
        <h1 className="text-3xl max-sm:text-xl lg:text-2xl font-bold leading-tight">
          Vous suivez actuellement le live
        </h1>
        <h2 className="text-xl max-sm:text-lg font-semibold leading-snug">
          {lives?.title}
        </h2>
        <h3 className="text-lg max-sm:text-base mt-1 font-light">
          De <span className="text-xl max-sm:text-lg font-bold">{extractHourFromDateTime(lives?.startTime ?? "")}</span> à <span className="text-xl max-sm:text-lg font-bold">{extractHourFromDateTime(lives?.endingTime ?? "")}</span>
        </h3>
        <p className="mt-2 text-sm max-sm:hidden md:hidden max-h-72 overflow-y-auto lg:hidden xl:block text-gray-300 leading-relaxed">
          {lives?.description}
        </p>
      </div>

    </div>
  )
}

export default LiveVideo
