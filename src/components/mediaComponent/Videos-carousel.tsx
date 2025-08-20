'use client'

import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { VideoCard } from './VideoCard'
import type { IVideo } from '../../interfaces/Videos'

interface VideoCarouselProps {
  videos: IVideo[]
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const options: EmblaOptionsType = {
    loop: false,
    align: 'start',
    slidesToScroll: 1,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [Scrollsnaps, setScrollSnaps] = useState<number[]>([])
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(true)

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevDisabled(!emblaApi.canScrollPrev())
    setNextDisabled(!emblaApi.canScrollNext())
  }, [])

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect(emblaApi)
  }, [onSelect])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onInit)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onInit)
    }
  }, [emblaApi, onInit, onSelect])

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
       <div className="embla__container flex space-x-4 touch-action-pan-y touch-pinch-zoom" >

           {videos.slice(0, 5).map((video) => (
              <div
                key={video.id}>
          <VideoCard {...video} />
        </div>
        ))}
      </div>

      </div>

      {!prevDisabled && (
      <button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={prevDisabled}
        className=" absolute -left-5 top-1/3 -translate-y-1/2 p-2 bg-gray-800/50 text-white rounded-full max-sm:hidden md:block lg:block xl:block disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      )}

      {!nextDisabled && (
      <button
        onClick={() => emblaApi?.scrollNext()}
        disabled={nextDisabled}
        className="md:block absolute -right-5 top-1/3 -translate-y-1/2 p-2 bg-gray-800/50 text-white rounded-full max-sm:hidden lg:block xl:block disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        {Scrollsnaps.map((_, idx) => (
          <div
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={`w-6 h-3 cursor-pointer transition duration-300 ${
              selectedIndex === idx ? 'bg-gray-800 scale-110' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
