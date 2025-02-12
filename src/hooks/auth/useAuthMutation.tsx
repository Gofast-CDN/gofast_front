import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import type {
  LoginCredentials,
  AuthResponse,
  RegisterCredentials,
} from "@/types/auth";

export function useAuthMutation() {
  const navigate = useNavigate();

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: async (
      credentials: LoginCredentials
    ): Promise<AuthResponse> => {
      const response = await fetch("http://localhost:80/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Store tokens
      localStorage.setItem("token", data.token);

      toast({
        title: data.message,
        description: `Welcome back, ${data.email}!`,
      });

      // Navigate to user's space
      void navigate(`/${data.userId}`);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
    },
  });

  const register = useMutation({
    mutationKey: ["register"],
    mutationFn: async (
      credentials: RegisterCredentials
    ): Promise<AuthResponse> => {
      const response = await fetch(
        "http://localhost:80/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully!",
      });

      void navigate("/login");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message,
      });
    },
  });

  return { login, register };
}
