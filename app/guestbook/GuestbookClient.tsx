"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Form } from "../components/Form";
import { cn } from "@/lib/utils";

// Custom InfiniteMovingCards with image support
function InfiniteMovingCardsWithImage({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--animation-direction",
          direction === "left" ? "forwards" : "reverse"
        );
        if (speed === "fast") {
          containerRef.current.style.setProperty("--animation-duration", "20s");
        } else if (speed === "normal") {
          containerRef.current.style.setProperty("--animation-duration", "40s");
        } else {
          containerRef.current.style.setProperty("--animation-duration", "80s");
        }
      }
      setStart(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-zinc-100 to-zinc-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 shadow-xl px-8 py-6 md:w-[450px] transition-transform hover:scale-105 hover:shadow-2xl"
            key={item.name + idx}
          >
            <blockquote>
              <div className="flex items-center gap-4 mb-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-md"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-foreground">
                    {item.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {item.title}
                  </span>
                </div>
              </div>
              <span className="block mt-2 text-xl leading-relaxed font-medium text-neutral-800 dark:text-gray-100">
                {item.quote}
              </span>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GuestbookClient({
  user,
  entries,
}: {
  user: any;
  entries: any[];
}) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Map guestbook entries to InfiniteMovingCardsWithImage format
  const items = entries.map((item) => ({
    quote: item.message,
    name: item.User?.firstname || "",
    title: "Guestbook User",
    image: item.User?.profileimage || undefined,
  }));

  return (
    <section className="max-w-7xl w-full px-4 md:px-8 mx-auto">
      <h1 className="text-4xl font-semibold lg:text-5xl pt-5">
        {t("guestbook.title")}
      </h1>
      <p className="leading-7 text-muted-foreground mt-2">
        {t("guestbook.description")}
      </p>
      <div className="mt-5">
        <LogoutLink>{t("guestbook.logout")}</LogoutLink>
      </div>
      <Card className="mt-10">
        <CardHeader className="flex flex-col w-full">
          <Label className="mb-1">{t("guestbook.messageLabel")}</Label>
          {user ? (
            <Form />
          ) : (
            <div className="flex justify-between gap-4 flex-col md:flex-row">
              <Input type="text" placeholder={t("guestbook.placeholder")} />
              <RegisterLink>
                <Button>{t("guestbook.signForFree")}</Button>
              </RegisterLink>
            </div>
          )}
          <div className="pt-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item, idx) => (
                <div
                  className="relative w-full rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-zinc-100 to-zinc-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 shadow-xl px-8 py-6 transition-transform hover:scale-105 hover:shadow-2xl"
                  key={item.name + idx}
                >
                  <blockquote>
                    <div className="flex items-center gap-4 mb-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-md"
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="font-bold text-lg text-foreground">
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {item.title}
                        </span>
                      </div>
                    </div>
                    <span className="block mt-2 text-xl leading-relaxed font-medium text-neutral-800 dark:text-gray-100">
                      {item.quote}
                    </span>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
}
