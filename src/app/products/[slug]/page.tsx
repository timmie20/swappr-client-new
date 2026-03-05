import type { Metadata } from "next";
import type { ProductDetail } from "@/types/product";
import { ProductImageGallery } from "@/components/product-details/product-image-gallery";
import { ProductInfoPanel } from "@/components/product-details/product-info-panel";
import PageContainer from "@/components/layout/page-container";

// ─── Mock data (replace with real API call once backend is live) ─────────────
const MOCK_PRODUCT: ProductDetail = {
  id: "product-uuid",
  model: "iPhone 16",
  description:
    "The iPhone 16 features the powerful A18 Bionic chip, a stunning 6.1-inch Super Retina XDR display, and an advanced dual-camera system for incredible photos and videos.",
  condition: "NEW",
  carrier_status: "unlocked",
  base_price: 850000,
  total_stock: 28,
  is_swappable: true,
  images: [
    "https://images.unsplash.com/photo-1632516723866-a3ef4ae9823c?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop",
  ],
  specifications: {
    display: "6.1-inch Super Retina XDR",
    chip: "A18 Bionic",
    camera: "48MP Main + 12MP Ultra Wide",
    battery: "Up to 22 hours video playback",
    "face id": "TrueDepth Camera",
    connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
    operating_system: "iOS 18",
  },
  brand: { id: "brand-1", brand_name: "Apple" },
  category: { id: "cat-1", name: "Smartphones" },
  vendor: {
    id: "vendor-1",
    business_name: "TechHub Nigeria",
    is_verified: true,
    rating: 4.8,
  },
  variants: [
    {
      id: "v1",
      color: "Black",
      storage: 128,
      price: 850000,
      stock_quantity: 10,
      sku: "IPH16-BLK-128",
    },
    {
      id: "v2",
      color: "Black",
      storage: 256,
      price: 950000,
      stock_quantity: 5,
      sku: "IPH16-BLK-256",
    },
    {
      id: "v3",
      color: "Black",
      storage: 512,
      price: 1100000,
      stock_quantity: 3,
      sku: "IPH16-BLK-512",
    },
    {
      id: "v4",
      color: "White",
      storage: 128,
      price: 850000,
      stock_quantity: 8,
      sku: "IPH16-WHT-128",
    },
    {
      id: "v5",
      color: "White",
      storage: 256,
      price: 950000,
      stock_quantity: 0,
      sku: "IPH16-WHT-256",
    },
    {
      id: "v6",
      color: "Blue",
      storage: 512,
      price: 1150000,
      stock_quantity: 2,
      sku: "IPH16-BLU-512",
    },
  ],
};

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // TODO: fetch real product for metadata
  const product = MOCK_PRODUCT;
  const title = `${product.brand.brand_name} ${product.model} | Swappr`;

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

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params; // Destructure when real fetch is added: const { slug } = await params;

  // TODO: replace mock with real fetch
  // const res = await productEndpoints.getBySlug(slug);
  // const product = res.product;
  const product = MOCK_PRODUCT;

  return (
    <PageContainer>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${product.brand.brand_name} ${product.model}`,
            description: product.description,
            brand: { "@type": "Brand", name: product.brand.brand_name },
            image: product.images,
            offers: {
              "@type": "Offer",
              priceCurrency: "NGN",
              price: product.base_price,
              availability:
                product.total_stock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />

      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-4 py-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_1.1fr] xl:px-0">
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
    </PageContainer>
  );
}
