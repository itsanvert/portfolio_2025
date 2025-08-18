// components/HydrationBoundary.tsx
"use client";

import { useEffect, useState } from "react";

export function HydrationBoundary({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{children}</>;
}
