
import { formatRelativeDate } from "../../utilitaires/FormatDate"
import type { IVideo } from "../../interfaces/Videos"

export const VideoCard = ({ id, title, description, Time, Miniature, category, lien, duration }: IVideo) => {
  console.log(id);
  
  return (
    <div className="flex flex-col items-start w-full h-[400px] max-h-[450px] rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-[350px] min-h-[100px] max-h-[250px] overflow-hidden">
        <img
          src={Miniature || "/placeholder.svg?height=275&width=400&query=video thumbnail"}
          alt={title}
          className="rounded-t-lg h-full"
        />
        {duration && (
          <span className="absolute top-3 left-60 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
            {duration}
          </span>
        )}
      </div>

      <div className="bg-[#2D3748] p-4 rounded-b-lg flex flex-col flex-grow w-full">
        <h2 className="text-xl font-bold mt-2 text-white line-clamp-2">{title}</h2>
        <p className="text-gray-400 w-full h-20 overflow-y-auto overflow-x-hidden break-words text-sm mt-2">
          {description}
        </p>

        <div className="flex flex-row items-baseline gap-x-3 mt-2">
          <p className="text-sm text-gray-500">{formatRelativeDate(Time)}</p>
          {category && category.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {category.map((cat, index) => (
                <span key={index} className="inline-block bg-blue-700 text-white text-xs px-2 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
        <a
          href={lien}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-blue-400 hover:underline self-start"
        >
          Watch Video
        </a>
      </div>
    </div>
  )
}
