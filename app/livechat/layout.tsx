import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';
import { Providers } from './providers';
import { montserrat } from '@/utils/fonts';

export const metadata: Metadata = {
  title: 'Церковь Кропоткина',
  description: '',
}

export default function RootLayout({
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
          </div>
        </Providers>
      </body>
    </html>
  )
}
