import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.NODE_ENV === "development" ? 'YOUR_SECRET_HERE' : process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NODE_ENV === "development" ? 'http://localhost:3000' : process.env.BASE_URL,
  cors: process.env.CORS_WHITELIST_ORIGINS
    ? process.env.CORS_WHITELIST_ORIGINS.split(",")
    : ["http://localhost:3000"],
  csrf: process.env.CSRF_WHITELIST_ORIGINS
    ? process.env.CSRF_WHITELIST_ORIGINS.split(",")
    : ["http://localhost:3000"],
  db: sqliteAdapter({
    client: {
      url: process.env.NODE_ENV === "development" ? "file:./sqlite.db" : process.env.DATABASE_URI || process.env.TURSO_DATABASE_URL || '',
      authToken: process.env.NODE_ENV === "development" ? "" : process.env.AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
