import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonProgrammeInfo() {
  return (
    <div className="animate-pulse w-full">

      {/* Titre + description */}
      <div className="max-w-5xl my-10 max-sm:h-[200px] md:h-[400px] md:pt-16 space-y-4">
        <Skeleton className="h-10 w-3/4 md:h-16 md:w-2/3 rounded" />
        <Skeleton className="h-6 w-full md:w-3/4" />
        <Skeleton className="h-6 w-5/6" />
      </div>

      {/* Badges et infos */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-40 rounded" />
        <Skeleton className="h-6 w-32 rounded" />
      </div>

      {/* Nombre de vidéos */}
      <div className="flex items-center gap-2 mb-10">
        <Skeleton className="h-6 w-32 rounded" />
      </div>

      {/* Titre section + filtres */}
      <div className="flex flex-col md:flex-row justify-between border-b pb-4 mb-6 gap-4">
        <Skeleton className="h-10 w-60 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32 rounded" />
          <Skeleton className="h-10 w-24 rounded" />
        </div>
      </div>

    </div>
  )
}
