import { ApiResponser, Brand, Model } from "@/types/api";
import { serverFetch } from "@/lib/api/server";

export type ModelsResponse = ApiResponser<{ models: Model[] }>;
export type BrandsResponse = ApiResponser<{ brands: Brand[] }>;

export const getModels = async (): Promise<ModelsResponse> => {
  return serverFetch<ModelsResponse>(`/models`, {
    revalidate: 86400, // 24 hours - models rarely change
  });
};

export const getBrands = async (): Promise<BrandsResponse> => {
  return serverFetch<BrandsResponse>(`/brands`, {
    revalidate: 86400, // 24 hours - brands rarely change
  });
};
