import { UserNav } from "@/components/auth/user-nav";
import { Icons } from "@/components/icons";
import CartDrawer from "@/features/cart/cart-drawer";

type NavActionButtonsProps = {
  setOpen: (open: boolean) => void;
};

export default function NavActionButtons({ setOpen }: NavActionButtonsProps) {
  return (
    <div className="flex flex-none items-center gap-5">
      {/* Wishlist */}
      {/* <Button
                className="relative cursor-pointer"
                size="icon-lg"
                variant="ghost"
              >
                <Icons.bookmark size={36} />
                {bookMarkIds.size > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F4762A] text-[10px] font-bold text-white">
                    {bookMarkIds.size}
                  </span>
                )}
              </Button> */}

      {/* search */}
      <button className="cursor-pointer" onClick={() => setOpen(true)}>
        <Icons.search size={20} />
      </button>

      {/* Notifications */}
      <button className="hidden cursor-pointer sm:flex">
        <Icons.bell size={20} />
      </button>

      {/* Cart */}
      <CartDrawer />

      {/* User */}

      <UserNav />
    </div>
  );
}
