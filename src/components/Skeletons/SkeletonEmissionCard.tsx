import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export const SkeletonEmissionCard = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="relative w-[250px] max-sm:w-[300px] h-[450px] lg:h-96 xl:h-[420px] overflow-hidden border-0 shadow-lg">
        
        {/* Image de couverture (skeleton) */}
        <Skeleton className="absolute inset-0 h-full w-full" />

        {/* Gradient overlay simulé */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/40 to-transparent" />

        {/* Contenu central en survol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-6 space-y-4">
            <Skeleton className="h-5 w-32 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
            <Skeleton className="h-4 w-40 mx-auto" />
          </div>
        </div>

        {/* Badges */}
        <CardContent className="relative z-10 flex flex-col justify-end h-full p-0">
          <div className="absolute w-full top-4 left-4 flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-24 rounded-md" />
          </div>
        </CardContent>
      </Card>

      {/* Nom de l’émission (en dessous) */}
      <div className="mt-1 w-full text-sm text-center font-bold">
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>
    </div>
  )
}
