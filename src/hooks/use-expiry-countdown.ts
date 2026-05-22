import { useAnimate } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export type TimeUnit = "Hour" | "Minute" | "Second";

/**
 * Parses an ISO expiry string and derives remaining ms,
 * plus discrete hr/min/sec values.
 */
export function useExpiryCountdown(expiresAt: string) {
  const expiryMs = useMemo(() => {
    const t = new Date(expiresAt).getTime();
    return Number.isFinite(t) ? t : null;
  }, [expiresAt]);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!expiryMs) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [expiryMs]);

  const remainingMs = expiryMs ? Math.max(0, expiryMs - now) : 0;
  const isExpired = remainingMs <= 0;

  const hours = Math.floor(remainingMs / HOUR);
  const minutes = Math.floor((remainingMs % HOUR) / MINUTE);
  const seconds = Math.floor((remainingMs % MINUTE) / SECOND);

  return { hours, minutes, seconds, remainingMs, isExpired };
}

/**
 * Framer Motion shift animation for a single time unit.
 * Animates exit (slide up + fade) then entrance (slide in from below).
 */
export function useUnitAnimation(value: number) {
  const [ref, animate] = useAnimate();
  const prevRef = useRef<number | null>(null);

  useEffect(() => {
    if (prevRef.current === null) {
      prevRef.current = value;
      return;
    }

    if (prevRef.current === value) return;

    const run = async () => {
      await animate(
        ref.current,
        { y: ["0%", "-60%"], opacity: [1, 0] },
        { duration: 0.28, ease: "easeIn" },
      );
      prevRef.current = value;
      await animate(
        ref.current,
        { y: ["60%", "0%"], opacity: [0, 1] },
        { duration: 0.28, ease: "easeOut" },
      );
    };

    run();
  }, [value]);

  return ref;
}
