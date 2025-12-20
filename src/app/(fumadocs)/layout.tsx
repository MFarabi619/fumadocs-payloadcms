import { RootProvider } from 'fumadocs-ui/provider/next'
import './global.css'
// import '@/app/(fumadocs)/global.css'
import { Inter } from 'next/font/google'

export const metadata = {
  description: 'A blank template using Fumadocs & Payload in a Next.js app.',
  title: 'Fumadocs+Payload Blank Template',
}

const inter = Inter({
  subsets: ['latin'],
})

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
