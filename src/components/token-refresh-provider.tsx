/**
 * Token Refresh Provider
 *
 * Client component wrapper that enables token refresh monitoring
 */

"use client";

import { useCartHydrate } from "@/features/cart/hooks/use-cart-hydrate";
import { useCartSync } from "@/features/cart/hooks/use-cart-sync";
import { useTokenRefresh } from "@/hooks/use-token-refresh";

export function TokenRefreshProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useTokenRefresh();
  useCartSync();
  useCartHydrate();

  return <>{children}</>;
}
