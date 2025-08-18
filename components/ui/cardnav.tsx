"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import "@/lib/181n";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle-light-black";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
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
  { name: "projects", href: "/project" },
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
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const calculateHeight = () => {
    if (!isMounted) return 60;

    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    if (!isMounted) return null;

    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease: "power3.out",
    });

    tl.to(
      cardsRef.current.filter(Boolean),
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.08 },
      "-=0.1"
    );

    return tl;
  };

  useLayoutEffect(() => {
    if (!isMounted) return;

    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [isMounted]);

  useLayoutEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded, isMounted]);

  const toggleMenu = () => {
    if (!isMounted) return;

    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <div className="card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em]">
        <nav className="card-nav block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden backdrop-blur-md bg-white/90 dark:bg-black/90 border border-white/20 dark:border-gray-800/30">
          <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
            <div className="hamburger-menu group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-1">
              <div className="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear" />
              <div className="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear" />
            </div>
            <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-2">
              <Link href="/" className="no-underline">
                <span className="logo-text text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Loading...
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em]">
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height] backdrop-blur-md bg-white/90 dark:bg-black/90 border border-white/20 dark:border-gray-800/30`}
      >
        {/* Top Bar */}
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] pr-4 z-[2]">
          {/* Hamburger Menu */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-1`}
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu();
              }
            }}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""
              } group-hover:opacity-75`}
            />
          </div>

          {/* Logo */}
          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-2">
            <Link href="/" className="no-underline">
              <span className="logo-text text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                {t("nav.firstname")}{" "}
                <span className="text-blue-400">{t("nav.lastname")}</span>
              </span>
            </Link>
          </div>

          {/* Desktop Controls */}
          <div className="desktop-controls hidden md:flex items-center gap-3 order-3">
            <div className="p-1 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-300">
              <ModeToggle />
            </div>
            <div className="p-1 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-300">
              <LanguageSwitcher />
            </div>
            <Link href="https://t.me/itsanvert">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                {t("nav.contact")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Expanded Content */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          } md:flex-row md:items-start md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {/* Navigation Cards */}
          <div className="nav-cards-container flex flex-col gap-2 md:flex-row md:flex-1 md:gap-3">
            {cardNavItems.slice(0, 3).map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-[120px] md:min-h-0 md:flex-[1_1_0%] transition-transform duration-300 hover:scale-105"
                ref={setCardRef(idx)}
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
              >
                <div className="nav-card-label font-normal tracking-[-0.5px] text-[16px] md:text-[18px]">
                  {item.label}
                </div>
                <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                  {item.links?.slice(0, 3).map((lnk, i) => (
                    <Link
                      key={`${lnk.label}-${i}`}
                      href={lnk.href}
                      className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[13px] md:text-[14px] text-current"
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

          {/* Mobile Controls */}
          <div className="mobile-controls md:hidden flex flex-col gap-3 mt-3 p-3 rounded-lg bg-white/10 dark:bg-black/10 border border-white/20 dark:border-gray-700/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("nav.theme", "Theme")}
              </span>
              <ModeToggle />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("nav.language", "Language")}
              </span>
              <LanguageSwitcher />
            </div>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <Link href="https://t.me/itsanvert" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-lg font-medium transition-all duration-300">
                  {t("nav.contact")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
