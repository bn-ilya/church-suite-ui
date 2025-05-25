"use client";

import { ThemeSwitcher } from "@/src/features/theme-switcher";
import { LogoChurch } from "@/src/shared/ui";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { headerHeight } from "./lib/constants";

const MotionNavbar = motion(Navbar);

export const Header: FC = () => {
  return (
    <MotionNavbar
      initial={{ y: -headerHeight }}
      animate={{ y: 0 }}
      maxWidth="full"
      height={`${headerHeight}px`}
      isBordered
      className="fixed"
    >
      <NavbarBrand>
        <LogoChurch className="w-[20px] h-auto text-foreground" />
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
  );
};
