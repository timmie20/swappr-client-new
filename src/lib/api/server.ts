// lib/api/server.ts
// ⚠️ Server only — never import in a Client Component

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAMES } from "../auth/cookies";
import { isPublicApiEndpoint } from "../public-routes";

const BASE_URL = process.env.API_BASE_URL!;

interface ServerFetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  params?: Record<string, string>;
  revalidate?: number | false;
  tags?: string[];
}

export async function serverFetch<T>(
  endpoint: string,
  options: ServerFetchOptions = {},
): Promise<T> {
  const { method = "GET", body, params, revalidate = 60, tags } = options;

  // Public endpoints (PUBLIC_API_ENDPOINTS) are fetchable without a session —
  // viewing is public, only acting requires auth
  const isPublic = isPublicApiEndpoint(endpoint);

  // Read access token from HttpOnly cookie
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (!accessToken && !isPublic) redirect("/sign-in");

  const url = new URL(`${BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    next: {
      revalidate,
      ...(tags ? { tags } : {}),
    },
  });

  if (res.status === 401 && !isPublic) redirect("/sign-in");

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Request failed: ${res.status}`);
  }

  return res.json();
}
