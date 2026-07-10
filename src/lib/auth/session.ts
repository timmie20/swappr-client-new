import { redirect } from "next/navigation";
import { cache } from "react";
import { serverFetch } from "../api/server";
import type { UserProfile, UserSession } from "@/types/auth";

export const getServerSession = cache(async (): Promise<UserSession | null> => {
  try {
    const user = await serverFetch<UserProfile>("/auth/me");
    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      imageUrl: user.avatar_url,
    };
  } catch {
    return null;
  }
});

/**
 * Use in Server Components that require authentication.
 * Redirects to /login if no valid session exists.
 */
export async function requireSession(): Promise<UserSession> {
  const session = await getServerSession();
  if (!session) redirect("/sign-in");
  return session;
}

/**
 * Use when you only need a boolean check — e.g. conditionally
 * rendering nav items or gating a section without needing the
 * full session payload.
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession();
  return session !== null;
}
