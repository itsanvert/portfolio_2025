"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
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

export interface CardNavProps {
  logoText: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  homeHref?: string;
  showControls?: boolean;
  contactHref?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logoText = "Portfolio",
  logoAlt = "Logo",
  items = [],
  className = "",
  ease = "power3.out",
  baseColor,
  menuColor,
  buttonBgColor,
  buttonTextColor,
  homeHref = "/",
  showControls = true,
  contactHref = "https://t.me/itsanvert",
}) => {
  const { t } = useTranslation();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculateHeight = () => {
    if (!isMounted) return 60;

    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      const controlsEl = navEl.querySelector(".mobile-controls") as HTMLElement;

      if (contentEl) {
        // Temporarily make visible to measure
        const originalStyle = {
          visibility: contentEl.style.visibility,
          pointerEvents: contentEl.style.pointerEvents,
          position: contentEl.style.position,
          height: contentEl.style.height,
        };

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;
        const controlsHeight =
          controlsEl && showControls ? controlsEl.scrollHeight + 12 : 0;

        // Restore original styles
        Object.assign(contentEl.style, originalStyle);

        return topBar + contentHeight + controlsHeight + padding;
      }
    }
    return 300;
  };

  const createTimeline = () => {
    if (!isMounted) return null;

    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    if (controlsRef.current && showControls) {
      gsap.set(controlsRef.current, { y: 30, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current.filter(Boolean),
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1"
    );

    if (controlsRef.current && showControls) {
      tl.to(
        controlsRef.current,
        { y: 0, opacity: 1, duration: 0.3, ease },
        "-=0.2"
      );
    }

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
  }, [ease, items, isMounted, showControls]);

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
      <div
        className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[900px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
      >
        <nav className="card-nav block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden backdrop-blur-md bg-white/90 dark:bg-black/90 border border-white/20 dark:border-gray-800/30">
          <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] pr-4 z-[2]">
            <div className="hamburger-menu group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-1">
              <div className="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear" />
              <div className="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear" />
            </div>
            <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-2">
              <Link href={homeHref} className="no-underline">
                <span className="logo-text text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {logoText}
                </span>
              </Link>
            </div>
            {showControls && (
              <div className="desktop-controls hidden md:flex items-center gap-3 order-3">
                <div className="p-1 rounded-lg">
                  <ModeToggle />
                </div>
                <div className="p-1 rounded-lg">
                  <LanguageSwitcher />
                </div>
                <Link href={contactHref}>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  >
                    Contact
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[900px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height] backdrop-blur-md bg-white/90 dark:bg-black/90 border border-white/20 dark:border-gray-800/30`}
        style={{ backgroundColor: baseColor }}
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
            style={{ color: menuColor || "currentColor" }}
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
            <Link href={homeHref} className="no-underline">
              <span className="logo-text text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                {logoText}
              </span>
            </Link>
          </div>

          {/* Desktop Controls */}
          {showControls && (
            <div className="desktop-controls hidden md:flex items-center gap-3 order-3">
              <div className="p-1 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-300">
                <ModeToggle />
              </div>
              <div className="p-1 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-300">
                <LanguageSwitcher />
              </div>
              <Link href={contactHref}>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  {t ? t("nav.contact") : "Contact"}
                </Button>
              </Link>
            </div>
          )}
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
            {items?.slice(0, 4).map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-[120px] md:min-h-0 md:flex-[1_1_0%] transition-transform duration-300 hover:scale-105"
                ref={setCardRef(idx)}
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
              >
                <div className="nav-card-label font-semibold tracking-[-0.5px] text-[16px] md:text-[18px]">
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
          {showControls && (
            <div
              ref={controlsRef}
              className="mobile-controls md:hidden flex flex-col gap-3 mt-3 p-3 rounded-lg bg-white/10 dark:bg-black/10 border border-white/20 dark:border-gray-700/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t ? t("nav.theme") : "Theme"}
                </span>
                <ModeToggle />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t ? t("nav.language") : "Language"}
                </span>
                <LanguageSwitcher />
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <Link href={contactHref} className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-lg font-medium transition-all duration-300">
                    {t ? t("nav.contact") : "Contact"}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
