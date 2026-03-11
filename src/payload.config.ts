import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { plugins } from './plugins'
import localization from './i18n/localization'
import { LoginPage } from './globals/LoginPage/config'
import { TopBar } from './globals/TopBar/config'
import { Navigation } from './globals/Navigation/config'
import { Footer } from './globals/Footer/config'
import { LandingPage } from './globals/LandingPage/config'
import { Header } from './Header/config'
import { defaultLexical } from './fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
      providers: ['@/components/AdminProviders'],
      views: {
        dashboard: {
          Component: '@/components/AdminDashboard#AdminDashboardLayout',
          path: '/dashboard',
        },
        reports: {
          Component: '@/components/Reports/ReportsViewLayout#ReportsViewLayout',
          path: '/reports',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  collections: [Media, Users, Pages, Posts, Categories],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [LoginPage, TopBar, Navigation, Footer, LandingPage, Header],
  plugins,
  localization,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
