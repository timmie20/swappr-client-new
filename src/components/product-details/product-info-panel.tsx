"use client";

import { useState, useMemo, Fragment } from "react";
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
  const hasVariants =
    product.variants && product.variants.length > 0 ? true : false;

  const defaultColor = hasVariants
    ? (product.variants[0]?.color ?? null)
    : null;

  const defaultStorage = hasVariants
    ? (getAvailableStorage(product.variants, defaultColor)[0] ?? null)
    : null;

  const [selected, setSelected] = useState<SelectedVariant>({
    color: defaultColor,
    storage: defaultStorage,
  });

  const activeVariant = useMemo(
    () => (hasVariants ? getMatchingVariant(product.variants, selected) : null),
    [product.variants, selected, hasVariants],
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

      {hasVariants && (
        <Fragment>
          <Separator />

          <VariantSelector
            variants={product.variants}
            selected={selected}
            onChange={setSelected}
          />
        </Fragment>
      )}

      <Separator />

      <ProductActions
        activeVariant={activeVariant}
        hasVariants={hasVariants}
        isSwappable={product.mode === "sale_swap"}
        product={product}
        totalStock={product.total_stock}
        title={title}
      />

      <VendorInfoCard vendor={product.vendor} />

      <ProductSpecifications
        specifications={product.specifications}
        description={product.description}
      />
    </div>
  );
}
