import { ProductCondition } from "./product";
import type { OperatingHours } from "./checkout";

export type LocalCartItem = {
  id: string;
  productId: string;
  variantId: string | null;
  vendorId: string;
  businessName: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  storage?: number;
  condition: ProductCondition;
  pickupEnabled?: boolean;
  operationHours?: string | null;
};

export interface CartItemProduct {
  id: string;
  name: string;
  slug: string;
  condition: ProductCondition;
  carrier_status: string | null;
  images: string[];
}

export interface CartItemVariant {
  id: string;
  color: string;
  storage: number;
}

export interface CartItemVendor {
  id: string;
  trading_name: string | null;
  business_name: string;
  pickup_enabled?: boolean;
  operating_hours?: OperatingHours | null;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id: string | null;
  vendor_id: string;
  quantity: number;
  price_at_add: number;
  title?: string | null;
  product: CartItemProduct;
  variant: CartItemVariant | null;
  vendor: CartItemVendor;
}

export interface Cart {
  id: string;
  user_id: string;
  status: string;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}

export type AddCartItemPayload = {
  product_id: string;
  variant_id: string | null;
  quantity: number;
  title?: string; // for syncing local cart, server doesn't require title
  vendor_id: string; // for syncing local cart, server doesn't require vendor_id
};

export type UpdateCartQuantityPayload = {
  itemId: string;
  increment: number;
};
