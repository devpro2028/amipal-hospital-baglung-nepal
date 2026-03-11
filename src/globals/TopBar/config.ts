import type { GlobalConfig } from 'payload'

export const TopBar: GlobalConfig = {
  slug: 'top-bar',
  label: 'Top Bar',
  fields: [
    {
      name: 'announcement',
      type: 'text',
      localized: true,
      defaultValue: 'Welcome to our platform — Get started today!',
    },
    {
      name: 'links',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'contactEmail',
      type: 'text',
      localized: true,
      defaultValue: 'info@example.com',
    },
    {
      name: 'contactPhone',
      type: 'text',
      localized: true,
      defaultValue: '+1 (555) 000-0000',
    },
  ],
}
