import Image from 'next/image'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <picture>
            <source srcSet="/fumadocs.svg" />
            <Image alt="Fumadocs Logo Symbol" height={35} src="/fumadocs.svg" width={35} />
          </picture>
          +
          <picture>
            <source srcSet="/payload-favicon.svg" />
            <Image alt="Payload Logo" height={35} src="/payload-favicon.svg" width={35} />
          </picture>
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        text: 'Docs',
        url: '/docs',
      },
      {
        text: 'Admin',
        url: '/admin',
      },
    ],
    githubUrl: 'https://github.com/MFarabi619/fumadocs-payloadcms',
  }
}
