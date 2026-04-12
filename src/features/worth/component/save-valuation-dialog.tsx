"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { clearPendingValuationRef } from "@/lib/pending-valuation";
import { useRouter } from "next/navigation";

type SaveValuationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SaveValuationDialog({
  open,
  onOpenChange,
}: SaveValuationDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save your valuation</DialogTitle>
          <DialogDescription>
            Saving means this valuation is tracked to your account, you can
            return to it anytime, and it won&apos;t be lost. If you don&apos;t
            save, this valuation will be discarded when you leave this page.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              clearPendingValuationRef();
              onOpenChange(false);
            }}
          >
            Trash Anyway
          </Button>
          <Button
            type="button"
            onClick={() => {
              router.push("/auth/sign-in");
            }}
          >
            Save Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
