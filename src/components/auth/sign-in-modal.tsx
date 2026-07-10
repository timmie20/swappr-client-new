"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { InteractiveGridPattern } from "../interactive-grid";
import { GoogleSignUpButton } from "./google-oauth";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

type SignInModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PERKS = [
  { icon: Icons.exchange, label: "Swap deals" },
  { icon: Icons.shieldCheck, label: "Verified vendors" },
  { icon: Icons.package, label: "Order tracking" },
] as const;

export default function SignInModal({ open, onOpenChange }: SignInModalProps) {
  // Send users back to wherever they opened the modal from after OAuth
  const pathname = usePathname();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0">
        {/* Brand header — same grid motif as the full sign-in page */}
        <div className="relative flex h-32 items-center justify-center overflow-hidden border-b bg-gradient-to-b from-[#3b82fd]/10 via-[#3b82fd]/5 to-transparent">
          <InteractiveGridPattern
            squares={[16, 6]}
            className={cn(
              "inset-0 h-full w-full border-0",
              "mask-[radial-gradient(220px_circle_at_center,white,transparent)]",
            )}
            squaresClassName="stroke-primary/15"
          />
          <Image
            src="/assets/images/swappr-logo-filled.png"
            alt="Swappr"
            width={200}
            height={40}
            priority
            className="pointer-events-none relative z-10 h-14 w-auto"
          />
        </div>

        <div className="space-y-6 p-6 pt-5">
          <div className="space-y-1.5 text-center">
            <DialogTitle className="font-switzer text-xl font-semibold tracking-tight">
              Your next device is waiting
            </DialogTitle>
            <DialogDescription className="text-balance">
              Sign in to buy, swap and track pre-owned tech from verified
              vendors — one click and you&apos;re in.
            </DialogDescription>
          </div>

          <GoogleSignUpButton redirect={pathname} />

          <div className="text-muted-foreground flex items-center justify-center gap-5 text-xs">
            {PERKS.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <Icon size={14} className="text-primary" />
                {label}
              </span>
            ))}
          </div>

          <p className="text-muted-foreground text-center text-xs">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-primary underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-primary underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
