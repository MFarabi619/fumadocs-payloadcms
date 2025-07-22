import React from 'react'
import './styles.css'
import type { ReactNode } from 'react';

/* import { HomeLayout } from 'fumadocs-ui/layouts/home';
* import { baseOptions } from '@/app/(fumadocs)/layout.config';
*
* export default function Layout({ children }: { children: ReactNode }) {
*   return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
* }
*  */

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
