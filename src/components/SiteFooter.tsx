import React from 'react'
import type { Footer as FooterType } from '@/payload-types'
import { Link } from '@/i18n/routing'
import {
  Phone,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

interface SiteFooterProps {
  data: FooterType
}

/* ── Social Icon Map ───────────────────────────────────────────────── */
const SocialIcon = ({
  platform,
  className,
}: {
  platform: string
  className?: string
}) => {
  switch (platform) {
    case 'facebook':
      return <Facebook className={className} />
    case 'twitter':
      return <Twitter className={className} />
    case 'youtube':
      return <Youtube className={className} />
    case 'instagram':
      return <Instagram className={className} />
    case 'linkedin':
      return <Linkedin className={className} />
    default:
      return null
  }
}

/* ── Component ─────────────────────────────────────────────────────── */
export function SiteFooter({ data }: SiteFooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#0d2b6e] text-white">

      {/* ─── Main Footer Grid ──────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Col 1: Hospital Info ───────────────────────────────── */}
          <div className="lg:col-span-1 space-y-5">
            {/* Hospital title */}
            <div>
              <h3 className="text-lg font-extrabold text-white leading-snug">
                Dhaulagiri Provincial Hospital
              </h3>
              <div className="mt-1 h-1 w-12 bg-red-500 rounded-full" />
            </div>

            {/* Description */}
            {data.description && (
              <p className="text-sm text-white/70 leading-relaxed">{data.description}</p>
            )}

            {/* Social links */}
            {data.socialLinks && data.socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {data.socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.platform}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-200"
                  >
                    <SocialIcon platform={social.platform} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ── Col 2: Contact Info ────────────────────────────────── */}
          <div className="space-y-5">
            <div>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">
                Contact Us
              </h4>
              <div className="mt-1 h-1 w-12 bg-red-500 rounded-full" />
            </div>

            <ul className="space-y-3.5 text-sm text-white/75">
              {data.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                  <span className="leading-relaxed">{data.address}</span>
                </li>
              )}
              {data.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0 text-red-400" />
                  <a href={`tel:${data.phone}`} className="hover:text-white transition-colors">
                    {data.phone}
                  </a>
                </li>
              )}
              {data.emergencyPhone && (
                <li className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 shrink-0 text-red-400" />
                  <a href={`tel:${data.emergencyPhone}`} className="hover:text-white transition-colors font-semibold text-red-300">
                    {data.emergencyPhone} <span className="text-xs font-normal text-white/60">(Emergency)</span>
                  </a>
                </li>
              )}
              {data.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0 text-red-400" />
                  <a href={`mailto:${data.email}`} className="hover:text-white transition-colors break-all">
                    {data.email}
                  </a>
                </li>
              )}
              {data.openingHours && (
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                  <span className="leading-relaxed">{data.openingHours}</span>
                </li>
              )}
            </ul>
          </div>

          {/* ── Col 3 & 4: Dynamic Link Columns ───────────────────── */}
          {data.columns?.map((column) => (
            <div key={column.id} className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-white uppercase tracking-wide">
                  {column.title}
                </h4>
                <div className="mt-1 h-1 w-12 bg-red-500 rounded-full" />
              </div>
              <ul className="space-y-2.5">
                {column.links?.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url as any}
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 group"
                    >
                      <ChevronRight className="w-3 h-3 text-red-400 shrink-0 group-hover:text-red-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ─── Divider ──────────────────────────────────────────────── */}
      <div className="border-t border-white/10" />

      {/* ─── Bottom Bar ───────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/55">

          {/* Copyright */}
          <p>
            {data.copyright ||
              `© ${currentYear} Dhaulagiri Provincial Hospital, Baglung. All rights reserved.`}
          </p>

          {/* Developer Credit */}
          {data.developerCredit && (
            <p className="flex items-center gap-1">
              {data.developerCredit}
              {data.developerUrl && (
                <a
                  href={data.developerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-white/40 hover:text-white/70 transition-colors ml-1"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </p>
          )}

        </div>
      </div>

    </footer>
  )
}
