import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

/**
 * Clerk Middleware Configuration
 *
 * Protects routes and ensures authentication.
 * Public routes are accessible without authentication.
 * All other routes require authentication.
 */

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/(.*)",
  "/sign-up(.*)",
  "/check-worth(.*)",
  "/api/public(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (!isPublicRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
