export const PAYSTACK_REFERENCE_KEY = "paystack_reference" as const;

export function getPaystackReference(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PAYSTACK_REFERENCE_KEY);
}

export function setPaystackReference(reference: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PAYSTACK_REFERENCE_KEY, reference);
}

export function clearPaystackReference(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PAYSTACK_REFERENCE_KEY);
}
