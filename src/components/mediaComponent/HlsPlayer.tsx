import React, { useEffect, useRef } from "react"
import Hls from "hls.js"

interface HlsPlayerProps {
  url: string
  onPlay?: () => void
}

export function HlsPlayer({ url, onPlay }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls | null = null

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url
    } else if (Hls.isSupported()) {
      hls = new Hls()
      hls.loadSource(url)
      hls.attachMedia(video)
    } else {
      console.error("Votre navigateur ne supporte pas HLS.")
    }

    const handlePlay = () => {
      if (onPlay) onPlay()
    }

    video.addEventListener("play", handlePlay)

    return () => {
      video.removeEventListener("play", handlePlay)
      if (hls) hls.destroy()
    }
  }, [url, onPlay])

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: "100%", height: "100%" }}
      autoPlay
      muted
    />
  )
}
