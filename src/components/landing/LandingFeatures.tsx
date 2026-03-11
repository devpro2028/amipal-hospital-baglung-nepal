import { Globe, Shield, Zap, Users, Code, Layers } from 'lucide-react'
import type { LandingPage } from '@/payload-types'

const iconMap = {
  globe: Globe,
  shield: Shield,
  zap: Zap,
  users: Users,
  code: Code,
  layers: Layers,
} as const

export function LandingFeatures({ data }: { data: LandingPage }) {
  const features = data.features ?? []

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {(data.featuresTitle || data.featuresSubtitle) && (
          <div className="mb-16 text-center">
            {data.featuresTitle && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {data.featuresTitle}
              </h2>
            )}
            {data.featuresSubtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                {data.featuresSubtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon ? iconMap[feature.icon] : null
            return (
              <div
                key={feature.id}
                className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {Icon && (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                )}
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                {feature.description && (
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
