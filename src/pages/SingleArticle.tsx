import { useParams, Link } from "react-router-dom"
import { Calendar, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { IArticle } from "@/interfaces/Articles"
import { formatRelativeDate } from "@/utilitaires/FormatDate"
import { useEffect, useState } from "react"

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export default function SingleArticlePage() {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<IArticle | null>(null)
  const [articles, setArticles] = useState<IArticle[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // 1️⃣ Récupération des articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("https://api.yeshouatv.com/api/list_article_for_user", {
          method: "GET",
        })
        const data = await res.json()
        setArticles(data.data)
      } catch (err) {
        console.error("Erreur lors du chargement des articles")
        setError("Erreur lors du chargement des articles")
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // 2️⃣ Une fois les articles chargés, on cherche celui avec l'ID
  useEffect(() => {
    if (!articles || !id) return

    const found = articles.find((a) => a.id === id)
    if (!found) {
      setError("Article introuvable")
      setArticle(null)
    } else {
      setArticle(found)
      setError("")
    }
  }, [articles, id])

  if (loading) return <div>Chargement…</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!article) return <div>Aucun article trouvé.</div>

  const readTime = calculateReadTime(article.contenu)
  const formattedDate = formatRelativeDate(article.created_at)

  return (
    <div className="min-h-screen h-full flex flex-col bg-[url('/images/bgForBlur.jpg')] bg-cover bg-center">
      <section className="w-full md:mt-20 xl:mt-20 max-sm:mt-20 xl:px-10 bg-white">
        <div className="w-full px-1 md:px-4 lg:px-10 justify-center py-8 gap-4 flex flex-col lg:flex-row">
          <div className="bg-white rounded-lg border p-1 md:p-4 lg:p-5 shadow-sm overflow-hidden w-4/6">
            {article.feature_image && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={article.feature_image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="max-sm:p-1 md:px-4 lg:p-8 mt-3">
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

              <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">{article.title}</h1>

              <div className="prose prose-lg max-w-none overflow-y-auto min-h-[400px] max-h-[600px]">
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
                    <p key={index} className="text-gray-700 leading-relaxed mb-4 break-all">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Articles similaires */}
          <Card className="max-sm:min-h-80 p-2 lg:h-screen w-full lg:w-2/6 place-items-center lg:mx-2 ">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 underline">Articles similaires</h3>
            <div className="grid lg:grid-cols-1 gap-4 md:grid-cols-3 px-2">
              {articles
                ?.filter((a) => a.id !== article.id && a.category === article.category)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/egliseYeshoua/articles/${relatedArticle.id}`}
                    className="block p-4 w-full rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <img className="w-full h-20 rounded object-cover" src={relatedArticle.feature_image} />
                    <h4 className="font-medium text-gray-900 mb-2">{relatedArticle.title}</h4>
                    <p className="text-sm text-gray-600">
                      Par {relatedArticle.author} • {formatRelativeDate(relatedArticle.created_at)}
                    </p>
                  </Link>
                ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
