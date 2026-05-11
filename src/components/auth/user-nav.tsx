"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { UserAvatarProfile } from "../user-avatar-profile";
import { useUserAccount } from "@/hooks";
import { getFullName } from "@/lib/use-auth-obj";
import { isAuthenticated } from "@/lib/auth-tokens";
import { useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import SignoutDialog from "../signout-dialog";

export function UserNav() {
  const { data: user } = useUserAccount();
  const [signoutDialogOpen, setSignoutDialogOpen] = useState(false);

  const [isLoggedIn] = useState(() => {
    // Check auth state on mount (client-side only)
    if (typeof window !== "undefined") {
      return isAuthenticated();
    }
    return false;
  });

  return isLoggedIn ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatarProfile user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-58"
        align="end"
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {getFullName(user)}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/account">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <SignoutDialog
            open={signoutDialogOpen}
            onOpenChange={setSignoutDialogOpen}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href="/auth/sign-in">
      <Button
        variant="outline"
        className="hidden shrink-0 cursor-pointer lg:inline-flex"
      >
        <Icons.user size={16} />
        Sign in
      </Button>

      <button>
        <Icons.user size={20} className="inline-flex lg:hidden" />
      </button>
    </Link>
  );
}
