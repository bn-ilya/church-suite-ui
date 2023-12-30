import { FC } from 'react';
import { INavBarMobileMenuProps } from './NavBarMobileMenu.props';
import { NavbarMenu, NavbarMenuItem, Link } from '@nextui-org/react';

export const NavBarMobileMenu: FC<INavBarMobileMenuProps> = ({linksList}) => {
  return (
    <NavbarMenu>
    {linksList.map((item, index) => (
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