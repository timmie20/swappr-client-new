import { ProductCondition } from "./product";

export type LocalCartItem = {
  id: string;
  productId: string;
  variantId: string | null;
  title: string;
  price: number | string;
  image: string;
  quantity: number;
  color?: string;
  storage?: number;
  condition: ProductCondition;
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

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  price_at_add: number;
  title?: string | null;
  product: CartItemProduct;
  variant: CartItemVariant | null;
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
};
