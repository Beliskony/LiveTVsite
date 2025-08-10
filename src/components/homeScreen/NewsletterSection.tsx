import { Link } from "react-router-dom"

const NewsletterSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-white text-gray-900">
          <div className="flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Rejoignez notre communauté en ligne !
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles et messages.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex shadow-2xl">
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  className="max-w-lg flex-1 p-3 bg-white text-gray-900 border border-gray-700 rounded-l-2xl"
                />
                <button type="submit" className="bg-gray-900 text-white p-2 rounded-r-2xl">
                  S'inscrire
                </button>
              </form>
              <p className="text-xs text-gray-400">
                En vous inscrivant, vous acceptez notre{" "}
                <Link to={''} className="underline underline-offset-2 text-gray-600">
                  Politique de Confidentialité
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
  )
}

export default NewsletterSection