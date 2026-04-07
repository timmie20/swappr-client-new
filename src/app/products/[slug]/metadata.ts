import type { Metadata } from "next";
import { getProduct } from "@/server-actions/product";

export async function generateProductMetadata(slug: string): Promise<Metadata> {
  const { product } = await getProduct(slug);

  const productName = product.model || product.name;
  const title = `${product.brand.brand_name} ${productName} | Swappr`;

  return {
    title,
    description: product.description,
    openGraph: {
      title,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
      url: `/products/${slug}`,
    },
  };
}
