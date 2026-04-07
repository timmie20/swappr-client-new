import { api } from "@/lib/api/client";
import { VendorApplicationPayload } from "@/features/vendor-application/types";

export const vendorApplicationEndpoints = {
  async create(payload: VendorApplicationPayload) {
    const { data } = await api.post("/auth/vendor/signup", payload);
    return data as { id: string; message: string };
  },
};
