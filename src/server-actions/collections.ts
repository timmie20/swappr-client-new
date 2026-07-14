import { serverFetch } from "@/lib/api/server";
import {
  CollectionListResponse,
  CollectionProducts,
  CollectionsQueryParams,
} from "@/types/collections";

export async function getCollections(): Promise<CollectionListResponse> {
  return serverFetch<CollectionListResponse>("/collections");
}

export async function getCollectionProducts(
  slug: string,
  params?: CollectionsQueryParams,
): Promise<CollectionProducts> {
  return serverFetch<CollectionProducts>(
    `/collections/${slug}/products`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params as any,
  );
}
