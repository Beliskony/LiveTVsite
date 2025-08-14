import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ArticleTable } from './ArticleTable'
import { ArticleForm } from './ArticleForm'


const ArticleManager = () => {
    const [showArticleForm, setShowArticleForm] = useState(false)
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

        {showArticleForm && <ArticleForm onClose={() => setShowArticleForm(false)} />}

        <ArticleTable />
    </section>
  )
}

export default ArticleManager