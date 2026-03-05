import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { formatNaira } from "@/lib/format";
import { formatCondition, getStockStatus } from "@/lib/utils/product-helpers";
import type { ProductDetail, ProductVariant } from "@/types/product";

interface ProductHeaderProps {
  product: ProductDetail;
  title: string;
  activeVariant: ProductVariant | null;
}

export function ProductHeader({
  product,
  title,
  activeVariant,
}: ProductHeaderProps) {
  const price = activeVariant?.price ?? product.base_price;
  const stockQty = activeVariant?.stock_quantity ?? product.total_stock;
  const stock = getStockStatus(stockQty);

  const conditionStyles: Record<ProductDetail["condition"], string> = {
    NEW: "bg-emerald-100 text-emerald-700",
    UK_USED: "bg-indigo-100 text-indigo-700",
    NIGERIAN_USED: "bg-[#1A6B5A] text-white",
    REFURBISHED: "bg-purple-50 text-purple-700",
  };

  return (
    <div className="space-y-3">
      {/* Condition + carrier badges */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={conditionStyles[product.condition]}>
          {formatCondition(product.condition)}
        </Badge>
        <Badge variant="outline" className="capitalize">
          {product.carrier_status}
        </Badge>
        {product.is_swappable && (
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Swap Available
          </Badge>
        )}
      </div>

      {/* Dynamic title */}
      <motion.h1
        key={title}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-2xl leading-tight font-bold text-[#1A1A1A] lg:text-3xl"
      >
        {title}
      </motion.h1>

      {/* Price */}
      <motion.div
        key={price}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        className="flex items-baseline gap-3"
      >
        <span className="text-3xl font-bold text-[#1A1A1A]">
          {formatNaira(price)}
        </span>
      </motion.div>

      {/* Stock */}
      <p className={`text-sm font-medium ${stock.color}`}>{stock.label}</p>
    </div>
  );
}
