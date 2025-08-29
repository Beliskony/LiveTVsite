import { ArticlesGrid } from '@/components/articlesPage/ArticleGrid'

function ArticlesListePage() {
  return (
    <div className="h-full flex flex-col bg-[url('/images/bgForBlur.jpg')] bg-cover bg-center">


        <section className="flex flex-col flex-1 max-sm:my-0.5 backdrop-blur-sm bg-black/50">

        {/*liste d'articles*/}
          <div className="w-full md:mt-20 xl:mt-20 max-sm:mt-20 xl:px-10 bg-white">
            <ArticlesGrid />
          </div>
        
        

        </section>

    </div>
  )
}

export default ArticlesListePage