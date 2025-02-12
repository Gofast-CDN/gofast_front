// src/lib/http-client.ts
import { config } from "./config";
import { getCookie } from "@/lib/utils/cookies";

export type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  protected?: boolean;
} & Omit<RequestInit, "body">;

export async function httpClient<T>(
  endpoint: string,
  {
    body,
    headers,
    protected: isProtected = true,
    ...options
  }: FetchOptions = {}
): Promise<T> {
  const token = getCookie("token");

  // Prepare headers
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add auth header if protected route and token exists
  if (isProtected) {
    if (!token) {
      throw new Error("Authentication required");
    }
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${config.BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}
