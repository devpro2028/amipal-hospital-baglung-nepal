import { Plugin } from 'payload'
import { payloadSidebar } from 'payload-sidebar-plugin'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { beforeSyncWithSearch } from '../search/beforeSync'
import { searchFields } from '../search/fieldOverrides'
import { getServerSideURL } from '../utilities/getURL'

export const plugins: Plugin[] = [
  payloadSidebar({
    // Sort order for navigation groups (lower = higher priority)
    groupOrder: {
      Content: 1,
      Media: 2,
      Users: 3,
      Settings: 10,
      Tools: 15,
      Resources: 99,
    },

    // Custom icons for collections and globals
    icons: {
      users: 'users-round',
      media: 'images',
    },

    // Custom navigation links
    customLinks: [
      {
        label: 'Dashboard',
        href: '/admin/dashboard',
        group: 'Tools',
        icon: 'layout-dashboard',
        order: 1,
      },
      {
        label: 'Reports',
        href: '/admin/reports',
        group: 'Tools',
        icon: 'bar-chart-3',
        order: 2,
      },
      {
        label: 'API Explorer',
        href: '/api',
        group: 'Tools',
        icon: 'code',
        order: 3,
      },
      {
        label: 'Payload Docs',
        href: 'https://payloadcms.com/docs',
        group: 'Resources',
        icon: 'book-open',
        external: true,
        order: 1,
      },
      {
        label: 'GitHub Repo',
        href: 'https://github.com/sanjayguwaju/demo-payload-app-v1',
        group: 'Resources',
        icon: 'github',
        external: true,
        order: 2,
      },
    ],

    // Custom navigation groups
    customGroups: [
      { label: 'Tools', order: 15, defaultOpen: true },
      { label: 'Resources', order: 99, defaultOpen: false },
    ],

    // Pinning configuration
    enablePinning: true,
    pinnedStorage: 'preferences',

    // Badge color overrides
    cssVariables: {
      '--badge-red-bg': '#ef4444',
      '--badge-blue-bg': '#3b82f6',
      '--badge-green-bg': '#22c55e',
      '--badge-orange-bg': '#f97316',
      '--badge-yellow-bg': '#eab308',
      '--badge-gray-bg': '#6b7280',
    },
  }),
  formBuilderPlugin({}),
  searchPlugin({
    collections: ['posts', 'pages'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => [...defaultFields, ...searchFields],
    },
  }),
  seoPlugin({
    generateURL: ({ doc }) =>
      `${getServerSideURL()}/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
  }),
  redirectsPlugin({
    collections: ['pages', 'posts'],
  }),
]
