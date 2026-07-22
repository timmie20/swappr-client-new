import { UserNav } from "@/components/auth/user-nav";
import { Icons } from "@/components/icons";
import CartDrawer from "@/features/cart/cart-drawer";

type NavActionButtonsProps = {
  onSearchClick: () => void;
};

export default function NavActionButtons({
  onSearchClick,
}: NavActionButtonsProps) {
  return (
    <div className="flex flex-none items-center gap-5">
      {/* search - mobile only, desktop uses the inline search bar */}
      <button
        aria-label="Search"
        className="cursor-pointer lg:hidden"
        onClick={onSearchClick}
      >
        <Icons.search size={20} />
      </button>

      {/* Cart */}
      <CartDrawer />

      {/* User */}
      <UserNav />
    </div>
  );
}
