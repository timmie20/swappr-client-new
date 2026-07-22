import { api } from "@/lib/api/client";
import { serializeFacetParams } from "@/lib/api/facet-params";
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
        params: serializeFacetParams(params),
      },
    );

    return data;
  },
};
