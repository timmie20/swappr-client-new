"use client";

import { useEffect, useMemo, useState } from "react";

import { useCheckoutStore } from "@/store/checkout-store";

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

export function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${pad2(seconds)}`;
}

export function useCheckoutCountdown(expiresAt: string | null | undefined) {
  const setIsExpired = useCheckoutStore((s) => s.setIsExpired);
  const isExpired = useCheckoutStore((s) => s.isExpired);

  const expiryMs = useMemo(() => {
    if (!expiresAt) return null;
    const t = new Date(expiresAt).getTime();
    return Number.isFinite(t) ? t : null;
  }, [expiresAt]);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!expiryMs) return;

    const id = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(id);
  }, [expiryMs]);

  const remainingMs = expiryMs ? Math.max(0, expiryMs - now) : 0;

  useEffect(() => {
    if (!expiryMs) return;
    if (remainingMs <= 0 && !isExpired) {
      setIsExpired(true);
    }
  }, [expiryMs, remainingMs, isExpired, setIsExpired]);

  return {
    remainingMs,
    remainingText: formatRemaining(remainingMs),
    isExpired,
  };
}
