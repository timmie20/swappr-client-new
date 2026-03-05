"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/features/feed/types";
import { Icons } from "../icons";

// Placeholder store photos — replace with real vendor.store_photos when available
const PLACEHOLDER_PHOTOS = [
  "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1546027658-7aa750153465?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop",
];

export function VendorDialog({ product }: { product: Product }) {
  const { seller } = product;
  const initials = seller.username
    .split(/[^a-zA-Z]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex min-w-0 items-center gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <Avatar className="size-6">
            <AvatarImage src={seller.avatarUrl} alt={seller.username} />
            <AvatarFallback className="text-primary text-[9px] font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="cursor-pointer truncate text-xs hover:underline">
            @{seller.username}
          </span>
          {seller.verified && (
            <Icons.shieldCheck size={12} className="shrink-0 text-[#1A6B5A]" />
          )}
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-w-sm overflow-hidden p-0"
        showCloseButton={false}
      >
        {/* Cover banner */}
        <div className="from-primary via-primary/80 to-app-secondary h-20 w-full bg-linear-to-br" />

        {/* Profile row — avatar bottom-left, CTA top-right */}
        <div className="-mt-10 flex items-end justify-between px-4">
          <Avatar className="size-20 shadow-md ring-4 ring-white">
            <AvatarImage src={seller.avatarUrl} alt={seller.username} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <Button size="sm" variant="outline" className="cursor-pointer">
            View other products
          </Button>
        </div>

        {/* Name + handle + badge */}
        <div className="mt-2 px-4">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-[#1A1A1A]">
              @{seller.username}
            </span>
            {seller.verified ? (
              <Icons.shieldCheck
                size={16}
                className="shrink-0 text-[#1A6B5A]"
              />
            ) : (
              <Badge
                variant="outline"
                className="border-amber-300 bg-amber-50 text-[10px] text-amber-600"
              >
                Unverified
              </Badge>
            )}
          </div>

          {/* Stats row */}
          <div className="mt-2 flex items-center gap-4 text-sm text-[#6B7280]">
            <span>
              <strong className="text-[#1A1A1A]">{seller.totalSales}</strong>{" "}
              completed trades
            </span>
            <span>
              <strong className="text-[#1A1A1A]">
                {seller.rating > 0 ? seller.rating.toFixed(1) : "—"}
              </strong>{" "}
              rating
            </span>
            <span className="flex items-center gap-1">
              <Icons.mapPin size={12} />
              Lagos, NG
            </span>
          </div>
        </div>

        {/* Store photos grid */}
        <div className="mt-4 border-t border-[#F3F4F6]">
          <p className="px-4 py-2 text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
            Store Photos
          </p>
          <div className="no-scrollbar max-h-64 overflow-y-auto">
            <div className="grid grid-cols-3 gap-px bg-[#F3F4F6]">
              {PLACEHOLDER_PHOTOS.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden bg-[#F9FAFB]"
                >
                  <img
                    src={src}
                    alt={`Store photo ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
