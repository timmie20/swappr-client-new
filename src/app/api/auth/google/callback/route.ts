// src/app/api/auth/google/callback/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setAuthCookies } from "@/lib/auth/cookies";
import type { AuthTokens } from "@/types/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");
  const expiresAt = searchParams.get("expires_at");
  const redirectTo = searchParams.get("redirect") || "/";

  // If any required token is missing, the OAuth flow failed upstream
  if (!accessToken || !refreshToken || !expiresAt) {
    return NextResponse.redirect(
      new URL("/sign-in?error=oauth_failed", request.url),
    );
  }

  const tokens: AuthTokens = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: new Date(expiresAt).getTime(),
  };

  const cookieStore = await cookies();
  setAuthCookies(cookieStore, tokens);

  // Clean redirect — no tokens visible in the URL at any point from here on
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
