/**
 * Public Routes Configuration
 *
 * Centralized definition of public routes and API endpoints
 * to keep middleware and API client in sync.
 */

/**
 * Public page routes - accessible without authentication
 * Used by middleware to allow unauthenticated access
 */
export const PUBLIC_PAGE_ROUTES = [
  "/check-worth", // All check-worth pages (main, model detail, questionnaire, results)
  "/vendor", // Product listing and details (public)
  "/products",
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/verify-email",
  "/api/public",
  "/api/auth", // Auth infra routes (session, refresh, logout, google callback) manage their own auth checks
] as const;

/**
 * Public API endpoints - don't require authentication headers
 * Used by API client interceptor to skip auth token attachment
 */
export const PUBLIC_API_ENDPOINTS = [
  "/auth/google",
  "/auth/callback",
  "/auth/refresh",
  "/auth/reset-password",
  "/auth/verify-email",
  "/products", // Public product listing
  "/questions", // Questions for check-worth flow (public)
  "/brands", // Brand listings (public)
  "/models", // Model listings (public)
  "/categories", // Category listings (public, also covers /categories/primary)
] as const;

/**
 * Auth routes - sign-in and sign-up pages
 * Used by middleware for redirect logic
 */
export const AUTH_ROUTES = ["/sign-in", "/sign-up"] as const;

/**
 * Check if a pathname is a public page route
 */
export function isPublicRoute(pathname: string): boolean {
  // Homepage is always public
  if (pathname === "/") return true;

  // Check if pathname starts with any public route
  return PUBLIC_PAGE_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Check if a pathname is an auth route
 */
export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Check if an API endpoint is public
 */
export function isPublicApiEndpoint(url: string | undefined): boolean {
  if (!url) return false;
  return PUBLIC_API_ENDPOINTS.some((endpoint) => url.startsWith(endpoint));
}
