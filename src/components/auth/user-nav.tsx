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
import { useUserAccount, useLogout } from "@/hooks";
import { getFullName } from "@/lib/use-auth-obj";
import { isAuthenticated } from "@/lib/auth-tokens";
import { useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";

export function UserNav() {
  const { data: user } = useUserAccount();
  const { mutate: logout } = useLogout();
  const [isLoggedIn] = useState(() => {
    // Check auth state on mount (client-side only)
    if (typeof window !== "undefined") {
      return isAuthenticated();
    }
    return false;
  });

  const handleSignOut = () => {
    logout();
  };

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
          <Link href="/check-worth">
            <DropdownMenuItem>Check Phone Worth</DropdownMenuItem>
          </Link>
          <Link href="/account">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href="/auth/sign-in" className="ml-1 hidden sm:inline-flex">
      <Button variant="outline" className="cursor-pointer">
        <Icons.user size={16} />
        Sign in
      </Button>
    </Link>
  );
}
