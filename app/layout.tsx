import { Header } from '@/src/widgets/header';
import { Footer } from '@/src/widgets/footer';
import './globals.css';
import { Providers } from './providers';
import { montserrat } from '@/src/shared/fonts';
import { Transition } from './transition';
import { LcAppBar } from '@/src/features/lc-app-bar';

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
                  <Transition>
                    {children}
                  </Transition>
                </div>
                <LcAppBar />
              <Footer/>
            </div>
          </Providers>
        </body>
      </html>
  )
}
