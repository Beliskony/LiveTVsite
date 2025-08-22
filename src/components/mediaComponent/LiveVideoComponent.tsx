import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { liveData } from "@/data/liveData";
import type { ILive } from "@/interfaces/Live";
import LiveVideo from "./LiveVideo";



const LiveVideoComponent = () => {
   const liveVideoRef = useRef<HTMLVideoElement>(null);
   const liveProps = liveData;
   const [lives, setLives] = useState<ILive | null>(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState("")


 {/* useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch("http://api.yeshouatv.com/api/live")
        if (!res.ok) throw new Error("Erreur lors du chargement du live")
        const data: ILive = await res.json()
        setLives(data)
      } catch (err) {
        console.error(err)
        setError("Impossible de charger le live.")
      } finally {
        setLoading(false)
      }
    }

    fetchLive()
  }, []) */}

  //supprimer liveData et remplacer par lives du fetch


   useEffect(() => {
    if (Hls.isSupported() && liveVideoRef.current) {
      const hls = new Hls()
      hls.loadSource(liveProps.lien?? "")
      hls.attachMedia(liveVideoRef.current)
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        liveVideoRef.current?.play()
      })

      return () => {
        hls.destroy()
      }
    } else if (liveVideoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support for Safari
      liveVideoRef.current.src = liveProps.lien?? ""
      liveVideoRef.current.addEventListener("loadedmetadata", () => {
        liveVideoRef.current?.play()
      })
    }
  }, [liveProps.lien])

  return (
    <section className="flex flex-col items-center max-sm:gap-y-0 justify-between w-full max-sm:flex-col md:gap-y-2.5">
       
      <div className="live-video w-full min-h-[300px] md:h-[560px] lg:h-[560px] xl:h-[560px] max-sm:h-[450px]"
      style={{}}>
          <LiveVideo/>
      </div>

    </section>
  )
}

export default LiveVideoComponent