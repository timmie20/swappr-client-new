"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface ComingSoonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComingSoonDialog({
  open,
  onOpenChange,
}: ComingSoonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex items-center justify-center">
          <DotLottieReact
            src="/assets/icons/sorry face.lottie"
            autoplay
            loop
            style={{ width: 80, height: 80 }}
          />
        </div>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Ummm here&apos;s the deal
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            This feature is still in the works, but you&apos;re already locked
            in since you signed up and used the Worth Checker. We&apos;ll let
            you know the second it&apos;s live. Until then… stay cheezed up 🧀✨
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="lg">Aiit Bet</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
