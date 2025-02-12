import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import type {
  LoginCredentials,
  AuthResponse,
  RegisterCredentials,
} from "@/types/auth";
import { httpClient } from "@/lib/http-client";
import { setCookie } from "@/lib/utils/cookies";

export function useAuthMutation() {
  const navigate = useNavigate();

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials: LoginCredentials) =>
      httpClient<AuthResponse>("/users/login", {
        method: "POST",
        body: credentials,
      }),
    onSuccess: (data) => {
      // Store token in secure cookie
      setCookie("token", data.token);
      setCookie("userId", data.userId);

      toast({
        title: data.message,
        description: `Welcome back, ${data.email}!`,
      });

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
    mutationFn: (credentials: RegisterCredentials) =>
      httpClient<AuthResponse>("/users/register", {
        method: "POST",
        body: credentials,
      }),
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
