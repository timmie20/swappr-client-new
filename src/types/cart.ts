import { ProductDetail } from "./product";

export type CartItem = {
  id: string;
  productId: string;
  variantId: string | null;
  title: string;
  price: number | string;
  image: string;
  quantity: number;
  color?: string;
  storage?: number;
  condition: "NEW" | "UK_USED" | "NIGERIAN_USED" | "REFURBISHED";
};

export type ServerCartItem = {
  id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  price_at_add: number | string;
  product: ProductDetail;
};

export interface Cart {
  id: string;
  user_id: string;
  status: string;
  items: ServerCartItem[];
  created_at: string;
  updated_at: string;
}
