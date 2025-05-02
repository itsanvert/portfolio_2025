"use client";
import React from "react";

import Image from "next/image";
import me from "../../public/me.jpg";
import { useTranslation } from "react-i18next";
import "@/lib/181n";

export function Hero() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="col-span-1 lg:col-span-2 h-full bg-muted min-h-[500px] lg:min-h-[00px] rounded-2xl p-10">
        <h1 className="text-4xl lg:text-6xl font-bold text-foreground tracking-tight ">
          {t("hero.greeting")}
        </h1>
        <h1 className="text-4xl lg:text-6xl font-semibold mt-3 text-foreground/90 tracking-tight">
          {t("hero.description")}
        </h1>

        <a
          href="mailto:itsanvert@gmail.com"
          className="relative inline-block text-lg group mt-8"
        >
          <span className="relative z-10 block px-6 py-3 overflow-hidden font-bold leading-tight transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-background">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-background"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
            <span className="relative">{t("hero.cta")}</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </a>
      </div>

      <Image
        src={me}
        alt={t("hero.alt")}
        className="col-span-1 h-[500px] object-cover rounded-2xl bg-muted hover:scale-[1.02] transition-transform duration-300"
        priority
      />
    </div>
  );
}
