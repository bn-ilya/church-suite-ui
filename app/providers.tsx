// app/providers.tsx
'use client'

import { Provider } from 'react-redux';
import {NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { store } from '@/redux/store';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Provider store={store}>
          {children}
        </Provider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}