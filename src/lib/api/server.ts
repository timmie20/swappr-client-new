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
