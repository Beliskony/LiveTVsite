import { ArticlesGrid } from '@/components/articlesPage/ArticleGrid'

function ArticlesListePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/bgForBlur.webp')] z-0 bg-cover bg-center">


        <section className="h-full w-full md:mt-16 xl:mt-16 max-sm:py-20 xl:px-10 flex-1 bg-white">

            <ArticlesGrid />
    
        </section>

    </div>
  )
}

export default ArticlesListePage