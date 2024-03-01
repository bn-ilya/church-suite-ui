import { Header } from '@/src/widgets/header';
import { Footer } from '@/src/widgets/footer';
import './globals.css';
import { Providers } from './providers';
import { montserrat } from '@/src/shared/fonts';
import type { Viewport } from 'next'
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${montserrat.className} min-h-screen`}>
          <Providers>
            <div className='min-h-screen flex flex-col justify-between'>
              <Header/>
                <div className='flex-grow w-full flex flex-col align-center'>
                    {children}
                </div>
              <Footer/>
            </div>
          </Providers>
        </body>
      </html>
  )
}
