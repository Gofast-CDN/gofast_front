import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/http-client";
import { getCookie } from "@/lib/utils/cookies";
import type { User } from "@/types/auth";

export function useUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const token = getCookie("token");
      const response = await httpClient<User>("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
    retry: false,
    enabled: !!getCookie("token"),
  });
}
