import { useMemo, useState } from "react";
import { useCart } from "@/features/cart/hooks/use-cart";
import type { LocalCartItem } from "@/types/cart";

export interface VendorGroup {
  vendorId: string;
  businessName: string;
  items: LocalCartItem[];
  subtotal: number;
  totalItems: number;
}

/** Groups flat cart items by vendor, memoized. */
export function useVendorGroups(): VendorGroup[] {
  const { items } = useCart();

  return useMemo(() => {
    const map = new Map<string, VendorGroup>();

    for (const item of items) {
      const existing = map.get(item.vendorId);

      if (existing) {
        existing.items.push(item);
        existing.subtotal += item.price * item.quantity;
        existing.totalItems += item.quantity;
      } else {
        map.set(item.vendorId, {
          vendorId: item.vendorId,
          businessName: item.businessName ?? "Unknown Vendor",
          items: [item],
          subtotal: item.price * item.quantity,
          totalItems: item.quantity,
        });
      }
    }

    return Array.from(map.values());
  }, [items]);
}

/** Controls which vendor's drawer is open. */
export function useVendorDrawer() {
  const [openVendorId, setOpenVendorId] = useState<string | null>(null);

  const open = (vendorId: string) => setOpenVendorId(vendorId);
  const close = () => setOpenVendorId(null);
  const isOpen = (vendorId: string) => openVendorId === vendorId;

  return { open, close, isOpen, openVendorId };
}
