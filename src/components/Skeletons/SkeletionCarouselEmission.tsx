import { Skeleton } from "@/components/ui/skeleton"

export const EmissionCarouselSkeleton = () => {
  return (
    <div className="relative w-full lg:h-[650px] max-sm:h-[300px] md:h-[500px] overflow-hidden bg-black">
      {/* Image placeholder */}
      <Skeleton className="absolute inset-0 w-full h-full object-cover" />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* Text Content Skeleton */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 flex flex-col justify-center gap-4 max-w-3xl">
          <Skeleton className="h-8 w-1/2 max-sm:w-3/4 rounded" />
          <Skeleton className="h-6 w-3/4 max-sm:w-full rounded" />
          <Skeleton className="h-6 w-2/3 max-sm:w-5/6 rounded" />
          <Skeleton className="h-10 w-40 max-sm:w-32 rounded-full" />
        </div>
      </div>
    </div>
  )
}
