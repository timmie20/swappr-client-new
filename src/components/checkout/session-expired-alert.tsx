import React from "react";
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
import { useCheckoutStore } from "@/store/checkout-store";
import { useRouter } from "next/navigation";

type SessionExpiredAlertProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SessionExpiredAlert({
  open,
  onOpenChange,
}: SessionExpiredAlertProps) {
  const resetCheckout = useCheckoutStore((s) => s.reset);
  const router = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Session expired</AlertDialogTitle>
          <AlertDialogDescription>
            Your session has expired, your cart items have been released.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="cursor-pointer"
            onClick={() => router.replace("/")}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            className="cursor-pointer"
            onClick={() => {
              resetCheckout();
              router.replace("/");
            }}
          >
            Restart checkout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
