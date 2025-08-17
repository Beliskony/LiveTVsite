import { formatRelativeDate } from "@/utilitaires/FormatDate"
import { formatViews } from "@/utilitaires/FormatViews"
import type { IVideo } from "@/interfaces/Videos"
import { Eye, Play, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const VideoCard = ({ id, title, description, Miniature, category, duration, views, createdAt }: IVideo) => {
  console.log(id);
  
  return (
    <Card className="group w-[350px] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={Miniature || "/placeholder.svg?height=200&width=350&query=video thumbnail"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Duration badge */}
        {duration && (
          <Badge variant="secondary" className="absolute bottom-2 right-2 bg-black/80 text-white hover:bg-black/80">
            <Clock className="mr-1 h-3 w-3" />
            {duration}
          </Badge>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="lg"
            className="rounded-full bg-white/90 text-black hover:bg-white hover:scale-110 transition-all duration-200"
            asChild
          >
            
          </Button>
        </div>
      </div>

      <CardContent className="p-4 space-y-3 w-full h-[250px] bg-gray-800 text-white">
        {/* Title */}
        <h3 className="font-medium text-wrap text-lg leading-tight line-clamp-2 group-hover:text-white hover:font-extrabold transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground text-wrap line-clamp-3 leading-relaxed">{description}</p>

        {/* Categories */}
        {category && category.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {category && (
              <Badge variant="outline" className="text-xs text-white">
                {category}
              </Badge>
            )}
            {category.length > 3 && (
              <Badge variant="outline" className="text-xs text-white">
                +{category.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formatRelativeDate(createdAt.toLocaleDateString())}</span>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{formatViews(views ?? 0)}</span>
            </div>
          </div>

          <Button variant="ghost" size="sm" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Regarder
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
