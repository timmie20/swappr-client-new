/**
 * Token Refresh Hook
 *
 * Monitors token expiry and automatically refreshes tokens in the background.
 * Use this hook at the root level of your app (e.g., in layout or provider).
 */

"use client";

import { useEffect } from "react";
import { isTokenExpired, isAuthenticated } from "@/lib/auth-tokens";
import { refreshAccessToken } from "@/lib/token-refresh";

export function useTokenRefresh() {
  useEffect(() => {
    // Only run if user is authenticated
    if (!isAuthenticated()) {
      return;
    }

    // Check token expiry every 5 minutes
    const interval = setInterval(
      async () => {
        if (isAuthenticated() && isTokenExpired()) {
          console.log("Token expired, refreshing...");
          await refreshAccessToken();
        }
      },
      5 * 60 * 1000,
    ); // 5 minutes

    // Also check immediately on mount
    if (isTokenExpired()) {
      refreshAccessToken();
    }

    return () => clearInterval(interval);
  }, []);
}
