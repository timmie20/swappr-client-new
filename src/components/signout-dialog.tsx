"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCartStore } from "@/store/cart-store";
import { useLogout } from "@/hooks";
import { Icons } from "./icons";
import { Spinner } from "./ui/spinner";

type SignoutDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SignoutDialog({
  open,
  onOpenChange,
}: SignoutDialogProps) {
  const items = useCartStore((s) => s.items);

  const hasItemsInCart = items.length > 0;

  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    if (isPending) return;

    logout(undefined, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {hasItemsInCart ? "Sign out with items in cart?" : "Sign out?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {hasItemsInCart
              ? "You have items in your cart. Signing out will temporarily clear them, but don't worry, they will be restored when you sign back in. Are you sure you want to proceed?"
              : "Are you sure you want to sign out of this device?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            disabled={isPending}
            className="cursor-pointer"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner />
                <span>Signing out...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Icons.logout size={14} />
                <span>Sign Out</span>
              </div>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
