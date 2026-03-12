import clsx from 'clsx'
import React from 'react'

import type { ContactFormBlock as ContactFormBlockProps } from '@/payload-types'
import { ContactForm } from './ContactForm'

export const ContactFormBlockComponent: React.FC<
  ContactFormBlockProps & { className?: string }
> = (props) => {
  const { className, formHeading, submitButtonLabel } = props

  return (
    <div className={clsx('container', className)}>
      <div className="max-w-xl mx-auto">
        {formHeading && <h2 className="text-3xl font-bold mb-6">{formHeading}</h2>}
        <ContactForm submitButtonLabel={submitButtonLabel} />
      </div>
    </div>
  )
}
