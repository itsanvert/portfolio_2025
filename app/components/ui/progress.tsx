"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (value != null && value >= 100) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [value]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-white/20 dark:bg-black/20 border border-white/10 dark:border-black/10",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full flex bg-gradient-to-r from-pink-400 via-blue-400 to-yellow-400"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          width: `${value || 0}%`,
        }}
        asChild
      >
        <motion.div
          className="h-full relative"
          initial={{ x: 0 }}
          animate={{
            x: value != null ? `${value - 100}%` : 0,
            transition: {
              duration: 1,
              ease: "easeInOut",
              type: "spring",
              bounce: 0.3,
              when: "beforeChildren",
            },
          }}
        >
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-black rounded-full shadow-lg"
            animate={{
              y: isComplete ? [0, -5, 0] : 0,
              rotate: isComplete ? [0, 10, -10, 0] : 0,
              transition: {
                duration: 0.5,
                repeat: isComplete ? Infinity : 0,
                repeatType: "reverse",
              },
            }}
          />
        </motion.div>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
