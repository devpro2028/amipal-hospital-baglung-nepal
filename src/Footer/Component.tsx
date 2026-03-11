import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const columns = footerData?.columns || []
  const copyright = footerData?.copyright
  const description = footerData?.description

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        {description && <p className="text-white/70 text-sm max-w-sm">{description}</p>}

        {columns.length > 0 && (
          <div className="flex flex-wrap gap-8">
            {columns.map((col, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="font-semibold text-white">{col.title}</span>
                <nav className="flex flex-col gap-1">
                  {col.links?.map((link, j) => (
                    <a key={j} href={link.url} className="text-white/70 hover:text-white text-sm">
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="container border-t border-white/10 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <ThemeSelector />
        {copyright && <p className="text-white/50 text-xs">{copyright}</p>}
      </div>
    </footer>
  )
}
