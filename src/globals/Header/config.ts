import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Site Header',
  fields: [
    {
      name: 'governmentName',
      type: 'text',
      localized: true,
      defaultValue: 'Government of Gandaki Province',
    },
    {
      name: 'ministryName',
      type: 'text',
      localized: true,
      defaultValue: 'Ministry of Health',
    },
    {
      name: 'hospitalName',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Dhaulagiri Provincial Hospital',
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
      defaultValue: 'Baglung, Nepal',
    },
    {
      name: 'emblem',
      type: 'upload',
      relationTo: 'media',
      label: 'Government Emblem (left)',
    },
    {
      name: 'flag',
      type: 'upload',
      relationTo: 'media',
      label: 'National Flag (right)',
    },
  ],
}
