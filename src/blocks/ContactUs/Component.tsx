import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContactUsBlock as ContactUsBlockProps } from '@/payload-types'

export const ContactUsBlock: React.FC<
  ContactUsBlockProps & {
    className?: string
    disableInnerContainer?: boolean
  }
> = (props) => {
  const { className, heading, introContent, address, phone, email, mapEmbedUrl } = props

  return (
    <div className={clsx('container', className)}>
      <div className="max-w-6xl mx-auto">
        {introContent && (
          <div className="mb-8">
            <RichText data={introContent} enableGutter={false} />
          </div>
        )}

        <div>
          <div>
            {heading && <h2 className="text-3xl font-bold mb-6">{heading}</h2>}

            <div className="flex flex-col gap-4 text-base">
              {address && <p>{address}</p>}

              {phone && (
                <p>
                  Phone:{' '}
                  <a href={`tel:${phone}`} className="hover:underline">
                    {phone}
                  </a>
                </p>
              )}

              {email && (
                <p>
                  E-Mail:{' '}
                  <a href={`mailto:${email}`} className="hover:underline">
                    {email}
                  </a>
                </p>
              )}
            </div>

            {mapEmbedUrl && (
              <div className="mt-8 w-full h-64">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            )}
          </div>


        </div>
      </div>
    </div>
  )
}
