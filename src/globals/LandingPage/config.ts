import type { GlobalConfig } from 'payload'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  label: 'Landing Page',
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Build something amazing today',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      localized: true,
      defaultValue:
        'The modern platform for building fast, secure, and scalable applications. Start your journey with us.',
    },
    {
      name: 'heroCta',
      type: 'text',
      localized: true,
      defaultValue: 'Get Started',
    },
    {
      name: 'heroSecondaryCta',
      type: 'text',
      localized: true,
      defaultValue: 'Learn More',
    },
    {
      name: 'features',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Globe', value: 'globe' },
            { label: 'Shield', value: 'shield' },
            { label: 'Zap', value: 'zap' },
            { label: 'Users', value: 'users' },
            { label: 'Code', value: 'code' },
            { label: 'Layers', value: 'layers' },
          ],
        },
      ],
    },
    {
      name: 'featuresTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Everything you need',
    },
    {
      name: 'featuresSubtitle',
      type: 'text',
      localized: true,
      defaultValue: 'Powerful features to help you build and grow your business.',
    },
    {
      name: 'ctaSectionTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Ready to get started?',
    },
    {
      name: 'ctaSectionDescription',
      type: 'text',
      localized: true,
      defaultValue: 'Join thousands of users already building with our platform.',
    },
    {
      name: 'ctaSectionButton',
      type: 'text',
      localized: true,
      defaultValue: 'Start for free',
    },
  ],
}
