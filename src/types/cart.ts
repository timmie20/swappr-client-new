import { ProductDetail } from "./product";

export interface Cart {
  id: string;
  user_id: string;
  status: string;
  items: {
    id: string;
    product_id: string;
    variant_id: string;
    quantity: number;
    price_at_add: number | string;
    product: ProductDetail;
  }[];
  created_at: string;
  updated_at: string;
}
