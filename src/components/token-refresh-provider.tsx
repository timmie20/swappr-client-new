/**
 * Token Refresh Provider
 *
 * Client component wrapper that enables token refresh monitoring
 */

"use client";

import { useCartHydrate } from "@/features/cart/hooks/use-cart-hydrate";
import { useTokenRefresh } from "@/hooks/use-token-refresh";

export function TokenRefreshProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useTokenRefresh();
  useCartHydrate();

  return <>{children}</>;
}
