import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const imgLink =
    'https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg'

  return (
    <Image
      alt="Payload Logo"
      width={193}
      height={34}
      src={imgLink}
      loading={loading}
      priority={priority === 'high'}
      className={clsx('max-w-37.5 w-full h-8.5', className)}
      style={{ height: 'auto', width: '100%' }}
    />
  )
}
