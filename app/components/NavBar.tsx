"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { ModeToggle } from "@/app/components/ModeToggle";
import { FiHome, FiUser, FiFileText, FiCode, FiMenu } from "react-icons/fi";
import { Contact } from "lucide-react";

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
    href: "/projects",
  },
  {
    key: "contact",
    label: "Contact",
    icon: Contact,
    href: "/contact",
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
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      if (tlRef.current) {
        tlRef.current.eventCallback("onComplete", null);
        tlRef.current.play();
      }
    } else {
      setIsHamburgerOpen(false);
      if (tlRef.current) {
        tlRef.current.eventCallback("onReverseComplete", () => {
          setIsExpanded(false);
        });
        tlRef.current.reverse();
      }
    }
  };

  const calculateHeight = () => {
    if (!isMounted) return 60;

    const navEl = navRef.current;
    if (!navEl) return 350;

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
        const padding = 24;
        const contentHeight = contentEl.scrollHeight;
        const controlsHeight =
          controlsEl && showControls ? controlsEl.scrollHeight + 12 : 0;

        Object.assign(contentEl.style, originalStyle);

        return topBar + contentHeight + controlsHeight + padding;
      }
    }

    const itemCount = items.length || 4;
    const rows = Math.ceil(itemCount / 2);
    const cardHeight = 140;
    const gap = 16;
    const padding = 32;
    const topBar = 60;
    const controlsHeight = 0;

    const calculatedHeight =
      topBar +
      rows * cardHeight +
      Math.max(0, rows - 1) * gap +
      padding +
      controlsHeight;

    return Math.max(calculatedHeight, 300);
  };

  const createTimeline = () => {
    if (!isMounted) return null;

    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(".card-nav-content", { opacity: 0, visibility: "hidden" });
    gsap.set(cardsRef.current.filter(Boolean), { y: 30, opacity: 0 });
    if (controlsRef.current && showControls) {
      gsap.set(controlsRef.current, { y: 20, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.5,
      ease: "power3.out",
    })
      .to(
        ".card-nav-content",
        {
          opacity: 1,
          visibility: "visible",
          duration: 0.2,
        },
        "-=0.3"
      )
      .to(
        cardsRef.current.filter(Boolean),
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.2"
      );

    if (controlsRef.current && showControls) {
      tl.to(
        controlsRef.current,
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
        "-=0.3"
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
  }, [ease, isMounted, showControls]);

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
        <nav className="card-nav block h-[60px] p-0 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-black/80 border border-gray-200/50 dark:border-gray-800/50">
          <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] pr-4 z-[2]">
            <div className="hamburger-menu group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 lg:order-1">
              <div className="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear" />
              <div className="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear" />
            </div>
            <div className="logo-container flex items-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 order-1 lg:order-2">
              <Link href={homeHref} className="no-underline">
                <span className="logo-text text-lg lg:text-xl font-bold text-black dark:text-white">
                  {logoText}
                </span>
              </Link>
            </div>
            {showControls && (
              <div className="desktop-controls hidden lg:flex items-center gap-3 order-3">
                <div className="p-1.5 rounded-xl">
                  <ModeToggle />
                </div>
                <div className="p-1.5 rounded-xl">
                  <LanguageSwitcher />
                </div>
                <Link href={contactHref}>
                  <Button
                    size="sm"
                    className="bg-black dark:bg-white text-white dark:text-black border border-black/20 dark:border-white/20"
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
          } block h-[60px] p-0 rounded-2xl shadow-2xl relative will-change-[height] backdrop-blur-xl bg-white/80 dark:bg-black/80 border border-gray-200/50 dark:border-gray-800/50`}
          style={{ backgroundColor: baseColor, overflow: "hidden" }}
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
                className={`hamburger-line w-[30px] h-[2px] bg-current transition-all duration-300 ease-out [transform-origin:50%_50%] ${
                  isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""
                } group-hover:opacity-70`}
              />
              <div
                className={`hamburger-line w-[30px] h-[2px] bg-current transition-all duration-300 ease-out [transform-origin:50%_50%] ${
                  isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""
                } group-hover:opacity-70`}
              />
            </div>

            <div className="logo-container flex items-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 order-1 lg:order-2">
              <Link href={homeHref} className="no-underline">
                <span className="logo-text text-lg lg:text-xl font-bold text-black dark:text-white hover:scale-105 transition-transform duration-300">
                  {logoText}
                </span>
              </Link>
            </div>

            {showControls && (
              <div className="desktop-controls hidden lg:flex items-center gap-3 order-3">
                <div className="p-1.5 rounded-xl">
                  <ModeToggle />
                </div>
                <div className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                  <LanguageSwitcher />
                </div>
                <Link href={contactHref}>
                  <Button
                    size="sm"
                    className="bg-black dark:bg-white text-white dark:text-black border border-black/20 dark:border-white/20 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-white/20 hover:scale-105"
                  >
                    {t ? t("nav.contact") : "Contact"}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div
            className={`card-nav-content absolute left-0 right-0 top-[60px] p-4 flex flex-col items-stretch gap-4 justify-start z-[1] opacity-0 invisible`}
            style={{
              visibility: isExpanded ? "visible" : "hidden",
              pointerEvents: isExpanded ? "auto" : "none",
            }}
          >
            <div className="nav-cards-container grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {items?.map((item, idx) => (
                <div
                  key={`${item.label}-${idx}`}
                  className={`nav-card select-none relative flex flex-col gap-3 p-5 rounded-2xl min-w-0 h-[140px] transition-all duration-500 hover:scale-[1.03] cursor-pointer backdrop-blur-sm ${
                    activeCard === idx
                      ? "ring-2 ring-offset-2 shadow-2xl scale-[1.02]"
                      : "shadow-md hover:shadow-xl"
                  }`}
                  ref={setCardRef(idx)}
                  style={
                    {
                      backgroundColor:
                        item.bgColor || (idx % 2 === 0 ? "white" : "#f5f5f5"),
                      color: item.textColor || "black",
                      "--tw-ring-color": item.textColor || "#000",
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setActiveCard(idx)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="nav-card-label font-bold tracking-tight text-[19px] flex-shrink-0 text-black dark:text-white">
                    {item.label}
                  </div>
                  <div className="nav-card-links mt-auto flex flex-col gap-2.5">
                    {item.links?.map((lnk, i) => (
                      <Link
                        key={`${lnk.label}-${i}`}
                        href={lnk.href}
                        download={lnk.download}
                        className="nav-card-link inline-flex items-center gap-2 no-underline cursor-pointer transition-all duration-300 hover:opacity-70 hover:translate-x-2 text-[14px] text-current font-semibold"
                        aria-label={lnk.ariaLabel}
                      >
                        <GoArrowUpRight
                          className="nav-card-link-icon shrink-0 w-4 h-4 text-black dark:text-white"
                          aria-hidden="true"
                        />
                        {lnk.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {showControls && (
              <div
                ref={controlsRef}
                className="mobile-controls lg:hidden flex items-center justify-center gap-3 mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-800/50"
              >
                <div className="p-1.5 rounded-xl">
                  <ModeToggle />
                </div>
                <div className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                  <LanguageSwitcher />
                </div>
                <Link href={contactHref}>
                  <Button
                    size="sm"
                    className="bg-black dark:bg-white text-white dark:text-black border border-black/20 dark:border-white/20 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-white/20 hover:scale-105"
                  >
                    {t ? t("nav.contact") : "Contact"}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-[98] bg-transparent">
        <nav className="relative flex h-20 items-center justify-around bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl mx-3 mb-3 border border-gray-200/50 dark:border-gray-800/50">
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
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-4 border-white dark:border-black bg-black dark:bg-white shadow-2xl shadow-black/20 dark:shadow-white/20 transition-all duration-300 hover:scale-110 hover:shadow-black/30 dark:hover:shadow-white/30 ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                    onClick={() => setActiveMobile(item.key)}
                  >
                    <Icon className="h-8 w-8 text-white dark:text-black" />
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
                className={`flex flex-col items-center justify-center gap-1 w-full h-full px-2 transition-all duration-300 ${
                  isActive
                    ? "text-black dark:text-white scale-105"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default CardNav;
