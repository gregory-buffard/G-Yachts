import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

import { Media } from './collections/Media'
import { Articles } from './collections/Articles'
import Users from './collections/Users'
import { Yachts } from './collections/Yachts'
import { Charters } from './collections/Charters'
import Categories from './collections/Categories'
import { Destinations } from './collections/Destinations'
import { Events } from './collections/Events'
import { Partners } from './collections/Partners'
import { Recruitment } from './collections/Recruitment'
import { Shipyards } from './collections/Shipyards'
import { NewConstructions } from './collections/NewConstructions'
import { Messages } from './collections/Messages'
import { ArchivedCustomers } from './collections/ArchivedCustomers'
import ImportYachts from './views/importYachts'
import { fetchYatcoYachts } from './helpers/yatcoFetch'
import { importYatcoYacht } from './helpers/yatcoImport'
import ImportYachtsLink from './components/importYatcoLink'
import { reorderCollection } from './helpers/reorderCollection'

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      views: {
        ImportYachts: {
          Component: ImportYachts,
          path: '/import-yachts',
        },
      },
      afterNavLinks: [ImportYachtsLink],
    },
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, './dotenv.js'),
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
    NewConstructions,
    Messages,
    ArchivedCustomers,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    disablePlaygroundInProduction: true,
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  endpoints: [
    {
      method: 'get',
      handler: fetchYatcoYachts,
      path: '/yatco/yachts',
    },
    {
      method: 'post',
      handler: importYatcoYacht,
      path: '/yatco/import',
    },
    {
      method: "post",
      handler: reorderCollection,
      path: "/reorder",
    }
  ],
  plugins: [],
  upload: {
    limits: {
      fileSize: 20000000, // 20MB
    },
  },
  rateLimit: {
    trustProxy: true,
    max: 5000,
  },
})
