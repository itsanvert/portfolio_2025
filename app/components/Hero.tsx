"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { useTranslation } from "react-i18next";
import FlipWord from "@/components/ui/flip-words";
import SlidingLogoMarquee from "../src/components/sliding-logo-marquee";
import { Download, Send } from "lucide-react";
import GradientBlinds from "@/components/gradient";

interface HeroSectionProps {
  className?: string;
}

export function HeroSectionOne({ className }: HeroSectionProps) {
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.language === "km";
  const flipWords = t("flipWords", { returnObjects: true });
  const words = Array.isArray(flipWords) ? flipWords : [];

  // Debug logging
  React.useEffect(() => {
    console.log("Hero component - Current language:", i18n.language);
    console.log("Hero component - FlipWords from translation:", flipWords);
    console.log("Hero component - Processed words array:", words);
  }, [i18n.language, flipWords, words]);

  // Dark-optimized tech icons
  const techIcons = [
    {
      id: "laravel",
      content: (
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-red-500/50 transition-all duration-300 group">
          <Image
            src="/tech-icons/laravel.svg"
            alt="Laravel"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 brightness-0 invert"
          />
        </div>
      ),
    },
    {
      id: "springboot",
      content: (
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-green-500/50 transition-all duration-300 group">
          <Image
            src="/tech-icons/spring-boot.svg"
            alt="Spring Boot"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 brightness-0 invert"
          />
        </div>
      ),
    },
    {
      id: "react",
      content: (
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-blue-400/50 transition-all duration-300 group">
          <Image
            src="/tech-icons/react.svg"
            alt="React"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: "nextjs",
      content: (
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-white/50 transition-all duration-300 group">
          <Image
            src="/tech-icons/nextjs.svg"
            alt="Next.js"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 brightness-0 invert"
          />
        </div>
      ),
    },
    {
      id: "dotnet",
      content: (
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-purple-500/50 transition-all duration-300 group">
          <Image
            src="/tech-icons/net-framework.svg"
            alt=".NET Framework"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 brightness-0 invert"
          />
        </div>
      ),
    },
    {
      id: "tailwind",
      content: (
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-cyan-400/50 transition-all duration-300 group">
          <Image
            src="/tech-icons/tailwind.svg"
            alt="Tailwind CSS"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: "vuejs",
      content: (
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-green-400/50 transition-all duration-300 group">
          <Image
            src="/tech-icons/vue.svg"
            alt="Vue.js"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: "flutter",
      content: (
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-blue-300/50 transition-all duration-300 group">
          <Image
            src="/tech-icons/flutter.svg"
            alt="Flutter"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
    },
    {
      id: "mysql",
      content: (
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-orange-400/50 transition-all duration-300 group">
          <Image
            src="/tech-icons/mysql.svg"
            alt="MySQL"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 brightness-0 invert"
          />
        </div>
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -3,
      transition: {
        duration: 0.2,
        ease: easeOut,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full mix-blend-screen blur-3xl opacity-60 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-full mix-blend-screen blur-3xl opacity-60 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full mix-blend-screen blur-3xl opacity-60 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Spline Viewer Script */}
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.10.53/build/spline-viewer.js"
        strategy="beforeInteractive"
      />

      <motion.div
        className={`relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 z-10 ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="banner"
        aria-labelledby="hero-heading"
      >
        <div className="w-full space-y-8 lg:space-y-12">
          {/* Main Heading */}
          <motion.h1
            className={`mx-auto max-w-5xl text-center font-bold text-white transition-colors duration-300 ${
              isKhmer
                ? "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-relaxed font-khmer"
                : "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight font-display"
            }`}
            variants={itemVariants}
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
                  className="inline-block mr-2 sm:mr-3 hover:text-cyan-400 transition-colors duration-200 cursor-default"
                >
                  {word}
                </motion.span>
              ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className={`mx-auto max-w-2xl text-center font-medium text-gray-300 transition-colors duration-300 ${
              isKhmer
                ? "text-base sm:text-lg lg:text-xl font-khmer leading-relaxed"
                : "text-lg sm:text-xl lg:text-2xl leading-relaxed"
            }`}
          >
            {t("hero.description")}
          </motion.p>

          {/* Flip Words */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <FlipWord
              words={words}
              className={`text-center font-semibold bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 transition-all duration-300 ${
                isKhmer
                  ? "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-khmer"
                  : "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display"
              }`}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {/* Download Resume Button */}
            <motion.a
              href="/resume/resume.pdf"
              download
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="group relative w-full sm:w-auto min-w-[220px] overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-2xl shadow-blue-500/25 hover:shadow-3xl hover:shadow-blue-500/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={t("hero.resume")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                {t("hero.resume")}
              </span>
            </motion.a>

            {/* Contact Button */}
            <motion.a
              href="https://t.me/itsanvert"
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="group relative w-full sm:w-auto min-w-[220px] overflow-hidden rounded-2xl border-2 border-gray-600/50 bg-gray-800/50 backdrop-blur-sm px-8 py-4 font-bold text-gray-100 shadow-xl shadow-gray-900/20 hover:bg-gray-700/60 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={t("hero.cta")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                {t("hero.cta")}
              </span>
            </motion.a>
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 lg:space-y-8"
          >
            <div className="text-center">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                {t("hero.techStack", "Technologies I Work With")}
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent rounded-3xl blur-xl"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl shadow-gray-900/40">
                <SlidingLogoMarquee
                  items={techIcons}
                  speed={45}
                  height="100px"
                  gap="1.5rem sm:2rem"
                  enableBlur={true}
                  blurIntensity={1}
                  pauseOnHover={true}
                  showControls={false}
                  className="tech-marquee"
                />
              </div>
            </div>
          </motion.div>

          {/* 3D Interactive Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 lg:space-y-8"
          >
            <div className="text-center">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                Interactive 3D Experience
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative w-full h-80 sm:h-96 lg:h-[500px] xl:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/60 border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm">
                {React.createElement("spline-viewer", {
                  url: "https://prod.spline.design/Pq8vzJuux975pWaf/scene.splinecode",
                  style: { width: "100%", height: "100%" },
                  className: "rounded-3xl",
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
