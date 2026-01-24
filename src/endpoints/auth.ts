/**
 * auth API Endpoints
 * */

import { api } from "@/lib/api/client";
import { CreateAccount, LoginCredentials } from "@/types";

export const authEndpoints = {
  async createAccount(payload: CreateAccount) {
    const { data } = await api.post("/auth/signup", payload);
    return data;
  },
  async getProfile() {
    const { data } = await api.get("/auth/me");
    return data;
  },
  async logout(refreshToken: string) {
    const { data } = await api.post("/auth/logout", {
      refresh_token: refreshToken,
    });
    return data;
  },
  async login(credentials: LoginCredentials) {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },
  async verifyEmail(token: string) {
    const { data } = await api.post("/auth/verify-email", { token });
    return data;
  },
};
