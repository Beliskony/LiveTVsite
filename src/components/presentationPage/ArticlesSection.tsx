"use client"
import { useEffect, useState, useCallback } from "react"
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import ArticleCard from "../articlesPage/ArticleCard"
import type { IArticle } from "@/interfaces/Articles"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

export default function ArticleCarousel() {
  // Options pour Embla Carousel
  const options: EmblaOptionsType = {
    loop: true, // Désactive la boucle infinie
    align: "start", // Aligne les slides au début du viewport
    slidesToScroll: 1, // Défile une slide à la fois
  }

  const autoplayOption = Autoplay(
    {delay: 5000, stopOnInteraction: false},
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplayOption])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [articles, setArticles] = useState<IArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


    const fetchArticles = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://api.yeshouatv.com/api/list_article_for_user", {
        method: "GET"
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Erreur API: ${errorText}`)
      }

      const result = await res.json()
      if (!Array.isArray(result.data)) throw new Error("Données inattendues")

      // ✅ Stocker dans le cache
      sessionStorage.setItem("articles", JSON.stringify(result.data))
      setArticles(result.data)
      setError(null)
    } catch (err) {
      console.error("Erreur de chargement des articles:", err)
      setError("Impossible de charger les articles.")
    } finally {
      setLoading(false)
    }
  }

  // ✅ Initialisation : on lit le cache, puis on fetch
  useEffect(() => {
    const cachedArticles = sessionStorage.getItem("articles")
    if (cachedArticles) {
      try {
        setArticles(JSON.parse(cachedArticles))
        setLoading(false)
      } catch (e) {
        console.warn("Erreur parsing cache articles")
      }
    }

    fetchArticles()
    const interval = setInterval(fetchArticles, 10000)
    return () => clearInterval(interval)
  }, [])


  // Met à jour l'index sélectionné et l'état des boutons
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  // Initialise les snaps de défilement et l'état initial
  const onInit = useCallback(
    (emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList())
      onSelect(emblaApi)
    },
    [onSelect],
  )

  // Ajoute les écouteurs d'événements Embla
  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onInit) // Gère le redimensionnement de la fenêtre ou les changements de contenu

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onInit)
    }
  }, [emblaApi, onInit, onSelect])

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 my-4">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
       <div className="embla__container flex space-x-4 touch-action-pan-y" >
          {articles.slice(0, 5).map((article) => (
            <div
                key={article.id}>
                <ArticleCard {...article} />
            </div>
          ))}
        </div>
      </div>

      {/* Boutons de navigation */}
      {/* Les boutons sont désactivés si le défilement n'est pas possible */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={prevBtnDisabled}
        className="absolute -left-20 max-md:-left-5 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all md:hidden max-sm:hidden lg:block xl:block duration-200 z-20 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Faire défiler vers la gauche"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        disabled={nextBtnDisabled}
        className="absolute -right-20 max-md:-right-5 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all md:hidden max-sm:hidden lg:block xl:block duration-200 z-20 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Faire défiler vers la droite"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicateurs de points 
      <div className="flex justify-center mt-4 space-x-2">
        {scrollSnaps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === selectedIndex ? "bg-blue-500 scale-110" : "bg-gray-400"}`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>*/}

      <div className="flex w-full items-center justify-center my-4">
        <Button className="mt-4 p-2 flex justify-center items-center bg-gray-900 shadow transition-all ease-in-out">
          <Link to="/egliseYeshoua/articles" className=" text-white">
            Voir tous les articles
          </Link>
          <BookOpen className="w-4 h-4" />
        </Button>
      </div>

    </div>
  )
}
