/**
 * auth API Endpoints
 * */

import { api } from "@/lib/api/client";
import { CreateAccount, LoginCredentials } from "@/types";
import axios from "axios";

export const authEndpoints = {
  async createAccount(payload: CreateAccount) {
    const { data } = await api.post("/auth/signup", payload);
    return data;
  },

  async getProfile() {
    const { data } = await api.get("/auth/me");
    return data;
  },
  async logout() {
    const { data } = await axios.post("/api/auth/logout");
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
  async forgotPassword(email: string) {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  },
  async resetPassword(token: string, newPassword: string) {
    const { data } = await api.post("/auth/reset-password", {
      token,
      new_password: newPassword,
    });
    return data;
  },
};
