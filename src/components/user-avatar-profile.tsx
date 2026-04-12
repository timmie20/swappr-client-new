import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFullName } from "@/lib/use-auth-obj";
import { User } from "@/types/api";

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user: User | undefined;
}

export function UserAvatarProfile({
  className,
  showInfo = false,
  user,
}: UserAvatarProfileProps) {
  const fullName = getFullName(user);
  return (
    <div className="flex items-center gap-2">
      <Avatar className={className}>
        <AvatarImage src={user?.avatarUrl} alt={fullName || ""} />
        <AvatarFallback className="rounded-lg">
          {fullName?.slice(0, 2)?.toUpperCase() || null}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{fullName || ""}</span>
          <span className="truncate text-xs">{user?.email || ""}</span>
        </div>
      )}
    </div>
  );
}
