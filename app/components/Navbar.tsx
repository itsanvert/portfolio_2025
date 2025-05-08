"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { MobileMenu } from "./MobileMenu";
import { ModeToggle } from "@/components/ui/toggle-light-black";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import "@/lib/181n";

// Main nav items
export const navigationItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "course", href: "/course" },
  { name: "projects", href: "/project" }, // rendered manually with submenu
];

// Submenu under projects
export const projectItems = [
  { name: "project_all", href: "/project" },
  { name: "project_web", href: "/project/web" },
  { name: "project_design", href: "/project/design" },
  { name: "project_desktop", href: "/project/desktop" },
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
            {navigationItems.map((item) => {
              if (item.name === "projects") return null;
              return (
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
              );
            })}

            {/* Project dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t("nav.projects")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-56 gap-2 p-2">
                  {projectItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      >
                        {t(`nav.${item.name}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
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
