"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import FlipWords from "@/components/ui/flip-words";
import SlidingLogoMarquee from "../src/components/sliding-logo-marquee";
import { GlobeDemo } from "./GlobeDemo";

interface HeroSectionProps {
  className?: string;
}

export function HeroSectionOne({ className }: HeroSectionProps) {
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.language === "km";
  const flipWords = t("flipWords", { returnObjects: true });
  const words = Array.isArray(flipWords) ? flipWords : [];

  const headingClasses = isKhmer
    ? "text-4xl lg:text-6xl leading-snug font-khmer"
    : "text-5xl lg:text-7xl leading-tight";
  const subheadingClasses = isKhmer
    ? "text-2xl lg:text-4xl font-khmer"
    : "text-3xl lg:text-5xl font-semibold";

  // Pass dynamic classes to FlipWords for consistent styling
  const flipWordsClasses = isKhmer
    ? "text-4xl lg:text-6xl leading-snug font-khmer"
    : "text-5xl lg:text-7xl leading-tight";

  // Tech icons for SlidingLogoMarquee component with standardized containers
  const techIcons = [
    {
      id: "laravel",
      content: (
        <div className="flex items-center justify-center w-16 h-16 p-2">
          <Image
            src="/tech-icons/laravel.svg"
            alt="Laravel - PHP Framework"
            width={60}
            height={60}
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: "springboot",
      content: (
        <div className="flex items-center justify-center w-16 h-16 p-2">
          <Image
            src="/tech-icons/spring-boot.svg"
            alt="Spring Boot - Java Framework"
            width={60}
            height={60}
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: "react",
      content: (
        <div className="flex items-center justify-center w-16 h-16 p-2">
          <Image
            src="/tech-icons/react.svg"
            alt="React - JavaScript Library"
            width={60}
            height={60}
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: "nextjs",
      content: (
        <div className="flex items-center justify-center w-16 h-16 p-2">
          <Image
            src="/tech-icons/nextjs.svg"
            alt="Next.js - React Framework"
            width={60}
            height={60}
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: ".net",
      content: (
        <div className="flex items-center justify-center w-16 h-16 p-2">
          <Image
            src="/tech-icons/net-framework.svg"
            alt=".NET - Framework"
            width={60}
            height={60}
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: "tailwind",
      content: (
        <div className="flex items-center justify-center w-16 h-16 p-2">
          <Image
            src="/tech-icons/tailwind.svg"
            alt="Tailwind CSS - Utility Framework"
            width={60}
            height={60}
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: "vuejs",
      content: (
        <div className="flex items-center justify-center w-16 h-16 p-2">
          <Image
            src="/tech-icons/vue.svg"
            alt="Vue.js - JavaScript Framework"
            width={60}
            height={60}
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: "flutter",
      content: (
        <div className="flex items-center justify-center w-16 h-16 p-2">
          <Image
            src="/tech-icons/flutter.svg"
            alt="Flutter - Mobile App Framework"
            width={60}
            height={60}
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: "mysql",
      content: (
        <div className="flex items-center justify-center w-16 h-16 p-2">
          <Image
            src="/tech-icons/mysql.svg"
            alt="MySQL - Database"
            width={60}
            height={60}
            className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.2,
        ease: easeOut,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <motion.div
      className={cn(
        "relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center px-4",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="banner"
      aria-labelledby="hero-heading"
    >
      <div className="px-4 py-10 md:py-20 lg:py-32">
        <motion.h1
          className={cn(
            "relative z-10 mx-auto max-w-4xl text-center font-bold text-slate-700 dark:text-slate-300",
            headingClasses
          )}
          variants={itemVariants}
          animate="visible"
          id="hero-heading"
        >
          {t("hero.greeting")
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: easeOut,
                    },
                  },
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={cn(
            "relative z-10 mx-auto max-w-xl py-4 text-center font-normal text-neutral-600 dark:text-neutral-400",
            isKhmer ? "text-lg md:text-xl font-khmer" : "text-base md:text-lg"
          )}
        >
          {t("hero.description")}
        </motion.p>

        {/* Enhanced FlipWords */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center mt-2"
        >
          <FlipWords
            words={words}
            className={cn(
              "inline-block align-middle text-black dark:text-white font-semibold",
              flipWordsClasses
            )}
          />
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Download Resume Button */}
          <motion.a
            href="/resume/resume.pdf"
            download
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="group relative w-60 overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 to-black px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:from-white dark:to-gray-100 dark:text-black dark:hover:from-gray-100 dark:hover:to-white flex items-center justify-center"
            aria-label={t("hero.resume")}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {t("hero.resume")}
            </span>
          </motion.a>

          {/* Contact Telegram Button */}
          <motion.a
            href="https://t.me/itsanvert"
            target="_blank"
            rel="noopener noreferrer"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="group relative w-60 overflow-hidden rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:bg-gray-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900 flex items-center justify-center"
            aria-label={t("hero.cta")}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              {t("hero.cta")}
            </span>
          </motion.a>
        </motion.div>

        {/* Enhanced Tech Stack Marquee */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t("hero.techStack", "Technologies I Work With")}
            </p>
          </div>
          {/* <GlobeDemo /> */}
          <SlidingLogoMarquee
            items={techIcons}
            speed={40}
            height="120px"
            gap="1rem md:1.5rem"
            enableBlur={true}
            blurIntensity={2}
            pauseOnHover={true}
            showControls={false}
            className="tech-marquee"
          />
        </motion.div>

        {/* Enhanced Project Showcase */}
      </div>
    </motion.div>
  );
}