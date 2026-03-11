import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ContactUs: Block = {
  slug: 'contactUs',
  interfaceName: 'ContactUsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: 'Heading',
    },
    {
      name: 'introContent',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'address',
      type: 'text',
      localized: true,
      label: 'Address',
    },
    {
      name: 'phone',
      type: 'text',
      localized: true,
      label: 'Phone',
    },
    {
      name: 'email',
      type: 'email',
      localized: true,
      label: 'Email',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      localized: true,
      label: 'Map Embed URL',
      admin: {
        description: 'Google Maps embed URL for the location',
      },
    },
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
    plural: 'Contact Us Blocks',
    singular: 'Contact Us Block',
  },
}
