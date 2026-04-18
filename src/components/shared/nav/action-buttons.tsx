import { UserNav } from "@/components/auth/user-nav";
import { Icons } from "@/components/icons";
import { useFeedStore } from "@/store/feed-store";
import { AnimatePresence, motion } from "motion/react";

type NavActionButtonsProps = {
  setOpen: (open: boolean) => void;
};

export default function NavActionButtons({ setOpen }: NavActionButtonsProps) {
  const cartCount = useFeedStore((s) => s.cartCount)();

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
      <button className="relative cursor-pointer">
        <Icons.cartCopy size={20} />
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span
              key="cart-count"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-primary absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
            >
              {cartCount > 9 ? "9+" : cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* User */}

      <UserNav />

      {/* Mobile menu toggle */}
      {/* <button
        onClick={() => setMobileMenuOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] transition-colors hover:bg-[#F8F9FA] sm:hidden"
      >
        {mobileMenuOpen ? <Icons.close size={20} /> : <Icons.menu size={20} />}
      </button> */}
    </div>
  );
}
