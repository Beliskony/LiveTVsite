import { Skeleton } from "@/components/ui/skeleton"

const SkeletonProgrammePhare = () => {
  return (
    <div className="hidden lg:flex items-center gap-6 overflow-x-auto scroll-smooth px-4 no-scrollbar">
      {/* Simulate 6 cards, with 1 active (index 0), 2 adjacent (index 1 & 5) */}
      {[0, 1, 2, 3, 4, 5].map((_, index) => {
        const isActive = index === 0
        const isAdjacent = index === 1 || index === 5

        if (isActive) {
          return (
            <div key={index} className="flex-shrink-0">
              <div className="bg-gray-900 w-[800px] min-h-[450px] text-white rounded-2xl shadow-lg px-6 py-4 flex flex-col justify-start transition-all duration-1000 ease-in-out">
                <div className="flex flex-row w-full py-3 gap-x-1 items-center justify-start">
                  <Skeleton className="h-6 w-40 mb-2 rounded" />
                  <hr className="border-t-2 text-white w-full max-w-full px-2" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="w-[200px] h-[350px] rounded-2xl" />
                  <div className="relative h-[350px] flex flex-col justify-between w-full">
                    <div className="text-sm px-4 leading-relaxed space-y-2 overflow-hidden overflow-y-auto no-scrollbar">
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-5/6 rounded" />
                      <Skeleton className="h-4 w-2/3 rounded" />
                      <Skeleton className="h-4 w-4/5 rounded" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
                      {[...Array(6)].map((_, i) => (
                        <Skeleton
                          key={i}
                          className="h-3 w-3 rounded-full bg-gray-600"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        if (isAdjacent) {
          return (
            <div key={index} className="flex-shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-md opacity-50">
                <Skeleton className="w-[200px] h-[350px] rounded-2xl" />
              </div>
            </div>
          )
        }

        // Non-adjacent: render hidden placeholder to keep layout
        return (
          <div
            key={index}
            className="w-[200px] h-[350px] opacity-0 pointer-events-none"
          />
        )
      })}
    </div>
  )
}

export default SkeletonProgrammePhare
