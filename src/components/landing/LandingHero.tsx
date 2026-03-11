import type { LandingPage } from '@/payload-types'

export function LandingHero({ data }: { data: LandingPage }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {data.heroTitle}
        </h1>
        {data.heroSubtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {data.heroSubtitle}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {data.heroCta && (
            <button className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              {data.heroCta}
            </button>
          )}
          {data.heroSecondaryCta && (
            <button className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
              {data.heroSecondaryCta}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
