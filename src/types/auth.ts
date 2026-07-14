export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number; // Unix timestamp in ms — converted from ISO at login
}

export interface ApiReject {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}

export interface UserSession {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
}
