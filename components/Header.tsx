import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem, Button,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/react";
import { FC } from 'react';
import NavBarLinks from "./NavBarLinks/NavBarLinks";
import { linksList } from "@/static-data/linksList/linksList";
import { ThemeSwitcherBtn } from './ThemeSwitcherBtn/ThemeSwitcherBtn';

const Header: FC = () => {
  return (
    <header className="container m-auto">
      <Navbar maxWidth="full" isBordered>
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
    </header>
  )
};

export default Header;
