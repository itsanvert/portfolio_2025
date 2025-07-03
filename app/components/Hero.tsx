"use client";
import React from "react";
import Image from "next/image";
import me from "../../public/me.jpg";
import { useTranslation } from "react-i18next";
import "@/lib/181n";
import { FlipWords } from "@/components/ui/flip-words";
import { cn } from "@/lib/utils";

export function Hero() {
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

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mt-6">
      {/* Text Section */}
      <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-white to-gray-200 dark:from-black dark:to-gray-800 min-h-[420px] lg:min-h-[520px] rounded-3xl p-10 flex flex-col justify-center shadow-lg">
        <h1
          className={`font-extrabold text-black dark:text-white tracking-tight mb-2 animate-fade-in ${headingClasses}`}
        >
          {t("hero.greeting")}{" "}
        </h1>

        <h2
          className={`mt-2 text-black/80 dark:text-white/80 tracking-tight animate-fade-in delay-100 ${subheadingClasses}`}
        >
          {t("hero.description")}
          <FlipWords
            words={words}
            className={cn(
              "inline-block align-middle text-black dark:text-white"
            )}
          />
        </h2>

        <a
          href="https://t.me/itsanvert"
          className="relative inline-block text-lg group mt-10 w-fit animate-fade-in delay-200"
        >
          <span className="relative z-10 block px-8 py-3 font-bold border-2 border-black dark:border-white rounded-xl overflow-hidden leading-tight transition-colors duration-300 ease-out group-hover:text-white dark:group-hover:text-black shadow-md">
            <span className="absolute inset-0 bg-white dark:bg-black rounded-xl" />
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black dark:bg-white group-hover:-rotate-180 ease" />
            <span className="relative">{t("hero.cta")}</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 bg-black dark:bg-white rounded-xl transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-xl"
          />
        </a>
      </div>

      {/* Image Section */}
      <div className="col-span-1 relative h-[420px] lg:h-[520px] flex items-center justify-center">
        <Image
          src={me}
          alt={t("hero.alt")}
          fill
          priority
          className="object-cover rounded-3xl bg-muted filter grayscale hover:filter-none border-4 border-black dark:border-white shadow-lg hover:-translate-y-1 transition-all duration-300 relative z-10"
        />
      </div>
    </section>
  );
}
