"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "@/features/feed/types";
import { Icons } from "../icons";
import Image from "next/image";
import { getInitials } from "@/lib/format";
import { VisuallyHidden } from "radix-ui";

function VerifiedBadgeInfo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="What do the verified badges mean?"
          className="text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
        >
          <Icons.help size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-72 p-3 text-xs text-[#4B5563]"
      >
        <p className="mb-1 flex items-center gap-1.5 font-semibold text-[#1A1A1A]">
          <Icons.shieldCheck size={14} className="text-primary" />
          Verified
        </p>
        <p className="mb-3">
          Business identity and existence have been confirmed by Swappr.
        </p>
        <p className="mb-1 flex items-center gap-1.5 font-semibold text-[#1A1A1A]">
          <Icons.shieldCheck size={14} className="text-amber-500" />
          Inspection Verified
        </p>
        <p>
          Everything in Verified, plus the store location has been inspected
          by Swappr — buyers can pick up orders directly from this vendor.
        </p>
      </PopoverContent>
    </Popover>
  );
}

export function VendorDialog({ product }: { product: Product }) {
  const { seller } = product;
  const initials = getInitials(seller.username);
  const storePhotos = seller.storePhotos ?? [];
  const location =
    seller.city && seller.state
      ? `${seller.city}, ${seller.state}`
      : seller.city || seller.state || "Location not provided";

  return (
    // Guards against the dialog's overlay/close click bubbling (via React's
    // portal event tree) into the card's onClick-to-navigate handlers.
    <div className="contents" onClick={(e) => e.stopPropagation()}>
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex min-w-0 items-center gap-1.5">
            <Avatar className="size-6">
              <AvatarImage src={seller.avatarUrl} alt={seller.username} />
              <AvatarFallback className="text-primary text-[9px] font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="cursor-pointer truncate text-xs hover:underline">
              @{seller.username}
            </span>
            {seller.inspectionVerified ? (
              <Icons.shieldCheck
                size={12}
                className="shrink-0 text-amber-500"
              />
            ) : (
              seller.verified && (
                <Icons.shieldCheck
                  size={12}
                  className="text-primary shrink-0"
                />
              )
            )}
          </button>
        </DialogTrigger>

        <DialogContent
          className="max-w-sm overflow-hidden p-0"
          showCloseButton={false}
        >
          {/* Cover banner */}
          <div className="from-primary via-primary/80 to-app-secondary h-20 w-full bg-linear-to-br" />

          {/* Profile row — avatar bottom-left */}
          <div className="-mt-10 flex items-end justify-between px-4">
            <Avatar className="size-20 shadow-md ring-4 ring-white">
              <AvatarImage src={seller.avatarUrl} alt={seller.username} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* "View other products" isn't implemented yet — re-enable once that page exists
            <Button size="sm" variant="outline" className="cursor-pointer">
              View other products
            </Button>
            */}
          </div>

          <VisuallyHidden.Root>
            <DialogDescription>
              Vendor details for @{seller.username}
            </DialogDescription>
          </VisuallyHidden.Root>

          {/* Name + handle + badge */}
          <div className="mt-2 px-4">
            <div className="flex items-center gap-1.5">
              <DialogTitle className="text-base font-bold text-[#1A1A1A]">
                @{seller.username}
              </DialogTitle>
              {seller.inspectionVerified ? (
                <Badge className="gap-1 border-none bg-linear-to-r from-amber-400 to-yellow-500 text-[10px] font-semibold text-white">
                  <Icons.shieldCheck size={12} />
                  Inspection Verified
                </Badge>
              ) : seller.verified ? (
                <Badge
                  variant="outline"
                  className="border-primary/30 bg-primary/5 text-primary gap-1 text-[10px] font-semibold"
                >
                  <Icons.shieldCheck size={12} />
                  Verified
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="border-amber-300 bg-amber-50 text-[10px] text-amber-600"
                >
                  Unverified
                </Badge>
              )}
              <VerifiedBadgeInfo />
            </div>

            {/* Stats row */}
            <div className="mt-2 flex items-center gap-4 text-sm text-[#6B7280]">
              <span>
                <strong className="text-[#1A1A1A]">
                  {seller.rating > 0 ? seller.rating.toFixed(1) : "—"}
                </strong>{" "}
                rating
              </span>
              <span className="flex min-w-0 items-center gap-1">
                <Icons.mapPin size={12} className="shrink-0" />
                <span className="truncate">{location}</span>
              </span>
            </div>
          </div>

          {/* Store photos grid */}
          <div className="mt-4 border-t border-[#F3F4F6]">
            <p className="px-4 py-2 text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
              Store Photos
            </p>
            {storePhotos.length > 0 ? (
              <div className="no-scrollbar max-h-64 overflow-y-auto">
                <div className="grid grid-cols-3 gap-px bg-[#F3F4F6]">
                  {storePhotos.map((src, i) => (
                    <div
                      key={src + i}
                      className="aspect-square overflow-hidden bg-[#F9FAFB]"
                    >
                      <Image
                        src={src}
                        alt={`Store photo ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        width={400}
                        height={400}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="px-4 pb-4 text-sm text-[#9CA3AF]">
                No photos yet
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
