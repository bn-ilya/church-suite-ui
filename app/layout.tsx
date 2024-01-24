import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';
import { Providers } from './providers';
import { montserrat } from '@/utils/fonts';

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
