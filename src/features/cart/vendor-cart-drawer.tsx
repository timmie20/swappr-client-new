"use client";

import { formatNaira } from "@/lib/format";
import type { LocalCartItem } from "@/types/cart";
import { VendorGroup } from "./hooks/use-vendor-cart";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Item from "./cart-item";
import { Icons } from "@/components/icons";

interface VendorCartDrawerProps {
  group: VendorGroup;
  open: boolean;
  onClose: () => void;
  /** Slot for cart operation controls (qty stepper, remove btn, etc.)
   *  Passed as a render prop so this component stays decoupled from cart mutations. */
  renderItemActions?: (item: LocalCartItem) => React.ReactNode;
}

export function VendorCartDrawer({
  group,
  open,
  onClose,
}: VendorCartDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={(v) => !v && onClose()}>
      <DrawerContent className="">
        <div className="mx-auto w-full max-w-lg">
          {/* ── Header ── */}
          <DrawerHeader>
            <div className="flex w-full items-center justify-center gap-2.5">
              <Icons.shieldCheck color="#3B82FD" />

              <DrawerTitle className="truncate text-base">
                {group.businessName}
              </DrawerTitle>
            </div>
            <p className="text-muted-foreground text-xs">
              {group.totalItems} {group.totalItems === 1 ? "item" : "items"}
            </p>
          </DrawerHeader>

          {/* ── Items list ── */}
          <div className="no-scrollbar max-h-[50vh] space-y-4 overflow-y-auto scroll-smooth px-4 pb-6">
            {group.items.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>

          {/* ── Subtotal footer ── */}
          <DrawerFooter>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-small font-semibold tracking-widest uppercase">
                Subtotal
              </span>
              <span className="text-primary text-base font-bold">
                {formatNaira(group.subtotal)}
              </span>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/* ── Single item row inside the drawer ── */
// function DrawerItem({
//   item,
//   actions,
// }: {
//   item: LocalCartItem;
//   actions?: React.ReactNode;
// }) {
//   const meta: string[] = [];
//   if (item.color) meta.push(item.color);
//   if (typeof item.storage === "number")
//     meta.push(formatStorageCapacity(item.storage));
//   if (item.condition) meta.push(item.condition);

//   return (
//     <div className="flex gap-3 px-5 py-4">
//       {/* thumbnail */}
//       <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
//         {item.image ? (
//           <Image
//             src={item.image}
//             alt={item.title}
//             fill
//             className="object-cover"
//             sizes="64px"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center text-slate-300">
//             <Store size={20} />
//           </div>
//         )}
//       </div>

//       {/* info */}
//       <div className="min-w-0 flex-1 space-y-1">
//         <p className="truncate text-sm leading-snug font-medium text-slate-800">
//           {item.title}
//         </p>
//         {meta.length > 0 && (
//           <p className="text-[11px] text-slate-400">{meta.join(" · ")}</p>
//         )}
//         <p className="text-sm font-semibold text-slate-700">
//           {formatNaira(item.price)}
//           <span className="ml-1 text-[11px] font-normal text-slate-400">
//             × {item.quantity}
//           </span>
//         </p>

//         {/* cart operation controls injected from parent */}
//         {actions && <div className="pt-1">{actions}</div>}
//       </div>
//     </div>
//   );
// }
