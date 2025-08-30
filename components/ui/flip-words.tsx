"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";

interface FlipWordProps {
  words: string[];
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const FlipWord: React.FC<FlipWordProps> = ({
  words,
  duration = 3000,
  className = "",
  style = {},
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we have valid words array
  const validWords = useMemo(() => {
    if (!Array.isArray(words) || words.length === 0) {
      console.warn("FlipWord: No valid words provided, using fallback");
      return ["Developer"];
    }
    const filtered = words.filter(
      (word) => word && typeof word === "string" && word.trim() !== ""
    );
    if (filtered.length === 0) {
      console.warn("FlipWord: All words filtered out, using fallback");
      return ["Developer"];
    }
    return filtered;
  }, [words]);

  // Calculate the maximum width to prevent layout shifts
  const maxWidth = useMemo(() => {
    if (typeof window === "undefined") return "auto";

    // Create a temporary element to measure text width
    const tempElement = document.createElement("span");
    tempElement.style.visibility = "hidden";
    tempElement.style.position = "absolute";
    tempElement.style.fontSize = "inherit";
    tempElement.style.fontFamily = "inherit";
    tempElement.style.fontWeight = "inherit";
    tempElement.style.whiteSpace = "nowrap";

    document.body.appendChild(tempElement);

    let maxWidthValue = 0;
    validWords.forEach((word) => {
      tempElement.textContent = word;
      const width = tempElement.offsetWidth;
      if (width > maxWidthValue) {
        maxWidthValue = width;
      }
    });

    document.body.removeChild(tempElement);
    return `${maxWidthValue + 4}px`; // Add small buffer
  }, [validWords]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const flipToNext = useCallback(() => {
    if (validWords.length <= 1) return;

    setIsFlipping(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validWords.length);
      setIsFlipping(false);
    }, 200); // Half of the flip animation duration
  }, [validWords.length]);

  useEffect(() => {
    if (!isMounted || validWords.length <= 1) return;

    const interval = setInterval(flipToNext, duration);
    return () => clearInterval(interval);
  }, [flipToNext, duration, isMounted, validWords.length]);

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <span
        className={`inline-block ${className}`}
        style={{
          minWidth: "100px",
          textAlign: "center",
          ...style,
        }}
      >
        {validWords[0]}
      </span>
    );
  }

  return (
    <span
      className={`flip-word-container inline-block relative overflow-hidden ${className}`}
      style={{
        minWidth: maxWidth,
        textAlign: "center",
        ...style,
      }}
    >
      <span
        className={`flip-word-text inline-block transition-all duration-400 ease-in-out transform ${
          isFlipping ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
        }`}
        style={{
          transformOrigin: "center",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {validWords[currentIndex]}
      </span>

      <style jsx>{`
        .flip-word-container {
          perspective: 1000px;
        }

        .flip-word-text {
          display: inline-block;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .flip-word-text {
            transition: opacity 0.3s ease-in-out;
            transform: none !important;
          }
        }
      `}</style>
    </span>
  );
};

export default FlipWord;
