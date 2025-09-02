import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export const SkeletonVideoCard = () => {
  return (
    <Card className="group w-[350px] font-normal overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      
      {/* Vidéo (placeholder image aspect ratio) */}
      <div className="relative aspect-video overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Contenu (footer) */}
      <CardContent className="w-full py-2 space-y-2 h-20 text-gray-800">
        {/* Ligne infos (date + durée) */}
        <div className="flex flex-row justify-between items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>

        {/* Titre */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  )
}
