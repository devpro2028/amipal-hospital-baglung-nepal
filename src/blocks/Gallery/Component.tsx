import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

const columnClasses: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({
  heading,
  caption,
  columns = '3',
  images,
}) => {
  if (!images || images.length === 0) return null

  return (
    <div className="container my-16">
      {(heading || caption) && (
        <div className="mb-8 text-center">
          {heading && <h2 className="text-3xl font-bold mb-2">{heading}</h2>}
          {caption && <p className="text-muted-foreground">{caption}</p>}
        </div>
      )}
      <div className={cn('grid gap-4', columnClasses[columns ?? '3'])}>
        {images.map((item, index) => (
          <figure key={index} className="group overflow-hidden rounded-lg">
            <Media
              resource={item.image}
              imgClassName="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {item.caption && (
              <figcaption className="mt-2 text-sm text-center text-muted-foreground">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
