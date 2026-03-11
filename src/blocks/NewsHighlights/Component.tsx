import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Post, Media, Category } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type Props = {
  id?: string | null
  blockName?: string | null
  blockType: 'newsHighlights'
  heading?: string | null
  subheading?: string | null
  populateBy?: ('collection' | 'selection') | null
  categories?: (string | Category)[] | null
  limit?: number | null
  selectedDocs?: (string | Post)[] | null
  viewAllLink?: string | null
}

export const NewsHighlightsBlock: React.FC<Props> = async (props) => {
  const {
    id,
    heading = 'Latest News',
    subheading,
    populateBy = 'collection',
    categories,
    limit: limitFromProps,
    selectedDocs,
    viewAllLink,
  } = props

  const limit = limitFromProps || 3
  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories
      ?.map((cat) => (typeof cat === 'object' ? cat.id : cat))
      .filter(Boolean)

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      sort: '-publishedAt',
      where: {
        _status: { equals: 'published' },
        ...(flattenedCategories && flattenedCategories.length > 0
          ? { categories: { in: flattenedCategories } }
          : {}),
      },
    })

    posts = fetchedPosts.docs
  } else if (selectedDocs?.length) {
    posts = selectedDocs.filter((doc): doc is Post => typeof doc === 'object')
  }

  if (!posts.length) return null

  const [featured, ...rest] = posts

  return (
    <section className="py-16 bg-white" id={id ? `block-${id}` : undefined}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            {heading && <h2 className="text-3xl font-bold text-gray-900">{heading}</h2>}
            {subheading && <p className="mt-2 text-gray-500 text-base">{subheading}</p>}
          </div>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              View All &rarr;
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured post */}
          <div className="lg:col-span-2">
            <NewsCard post={featured} featured />
          </div>

          {/* Secondary posts */}
          <div className="flex flex-col gap-6">
            {rest.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Internal card component                                             */
/* ------------------------------------------------------------------ */

type CardProps = { post: Post; featured?: boolean }

function NewsCard({ post, featured = false }: CardProps) {
  const { title, slug, heroImage, publishedAt, categories } = post

  const image = typeof heroImage === 'object' && heroImage !== null ? (heroImage as Media) : null
  const imageUrl = image ? getMediaUrl(image.url ?? '') : null
  const imageAlt = image?.alt ?? title
  const href = `/posts/${slug}`
  const date = publishedAt ? formatDateTime(publishedAt) : null
  const category =
    categories && categories.length > 0 && typeof categories[0] === 'object'
      ? (categories[0] as Category).title
      : null

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow ${featured ? 'h-full' : ''}`}
    >
      {/* Thumbnail */}
      {imageUrl && (
        <div
          className={`relative w-full overflow-hidden bg-gray-100 ${featured ? 'aspect-[16/9]' : 'aspect-[16/9]'}`}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
          {category && (
            <span className="uppercase tracking-wide font-semibold text-blue-600">{category}</span>
          )}
          {date && <span>{date}</span>}
        </div>

        {/* Title */}
        <Link href={href} className="group-hover:underline">
          <h3
            className={`font-semibold text-gray-900 leading-snug ${featured ? 'text-xl md:text-2xl' : 'text-base'}`}
          >
            {title}
          </h3>
        </Link>
      </div>
    </article>
  )
}
