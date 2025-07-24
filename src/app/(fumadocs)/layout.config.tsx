import Image from 'next/image'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <picture>
          <source srcSet="/fumadocs.svg" />
          <Image
            alt="Fumadocs Logo Symbol"
            height={35}
            src="/fumadocs.svg"
            width={35}
          />
        </picture>
        +
        <picture>
          <source srcSet="/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={35}
            src="/payload-favicon.svg"
            width={35}
          />
        </picture>
      </>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
};
