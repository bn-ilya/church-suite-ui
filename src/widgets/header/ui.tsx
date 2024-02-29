'use client';

import {  Navbar,   NavbarBrand,   NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { FC } from 'react';
import { NavbarRow, NavbarMobile } from "@/src/features/site-navigation";
import { ThemeSwitcher } from '@/src/features/theme-switcher';
import { headerHeight } from "./lib/constants";
import { LogoChurch, LogoLiveChat } from "@/src/shared/ui";
import { motion } from "framer-motion";

const MotionNavbar = motion(Navbar)

export const Header: FC = () => {
  return (
      <MotionNavbar initial={{y: -headerHeight}} animate={{y: 0}} maxWidth="full" height={`${headerHeight}px`} isBordered className="fixed">
        <NavbarBrand>
          <LogoChurch className='w-[20px] h-auto text-foreground' />
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          {/* <NavbarMenuToggle
            className="sm:hidden"
          /> */}
        </NavbarContent>

        {/* <NavbarMobile /> */}
      </MotionNavbar>
  )
};
