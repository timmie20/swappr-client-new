import type { DeliveryAddress } from "@/types/checkout";

export interface CreateOrderPayload {
  vendor_id?: string; // optional - if not provided, creates order with items from all vendors in cart
  order_type: "purchase" | "swap";
  delivery_address: DeliveryAddress;
  contact_phone: string;
}

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "rejected";

type PaymentStatus = "unpaid" | "paid" | "failed";

export interface OrderVendor {
  id: string;
  business_name: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  product_name: string;
  color: string | null;
  storage: number | null;
  unit_price: number;
  quantity: number;
  subtotal: number;
  condition?: string | null;
  image?: string | null;
  product_image?: string | null;
  product?: {
    name?: string;
    images?: string[];
  } | null;
}

export interface Order {
  id: string;
  order_number: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  buyer_id: string;

  buyer: {
    first_name: string;
    last_name: string;
    email: string;
  };
  vendor_id: string;
  vendor: OrderVendor;
  items: OrderItem[];
  order_type: "purchase" | "swap";
  status: OrderStatus;
  payment_status: PaymentStatus;
  total_amount: number;
  delivery_address: DeliveryAddress;
  contact_phone: string;
  tracking_number: string | null;
  confirmed_at: string | null;
  processing_at?: string | null;
  shipped_at?: string | null;
  delivered_at: string | null;
  cancelled_at?: string | null;
  rejected_at?: string | null;
  cancellation_reason: string | null;
  expires_at: string;
}

export type CreateOrderResponseData = Omit<Order, "items">;

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}

export type CancelOrder = {
  orderId: string;
  cancellation_reason?: string;
};
