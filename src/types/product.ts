export interface ProductVariant {
  id: string;
  color: string;
  storage: number;
  price: number;
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
}

export interface ProductVendor {
  id: string;
  business_name: string;
  is_verified: boolean;
  rating: number;
}

export interface ProductDetail {
  id: string;
  model: string;
  description: string;
  condition: "NEW" | "UK_USED" | "NIGERIAN_USED" | "REFURBISHED";
  carrier_status: "unlocked" | "locked";
  base_price: number;
  total_stock: number;
  is_swappable: boolean;
  images: string[];
  specifications: Record<string, string>;
  brand: ProductBrand;
  category: ProductCategory;
  vendor: ProductVendor;
  variants: ProductVariant[];
}

export interface ProductDetailResponse {
  status: boolean;
  message: string;
  product: ProductDetail;
}

export interface SelectedVariant {
  color: string | null;
  storage: number | null;
}
