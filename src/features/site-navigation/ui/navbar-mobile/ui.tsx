import { FC } from 'react';
import { NavbarMenu, NavbarMenuItem, Link } from "@heroui/react";
import { data } from '../../model';

export const NavbarMobile: FC = () => {
  return (
    <NavbarMenu>
    {data.map((item, index) => (
      <NavbarMenuItem key={`${item}-${index}`}>
        <Link
          color="foreground"
          className="w-full"
          href={item.path}
          size="lg"
        >
          {item.title}
        </Link>
      </NavbarMenuItem>
    ))}
  </NavbarMenu>
  )
};