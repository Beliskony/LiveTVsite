import { Skeleton } from "@/components/ui/skeleton"

const SkeletonProgrammeDuJours = () => {
  return (
    <div className="flex flex-row max-sm:hidden">
      {/* Left column with hour and line */}
      <div className="flex flex-col w-2/5 items-start justify-center gap-2">
        <div className="rounded-md xl:pl-32 lg:pl-28 md:pl-20 flex items-center justify-center transition-all duration-300 w-full relative">
          <Skeleton className="h-10 w-16 rounded bg-[#1faae1] z-10 relative" />
          <hr className="flex-1 w-full border-[#1faae1] border-t-2 mt-0" />
        </div>
      </div>

      {/* Right column with cards */}
      <div className="overflow-hidden px-0.5 flex-1">
        <div
          className="flex gap-2 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(0px)`,
            width: `${3 * (290 + 8)}px`,
          }}
        >
          {[0, 1, 2].map((_, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-[290px] h-[580px] pt-2.5 transition-all duration-300 cursor-pointer ${
                index === 1
                  ? "opacity-100"
                  : "opacity-70 scale-95"
              }`}
            >
              <div
                className={`relative rounded-xl ring-2 ring-[#1faae1] shadow-lg shadow-[#1faae1]/20 p-4`}
              >
                {/* Badge en haut à gauche */}
                {index !== 1 && (
                  <div className="absolute top-3 left-48 m-2 z-30">
                    <Skeleton className="h-5 w-12 rounded bg-[#1faae1]" />
                  </div>
                )}

                {/* EmissionCard Skeleton */}
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-40 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                </div>
              </div>

              {/* Footer with title + genre */}
              <div className="mt-4 font-bold text-sm text-center text-white space-y-2">
                <Skeleton className="h-6 w-2/3 mx-auto rounded" />
                <Skeleton className="h-5 w-20 mx-auto rounded bg-[#1faae1]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonProgrammeDuJours
