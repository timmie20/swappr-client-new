import { Icons } from "../icons";
import Logo from "../shared/logo";

export default function Nav() {
  const handleLogoClick = () => {
    window.location.href = "/";
  };
  return (
    <div className="border-sidebar-border h-auto min-w-full border-b p-4 shadow-xs">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div />
        <button onClick={handleLogoClick}>
          <Logo variant="dark" width={130} height={130} />
        </button>
        <div className="flex items-center gap-4">
          <button className="cursor-pointer">
            <Icons.product size={24} stroke={1.6} />
          </button>
        </div>
      </div>
    </div>
  );
}
