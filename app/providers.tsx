// app/providers.tsx
'use client'

import {HeroUIProvider} from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { StoreProvider } from '../src/app/providers/store-provider';

export function Providers({children}: { children: React.ReactNode }) {

  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <StoreProvider>
            {children}
        </StoreProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  )
}