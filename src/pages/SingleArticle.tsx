import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { articleData } from "@/data/articlesData"
import type { IArticle } from "@/interfaces/Articles"
import { formatRelativeDate } from "@/utilitaires/FormatDate"
import Header from "@/components/NavBar"
import Footer from "@/components/Footer"

function getArticleById(id: string): IArticle | undefined {
  return articleData.find((article) => article.id === Number.parseInt(id))
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}



export default function SingleArticlePage() {
  const { id } = useParams<{ id: string }>()
  const article = id ? getArticleById(id) : undefined

  if (!article) {
    return <Navigate to="/404" replace />
  }

  const readTime = calculateReadTime(article.contenu)
  const formattedDate = formatRelativeDate(article.created_at)

  return (
    <div className="min-h-screen w-full bg-gray-50">

      {/* En-tête */}
      <header>
          <Header />
      </header>

      {/* Contenu principal */}
      <main className="w-full px-1 md:px-4 lg:px-10 justify-center py-8 gap-4 flex flex-col lg:flex-row">
        <article className="bg-white rounded-lg border p-1 md:p-4 lg:p-5 shadow-sm overflow-hidden">
          {/* Image principale */}
          {article.featured_image && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Contenu de l'article */}
          <div className="max-sm:p-1 md:px-4 lg:p-8 mt-3">
            {/* Métadonnées */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              <Badge variant="outline" className="bg-gray-900 text-white">{article.category}</Badge>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readTime} min de lecture
              </div>
              {article.author && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {article.author}
                </div>
              )}
            </div>

            {/* Titre */}
            <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">{article.title}</h1>

            {/* Contenu formaté */}
            <div className="prose prose-lg max-w-none overflow-y-scroll min-h-[400px]">
              {article.contenu.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  )
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                      {paragraph.replace("### ", "")}
                    </h3>
                  )
                }
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n").filter((item) => item.startsWith("- "))
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 my-4">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-700">
                          {item.replace("- ", "")}
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (paragraph.match(/^\d+\./)) {
                  const items = paragraph.split("\n").filter((item) => item.match(/^\d+\./))
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 my-4">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-700">
                          {item.replace(/^\d+\.\s*/, "")}
                        </li>
                      ))}
                    </ol>
                  )
                }
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                )
              })}
            </div>

          </div>
        </article>

        {/* Articles similaires */}
        <Card className="max-sm:min-h-80 lg:h-screen w-full lg:w-[450px] place-items-center lg:mx-2 ">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 underline">Articles similaires</h3>
          <div className="grid lg:grid-cols-1 gap-4 md:grid-cols-3">
            {articleData
              .filter((a) => a.id !== article.id && a.category === article.category)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/article/${relatedArticle.id}`}
                  className="block p-4 w-full mx-2 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <img className="w-full h-20 rounded object-cover" src={relatedArticle.featured_image} />
                  <h4 className="font-medium text-gray-900 mb-2">{relatedArticle.title}</h4>
                  <p className="text-sm text-gray-600">
                    Par {relatedArticle.author} • {formatRelativeDate(relatedArticle.created_at)}
                  </p>
                </Link>
              ))}
          </div>
        </Card>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}
