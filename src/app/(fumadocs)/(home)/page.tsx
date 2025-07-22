import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link';
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
        <div>
          {!user && <h1 className="text-xl font-semibold">Welcome to your new project.</h1>}
          {user && <h1 className="text-xl font-semibold">Welcome back, {user.email}</h1>}
        </div>

      <p className="text-fd-muted-foreground">
        You can open{' '}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          /docs
        </Link>{' '}
        to see the documentation, and {' '}
          <Link
            href={payloadConfig.routes.admin}
            className="text-fd-foreground font-semibold underline"
            rel="noopener noreferrer"
            target="_blank"
          >
           /admin
          </Link>{' '}
        to see the admin panel.
      </p>

      <div className="mt-10 w-full max-w-xl space-y-6">
        <div className="pt-6 border-t text-sm text-gray-500">
          <p>Update this page by editing</p>
          <a className="codeLink inline-block mt-1" href={fileURL}>
            <code>app/(fumadocs)/(home)/page.tsx</code>
          </a>
        </div>
      </div>
    </main>
  )
}
