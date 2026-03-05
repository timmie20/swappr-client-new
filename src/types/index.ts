export type CreateAccount = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
};

export interface Vendor {
  id: string;
  business_name: string;
  city: string;
  state: string;
  contact_number: string;
  contact_email: string;
  logo_url: string | null;
  description: string | null;
  is_verified: boolean;
  rating: string;
  total_trades_completed: number;
}
