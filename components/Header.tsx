import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem, Button,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/react";
import Link from "next/link";
import { FC } from 'react';

const Header: FC = () => {
  return (
    <header>
          <Navbar position="static">
      <NavbarBrand>
        <div>logo</div>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Главная
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/blog/" aria-current="page">
            Блог
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/events/">
            События
          </Link>
        </NavbarItem>
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
