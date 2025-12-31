"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserNav } from "../auth/user-nav";
import { useUser } from "@clerk/nextjs";
export default function Navbar() {
  const { user } = useUser();
  return (
    <nav className="mx-auto max-w-212.5 bg-white">
      <div className="w-full px-4 sm:px-4 lg:px-0">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <h1 className="text-large font-bold tracking-tight text-gray-900">
              swappr
            </h1>
          </div>

          {user ? <UserNav user={user} /> : <AuthActions />}
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
