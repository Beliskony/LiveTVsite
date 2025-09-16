import { useRef, useEffect } from "react";

interface VideoThumbnailProps {
  videoUrl: string;
}

export function VideoThumbnail({ videoUrl }: VideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 10) {
        video.currentTime = 0;  // rewind to start after 10s
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <video
      src={videoUrl}
      muted
      autoPlay
      loop
      playsInline
      className="h-12 w-20 object-cover rounded"
      preload="metadata"
    />
  );
}
