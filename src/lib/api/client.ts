import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

/**
 * API Client Configuration
 *
 * Centralized axios instance with authentication and error handling.
 * Automatically attaches Clerk session tokens to all requests.
 */

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
}

class ApiClient {
  public instance: AxiosInstance;
  private getTokenFn: (() => Promise<string | null>) | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  /**
   * Set the token getter function (called from Clerk provider)
   */
  public setTokenGetter(fn: () => Promise<string | null>) {
    this.getTokenFn = fn;
  }

  private setupInterceptors() {
    // Request interceptor - attach auth token
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (this.getTokenFn) {
          const token = await this.getTokenFn();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle errors globally
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        if (error.response) {
          // Server responded with error status
          const errorMessage =
            error.response.data?.message || "An error occurred";
          const statusCode = error.response.status;

          // Handle specific status codes
          if (statusCode === 401) {
            // Unauthorized - potentially redirect to login
            console.error("Unauthorized access - token may be invalid");
          } else if (statusCode === 403) {
            // Forbidden - user doesn't have permission
            console.error("Forbidden - insufficient permissions");
          } else if (statusCode === 404) {
            // Not found
            console.error("Resource not found");
          }

          return Promise.reject({
            message: errorMessage,
            statusCode,
            error: error.response.data?.error,
          });
        } else if (error.request) {
          // Request made but no response received
          return Promise.reject({
            message: "Network error - please check your connection",
            statusCode: 0,
          });
        } else {
          // Something else happened
          return Promise.reject({
            message: error.message || "An unexpected error occurred",
            statusCode: 0,
          });
        }
      }
    );
  }

  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export const api = apiClient.getAxiosInstance();
