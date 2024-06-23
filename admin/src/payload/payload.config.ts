import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

import { Articles } from './collections/Articles'
import Categories from './collections/Categories'
import { Charters } from './collections/Charters'
import { Destinations } from './collections/Destinations'
import { Events } from './collections/Events'
import { Media } from './collections/Media'
import { Partners } from './collections/Partners'
import { Recruitment } from './collections/Recruitment'
import { Shipyards } from './collections/Shipyards'
import Users from './collections/Users'
import { Yachts } from './collections/Yachts'

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      // beforeLogin: [BeforeLogin],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      // beforeDashboard: [BeforeDashboard],
    },
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, './dotenv.js'),
          [path.resolve(__dirname, './endpoints/seed')]: path.resolve(
            __dirname,
            './emptyModuleMock.js',
          ),
        },
      },
    }),
  },
  editor: slateEditor({
    admin: {
      elements: ['h1', 'h2', 'h3', 'blockquote', 'link', 'ol', 'ul', 'upload'],
    },
  }),
  db: mongooseAdapter({
    url: process.env.PAYLOAD_DATABASE_URI,
    connectOptions: {
      dbName: process.env.PAYLOAD_DATABASE_NAME,
    },
  }),
  localization: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    fallback: true,
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [
    Articles,
    Media,
    Users,
    Yachts,
    Charters,
    Categories,
    Destinations,
    Events,
    Partners,
    Shipyards,
    Recruitment,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  endpoints: [
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    // {
    //   path: '/seed',
    //   method: 'get',
    //   handler: seed,
    // },
  ],
  plugins: [
    // redirects({
    //   collections: ['articles'],
    // }),
    // seo({
    //   collections: ['articles'],
    //   generateTitle,
    //   uploadsCollection: 'media',
    // }),
  ],
})
