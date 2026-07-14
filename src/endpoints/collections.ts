import { api } from "@/lib/api/client";
import {
  CollectionListResponse,
  CollectionsQueryParams,
  CollectionProducts,
} from "@/types/collections";

export const collectionsEndpoints = {
  async getAll(
    params?: CollectionsQueryParams,
  ): Promise<CollectionListResponse> {
    const { data } = await api.get<CollectionListResponse>("/collections", {
      params,
    });

    return data;
  },
  async getCollectionProducts(
    slug: string,
    params?: CollectionsQueryParams,
  ): Promise<CollectionProducts> {
    const { data } = await api.get<CollectionProducts>(
      `/collections/${slug}/products`,
      {
        params,
      },
    );

    return data;
  },
};
