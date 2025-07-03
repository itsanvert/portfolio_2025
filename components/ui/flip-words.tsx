"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
  pauseOnHover = true,
}: {
  words: string[];
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
}) => {
  const [currentWord, setCurrentWord] = useState(() => words[0] || "");
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = useCallback(() => {
    if (words.length <= 1 || isAnimating) return;
    const currentIndex = words.indexOf(currentWord);
    const nextIndex = (currentIndex + 1) % words.length;
    setCurrentWord(words[nextIndex]);
    setIsAnimating(true);
  }, [currentWord, words, isAnimating]);

  useEffect(() => {
    if (!isAnimating && words.length > 0) {
      timeoutRef.current = setTimeout(() => {
        startAnimation();
      }, duration);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isAnimating, duration, startAnimation, words.length]);

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  const handleMouseEnter = () => pauseOnHover && setIsAnimating(true);
  const handleMouseLeave = () => !isAnimating && startAnimation();

  // Define transition with proper Framer Motion type
  const transition: Transition = {
    type: "spring", // Explicitly set to "spring" type
    stiffness: 120,
    damping: 14,
    duration: 0.5, // Duration is optional for spring, but included for consistency
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -50,
          x: 50,
          filter: "blur(6px)",
          scale: 1.8,
          position: "absolute",
        }}
        transition={transition}
        className={cn(
          "z-10 inline-block relative text-left px-2",
          "font-khmer text-black dark:text-white",
          className
        )}
        key={currentWord}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-live="polite"
        aria-label={`Current word: ${currentWord}`}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={`${word}-${wordIndex}`}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.25,
              duration: 0.35,
              ease: "easeOut",
            }}
            className="inline-block whitespace-nowrap"
          >
            {word}
            <span className="inline-block"> </span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
