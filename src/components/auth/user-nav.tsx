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

export function UserNav() {
  const { data: user } = useUserAccount();
  const { mutate: logout } = useLogout();

  const handleSignOut = () => {
    logout();
  };

  return (
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
  );
}
