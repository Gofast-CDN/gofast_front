import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import type {
  LoginCredentials,
  AuthResponse,
  RegisterCredentials,
} from "@/types/auth";
import { httpClient } from "@/lib/http-client";
import { useAuth } from "./AuthContext";

export function useAuthMutation() {
  const auth = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials: LoginCredentials) =>
      httpClient<AuthResponse>("/users/login", {
        protected: false,
        method: "POST",
        body: credentials,
      }),
    onSuccess: (data) => {
      auth.login(data);

      toast({
        title: data.message,
        description: `Welcome back, ${data.email}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
    },
  });

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (credentials: RegisterCredentials) =>
      httpClient<AuthResponse>("/users/register", {
        protected: false,
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

  return { loginMutation, registerMutation };
}
