"use client";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { useSession } from "@/lib/auth/session-client";
import { UserNavMenu } from "./user-nav-menu";
import { useAuthModalStore } from "@/store/auth-modal-store";

export function UserNav() {
  const { user, isLoading } = useSession();
  const openSignIn = useAuthModalStore((s) => s.open);

  if (isLoading) return null;

  const handleOpenSignIn = () =>
    openSignIn(window.location.pathname + window.location.search);

  if (!user) {
    return (
      <>
        <Button
          variant="outline"
          className="hidden shrink-0 cursor-pointer lg:inline-flex"
          onClick={handleOpenSignIn}
        >
          <Icons.user size={16} />
          Sign in
        </Button>
        <button onClick={handleOpenSignIn} className="inline-flex lg:hidden">
          <Icons.user size={20} />
        </button>
      </>
    );
  }

  return <UserNavMenu user={user} />;
}
