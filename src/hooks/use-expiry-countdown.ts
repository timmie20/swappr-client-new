import { useEffect, useMemo, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export type TimeUnit = "Hour" | "Minute" | "Second";

/**
 * Parses an ISO expiry string and derives remaining ms, plus discrete
 * hr/min/sec values. `expiresAt` alone isn't the source of truth for
 * whether the countdown is still meaningful — e.g. a paid or cancelled
 * order can have a future `expires_at` that no longer applies. Callers
 * must pass `canExpire` (derived from payment/order status) to gate that.
 */
export function useExpiryCountdown(expiresAt: string, canExpire = true) {
  const expiryMs = useMemo(() => {
    const t = new Date(expiresAt).getTime();
    return Number.isFinite(t) ? t : null;
  }, [expiresAt]);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!expiryMs || !canExpire) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [expiryMs, canExpire]);

  const remainingMs = expiryMs ? Math.max(0, expiryMs - now) : 0;
  const isExpired = !canExpire || remainingMs <= 0;

  const hours = Math.floor(remainingMs / HOUR);
  const minutes = Math.floor((remainingMs % HOUR) / MINUTE);
  const seconds = Math.floor((remainingMs % MINUTE) / SECOND);

  return { hours, minutes, seconds, remainingMs, isExpired };
}
