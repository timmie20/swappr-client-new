// src/app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/lib/auth/cookies";
import type { UserProfile, UserSession } from "@/types/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (!token) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 },
    );
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 },
      );
    }

    const profile: UserProfile = await res.json();
    const user: UserSession = {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      imageUrl: profile.avatar_url,
    };

    return NextResponse.json({ authenticated: true, user }, { status: 200 });
  } catch {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 },
    );
  }
}
