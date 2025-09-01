import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { IArticle } from "@/interfaces/Articles"
import { formatRelativeDate } from "@/utilitaires/FormatDate"
import { Link } from "react-router-dom"

const ArticleCard = (articleProps: IArticle) => {
  return (
    <Link to={`/egliseYeshoua/articles/${articleProps.id}`} className="no-underline">
    <Card className="w-[300px] h-[450px] p-0 flex-shrink-0 mx-1.5 cursor-pointer">
            <div className="relative h-40 overflow-hidden rounded-t-lg">
              <img
                src={articleProps.featured_image}
                alt={articleProps.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mt-1">
                {articleProps.category}
              </Badge>
              <CardTitle className="font-sans text-lg">{articleProps.title}</CardTitle>
              <CardDescription className="font-serif break-all">
                {articleProps.contenu.length > 70 ? `${articleProps.contenu.slice(0, 220)}...` : articleProps.contenu}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-5">
              <p className="font-serif text-sm text-muted-foreground">Par {articleProps.author} • {formatRelativeDate(articleProps.created_at)}</p>
            </CardContent>
    </Card>
    </Link>
  )
}

export default ArticleCard