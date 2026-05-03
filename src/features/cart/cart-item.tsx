import { Icons } from "@/components/icons";
import { SafeImage } from "@/components/safe-image";
import { TypographyH3 } from "@/components/typography/h3";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatNaira, formatStorageCapacity } from "@/lib/format";
import { formatCondition } from "@/lib/utils/product-helpers";
import { CartItem } from "@/types/cart";

export default function Item({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();
  return (
    <div className="flex items-start gap-4 border-[#E5E7EB] py-4 not-first:border-t">
      <SafeImage
        src={item.image}
        alt={item.title}
        width={100}
        height={100}
        className="rounded-md"
      />

      <div className="space-y-2">
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

        <div className="flex shrink-0 items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <Button
              variant="outline"
              size="icon-sm"
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              disabled={item.quantity <= 1}
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.variantId || undefined,
                  Math.max(0, item.quantity - 1),
                )
              }
            >
              <Icons.minus />
            </Button>

            <span className="text-base font-semibold">{item.quantity}</span>

            <Button
              variant="outline"
              size="icon-sm"
              className="cursor-pointer"
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.variantId || undefined,
                  item.quantity + 1,
                )
              }
            >
              <Icons.add />
            </Button>
          </div>

          <Button
            variant="destructive"
            size="icon-lg"
            className="cursor-pointer"
            onClick={() =>
              removeItem(item.productId, item.variantId || undefined)
            }
          >
            <Icons.trash size={16} />
            <span className="sr-only">Remove from cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
