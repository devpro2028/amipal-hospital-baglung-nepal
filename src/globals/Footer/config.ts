import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    // ── About / Description ─────────────────────────────────────────
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Hospital Description',
      defaultValue: 'Ampipal Hospital Provincial Hospital is committed to providing quality healthcare services to the people of Baglung and surrounding districts.',
    },

    // ── Contact Info ─────────────────────────────────────────────────
    {
      name: 'address',
      type: 'textarea',
      localized: true,
      label: 'Address',
      defaultValue: 'Baglung Municipality-1, Baglung, Gandaki Province, Nepal',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      defaultValue: '+977-068-520000',
    },
    {
      name: 'emergencyPhone',
      type: 'text',
      label: 'Emergency Phone',
      defaultValue: '+977-068-521111',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      defaultValue: 'info@dphosp.gov.np',
    },
    {
      name: 'openingHours',
      type: 'text',
      localized: true,
      label: 'Opening Hours',
      defaultValue: 'Emergency: 24/7 | OPD: Sun-Fri 10am-4pm',
    },

    // ── Link Columns ─────────────────────────────────────────────────
    {
      name: 'columns',
      type: 'array',
      localized: true,
      label: 'Link Columns',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Column Heading',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
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
      ],
    },

    // ── Social Links ─────────────────────────────────────────────────
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },

    // ── Copyright ────────────────────────────────────────────────────
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      label: 'Copyright Text',
      defaultValue: '© 2082 Ampipal  Provincial Hospital, Baglung. All rights reserved.',
    },

    // ── Developer Credit ─────────────────────────────────────────────
    {
      name: 'developerCredit',
      type: 'text',
      label: 'Developer Credit',
      defaultValue: 'Developed by Sanjay Guwaju.',
    },
    {
      name: 'developerUrl',
      type: 'text',
      label: 'Developer Website URL',
      defaultValue: 'https://sanjayguwaju.com.np',
    },
  ],
}
