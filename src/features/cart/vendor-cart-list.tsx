"use client";

import type { LocalCartItem } from "@/types/cart";
import { useCart } from "./hooks/use-cart";
import { useVendorDrawer, useVendorGroups } from "./hooks/use-vendor-cart";
import { VendorCartCard } from "./vendor-cart-card";
import { VendorCartDrawer } from "./vendor-cart-drawer";

interface VendorCartListProps {
  /**
   * Optional render prop for injecting quantity/remove controls per item
   * inside the drawer. Keeps cart mutations out of this component entirely.
   *
   * Example usage:
   * <VendorCartList
   *   renderItemActions={(item) => (
   *     <QuantityStepper item={item} />
   *   )}
   * />
   */
  renderItemActions?: (item: LocalCartItem) => React.ReactNode;
}

export function VendorCartList({ renderItemActions }: VendorCartListProps) {
  const { isLoading } = useCart();
  const vendorGroups = useVendorGroups();
  const drawer = useVendorDrawer();

  /* ── Loading skeleton ── */
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-52 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    );
  }

  /* ── Active drawer group ── */
  const activeGroup = vendorGroups.find(
    (g) => g.vendorId === drawer.openVendorId,
  );

  return (
    <>
      {/* ── Vendor cards ── */}
      <div className="space-y-4">
        {vendorGroups.map((group, index) => (
          <VendorCartCard
            key={group?.vendorId ?? index}
            group={group}
            onEditSelection={drawer.open}
          />
        ))}
      </div>

      {/* ── Edit selection drawer ── */}
      {activeGroup && (
        <VendorCartDrawer
          group={activeGroup}
          open={drawer.isOpen(activeGroup.vendorId)}
          onClose={drawer.close}
          renderItemActions={renderItemActions}
        />
      )}
    </>
  );
}
