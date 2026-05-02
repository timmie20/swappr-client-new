import { Icons } from "@/components/icons";
import ReusableSheetDrawer from "@/components/resuable-sheet-drawer";
import { SafeImage } from "@/components/safe-image";
import { TypographyH3 } from "@/components/typography/h3";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/format";
import { useFeedStore } from "@/store/feed-store";
import { AnimatePresence, motion } from "motion/react";

export default function CartDrawer() {
  const cartCount = useFeedStore((s) => s.cartCount)();

  const header = (
    <>
      <span className="inline-flex items-center gap-2">
        <Icons.cartCopy size={20} />
        <span>Your Cart ({cartCount})</span>
      </span>
    </>
  );

  const trigger = (
    <div className="relative cursor-pointer">
      <Icons.cartCopy size={20} />
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.span
            key="cart-count"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-primary absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
          >
            {cartCount > 9 ? "9+" : cartCount}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
  return (
    <ReusableSheetDrawer
      title={header}
      description="Enjoy free shipping on every order. No minimums. No exceptions"
      trigger={trigger}
    >
      <div className="px-6">
        <div className="flex items-start gap-4 border-[#E5E7EB] py-4 not-first:border-b">
          <SafeImage
            src="https://res.cloudinary.com/dzcmadjlq/image/upload/v1702058357/swappr-devices/iphone-16-ultramarine_1_uxh8n9.jpg"
            alt="some image"
            width={100}
            height={100}
          />

          <div className="space-y-2">
            <span className="inline-flex items-center gap-2">
              <TypographyH3 className="text-lg leading-tight">
                iPhone 16 Ultramarine 128GB (Unlocked)
              </TypographyH3>
              <span className="text-muted-foreground font-semibold">
                {formatNaira(350000)}
              </span>
            </span>

            <ul className="text-muted-foreground">
              <li>Color: Ultramarine</li>
              <li>Storage: 128GB</li>
              <li>Condition: UK Used</li>
            </ul>

            <div className="flex shrink-0 items-center justify-between">
              <div className="inline-flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="cursor-pointer"
                >
                  <Icons.add />
                </Button>

                <span className="text-lg font-semibold">4</span>

                <Button
                  variant="outline"
                  size="icon-sm"
                  className="cursor-pointer"
                >
                  <Icons.minus />
                </Button>
              </div>

              <Button
                variant="destructive"
                size="icon-lg"
                className="cursor-pointer"
              >
                <Icons.trash size={16} />
                <span className="sr-only">Remove from cart</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ReusableSheetDrawer>
  );
}
