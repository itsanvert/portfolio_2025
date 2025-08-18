"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import "@/lib/181n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle-light-black";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { FiHome, FiUser, FiFileText, FiCode, FiMenu } from "react-icons/fi";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
  download?: boolean; // optional
};


export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

// Main nav items
export const navigationItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "resume", href: "/resume" },
  { name: "projects", href: "/project" },
];

// Submenu under projects
export const projectItems = [
  { name: "project_all", href: "/project" },
  { name: "project_web", href: "/project/web" },
  { name: "project_design", href: "/project/design" },
  { name: "project_desktop", href: "/project/desktop" },
];

interface NavbarProps {
  className?: string;
  showControls?: boolean;
  contactHref?: string;
}

const mobileNavItems = [
  {
    key: "home",
    label: "Home",
    icon: FiHome,
    href: "/",
  },
  {
    key: "about",
    label: "About",
    icon: FiUser,
    href: "/about",
  },
  {
    key: "resume",
    label: "Resume",
    icon: FiFileText,
    href: "/resume/resume.pdf", // Updated to direct PDF path
    download: true, // Add download attribute
  },
  {
    key: "projects",
    label: "Projects",
    icon: FiCode,
    href: "/project",
  },
  {
    key: "menu",
    label: "Menu",
    icon: FiMenu,
    href: "#",
    onClick: (toggleMenu: () => void) => toggleMenu(),
  },
];

export default function Navbar({
  className = "",
  showControls = true,
  contactHref = "https://t.me/itsanvert",
}: NavbarProps = {}) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeMobile, setActiveMobile] = useState("");
  const setCardRef = (idx: number) => (el: HTMLDivElement | null) => {
    if (el) {
      cardsRef.current[idx] = el;
    }
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // 👇 Add this
  const toggleMenu = () => {
    setIsHamburgerOpen((prev) => !prev);
  };
  // Configure navigation items for CardNav
  const cardNavItems: CardNavItem[] = [
    {
      label: t("nav.home"),
      bgColor: "rgba(59, 130, 246, 0.1)",
      textColor: "rgb(59, 130, 246)",
      links: [
        {
          label: t("nav.home"),
          href: "/",
          ariaLabel: t("nav.home"),
        },
      ],
    },
    {
      label: t("nav.about"),
      bgColor: "rgba(16, 185, 129, 0.1)",
      textColor: "rgb(16, 185, 129)",
      links: [
        {
          label: t("nav.about"),
          href: "/about",
          ariaLabel: t("nav.about"),
        },
      ],
    },
    {
      label: t("nav.resume"),
      bgColor: "rgba(245, 158, 11, 0.1)",
      textColor: "rgb(245, 158, 11)",
      links: [
        {
          label: t("nav.download_resume"), // Changed label
          href: "/resume/resume.pdf",
          ariaLabel: t("nav.download_resume"),
          download: true, // Add download attribute
        },
      ],
    },
    {
      label: t("nav.projects"),
      bgColor: "rgba(168, 85, 247, 0.1)",
      textColor: "rgb(168, 85, 247)",
      links: projectItems.map((item) => ({
        label: t(`nav.${item.name}`),
        href: item.href,
        ariaLabel: t(`nav.${item.name}`),
      })),
    },
  ];

  // ... (keep all the existing helper functions unchanged)

  return (
    <>
      {/* Desktop Navigation (Hidden on mobile) */}
      <div
        className={`hidden lg:block fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] ${className}`}
      >
        <nav
          ref={navRef}
          className={`card-nav ${
            isExpanded ? "open" : ""
          } block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height] backdrop-blur-md bg-white/90 dark:bg-black/90 border border-white/20 dark:border-gray-800/30`}
        >
          {/* ... (keep desktop nav top section unchanged) */}

          <div
            className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
              isExpanded
                ? "visible pointer-events-auto"
                : "invisible pointer-events-none"
            }`}
            aria-hidden={!isExpanded}
          >
            <div className="nav-cards-container grid grid-cols-2 gap-2">
              {cardNavItems.map((item, idx) => (
                <div
                  key={`${item.label}-${idx}`}
                  className={`nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 h-[120px] transition-all duration-300 hover:scale-[1.02] ${
                    activeCard === idx ? "ring-2 ring-offset-2" : ""
                  }`}
                  ref={setCardRef(idx)}
                  style={
                    {
                      backgroundColor: item.bgColor,
                      color: item.textColor,
                      "--tw-ring-color": item.textColor,
                    } as React.CSSProperties
                  }
                >
                  <div className="nav-card-label font-medium tracking-[-0.5px] text-[16px]">
                    {item.label}
                  </div>
                  <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                    {item.links?.map((lnk, i) => (
                      <Link
                        key={`${lnk.label}-${i}`}
                        href={lnk.href}
                        download={lnk.download} // Add download attribute
                        className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[13px] text-current"
                        aria-label={lnk.ariaLabel}
                      >
                        <GoArrowUpRight
                          className="nav-card-link-icon shrink-0 w-3 h-3"
                          aria-hidden="true"
                        />
                        {lnk.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Bottom Navigation (Hidden on desktop) */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-[98] bg-transparent">
        <nav className="relative flex h-20 items-center justify-around bg-black/90 dark:bg-neutral-900/90 rounded-xl shadow-2xl mx-2 mb-2">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMobile === item.key;

            if (item.key === "resume") {
              return (
                <div
                  key={item.key}
                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                >
                  <Link
                    href={item.href}
                    download // This will trigger download
                    aria-label={item.label}
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-300 bg-violet-600 shadow-xl transition-transform duration-300 hover:scale-110 ${
                      isActive ? "scale-110" : "scale-100 opacity-80"
                    }`}
                    onClick={() => setActiveMobile(item.key)}
                  >
                    <Icon className="h-8 w-8" />
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick(toggleMenu);
                  }
                  setActiveMobile(item.key);
                }}
                className={`flex flex-col items-center justify-center gap-1 w-full h-full px-2 transition-colors ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
