"use client";

import { useState, useMemo } from "react";
import { ProductBreadcrumb } from "./product-breadcrumb";
import { ProductHeader } from "./product-header";
import { VariantSelector } from "./variant-selector";
import { ProductActions } from "./product-actions";
import { ProductSpecifications } from "./product-specifications";
import { VendorInfoCard } from "./vendor-info-card";
import {
  buildProductTitle,
  getMatchingVariant,
  getAvailableStorage,
} from "@/lib/utils/product-helpers";
import type { ProductDetail, SelectedVariant } from "@/types/product";
import { Separator } from "../ui/separator";

interface ProductInfoPanelProps {
  product: ProductDetail;
}

export function ProductInfoPanel({ product }: ProductInfoPanelProps) {
  const defaultColor = product.variants[0]?.color ?? null;
  const defaultStorage =
    getAvailableStorage(product.variants, defaultColor)[0] ?? null;

  const [selected, setSelected] = useState<SelectedVariant>({
    color: defaultColor,
    storage: defaultStorage,
  });

  const activeVariant = useMemo(
    () => getMatchingVariant(product.variants, selected),
    [product.variants, selected],
  );

  const title = useMemo(
    () => buildProductTitle(product, selected),
    [product, selected],
  );

  return (
    <div className="space-y-6">
      <ProductBreadcrumb
        category={product.category.name}
        brand={product.brand.brand_name}
        model={product.name}
      />

      <ProductHeader
        product={product}
        title={title}
        activeVariant={activeVariant}
      />

      <Separator />

      <VariantSelector
        variants={product.variants}
        selected={selected}
        onChange={setSelected}
      />

      <Separator />

      <ProductActions
        activeVariant={activeVariant}
        isSwappable={product.is_swappable}
        productId={product.id}
      />

      <VendorInfoCard vendor={product.vendor} />

      <ProductSpecifications
        specifications={product.specifications}
        description={product.description}
      />
    </div>
  );
}
