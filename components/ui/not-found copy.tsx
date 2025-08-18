"use client";

import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

// Primary GIF loader with different sizes
export const GlobalNotFound = ({
  size = "md",
  className = "",
  alt = "Loading...",
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  alt?: string;
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center justify-center ${className}`}
    >
      <img
        src="/gif/loader.gif"
        alt={alt}
        className={`${sizeClasses[size]} object-contain`}
      />
    </motion.div>
  );
};

// GIF loader with Next.js Image component (optimized)
export const OptimizedGifLoader = ({
  size = "md",
  className = "",
  alt = "Loading...",
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  alt?: string;
}) => {
  const sizeValues = {
    sm: 32,
    md: 64,
    lg: 96,
    xl: 128,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center justify-center ${className}`}
    >
      <Image
        src="/gif/loader.gif"
        alt={alt}
        width={sizeValues[size]}
        height={sizeValues[size]}
        unoptimized // Important for GIFs
        className="object-contain"
      />
    </motion.div>
  );
};

// GIF loader with text
export const GifLoaderWithText = ({
  text = "Loading...",
  size = "md",
  className = "",
}: {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <GlobalNotFound size={size} />
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1], // cubic-bezier for ease-in-out
        }}
        className="text-sm font-medium text-neutral-600 dark:text-neutral-400"
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

// Multiple GIF loaders (if you have different GIFs)
export const MultiGifLoader = ({
  gifName = "not-found",
  size = "md",
  className = "",
}: {
  gifName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center justify-center ${className}`}
    >
      <img
        src={`/gif/${gifName}.gif`}
        alt="Loading..."
        className={`${sizeClasses[size]} object-contain`}
      />
    </motion.div>
  );
};

// Loading container with centered layout
export const LoadingContainer = ({
  children,
  className = "",
  fullScreen = false,
}: {
  children: React.ReactNode;
  className?: string;
  fullScreen?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "min-h-[200px]"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Full screen loading overlay
export const LoadingOverlay = ({
  isVisible,
  gifSize = "lg",
  text = "Loading...",
  className = "",
}: {
  isVisible: boolean;
  gifSize?: "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm dark:bg-black/90 ${className}`}
    >
      <GifLoaderWithText text={text} size={gifSize} />
    </motion.div>
  );
};

// Button loading state
export const LoadingButton = ({
  isLoading,
  children,
  onClick,
  className = "",
  loadingText = "Loading...",
  disabled = false,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  loadingText?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <>
          <GlobalNotFound size="sm" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Card with loading state
export const LoadingCard = ({
  isLoading,
  children,
  className = "",
  loadingText = "Loading content...",
}: {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80 rounded-lg"
        >
          <GifLoaderWithText text={loadingText} size="md" />
        </motion.div>
      )}
      <div className={isLoading ? "opacity-30" : ""}>{children}</div>
    </div>
  );
};

// Page loading component (for Next.js loading.tsx files)
export const PageLoader = ({
  text = "Loading page...",
  size = "lg",
}: {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) => {
  return (
    <LoadingContainer fullScreen>
      <GifLoaderWithText text={text} size={size} />
    </LoadingContainer>
  );
};
