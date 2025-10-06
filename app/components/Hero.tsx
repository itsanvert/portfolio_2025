"use client";

import React, { useMemo } from "react";
import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import FlipWords from "@/components/ui/flip-words";
import SlidingLogoMarquee from "../src/components/sliding-logo-marquee";

interface HeroSectionProps {
  className?: string;
}

export function HeroSectionOne({ className }: HeroSectionProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Language detection
  const isKhmer = currentLanguage === "km";
  const isChinese =
    currentLanguage === "zh" || currentLanguage.startsWith("zh-");
  const isAsianLanguage = isKhmer || isChinese;

  // Get flip words with fallback
  const flipWordsData = t("flipWords", { returnObjects: true });
  const words = useMemo(() => {
    if (Array.isArray(flipWordsData) && flipWordsData.length > 0) {
      return flipWordsData;
    }
    return ["Web Applications", "Mobile Apps", "API Solutions"];
  }, [flipWordsData]);

  // Dynamic responsive classes based on language
  const headingClasses = useMemo(() => {
    if (isKhmer) {
      return "text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-khmer";
    }
    if (isChinese) {
      return "text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight font-chinese";
    }
    return "text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight";
  }, [isKhmer, isChinese]);

  const flipWordsClasses = useMemo(() => {
    if (isKhmer) {
      return "text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-khmer";
    }
    if (isChinese) {
      return "text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight font-chinese";
    }
    return "text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight";
  }, [isKhmer, isChinese]);

  const descriptionClasses = useMemo(() => {
    if (isAsianLanguage) {
      return "text-lg sm:text-xl md:text-2xl font-khmer";
    }
    return "text-base sm:text-lg md:text-xl";
  }, [isAsianLanguage]);

  // Tech icons configuration
  const techIcons = useMemo(
    () => [
      {
        id: "laravel",
        content: (
          <div className="flex items-center justify-center w-20 h-20 p-3">
            <Image
              src="/tech-icons/laravel.svg"
              alt="Laravel"
              width={70}
              height={70}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ),
      },
      {
        id: "springboot",
        content: (
          <div className="flex items-center justify-center w-20 h-20 p-3">
            <Image
              src="/tech-icons/spring-boot.svg"
              alt="Spring Boot"
              width={70}
              height={70}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ),
      },
      {
        id: "react",
        content: (
          <div className="flex items-center justify-center w-20 h-20 p-3">
            <Image
              src="/tech-icons/react.svg"
              alt="React"
              width={70}
              height={70}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ),
      },
      {
        id: "nextjs",
        content: (
          <div className="flex items-center justify-center w-20 h-20 p-3">
            <Image
              src="/tech-icons/nextjs.svg"
              alt="Next.js"
              width={70}
              height={70}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ),
      },
      {
        id: "dotnet",
        content: (
          <div className="flex items-center justify-center w-20 h-20 p-3">
            <Image
              src="/tech-icons/net-framework.svg"
              alt=".NET"
              width={70}
              height={70}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ),
      },
      {
        id: "tailwind",
        content: (
          <div className="flex items-center justify-center w-20 h-20 p-3">
            <Image
              src="/tech-icons/tailwind.svg"
              alt="Tailwind CSS"
              width={70}
              height={70}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ),
      },
      {
        id: "vuejs",
        content: (
          <div className="flex items-center justify-center w-20 h-20 p-3">
            <Image
              src="/tech-icons/vue.svg"
              alt="Vue.js"
              width={70}
              height={70}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ),
      },
      {
        id: "flutter",
        content: (
          <div className="flex items-center justify-center w-20 h-20 p-3">
            <Image
              src="/tech-icons/flutter.svg"
              alt="Flutter"
              width={70}
              height={70}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ),
      },
      {
        id: "mysql",
        content: (
          <div className="flex items-center justify-center w-20 h-20 p-3">
            <Image
              src="/tech-icons/mysql.svg"
              alt="MySQL"
              width={70}
              height={70}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ),
      },
    ],
    []
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.06,
        ease: easeOut,
      },
    }),
  };

  return (
    <motion.div
      className={cn(
        "relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="banner"
      aria-labelledby="hero-heading"
    >
      <div className="w-full py-16 sm:py-20 md:py-32 lg:py-40">
        {/* Main Heading with word animation */}
        <motion.h1
          className={cn(
            "relative z-10 mx-auto max-w-5xl text-center font-black tracking-tight",
            "text-black dark:text-white",
            headingClasses
          )}
          variants={itemVariants}
          id="hero-heading"
        >
          {t("hero.greeting")
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={`word-${index}-${word}`}
                custom={index}
                variants={wordVariants}
                className="inline-block mr-2 sm:mr-3 md:mr-4"
              >
                {word}
              </motion.span>
            ))}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className={cn(
            "relative z-10 mx-auto max-w-2xl py-6 sm:py-8 text-center font-medium",
            "text-black/70 dark:text-white/70",
            descriptionClasses
          )}
        >
          {t("hero.description")}
        </motion.p>

        {/* FlipWords Section */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 flex justify-center items-center min-h-[80px] sm:min-h-[100px] md:min-h-[120px] py-4"
        >
          <FlipWords
            words={words}
            duration={3000}
            className={cn(
              "font-black tracking-tight",
              "text-black dark:text-white",
              flipWordsClasses
            )}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto px-4"
        >
          <motion.a
            href="/resume/resume.pdf"
            download
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group w-full sm:w-auto min-w-[200px] px-6 sm:px-8 py-3 sm:py-4 text-center font-bold text-base sm:text-lg
                     bg-black dark:bg-white 
                     text-white dark:text-black
                     rounded-none border-2 border-black dark:border-white
                     transition-all duration-200
                     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]
                     sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:sm:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]
                     active:shadow-none"
            aria-label={t("hero.resume")}
          >
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className={isAsianLanguage ? "font-khmer" : ""}>
                {t("hero.resume")}
              </span>
            </span>
          </motion.a>

          <motion.a
            href="https://t.me/itsanvert"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group w-full sm:w-auto min-w-[200px] px-6 sm:px-8 py-3 sm:py-4 text-center font-bold text-base sm:text-lg
                     bg-white dark:bg-black
                     text-black dark:text-white
                     rounded-none border-2 border-black dark:border-white
                     transition-all duration-200
                     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]
                     sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:sm:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]
                     active:shadow-none"
            aria-label={t("hero.cta")}
          >
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span className={isAsianLanguage ? "font-khmer" : ""}>
                {t("hero.cta")}
              </span>
            </span>
          </motion.a>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div variants={itemVariants} className="mt-16 sm:mt-20 md:mt-24">
          <div className="text-center mb-8 sm:mb-10">
            <motion.div
              className="inline-block mb-4"
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: easeOut }}
            >
              <div className="h-[2px] bg-black dark:bg-white" />
            </motion.div>
            <h2
              className={cn(
                "text-xs font-black uppercase text-black/60 dark:text-white/60",
                isAsianLanguage
                  ? "tracking-wider font-khmer"
                  : "tracking-[0.3em]"
              )}
            >
              {t("hero.techStack", "Technologies I Work With")}
            </h2>
          </div>

          <div className="relative -mx-4 sm:-mx-6">
            <SlidingLogoMarquee
              items={techIcons}
              speed={35}
              height="140px"
              gap="2rem"
              enableBlur={true}
              blurIntensity={3}
              pauseOnHover={true}
              showControls={false}
              className="tech-marquee"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
