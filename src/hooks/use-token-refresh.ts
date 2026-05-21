/**
 * Token Refresh Hook
 *
 * Monitors token expiry and automatically refreshes tokens in the background.
 * Use this hook at the root level of your app (e.g., in layout or provider).
 */

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isTokenExpired, isAuthenticated } from "@/lib/auth-tokens";
import { refreshAccessToken } from "@/lib/token-refresh";
import { isPublicPageRoute } from "@/lib/public-routes";
import { useIsAuthenticated } from "@/hooks/use-access-token";

export function useTokenRefresh() {
  const pathname = usePathname();
  const loggedIn = useIsAuthenticated();

  useEffect(() => {
    // Don't refresh tokens on public routes
    if (isPublicPageRoute(pathname)) {
      return;
    }

    // Only run if user is authenticated
    if (!loggedIn) {
      return;
    }

    // Check token expiry every 5 minutes
    const interval = setInterval(
      async () => {
        if (
          isAuthenticated() &&
          isTokenExpired() &&
          !isPublicPageRoute(pathname)
        ) {
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
  }, [pathname, loggedIn]);
}
