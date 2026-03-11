import React from 'react'
import { TypedLocale } from 'payload'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type {
  TopBar as TopBarType,
  Navigation as NavigationType,
  Footer as FooterType,
  LandingPage as LandingPageType,
} from '@/payload-types'
import { TopBar } from '@/components/TopBar'
import { Navbar } from '@/components/Navbar'
import { SiteFooter } from '@/components/SiteFooter'
import { LandingHero } from '@/components/landing/LandingHero'
import { LandingFeatures } from '@/components/landing/LandingFeatures'
import { LandingCta } from '@/components/landing/LandingCta'

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale } = await paramsPromise

  const [topBarData, navData, footerData, landingData] = await Promise.all([
    getCachedGlobal('top-bar', 1, locale)() as Promise<TopBarType>,
    getCachedGlobal('navigation', 1, locale)() as Promise<NavigationType>,
    getCachedGlobal('footer', 1, locale)() as Promise<FooterType>,
    getCachedGlobal('landing-page', 1, locale)() as Promise<LandingPageType>,
  ])

  return (
    <div className="flex min-h-svh flex-col">
      <TopBar data={topBarData} />
      <Navbar data={navData} />
      <main className="flex-1">
        <LandingHero data={landingData} />
        <LandingFeatures data={landingData} />
        <LandingCta data={landingData} />
      </main>
      <SiteFooter data={footerData} />
    </div>
  )
}
