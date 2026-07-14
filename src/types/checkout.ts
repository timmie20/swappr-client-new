export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  postal_code?: string;
}

export type FulfillmentType = "pickup" | "delivery";

// backend shape, e.g. { days: ["monday", ...], open_time: "09:00", close_time: "17:00" }
export interface OperatingHours {
  days: string[];
  open_time: string;
  close_time: string;
}
