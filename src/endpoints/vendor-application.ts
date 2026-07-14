import { api } from "@/lib/api/client";
import { VendorSignupPayload } from "@/features/vendor-application/types";

export const vendorApplicationEndpoints = {
  async signup(payload: VendorSignupPayload) {
    const { data } = await api.post("/auth/vendor/signup", payload);
    return data as { message?: string };
  },
};
