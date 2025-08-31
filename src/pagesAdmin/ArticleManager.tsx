import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ArticleTable } from './ArticleTable'
import { ArticleForm } from './ArticleForm'
import type { IArticle } from '@/interfaces/Articles'


const ArticleManager = () => {
    const [showArticleForm, setShowArticleForm] = useState(false)
    const [editingArticle, setEditingArticle] = useState<IArticle | null>(null)
    const [Articles, setArticles] =  useState<IArticle[]>([])

    const fetchArticles = async () => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch("https://api.yeshouatv.com/api/list_programmes", {
      headers: { Authorization: `Bearer ${token}` },
    })

    const result = await res.json()

    const articlesWithArrayWhen = result.data.map((prog: any) => ({
      ...prog,
      when: typeof prog.when === "string" ? prog.when.split(",").map((d: string) => d.trim()) : prog.when,
    }))

    setArticles(articlesWithArrayWhen)
  } catch (error) {
    console.error("Erreur chargement programmes:", error)
  }
}

useEffect(() => {
  fetchArticles()
}, [])

  const closeForm = () => {
    setShowArticleForm(false)
    setEditingArticle(null)
  }

    // Ouverture du formulaire pour l'édition
  const handleEdit = (article: IArticle) => {
    setEditingArticle(article)
    setShowArticleForm(true)
  }


  return (
    <section>
        <div className='flex flex-row justify-between items-center w-full p-1 lg:p-5 xl:p-10'>
            <div className='flex flex-col space-y-2'>
                <h3 className='text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900'>Gestion des Articles</h3>
                <p className='text-sm lg:text-lg xl:text-xl font-light text-gray-900'>Planifiez votre grille d'article </p>
            </div>
              <Button onClick={() => setShowArticleForm(true)} className="flex items-center gap-2 lg:text-xl lg:py-4">
                <Plus className="h-4 w-4" />
                    Ajouter un Article
              </Button>

        </div>

        {showArticleForm && (
          <ArticleForm 
          onClose={closeForm}
          onRefresh={fetchArticles}/>)}

        <ArticleTable onEdit={handleEdit} />
    </section>
  )
}

export default ArticleManager