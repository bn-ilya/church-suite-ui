import {  Navbar,   NavbarBrand,   NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { FC } from 'react';
import NavBarLinks from "./NavBarLinks/NavBarLinks";
import { linksList } from "@/static-data/linksList/linksList";
import { ThemeSwitcher } from '@/src/features/theme-switcher';
import { headerHight } from "@/utils/constants";
import { NavBarMobileMenu } from "./NavBarMobileMenu/NavBarMobileMenu";
import { LogoChurch } from "@/src/shared";

const Header: FC = () => {
  return (
      <Navbar maxWidth="full" height={`${headerHight}px`} isBordered className="fixed">
        <NavbarBrand>
          <LogoChurch className='w-[20px] h-auto text-foreground' />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavBarLinks linksList={linksList} />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarMenuToggle
            className="sm:hidden"
          />
        </NavbarContent>

        <NavBarMobileMenu linksList={linksList} />
      </Navbar>
  )
};

export default Header;
