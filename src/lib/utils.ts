import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Question } from "./api/types";

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
