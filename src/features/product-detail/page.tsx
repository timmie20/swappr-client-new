"use client";

import { ProductImageGallery } from "@/components/product-details/product-image-gallery";
import { ProductInfoPanel } from "@/components/product-details/product-info-panel";
import { useProduct } from "@/hooks/use-products";

export default function ProductDetailPage({ slug }: { slug: string }) {
  const { data, isLoading, isError } = useProduct(slug);

  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-4 py-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_1.1fr] xl:px-0">
        <div className="h-96 animate-pulse rounded-lg bg-gray-200" />
        <div className="space-y-4">
          <div className="h-8 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-4 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-4 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    );
  }

  if (isError || !data?.product) {
    return (
      <div className="mx-auto max-w-screen-2xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-2 text-gray-600">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  const { product } = data;

  return (
    <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-6 py-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[0.9fr_1.1fr]">
      {/* Left: Image gallery */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <ProductImageGallery
          images={product.images}
          productName={`${product.brand.brand_name} ${product.model}`}
        />
      </div>

      {/* Right: Product info */}
      <ProductInfoPanel product={product} />
    </div>
  );
}
