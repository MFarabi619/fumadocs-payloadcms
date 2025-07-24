import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {s3Storage} from "@payloadcms/storage-s3";
import { buildConfig } from 'payload'

import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'

import {seed} from "./lib/seed";

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  onInit: async (payload, req) => {
    const {totalDocs} = await payload.count({
      collection: "users",
      where: {
        email: {
          equals: "test@gmail.com",
        },
      },
    });

    if (!totalDocs) {
      seed({payload, req});
    }
  },
  debug: true,
  defaultDepth: 3,
  admin: {
  autoLogin:
    process.env.NODE_ENV === "development"
      ? {
          email: "test@gmail.com",
          password: "test",
          prefillOnly: true,
        }
      : false,
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
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
      url: process.env.DATABASE_URI || process.env.TURSO_DATABASE_URL || 'file:./sqlite.db',
      authToken: process.env.AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: process.env.NODE_ENV !== "development",
      collections: {
        media: {
          prefix: "./media",
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        forcePathStyle: true, // Important for using Supabase
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "",
        endpoint: process.env.S3_ENDPOINT || "",
      },
    }),
  ],
})
