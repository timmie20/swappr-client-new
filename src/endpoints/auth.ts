/**
 * auth API Endpoints
 * */

import { api } from "@/lib/api/client";
import { CreateAccount } from "@/types";

export const authEndpoints = {
  async createAccount(payload: CreateAccount) {
    const { data } = await api.post("/members/create", payload);
    return data;
  },
};
