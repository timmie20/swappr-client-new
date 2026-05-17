/**
 * Token Refresh Provider
 *
 * Client component wrapper that enables token refresh monitoring
 */

"use client";

import { useTokenRefresh } from "@/hooks/use-token-refresh";

export function TokenRefreshProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useTokenRefresh();

  return <>{children}</>;
}
