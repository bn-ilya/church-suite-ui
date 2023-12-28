import {  Navbar,   NavbarBrand,   NavbarContent, NavbarItem } from "@nextui-org/react";
import { FC } from 'react';
import Image from 'next/image';
import LogoChurch from '../public/logoChurch/logoChurch.svg';
import NavBarLinks from "./NavBarLinks/NavBarLinks";
import { linksList } from "@/static-data/linksList/linksList";
import { ThemeSwitcherBtn } from './ThemeSwitcherBtn/ThemeSwitcherBtn';
import { headerHight } from "@/utils/constants";

const Header: FC = () => {
  return (
      <Navbar maxWidth="full" height={`${headerHight}px`} isBordered className="fixed">
        <NavbarBrand>
          <Image
              priority
              src={LogoChurch}
              className='w-[20px] h-auto'
              alt="Логотип церкви"
           />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavBarLinks linksList={linksList} />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcherBtn />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
  )
};

export default Header;
