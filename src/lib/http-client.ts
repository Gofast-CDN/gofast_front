import { config } from "./config";

export type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
} & Omit<RequestInit, "body">;

export async function httpClient<T>(
  endpoint: string,
  { body, headers, ...options }: FetchOptions = {}
): Promise<T> {
  const response = await fetch(`${config.BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
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
