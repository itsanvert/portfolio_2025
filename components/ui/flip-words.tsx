"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const FlipWords: React.FC<FlipWordsProps> = ({
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
      return ["Web Applications"];
    }
    return words.filter(
      (word) => word && typeof word === "string" && word.trim() !== ""
    );
  }, [words]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const flipToNext = useCallback(() => {
    if (validWords.length <= 1) return;

    setIsFlipping(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validWords.length);
      setIsFlipping(false);
    }, 300); // Half of the flip animation duration
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
          minHeight: "1em",
          ...style,
        }}
      >
        {validWords[0]}
      </span>
    );
  }

  return (
    <span
      className={`flip-words-container inline-block relative ${className}`}
      style={{
        minHeight: "1em",
        ...style,
      }}
    >
      <span
        className="flip-words-wrapper relative inline-block"
        style={{
          perspective: "1000px",
          minWidth: "fit-content",
        }}
      >
        <span
          className={`flip-word-text inline-block whitespace-nowrap transition-all duration-600 ease-in-out ${
            isFlipping ? "animate-flip-out" : "animate-flip-in"
          }`}
          style={{
            transformOrigin: "center center",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          key={currentIndex}
        >
          {validWords[currentIndex]}
        </span>
      </span>

      <style jsx>{`
        @keyframes flipOut {
          0% {
            transform: rotateX(0deg);
            opacity: 1;
          }
          100% {
            transform: rotateX(90deg);
            opacity: 0;
          }
        }

        @keyframes flipIn {
          0% {
            transform: rotateX(-90deg);
            opacity: 0;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }

        .animate-flip-out {
          animation: flipOut 0.3s ease-in forwards;
        }

        .animate-flip-in {
          animation: flipIn 0.3s ease-out forwards;
        }

        .flip-word-text {
          display: inline-block;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-flip-out,
          .animate-flip-in {
            animation: none;
            transition: opacity 0.3s ease-in-out;
          }

          .animate-flip-out {
            opacity: 0;
          }

          .animate-flip-in {
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
};

export default FlipWords;
