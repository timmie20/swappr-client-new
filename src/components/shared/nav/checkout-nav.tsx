import Link from "next/link";
import Image from "next/image";
import { ASSETS } from "@/constants/assets";
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
          <Image
            src={ASSETS.LOGO_DARK}
            alt="Swappr logo"
            width={100}
            height={100}
            className="h-auto w-auto cursor-pointer"
          />
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
