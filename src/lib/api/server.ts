import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Get authorization headers with custom auth token for server-side API requests
 * Use this in Server Components and Server Actions ONLY
 *
 * @example
 * ```ts
 * // In a Server Component or Server Action
 * const headers = await getAuthHeaders();
 * const response = await fetch('/api/brands', { headers });
 * ```
 */
export async function getAuthHeaders() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("swappr_access_token")?.value;

  if (!accessToken) {
    redirect("/auth/sign-in");
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

// lib/api/server.ts
// ⚠️ Never import this in a client component

const BASE_URL = process.env.API_BASE_URL!;
// const SERVICE_KEY = process.env.API_SERVICE_KEY!; // backend service-to-service key

export async function serverFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      // Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 }, // ISR cache duration
  });

  if (!res.ok) throw new Error(`Server fetch failed: ${res.status}`);

  return res.json();
}
