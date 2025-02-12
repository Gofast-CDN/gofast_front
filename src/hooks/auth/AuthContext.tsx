import { createContext, useContext, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/http-client";
import { getCookie, setCookie, clearAuthCookies } from "@/lib/utils/cookies";
import type { User, AuthResponse } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { getDecodedToken } from "@/lib/utils/jwt";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  hasAccess: (requestedUserId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const decodedToken = getDecodedToken();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () =>
      httpClient<User>("/users/me", {
        protected: true,
      }),
    enabled: !!getCookie("token"),
    staleTime: 5 * 60 * 1000,
  });

  const login = (data: AuthResponse) => {
    setCookie("token", data.token);
    setCookie("userId", data.userId);
    void navigate(`/${data.userId}`);
  };

  const logout = async () => {
    try {
      clearAuthCookies();
      // Remove all queries from the cache
      await queryClient.resetQueries();
      void navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const hasAccess = (requestedUserId: string): boolean => {
    if (!user || !decodedToken) return false;

    // Admin has access to all routes
    if (user.role === "ADMIN") return true;

    // User can only access their own routes
    return decodedToken.user_id === requestedUserId;
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        isAuthenticated: !!user,
        error,
        login,
        logout,
        hasAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
