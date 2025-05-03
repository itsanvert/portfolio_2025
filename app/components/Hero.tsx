"use client";
import React from "react";
import Image from "next/image";
import me from "../../public/me.jpg";
import { useTranslation } from "react-i18next";
import "@/lib/181n";

export function Hero() {
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.language === "km";

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mt-6">
      {/* Text Section */}
      <div className="col-span-1 lg:col-span-2 h-full bg-gradient-to-br from-muted to-background min-h-[420px] lg:min-h-[520px] rounded-3xl p-10 flex flex-col justify-center shadow-lg">
        <h1
          className={`font-extrabold text-foreground tracking-tight mb-2 ${
            isKhmer
              ? "text-4xl lg:text-6xl leading-snug font-khmer"
              : "text-5xl lg:text-7xl leading-tight"
          } animate-fade-in`}
        >
          {t("hero.greeting")}
        </h1>
        <h2
          className={`mt-2 text-foreground/80 tracking-tight ${
            isKhmer
              ? "text-2xl lg:text-4xl font-khmer"
              : "text-3xl lg:text-5xl font-semibold"
          } animate-fade-in delay-100`}
        >
          {t("hero.description")}
        </h2>

        <a
          href="https://t.me/itsanvert"
          className="relative inline-block text-lg group mt-10 w-fit animate-fade-in delay-200"
        >
          <span className="relative z-10 block px-8 py-3 overflow-hidden font-bold leading-tight transition-colors duration-300 ease-out border-2 border-primary rounded-xl group-hover:text-background shadow-md">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-xl bg-background"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
            <span className="relative">{t("hero.cta")}</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-xl group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-xl"
          ></span>
        </a>
      </div>

      {/* Image Section */}
      <div className="col-span-1 relative h-[420px] lg:h-[520px] flex items-center justify-center">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/10 to-transparent z-0" />
        <Image
          src={me}
          alt={t("hero.alt")}
          className="object-cover rounded-3xl bg-muted hover:scale-[1.03] transition-transform duration-300 shadow-xl relative z-10"
          fill
          priority
        />
      </div>
    </section>
  );
}
