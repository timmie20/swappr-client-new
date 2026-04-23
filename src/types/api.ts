/**
 * API Types
 *
 * Type definitions for API requests and responses.
 * These should match the NestJS backend DTOs.
 */

export interface User {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

// ============================================
// Common Types
// ============================================

export interface PaginationParams {
  brand_id?: string;
  subcategory_id?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export type PaginatedResponse<T, K extends string = "data"> = {
  [P in K]: T[];
} & {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
export type ApiResponser<TData extends Record<string, any> = {}> = {
  message: string;
} & TData;

// ============================================
// Brand Types
// ============================================

export interface Brand {
  id: string;
  brand_name: string;
  description?: string;
  logo?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBrandDto {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  isActive?: boolean;
}

export type UpdateBrandDto = Partial<CreateBrandDto>;

// ============================================
// Model Types
// ============================================

export interface Model {
  id: string;
  model_name: string;
  slug?: string;
  desc: string;
  image_url?: string;
  variations?: Variation[];
  brand?: {
    id: string;
    brand_name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateModelDto {
  brandId: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  releaseYear?: number;
  isActive?: boolean;
}

export type UpdateModelDto = Partial<CreateModelDto>;

// ============================================
// Variation Types
// ============================================

export interface Variation {
  id: string;
  storage_capacity: number;
  price: number;
}

export interface CreateVariationDto {
  modelId: string;
  name: string;
  slug: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: Record<string, any>;
  basePrice?: number;
  isActive?: boolean;
}

export type UpdateVariationDto = Partial<CreateVariationDto>;

// ============================================
// Option Types
// ============================================

export interface Option {
  id: string;
  modelId?: string;
  variationId?: string;
  model?: Model;
  variation?: Variation;
  name: string;
  slug: string;
  type: "text" | "number" | "boolean" | "select" | "multi-select";
  description?: string;
  choices?: string[]; // For select/multi-select types
  priceModifier?: number; // How this option affects price
  isRequired: boolean;
  isRestricted: boolean; // Only visible to authenticated members
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOptionDto {
  modelId?: string;
  variationId?: string;
  name: string;
  slug: string;
  type: "text" | "number" | "boolean" | "select" | "multi-select";
  description?: string;
  choices?: string[];
  priceModifier?: number;
  isRequired?: boolean;
  isRestricted?: boolean;
  order?: number;
}

export type UpdateOptionDto = Partial<CreateOptionDto>;

// ============================================
// Question Types
// ============================================

export interface QuestionOption {
  id: string;
  text: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Question {
  id: string;
  text: string;
  slug: string;
  type: "text" | "radio" | "checkbox" | "select" | "range" | "damages";
  note?: string;
  options?: QuestionOption[];
  brand?: {
    id: string;
    brand_name: string;
  } | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateQuestionDto {
  modelId?: string;
  variationId?: string;
  text: string;
  slug: string;
  type: "text" | "radio" | "checkbox" | "select" | "range" | "damages";
  description?: string;
  choices?: string[];
  validation?: Record<string, unknown>;
  dependsOn?: {
    questionId: string;
    expectedValue: unknown;
  };
  isRequired?: boolean;
  isRestricted?: boolean;
  order?: number;
}

export type UpdateQuestionDto = Partial<CreateQuestionDto>;

// ============================================
// User Answer Types (for members submitting responses)
// ============================================

export interface UserAnswer {
  question_id: string;
  option_id: unknown;
}

export interface SubmitAnswersDto {
  model_id?: string;
  variation_id?: string;
  answers: UserAnswer[];
}

export interface ValuationAdjustment {
  question: string;
  answers: Array<{
    option_text: string;
    impact: number;
    type: "add" | "deduct";
  }>;
}

export interface ValuationResponse {
  valuation_id: string;
  reference: string;
  status: string;
  device: {
    brand: string;
    model: string;
    image_url?: string;
    storage: number;
  };
  base_price: number;
  adjustments: ValuationAdjustment[];
  final_value: number;
  summary: {
    total_deductions: number;
    total_additions: number;
  };
}

export interface Valuation {
  id: string;
  device: {
    brand: string;
    model: string;
    storage: number;
  };
  final_value: number;
  status?: "completed" | "pending" | "draft";
  created_at: Date;
}
