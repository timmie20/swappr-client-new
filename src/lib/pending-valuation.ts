export const PENDING_VALUATION_REF_KEY = "pending_valuation_ref" as const;

export function getPendingValuationRef(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PENDING_VALUATION_REF_KEY);
}

export function setPendingValuationRef(reference: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PENDING_VALUATION_REF_KEY, reference);
}

export function clearPendingValuationRef(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PENDING_VALUATION_REF_KEY);
}

export function hasPendingValuationRef(): boolean {
  return !!getPendingValuationRef();
}
