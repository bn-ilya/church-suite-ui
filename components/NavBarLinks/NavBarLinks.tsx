"use client"
import { NavbarItem } from '@nextui-org/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { INavLink } from '../Header';

interface INavBarLinksProps {
  linksList: Array<INavLink>;
}

const NavBarLinks: FC<INavBarLinksProps> = ({linksList}) => {
  const pathname = usePathname();
  
  return (
    <>
      {linksList.map(({path, title}, index) => (
        <NavbarItem key={index} isActive={path === pathname}>
          <Link href={path}>
            {title}
          </Link>
        </NavbarItem>
        ))
      }
    </>
  )
};

export default NavBarLinks;
