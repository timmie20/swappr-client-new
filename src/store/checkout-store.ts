import { create } from "zustand";

import type { CheckoutSession, DeliveryAddress } from "@/types/checkout";

export interface CheckoutState {
  session: CheckoutSession | null;
  delivery_address: DeliveryAddress | null;
  contact_phone: string | null;
  isExpired: boolean;

  setSession: (session: CheckoutSession) => void;
  clearSession: () => void;

  setIsExpired: (v: boolean) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  session: null,
  delivery_address: null,
  contact_phone: null,
  isExpired: false,

  setSession: (session) =>
    set({ session, isExpired: false /* new session = active */ }),

  clearSession: () =>
    set({
      session: null,
      delivery_address: null,
      contact_phone: null,
      isExpired: false,
    }),

  setIsExpired: (isExpired) => set({ isExpired }),

  reset: () =>
    set({
      session: null,
      delivery_address: null,
      contact_phone: null,
      isExpired: false,
    }),
}));
