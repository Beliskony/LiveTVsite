"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Maximize, X, Eye, Clock } from "lucide-react"
import { formatRelativeDate } from "@/utilitaires/FormatDate"
import { formatViews } from "@/utilitaires/FormatViews"
import type { IVideo } from "@/interfaces/Videos"

interface VideoModalProps {
  video: IVideo
  isOpen: boolean
  onClose: () => void
}

export default function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [isOpen])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  if (!video) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-gray-800">
        <DialogHeader className="sr-only">
          <DialogTitle>{video.title}</DialogTitle>
        </DialogHeader>

        {/* Video Player */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            src={video.videoUrl}
            autoPlay
            className="w-full aspect-video"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
          />

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                  <Maximize className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-6 bg-gray-900 text-white">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{video.title}</h2>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{formatRelativeDate(video.createdAt.toLocaleDateString())}</span>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{formatViews(video.views ?? 0)} vues</span>
              </div>
              {video.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{video.duration}</span>
                </div>
              )}
            </div>

            {video.category && (
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-white border-gray-600">
                  {video.category}
                </Badge>
              </div>
            )}

            <p className="text-gray-300 leading-relaxed">{video.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
