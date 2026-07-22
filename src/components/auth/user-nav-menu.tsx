"use client";
import { useState } from "react";
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
import { Icons } from "../icons";
import SignoutDialog from "../signout-dialog";
import type { UserSession } from "@/types/auth";

interface UserNavMenuProps {
  user: UserSession;
}

export function UserNavMenu({ user }: UserNavMenuProps) {
  const [signoutDialogOpen, setSignoutDialogOpen] = useState(false);

  return (
    <>
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
                {user.firstName} {user.lastName}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/account">
              <DropdownMenuItem>
                <Icons.user size={14} />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/orders">
              <DropdownMenuItem>
                <Icons.package size={14} />
                My Orders
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSignoutDialogOpen(true)}>
              <Icons.logout size={14} />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignoutDialog
        open={signoutDialogOpen}
        onOpenChange={setSignoutDialogOpen}
      />
    </>
  );
}
