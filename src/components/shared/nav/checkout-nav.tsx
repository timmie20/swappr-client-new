import Link from "next/link";
import Logo from "../logo";
import { Icons } from "@/components/icons";

export default function Nav() {
  const handleLogoClick = () => {
    window.location.href = "/";
  };
  return (
    <div className="border-sidebar-border h-auto min-w-full border-b p-4 shadow-xs">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div />
        <button onClick={handleLogoClick}>
          <Logo variant="dark" width={100} height={100} />
        </button>
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <button className="text-foreground hover:text-muted-foreground inline-flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors">
              <Icons.package size={24} stroke={1.6} />
              Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
