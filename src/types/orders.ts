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
  | "shipped"
  | "delivered"
  | "cancelled";

type PaymentStatus = "unpaid" | "paid" | "failed";

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
}

export interface Order {
  id: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  buyer_id: string;
  vendor_id: string;
  items: OrderItem[];
  order_type: "purchase" | "swap";
  status: OrderStatus;
  payment_status: PaymentStatus;
  total_amount: number;
  swap_device_name: string | null;
  swap_device_condition: string | null;
  swap_device_images: string[] | null;
  swap_device_assessed_value: number | null;
  delivery_address: DeliveryAddress;
  contact_phone: string;
  tracking_number: string | null;
  confirmed_at: string | null;
  delivered_at: string | null;
  cancellation_reason: string | null;
  expires_at: string;
}

export type CreateOrderResponseData = Omit<Order, "items">;
