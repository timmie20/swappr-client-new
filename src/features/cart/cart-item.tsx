"use client";
import { Icons } from "@/components/icons";
import { SafeImage } from "@/components/safe-image";
import { TypographyH3 } from "@/components/typography/h3";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatNaira, formatStorageCapacity } from "@/lib/format";
import { formatCondition } from "@/lib/utils/product-helpers";
import { LocalCartItem } from "@/types/cart";
import { useEffect, useRef, useState } from "react";

export default function Item({ item }: { item: LocalCartItem }) {
  const { updateQuantity, removeItem } = useCart();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  const handleQuantityChange = (next: number) => {
    if (next < 1) return;

    setLocalQuantity(next); // instant UI

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      updateQuantity(item.id, next); // server call after pause
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex w-full items-start gap-4 border-[#E5E7EB] py-4 not-first:border-t">
      <SafeImage
        src={item.image}
        alt={item.title}
        width={100}
        height={100}
        className="rounded-md"
      />

      <div className="w-full space-y-2">
        <span className="inline-flex items-center gap-2">
          <TypographyH3 className="text-base leading-tight">
            {item.title}
          </TypographyH3>
          <span className="text-muted-foreground font-semibold">
            {formatNaira(item.price)}
          </span>
        </span>

        <ul className="text-muted-foreground">
          <li>Color: {item.color}</li>
          <li>Storage: {formatStorageCapacity(item.storage)}</li>
          <li>Condition: {formatCondition(item.condition)}</li>
        </ul>

        <div className="flex w-full items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <Button
              variant="outline"
              size="icon-sm"
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              disabled={localQuantity <= 1}
              onClick={() => handleQuantityChange(localQuantity - 1)}
            >
              <Icons.minus />
            </Button>

            <span className="text-base font-semibold">{localQuantity}</span>

            <Button
              variant="outline"
              size="icon-sm"
              className="cursor-pointer"
              onClick={() => handleQuantityChange(localQuantity + 1)}
            >
              <Icons.add />
            </Button>
          </div>

          <Button
            variant="destructive"
            size="icon-lg"
            className="cursor-pointer"
            onClick={() => removeItem(item.id)}
          >
            <Icons.trash size={16} />
            <span className="sr-only">Remove from cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
