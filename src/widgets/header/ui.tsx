import {  Navbar,   NavbarBrand,   NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { FC } from 'react';
import { NavbarRow, NavbarMobile } from "@/src/features/site-navigation";
import { ThemeSwitcher } from '@/src/features/theme-switcher';
import { headerHeight } from "./lib/constants";
import { LogoChurch } from "@/src/shared/ui";

export const Header: FC = () => {
  return (
      <Navbar maxWidth="full" height={`${headerHeight}px`} isBordered className="fixed">
        <NavbarBrand>
          <LogoChurch className='w-[20px] h-auto text-foreground' />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarRow />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarMenuToggle
            className="sm:hidden"
          />
        </NavbarContent>

        <NavbarMobile />
      </Navbar>
  )
};
