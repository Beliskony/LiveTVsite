import { Telescope, HeartHandshake, PictureInPicture } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const TestimonialSection = () => {
  const resources = [
    {
      icon: Telescope,
      title: "Découverte",
      description: "Découvrez de nouveaux horizons sur le monde et explorez des territoires inconnus",
    },
    {
      icon: PictureInPicture,
      title: "Divertissement", // Correction de la faute de frappe
      description: "Des émissions de jeunesse captivantes et du contenu familial de qualité",
    },
    {
      icon: HeartHandshake,
      title: "Cultures",
      description: "Découvrez les cultures de ce monde et leurs richesses uniques", // Correction de la faute de frappe
    },
  ]

  return (
    <section className="flex flex-col w-full justify-center items-center py-16 lg:py-20 xl:py-24 gap-y-16">
      <div className="flex flex-col w-full gap-y-6 text-center max-w-4xl mx-auto px-4">
        <h2 className=" font-bold tracking-tight text-foreground text-3xl lg:text-4xl xl:text-5xl leading-tight">
          Explorez nos ressources{" "} <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent" >& programmes</span>
        </h2>
        <p className="text-muted-foreground text-lg lg:text-xl mx-auto leading-relaxed">
          Divertissement, Religion, Découverte, Culture sont au rendez-vous
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4">
        {resources.map((resource, index) => {
          const IconComponent = resource.icon
          return (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 bg-gradient-to-br from-background to-muted/20"
            >
              <CardContent className="flex flex-col justify-center items-center p-8 text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <IconComponent
                    size={80}
                    className="text-primary group-hover:scale-110 transition-all duration-300 relative z-10"
                  />
                </div>

                <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {resource.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {resource.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export default TestimonialSection
