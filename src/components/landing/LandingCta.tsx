import type { LandingPage } from '@/payload-types'

export function LandingCta({ data }: { data: LandingPage }) {
  if (!data.ctaSectionTitle && !data.ctaSectionDescription) return null

  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        {data.ctaSectionTitle && (
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            {data.ctaSectionTitle}
          </h2>
        )}
        {data.ctaSectionDescription && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            {data.ctaSectionDescription}
          </p>
        )}
        {data.ctaSectionButton && (
          <div className="mt-10">
            <button className="inline-flex h-11 items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-foreground shadow transition-colors hover:bg-accent">
              {data.ctaSectionButton}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
