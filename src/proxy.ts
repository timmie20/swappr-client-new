import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/auth/callback",
  "/auth/reset-password",
  "/auth/verify-email",
  "/api/public",
];

const authRoutes = ["/auth/sign-in", "/auth/sign-up"];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => pathname.startsWith(route));
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.some((route) => pathname.startsWith(route));
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("swappr_access_token");

  // Redirect authenticated users away from auth pages
  if (isAuthRoute(pathname) && accessToken) {
    return NextResponse.redirect(new URL("/check-worth", req.url));
  }

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Allow auth routes for unauthenticated users
  if (isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  // Check if user is authenticated for protected routes
  if (!accessToken) {
    const signInUrl = new URL("/auth/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
