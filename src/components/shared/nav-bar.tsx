import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="mx-auto max-w-212.5 bg-white">
      <div className="mx-auto w-full px-4 sm:px-4 lg:px-0">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <h1 className="text-large font-bold tracking-tight text-gray-900">
              swappr
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/auth/sign-in
            "
            >
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
        </div>
      </div>
    </nav>
  );
}
