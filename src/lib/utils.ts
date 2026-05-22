import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Question } from "./api/types";
import { Valuation } from "@/types/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a URL-friendly slug from brand and model name
 * Format: {brand-name}-{model-name}
 *
 * @example
 * generateModelSlug("Apple", "iPhone 14 Pro") // "apple-iphone-14-pro"
 * generateModelSlug("Samsung", "Galaxy S23 Ultra") // "samsung-galaxy-s23-ultra"
 */
export function generateModelSlug(
  brandName: string,
  modelName: string,
): string {
  const combined = `${brandName}-${modelName}`;
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with dash
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

export function getQuestionBySlug(
  questions: Question[],
  slug: string,
): Question | undefined {
  return questions.find((q) => q.slug === slug);
}

export function getNextSlug(currentSlug: string, questions: Question[]) {
  const index = questions.findIndex((q) => q.slug === currentSlug);
  return questions[index + 1]?.slug || null;
}

export const getStatusColor = (status: Valuation["status"]) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    case "pending":
      return "bg-yellow-light/10 text-yellow-dark border-yellow-light/20";
    case "expired":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};
