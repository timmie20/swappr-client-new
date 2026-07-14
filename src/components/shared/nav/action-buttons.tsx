import { UserNav } from "@/components/auth/user-nav";
import { Icons } from "@/components/icons";
import { SearchDialog } from "@/components/search-dialog";
import CartDrawer from "@/features/cart/cart-drawer";
import { useState } from "react";

export default function NavActionButtons() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-none items-center gap-5">
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

      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
