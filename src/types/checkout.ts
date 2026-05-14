export interface CheckoutSession {
  id: string;
  user_id: string;
  cart_snapshot: CheckoutOrderItem[];
  total_amount: number; // in Naira, not kobo
  status: string;
  expires_at: string; // ISO 8601
}

export interface DeliveryAddress {
  full_address: string;
  street: string;
  city: string;
  state: string;
  postal_code?: string;
}

export interface CheckoutPayPayload {
  delivery_address: DeliveryAddress;
  contact_phone: string;
}

export interface CheckoutPayResponseData {
  authorization_url: string;
  reference: string;
}

export interface CheckoutOrderItem {
  product_id: string;
  product_name: string;
  variant_color: string | null;
  variant_storage: number | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface CheckoutOrder {
  id: string;
  vendor_id: string;
  total_amount: number;
  status: string;
  items: CheckoutOrderItem[];
}

export interface CheckoutVerifyResponseData {
  orders: CheckoutOrder[];
}
