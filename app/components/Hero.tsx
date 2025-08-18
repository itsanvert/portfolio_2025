"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import FlipWords from "@/components/ui/flip-words";

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
          className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300"
          variants={itemVariants}
          animate="visible"
          id="hero-heading"
        >
          {t("hero.greeting") // <-- Use translation key
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                variants={itemVariants}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-base font-normal text-neutral-600 md:text-lg dark:text-neutral-400"
        >
          {t("hero.description")}
        </motion.p>
        {/* Move FlipWords outside <p> */}
        <div className="flex justify-center items-center mt-2">
          <FlipWords
            words={words}
            className={cn(
              "inline-block align-middle text-black dark:text-white"
            )}
          />
        </div>

        <motion.div
          variants={itemVariants}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Download Resume Button */}
          <a
            href="/resume.pdf"
            download
            className="w-60 transform rounded-lg bg-black px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200 flex items-center justify-center"
            aria-label={t("hero.resume")}
          >
            {t("hero.resume")}
          </a>
          {/* Contact Telegram Button */}
          <a
            href="https://t.me/itsanvert"
            target="_blank"
            rel="noopener noreferrer"
            className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900 flex items-center justify-center"
            aria-label={t("hero.cta")}
          >
            {t("hero.cta")}
          </a>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="relative z-10 mt-12 sm:mt-16 md:mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <Image
              src="/img/project/p1.png"
              alt={t("hero.imageAlt")} // <-- Use translation key for alt text
              className="aspect-[16/9] h-auto w-full object-cover"
              width={1000}
              height={563}
              priority={true}
              onError={(e) => {
                e.currentTarget.src = "/fallback-image.webp";
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
