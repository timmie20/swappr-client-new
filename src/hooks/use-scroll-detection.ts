/**
 * Scroll Detection Hook
 *
 * Detects when the page has been scrolled past a threshold.
 * Useful for changing navbar styles on scroll.
 */

"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect page scroll
 * @param threshold - The scroll position (in pixels) at which scrolled becomes true
 * @returns boolean indicating if page has scrolled past threshold
 */
export function useScrollDetection(threshold: number = 10): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
