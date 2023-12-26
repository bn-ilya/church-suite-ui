import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem, Button,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/react";
import Link from "next/link";
import { FC } from 'react';
import NavBarLinks from "./NavBarLinks/NavBarLinks";

export interface INavLink {
  path: string,
  title: string,
}

const linksList: Array<INavLink> = [
  {
    path: '/',
    title: 'Главная',
  },
  {
    path: '/blog',
    title: 'Блог',
  },
  {
    path: '/events',
    title: 'События',
  },
  {
    path: '/contacts',
    title: 'Контакты',
  },
]

const Header: FC = () => {
  return (
    <header>
    <Navbar position="static">
      <NavbarBrand>
        <div>logo</div>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavBarLinks linksList={linksList} />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    </header>
  )
};

export default Header;
