import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoText',
      type: 'text',
      localized: true,
      defaultValue: 'Acme Inc',
    },
    {
      name: 'items',
      type: 'array',
      localized: true,
      label: 'Level 1 Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'children',
          type: 'array',
          label: 'Level 2 Items',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'children',
              type: 'array',
              label: 'Level 3 Items',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Get Started',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      defaultValue: '/signup',
    },
  ],
}
