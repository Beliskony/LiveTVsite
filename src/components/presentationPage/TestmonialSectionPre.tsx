import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSectionPre() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-sans text-4xl font-bold text-foreground mb-4">Témoignages de Notre Communauté</h2>
          <p className="font-serif text-lg text-muted-foreground">
            Découvrez comment Dieu transforme des vies dans notre église
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <p className="font-serif text-muted-foreground mb-4 italic leading-relaxed">
                "J'ai trouvé bien plus qu'une église ici, j'ai trouvé une famille. L'accueil chaleureux et les
                enseignements profonds m'ont aidée à grandir dans ma foi comme jamais auparavant."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pinimg.com/1200x/fe/2d/ff/fe2dff0828d03677b6d1d0eb092c67b5.jpg"
                  alt="Marie Leroy"
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div>
                  <p className="font-sans font-semibold text-foreground">Marie Leroy</p>
                  <p className="font-serif text-sm text-muted-foreground">Membre depuis 2019</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="font-serif text-muted-foreground mb-4 italic leading-relaxed">
                "Les groupes de jeunes ont complètement changé ma perspective sur la foi. C'est ici que j'ai appris que
                suivre Jésus peut être à la fois profond et joyeux."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pinimg.com/1200x/fe/2d/ff/fe2dff0828d03677b6d1d0eb092c67b5.jpg"
                  alt="Thomas Martin"
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div>
                  <p className="font-sans font-semibold text-foreground">Thomas Martin</p>
                  <p className="font-serif text-sm text-muted-foreground">Groupe de jeunes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <p className="font-serif text-muted-foreground mb-4 italic leading-relaxed text-center">
                "Après des années de recherche spirituelle, j'ai enfin trouvé ma place dans cette communauté
                bienveillante. Le Pasteur Martin et toute l'équipe m'ont accompagné avec patience dans mon cheminement
                vers Dieu."
              </p>
              <div className="flex items-center gap-3 justify-center">
                <img
                  src="https://i.pinimg.com/1200x/fe/2d/ff/fe2dff0828d03677b6d1d0eb092c67b5.jpg"
                  alt="Sophie Dubois"
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div>
                  <p className="font-sans font-semibold text-foreground">Sophie Dubois</p>
                  <p className="font-serif text-sm text-muted-foreground">Nouvelle convertie - 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
