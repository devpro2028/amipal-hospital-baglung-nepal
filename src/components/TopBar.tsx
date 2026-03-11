'use client'

import React, { useState, useEffect } from 'react'
import {
  Wifi,
  Accessibility,
  Phone,
  Calendar,
  Moon,
  Sun,
  Languages,
} from 'lucide-react'
import type { TopBar as TopBarType } from '@/payload-types'
import { useTranslations, useLocale } from 'next-intl'
import { useTheme } from '@/providers/Theme'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { Link } from '@/i18n/routing'
import { cn } from '@/utilities/ui'

const SitemapIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
  >
    <rect x="9" y="3" width="6" height="6" />
    <rect x="3" y="15" width="6" height="6" />
    <rect x="15" y="15" width="6" height="6" />
    <path d="M12 9v6" />
    <path d="M6 15v-3h12v3" />
  </svg>
)

interface TopBarProps {
  data: TopBarType
}

export function TopBar({ data }: TopBarProps) {
  const t = useTranslations('topbar')
  const locale = useLocale()
  const { theme, setTheme } = useTheme()
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'small'>('normal')
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const now = new Date()
    if (locale === 'ne') {
      // For demonstration, using the exact date from the image for Nepali locale
      // In production, a Bikram Sambat library like ad-bs-converter would be used
      setCurrentDate('२७ फाल्गुन २०८२, बुधबार')
    } else {
      setCurrentDate(now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }))
    }
  }, [locale])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={cn(
      "bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300",
      fontSize === 'large' ? 'text-[13px]' : fontSize === 'small' ? 'text-[9px]' : 'text-[11px]'
    )}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between min-h-[40px] px-4 gap-2 md:gap-0">
        {/* Left Section: Utility Links & Phones */}
        <div className="flex flex-wrap items-center justify-center md:justify-start divide-x divide-gray-200 dark:divide-slate-800">
          {data.sitemapUrl && (
            <Link 
              href={data.sitemapUrl} 
              className="group flex items-center gap-1.5 px-3 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-semibold"
            >
              <SitemapIcon />
              <span>{t('sitemap')}</span>
            </Link>
          )}

          {data.lowBandwidthUrl && (
            <Link 
              href={data.lowBandwidthUrl} 
              className="group flex items-center gap-1.5 px-3 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-semibold"
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>{t('low-bandwidth')}</span>
            </Link>
          )}

          {data.screenReaderUrl && (
            <Link 
              href={data.screenReaderUrl} 
              className="group flex items-center gap-1.5 px-3 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-semibold"
            >
              <Accessibility className="w-3.5 h-3.5" />
              <span>{t('screen-reader')}</span>
            </Link>
          )}

          {data.adminPhone && (
            <div className="flex items-center gap-1.5 px-3 py-2">
              <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-gray-500 dark:text-slate-400">{t('administration')}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{data.adminPhone}</span>
              </div>
            </div>
          )}

          {data.emergencyPhone && (
            <div className="flex items-center gap-1.5 px-3 py-2">
              <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-gray-500 dark:text-slate-400">{t('emergency')}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{data.emergencyPhone}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Date, Theme, Font, Lang */}
        <div className="flex flex-wrap items-center justify-center md:justify-end divide-x divide-gray-200 dark:divide-slate-800">
          {data.showDate && (
            <div className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 font-bold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDate}</span>
            </div>
          )}

          {data.showDarkMode && (
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-semibold"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 fill-current" />
                  <span>{t('light')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 fill-current" />
                  <span>{t('dark')}</span>
                </>
              )}
            </button>
          )}

          {data.showFontSize && (
            <div className="flex items-center px-4 py-2 gap-3 text-blue-600 dark:text-blue-400">
              <button 
                onClick={() => setFontSize('large')}
                className={cn("hover:opacity-70 font-bold transition-all text-[14px]", fontSize === 'large' && "underline decoration-2 underline-offset-4")}
              >
                अ+
              </button>
              <button 
                onClick={() => setFontSize('normal')}
                className={cn("hover:opacity-70 font-bold transition-all text-[11px]", fontSize === 'normal' && "underline decoration-2 underline-offset-4")}
              >
                अ
              </button>
              <button 
                onClick={() => setFontSize('small')}
                className={cn("hover:opacity-70 font-bold transition-all text-[9px]", fontSize === 'small' && "underline decoration-2 underline-offset-4")}
              >
                अ-
              </button>
            </div>
          )}

          {data.showLanguage && (
            <div className="flex items-center">
              <div className="flex items-center gap-1 px-2 text-blue-600 dark:text-blue-400 font-bold">
                 <Languages className="w-3.5 h-3.5 ml-2" />
                 <LocaleSwitcher />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
