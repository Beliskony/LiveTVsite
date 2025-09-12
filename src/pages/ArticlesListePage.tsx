import { ArticlesGrid } from '@/components/articlesPage/ArticleGrid'

function ArticlesListePage() {
  return (
    <div className="h-full flex flex-col bg-[url('/images/bgForBlur.webp')] bg-cover bg-center">


        <section className="flex flex-col flex-1 backdrop-blur-sm">

        {/*liste d'articles*/}
          <div className="w-full md:mt-16 xl:mt-16 max-sm:py-20 xl:px-10 bg-white">
            <ArticlesGrid />
          </div>
        
        

        </section>

    </div>
  )
}

export default ArticlesListePage