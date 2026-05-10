export interface ProductVariant {
  id: string;
  created_at?: string;
  updated_at?: string;
  color: string;
  storage: number;
  price: number | string;
  stock_quantity: number;
  sku: string;
}

export interface ProductBrand {
  id: string;
  brand_name: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  type?: string;
}

export interface ProductSubcategory {
  id: string;
  name: string;
}

export interface ProductVendor {
  id: string;
  business_name: string;
  is_verified: boolean;
  rating: number;
}

export type ProductCondition =
  | "NEW"
  | "UK_USED"
  | "NIGERIAN_USED"
  | "REFURBISHED";

export interface ProductDetail {
  id: string;
  slug: string;
  created_at: Date;
  updated_at?: string;
  name: string;
  model?: string;
  description: string;
  condition: ProductCondition;
  carrier_status: "unlocked" | "locked";
  base_price: number | string;
  total_stock: number;
  is_swappable: boolean;
  mode: ProductMode;
  status?: string;
  is_active?: boolean;
  images: string[];
  specifications: Record<string, string>;
  brand: ProductBrand;
  category: ProductCategory;
  subcategory?: ProductSubcategory;
  vendor: ProductVendor;
  variants: ProductVariant[];
}

export interface ProductDetailResponse {
  status: boolean;
  message: string;
  product: ProductDetail;
}

export interface ProductListResponse {
  products: ProductDetail[];
  total: number;
  page: number;
  limit: number;
}

export interface SelectedVariant {
  color: string | null;
  storage: number | null;
}

export enum ProductMode {
  SALE = "sale",
  SALE_SWAP = "sale_swap",
}

export type ListingMode = ProductMode | "all";
