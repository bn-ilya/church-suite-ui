import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={`${inter.className} min-h-screen dark`}>
        <Providers>
          <div className='min-h-screen flex flex-col justify-between'>
            <Header/>
              <div className='flex-grow'>
                {children}
              </div>
            <Footer/>
          </div>
        </Providers>
      </body>
    </html>
  )
}
