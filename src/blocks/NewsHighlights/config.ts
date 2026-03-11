import type { Block } from 'payload'

export const NewsHighlights: Block = {
  slug: 'newsHighlights',
  interfaceName: 'NewsHighlightsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Latest News',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Section Subheading',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      label: 'Populate By',
      options: [
        { label: 'Latest from Collection', value: 'collection' },
        { label: 'Individual Selection', value: 'selection' },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      hasMany: true,
      label: 'Filter by Categories',
      relationTo: 'categories',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      label: 'Number of Posts',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      hasMany: true,
      label: 'Select Posts',
      relationTo: 'posts',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
    },
    {
      name: 'viewAllLink',
      type: 'text',
      label: 'View All URL',
      admin: {
        description: 'Optional link for a "View All" button (e.g. /news)',
      },
    },
  ],
  labels: {
    plural: 'News Highlights',
    singular: 'News Highlights',
  },
}
