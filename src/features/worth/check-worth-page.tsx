import { apiClient } from "@/lib/api/client";
import { getAuthHeaders } from "@/lib/api/server";
import CheckWorth from "./check-worth";
import type { Brand } from "@/lib/api/types";

const getBrands = async (): Promise<{ brands: Brand[] }> => {
  const headers = await getAuthHeaders();
  // If no auth token, make request without auth headers
  const response = await apiClient.instance.get<Promise<{ brands: Brand[] }>>(
    "/brands",
    {
      params: { limit: 100 },
      ...(headers && { headers }),
    },
  );
  return response.data;
};

export default async function CheckWorthPage() {
  const brands = (await getBrands()).brands;
  return (
    <>
      <CheckWorth brands={brands || []} />
    </>
  );
}
