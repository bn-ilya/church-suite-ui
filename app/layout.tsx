import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <body className={`${inter.className} flex flex-col justify-between`}>
        <Header/>
          <div className='flex-grow'>
          {children}
          </div>
        <Footer/>
        </body>
    </html>
  )
}
