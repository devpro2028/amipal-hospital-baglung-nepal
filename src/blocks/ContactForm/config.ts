import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  fields: [
    {
      name: 'formHeading',
      type: 'text',
      localized: true,
      label: 'Form Heading',
      defaultValue: 'Feedback',
    },
    {
      name: 'submitButtonLabel',
      type: 'text',
      localized: true,
      label: 'Submit Button Label',
      defaultValue: 'Submit',
    },
  ],
  labels: {
    plural: 'Contact Form Blocks',
    singular: 'Contact Form Block',
  },
}
