import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    create: () => true, // Allow public form submissions
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Address',
    },
    {
      name: 'phone',
      type: 'number',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
  ],
  timestamps: true,
}
