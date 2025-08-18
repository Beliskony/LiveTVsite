import { Check, Monitor, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

const FeaturesListSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Qualité Vidéo Optimale",
      description: "Streaming haute définition adaptatif",
    },
    {
      icon: Monitor,
      title: "Multi-appareils",
      description: "Synchronisation sur tous vos écrans",
    },
    {
      icon: Check,
      title: "Programmes multiples",
      description: "Accès illimité à tout notre contenu",
    },
  ]

  return (
    <section className="border-b bg-gradient-to-br from-background to-muted/20 py-16 lg:py-24 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Content Section */}
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
                Accédez à nos contenus{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  où que vous soyez
                </span>
              </h2>
              <p className="text-lg text-muted-foreground lg:text-xl">
                Profitez de nos messages et événements sur tous vos appareils, sans interruption
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="flex-1">
            <div className="grid gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card
                    key={index}
                    className="group cursor-pointer border-border/50 bg-card/50 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <IconComponent className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesListSection
