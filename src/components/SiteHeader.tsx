import React from 'react'
import Image from 'next/image'
import type { Header as HeaderType, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface SiteHeaderProps {
  data: HeaderType
}

export function SiteHeader({ data }: SiteHeaderProps) {
  const emblem = data.emblem && typeof data.emblem === 'object' ? (data.emblem as Media) : null
  const flag = data.flag && typeof data.flag === 'object' ? (data.flag as Media) : null

  const emblemUrl = emblem ? getMediaUrl(emblem.url) : null
  const flagUrl = flag ? getMediaUrl(flag.url) : null

  return (
    <div className="w-full bg-[#f9f5e8] border-b border-gray-200">
      <div className="container flex items-center justify-between py-3 px-4">
        {/* Left: Government Emblem */}
        <div className="shrink-0 w-20 h-20 relative">
          {emblemUrl ? (
            <Image
              src={emblemUrl}
              alt={emblem?.alt || 'Government Emblem'}
              fill
              className="object-contain"
              priority
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        {/* Center: Hospital Identity Text */}
        <div className="flex-1 text-center leading-tight px-4">
          {data.governmentName && (
            <p className="text-sm font-bold text-gray-800 tracking-wide">{data.governmentName}</p>
          )}
          {data.ministryName && (
            <p className="text-sm font-bold text-gray-800 tracking-wide">{data.ministryName}</p>
          )}
          <p className="text-2xl md:text-3xl font-bold text-red-700 tracking-wide mt-0.5">
            {data.hospitalName}
          </p>
          {data.location && (
            <p className="text-sm font-semibold text-gray-700 tracking-wide">{data.location}</p>
          )}
        </div>

        {/* Right: National Flag */}
        <div className="shrink-0 w-14 h-20 relative">
          {flagUrl ? (
            <Image
              src={flagUrl}
              alt={flag?.alt || 'National Flag'}
              fill
              className="object-contain"
              priority
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
      </div>
    </div>
  )
}
