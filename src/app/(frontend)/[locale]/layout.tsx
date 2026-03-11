import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'react-hot-toast'
import React from 'react'
import { TypedLocale } from 'payload'

import { Providers } from '@/providers'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import localization from '@/i18n/localization'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { TopBar } from '@/components/TopBar'
import { Navbar } from '@/components/Navbar'
import { SiteFooter } from '@/components/SiteFooter'
import type { Navigation, TopBar as TopBarType, Footer } from '@/payload-types'

import '../globals.css'

type Args = {
  children: React.ReactNode
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function RootLayout({ children, params }: Args) {
  const { locale } = await params
  const currentLocale = localization.locales.find((loc) => loc.code === locale)
  const direction = currentLocale?.rtl ? 'rtl' : 'ltr'

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  setRequestLocale(locale)

  const messages = await getMessages()

  const [topBarData, navData, footerData] = await Promise.all([
    getCachedGlobal('top-bar', 1)() as Promise<TopBarType>,
    getCachedGlobal('navigation', 1)() as Promise<Navigation>,
    getCachedGlobal('footer', 1)() as Promise<Footer>,
  ])

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      dir={direction}
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Toaster />
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <TopBar data={topBarData} />
            <Navbar data={navData} />
            {children}
            <SiteFooter data={footerData} />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
