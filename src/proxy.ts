import { NextRequest, NextResponse } from "next/server";
import { isPublicPageRoute, isAuthRoute } from "@/lib/public-routes";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("swappr_access_token");

  // Allow public routes first — no auth needed
  if (isPublicPageRoute(pathname)) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute(pathname) && accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow unauthenticated users to access auth pages
  if (isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  // Everything else requires auth
  if (!accessToken) {
    const signInUrl = new URL("/auth/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
