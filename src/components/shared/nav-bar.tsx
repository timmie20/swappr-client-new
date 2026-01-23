"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { UserNav } from "../auth/user-nav";
import { useState } from "react";
import { isAuthenticated } from "@/lib/auth-tokens";

export default function Navbar() {
  const [isLoggedIn] = useState(() => {
    // Check auth state on mount (client-side only)
    if (typeof window !== "undefined") {
      return isAuthenticated();
    }
    return false;
  });

  return (
    <nav className="fixed top-0 right-0 left-0 z-40 bg-white">
      <div className="mx-auto w-full max-w-212.5 px-4 sm:px-4 lg:px-0">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/assets/images/swappr-logo-filled.png"
              alt="Swappr"
              width={120}
              height={40}
              priority
              className="h-8 w-auto"
            />
            <h1 className="text-large font-switzer font-semibold tracking-tight text-[#08161F]">
              swappr
            </h1>
          </Link>

          {isLoggedIn ? <UserNav /> : <AuthActions />}
        </div>
      </div>
    </nav>
  );
}

function AuthActions() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/auth/sign-in">
        <Button
          variant="ghost"
          size="default"
          className="text-small text-tertiary/52 font-switzer cursor-pointer rounded-full font-medium"
        >
          Login
        </Button>
      </Link>
      <Link href="/auth/sign-up">
        <Button
          size="default"
          className="font-switzer cursor-pointer rounded-full font-medium"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );
}
