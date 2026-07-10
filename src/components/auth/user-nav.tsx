"use client";
import { useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { useSession } from "@/lib/auth/session-client";
import { UserNavMenu } from "./user-nav-menu";
import SignInModal from "./sign-in-modal";

export function UserNav() {
  const { user, isLoading } = useSession();
  const [signInOpen, setSignInOpen] = useState(false);

  if (isLoading) return null;

  if (!user) {
    return (
      <>
        <Button
          variant="outline"
          className="hidden shrink-0 cursor-pointer lg:inline-flex"
          onClick={() => setSignInOpen(true)}
        >
          <Icons.user size={16} />
          Sign in
        </Button>
        <button
          onClick={() => setSignInOpen(true)}
          className="inline-flex lg:hidden"
        >
          <Icons.user size={20} />
        </button>

        <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />
      </>
    );
  }

  return <UserNavMenu user={user} />;
}
