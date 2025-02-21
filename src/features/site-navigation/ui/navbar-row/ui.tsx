"use client"
import { NavbarItem } from "@heroui/react";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { data } from '../../model';

export const NavbarRow: FC = () => {
  const pathname = usePathname();
  
  return (
    <>
      {data.map(({path, title}, index) => (
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
