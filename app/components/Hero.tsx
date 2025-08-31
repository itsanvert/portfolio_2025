"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { useTranslation } from "react-i18next";
import FlipWord from "@/components/ui/flip-words";
import SlidingLogoMarquee from "../src/components/sliding-logo-marquee";
import { Download, Send } from "lucide-react";

interface HeroSectionProps {
  className?: string;
}

export function HeroSectionOne({ className }: HeroSectionProps) {
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.language === "km";
  const flipWords = t("flipWords", { returnObjects: true });
  const words = Array.isArray(flipWords) ? flipWords : [];

  // Tech icons with masks, tooltips, and origin information
  // Icons sourced from official brand guidelines and open-source libraries
  const techIcons = [
    {
      id: "laravel",
      name: "Laravel",
      origin: "Official Laravel Brand Assets",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-red-500/50 transition-all duration-300 group overflow-hidden"
          title="Laravel"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Laravel
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/laravel.svg"
            alt="Laravel - PHP Web Framework"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 filter brightness-0 invert-[1] drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "springboot",
      name: "Spring Boot",
      origin: "Official Spring Brand Guidelines",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-green-500/50 transition-all duration-300 group overflow-hidden"
          title="Spring Boot"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Spring Boot
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/spring-boot.svg"
            alt="Spring Boot - Java Framework"
            width={40}
            height={40}
          />
        </div>
      ),
    },
    {
      id: "react",
      name: "React",
      origin: "Official React Brand Resources",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-blue-400/50 transition-all duration-300 group overflow-hidden"
          title="React"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            React
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/react.svg"
            alt="React - JavaScript Library"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "nextjs",
      name: "Next.js",
      origin: "Official Vercel/Next.js Brand Kit",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-white/50 transition-all duration-300 group overflow-hidden"
          title="Next.js"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Next.js
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-gray-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/nextjs.svg"
            alt="Next.js - React Framework"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 filter brightness-0 invert-[1] drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "dotnet",
      name: ".NET Framework",
      origin: "Official Microsoft Brand Assets",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
          title=".NET Framework"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            .NET Framework
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/net-framework.svg"
            alt=".NET Framework - Microsoft Platform"
            width={40}
            height={40}
          />
        </div>
      ),
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      origin: "Official Tailwind Labs Brand",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-cyan-400/50 transition-all duration-300 group overflow-hidden"
          title="Tailwind CSS"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Tailwind CSS
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/tailwind.svg"
            alt="Tailwind CSS - Utility-First Framework"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "vuejs",
      name: "Vue.js",
      origin: "Official Vue.js Brand Assets",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-green-400/50 transition-all duration-300 group overflow-hidden"
          title="Vue.js"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Vue.js
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/vue.svg"
            alt="Vue.js - Progressive JavaScript Framework"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "flutter",
      name: "Flutter",
      origin: "Official Google Flutter Brand",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-blue-300/50 transition-all duration-300 group overflow-hidden"
          title="Flutter"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Flutter
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-sky-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-blue-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/flutter.svg"
            alt="Flutter - Cross-Platform Framework"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "mysql",
      name: "MySQL",
      origin: "Official Oracle MySQL Brand",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-orange-400/50 transition-all duration-300 group overflow-hidden"
          title="MySQL"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            MySQL
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/mysql.svg"
            alt="MySQL - Relational Database"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 filter brightness-0 invert-[1] drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "nodejs",
      name: "Node.js",
      origin: "Official Node.js Foundation Brand",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-green-400/50 transition-all duration-300 group overflow-hidden"
          title="Node.js"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Node.js
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-lime-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/node.svg"
            alt="Node.js - JavaScript Runtime"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "docker",
      name: "Docker",
      origin: "Official Docker Inc. Brand Assets",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-blue-400/50 transition-all duration-300 group overflow-hidden"
          title="Docker"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Docker
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/docker.svg"
            alt="Docker - Containerization Platform"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "prisma",
      name: "Prisma",
      origin: "Official Prisma Brand Guidelines",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-indigo-400/50 transition-all duration-300 group overflow-hidden"
          title="Prisma"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Prisma
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/prisma.svg"
            alt="Prisma - Database ORM"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 filter brightness-0 invert-[1] drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "github",
      name: "GitHub",
      origin: "Official GitHub Brand Assets",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-gray-400/50 transition-all duration-300 group overflow-hidden"
          title="GitHub"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            GitHub
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-slate-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/github.svg"
            alt="GitHub - Version Control Platform"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 filter brightness-0 invert-[1] drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "figma",
      name: "Figma",
      origin: "Official Figma Brand Resources",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden"
          title="Figma"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Figma
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/figma.svg"
            alt="Figma - Design & Prototyping Tool"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "vercel",
      name: "Vercel",
      origin: "Official Vercel Brand Kit",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-white/50 transition-all duration-300 group overflow-hidden"
          title="Vercel"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Vercel
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-gray-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/vercel.svg"
            alt="Vercel - Deployment Platform"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 filter brightness-0 invert-[1] drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "supabase",
      name: "Supabase",
      origin: "Official Supabase Brand Assets",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-green-400/50 transition-all duration-300 group overflow-hidden"
          title="Supabase"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Supabase
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/supabase.svg"
            alt="Supabase - Backend-as-a-Service"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "sqlserver",
      name: "SQL Server",
      origin: "Official Microsoft Brand Assets",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-red-400/50 transition-all duration-300 group overflow-hidden"
          title="SQL Server"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            SQL Server
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/sqlserver.svg"
            alt="SQL Server - Microsoft Database"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 filter brightness-0 invert-[1] drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "framer",
      name: "Framer",
      origin: "Official Framer Brand Guidelines",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-pink-400/50 transition-all duration-300 group overflow-hidden"
          title="Framer"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Framer
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-rose-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/framer.svg"
            alt="Framer - Design & Prototyping"
            width={40}
            height={40}
          />
        </div>
      ),
    },
    {
      id: "sanity",
      name: "Sanity",
      origin: "Official Sanity.io Brand Assets",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-red-400/50 transition-all duration-300 group overflow-hidden"
          title="Sanity"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Sanity
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/sanity.svg"
            alt="Sanity - Headless CMS"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-lg"
          />
        </div>
      ),
    },
    {
      id: "filament",
      name: "Filament",
      origin: "Official Filament PHP Brand",
      content: (
        <div
          className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/80 hover:border-orange-400/50 transition-all duration-300 group overflow-hidden"
          title="Filament"
        >
          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg border border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-xl">
            Filament
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          <div
            className="absolute inset-0 bg-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
          <Image
            src="/tech-icons/filament.svg"
            alt="Filament - Laravel Admin Panel"
            width={40}
            height={40}
            className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-200 filter brightness-0 invert-[1] drop-shadow-lg"
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Additional animated stars for hero section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index to avoid hydration mismatch
          const seed = i * 12345; // Simple seed based on index
          const pseudoRandom1 = ((seed * 9301 + 49297) % 233280) / 233280;
          const pseudoRandom2 = (((seed + 1) * 9301 + 49297) % 233280) / 233280;
          const pseudoRandom3 = (((seed + 2) * 9301 + 49297) % 233280) / 233280;
          const pseudoRandom4 = (((seed + 3) * 9301 + 49297) % 233280) / 233280;

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${pseudoRandom1 * 100}%`,
                top: `${pseudoRandom2 * 100}%`,
                animationDelay: `${pseudoRandom3 * 3}s`,
                animationDuration: `${2 + pseudoRandom4 * 3}s`,
              }}
            ></div>
          );
        })}
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
              <p className="text-xs text-gray-500 mt-2">
                Icons sourced from official brand guidelines and open-source
                libraries
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
