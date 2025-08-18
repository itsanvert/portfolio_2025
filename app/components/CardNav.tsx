"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
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
  download?: boolean;
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
  projectItems?: CardNavLink[];
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
    href: "/resume/resume.pdf",
    download: true,
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
  },
];

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
  projectItems = [],
}) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeMobile, setActiveMobile] = useState("");
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsHamburgerOpen((prev) => !prev);
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tlRef.current?.play(0);
    } else {
      setIsHamburgerOpen(false);
      tlRef.current?.eventCallback("onReverseComplete", () =>
        setIsExpanded(false)
      );
      tlRef.current?.reverse();
    }
  };

  const calculateHeight = () => {
    if (!isMounted) return 60;

    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      const controlsEl = navEl.querySelector(".mobile-controls") as HTMLElement;

      if (contentEl) {
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

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  if (!isMounted) {
    return (
      <div
        className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[900px] z-[99] top-[1.2em] lg:top-[2em] ${className}`}
      >
        <nav className="card-nav block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden backdrop-blur-md bg-white/90 dark:bg-black/90 border border-white/20 dark:border-gray-800/30">
          <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] pr-4 z-[2]">
            <div className="hamburger-menu group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 lg:order-1">
              <div className="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear" />
              <div className="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear" />
            </div>
            <div className="logo-container flex items-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 order-1 lg:order-2">
              <Link href={homeHref} className="no-underline">
                <span className="logo-text text-lg lg:text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {logoText}
                </span>
              </Link>
            </div>
            {showControls && (
              <div className="desktop-controls hidden lg:flex items-center gap-3 order-3">
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
    <>
      {/* Desktop Navigation */}
      <div
        className={`hidden lg:block fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[900px] z-[99] top-[2em] ${className}`}
      >
        <nav
          ref={navRef}
          className={`card-nav ${
            isExpanded ? "open" : ""
          } block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height] backdrop-blur-md bg-white/90 dark:bg-black/90 border border-white/20 dark:border-gray-800/30`}
          style={{ backgroundColor: baseColor }}
        >
          <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] pr-4 z-[2]">
            <div
              className={`hamburger-menu ${
                isHamburgerOpen ? "open" : ""
              } group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 lg:order-1`}
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

            <div className="logo-container flex items-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 order-1 lg:order-2">
              <Link href={homeHref} className="no-underline">
                <span className="logo-text text-lg lg:text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                  {logoText}
                </span>
              </Link>
            </div>

            {showControls && (
              <div className="desktop-controls hidden lg:flex items-center gap-3 order-3">
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

          <div
            className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
              isExpanded
                ? "visible pointer-events-auto"
                : "invisible pointer-events-none"
            }`}
            aria-hidden={!isExpanded}
          >
            <div className="nav-cards-container grid grid-cols-2 gap-2">
              {items?.map((item, idx) => (
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
                  onMouseEnter={() => setActiveCard(idx)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="nav-card-label font-medium tracking-[-0.5px] text-[16px]">
                    {item.label}
                  </div>
                  <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                    {item.links?.map((lnk, i) => (
                      <Link
                        key={`${lnk.label}-${i}`}
                        href={lnk.href}
                        download={lnk.download}
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

      {/* Mobile Bottom Navigation */}
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
                    download
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
                  if (item.key === "menu") {
                    e.preventDefault();
                    toggleMenu();
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
};

export default CardNav;
