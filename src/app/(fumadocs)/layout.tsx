import '@/app/(fumadocs)/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';

export const metadata = {
  description: 'A blank template using Fumadocs & Payload in a Next.js app.',
  title: 'Fumadocs+Payload Blank Template',
}

const inter = Inter({
  subsets: ['latin'],
});

 export default async function RootLayout(props: { children: React.ReactNode }) {
   const { children } = props
   return (
     <html lang="en" className={inter.className} suppressHydrationWarning>
       <body className="flex flex-col min-h-screen">
         <RootProvider>{children}</RootProvider>
       </body>
     </html>
   );
 }
