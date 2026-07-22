"use client";
import { useQuery } from "@tanstack/react-query";
import type { UserSession } from "@/types/auth";

interface SessionResponse {
  authenticated: boolean;
  user: UserSession | null;
}

async function fetchSession(): Promise<SessionResponse> {
  const res = await fetch("/api/auth/session");
  if (!res.ok) return { authenticated: false, user: null };
  return res.json();
}

/**
 * Use in Client Components that need the full profile (e.g. nav menus).
 * Backed by TanStack Query so repeated mounts across the tree share one fetch.
 */
export function useSession() {
  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 1000 * 60 * 5,
  });

  return { user: data?.user ?? null, isLoading };
}

export function useIsAuthenticated(): boolean | null {
  const { user, isLoading } = useSession();
  return isLoading ? null : !!user;
}
