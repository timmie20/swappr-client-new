// import { ListingMode } from "@/types/product";

export type ConditionGrade =
  | "New"
  | "UK Used"
  | "Nigerian Used"
  | "Refurbished";
export type SwapStatus = "available" | "pending" | "accepted" | "none";

export interface ColorVariant {
  name: string;
  hex: string;
  imageUrl?: string;
}

export interface Seller {
  id: string;
  username: string;
  avatarUrl?: string;
  rating: number;
  verified: boolean;
  totalSales: number;
}

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  title: string;
  description?: string;
  imageUrl: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  savingsPercent?: number;
  rating: number;
  reviewCount: number;
  colors?: ColorVariant[];
  storage?: number[];
  condition: ConditionGrade;
  mode: string;
  subCategory?: string;
  swapStatus: SwapStatus;
  swapFor?: string[];
  badge?: "sale" | "deal-of-week" | "new" | "sold-out";
  isSoldOut?: boolean;
  category: string;
  seller: Seller;
  listedAgo: string;
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: ColorVariant;
  selectedStorage?: number;
}
