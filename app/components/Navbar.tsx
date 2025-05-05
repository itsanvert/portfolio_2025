"use client";
import { Button } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import React from "react";
import { MobileMenu } from "./MobileMenu";
import { ModeToggle } from "@/components/ui/toggle-light-black";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import "@/lib/181n";

export const navigationItems = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "about",
    href: "/about",
  },
  {
    name: "guestbook",
    href: "/guestbook",
  },
  {
    name: "projects",
    href: "/project",
  },
  {
    name: "course",
    href: "/course",
  },
];

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          {t("site.title", "Vert")}
        </Link>
        {/* Navigation Menu - Large Screens */}
        <div className="hidden sm:flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={item.href}>
                      {t(`nav.${item.name.toLowerCase()}`)}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side: Language Switcher, Mode Toggle, Contact Button */}
        <div className="flex items-center justify-end gap-4 ">
          <div className="flex items-center gap-4 ">
            <div className=" hidden sm:block">
              <div className="flex gap-5">
                <ModeToggle />
                <LanguageSwitcher />
              </div>
            </div>

            {/* Button for larger screens */}
            <a href="https://t.me/itsanvert">
              <Button className="hidden sm:block">{t("nav.contact")}</Button>
            </a>

            {/* Mobile Menu for smaller screens */}
            <div className="sm:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
