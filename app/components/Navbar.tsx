"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import "@/lib/181n";

// Main nav items
export const navigationItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "projects", href: "/projects" },
];

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="text-2xl font-semibold">
          {t("nav.firstname")}{" "}
          <span className="text-blue-400">{t("nav.lastname")}</span>
        </Link>
      </div>

      {/* Large screen menu */}
      <div className="hidden md:flex items-center justify-center flex-1 ml-10">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
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

      {/* Right controls */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="https://t.me/itsanvert">
            <Button>{t("nav.contact")}</Button>
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
