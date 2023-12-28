import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem, Button,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/react";
import { FC } from 'react';
import NavBarLinks from "./NavBarLinks/NavBarLinks";
import { linksList } from "@/static-data/linksList/linksList";
import { ThemeSwitcherBtn } from './ThemeSwitcherBtn/ThemeSwitcherBtn';
import { headerHight } from "@/utils/constants";

const Header: FC = () => {
  return (
      <Navbar maxWidth="full" height={`${headerHight}px`} isBordered className="container m-auto fixed">
        <NavbarBrand>
          <div>logo</div>
          <p className="font-bold text-inherit">ACME</p>
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
