import React from 'react'
import { Mail, Phone } from 'lucide-react'
import type { TopBar as TopBarType } from '@/payload-types'

interface TopBarProps {
  data: TopBarType
}

export function TopBar({ data }: TopBarProps) {
  return (
    <div className="bg-primary text-primary-foreground text-xs">
      <div className="container flex items-center justify-between py-2 gap-4">
        <div className="flex items-center gap-4">
          {data.contactEmail && (
            <a
              href={`mailto:${data.contactEmail}`}
              className="flex items-center gap-1 hover:underline"
            >
              <Mail className="h-3 w-3" />
              <span>{data.contactEmail}</span>
            </a>
          )}
          {data.contactPhone && (
            <a
              href={`tel:${data.contactPhone}`}
              className="flex items-center gap-1 hover:underline"
            >
              <Phone className="h-3 w-3" />
              <span>{data.contactPhone}</span>
            </a>
          )}
        </div>

        {data.announcement && (
          <p className="hidden md:block text-center flex-1">{data.announcement}</p>
        )}

        <div className="flex items-center gap-3">
          {data.links?.map((link) => (
            <a key={link.id} href={link.url} className="hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
