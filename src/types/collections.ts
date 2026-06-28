import { ProductDetail } from "./product";

export interface Collection {
  id: string;
  name: string;
  slug: string;
  badge: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionListResponse {
  collections: Collection[];
  total: number;
  page: number;
  limit: number;
}

export interface CollectionProducts {
  collection: Collection;
  products: ProductDetail[];
  total: number;
  page: number;
  limit: number;
}

export type CollectionsQueryParams = {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
};
