import { jwtDecode } from "jwt-decode";
import { getCookie } from "./cookies";

interface JWTPayload {
  user_id: string;
  email: string;
  role: "USER" | "ADMIN";
  exp: number;
}

export const getDecodedToken = (): JWTPayload | null => {
  const token = getCookie("token");
  if (!token) return null;

  try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  }
};
export const isTokenValid = (userId?: string): boolean => {
  const decoded = getDecodedToken();
  if (!decoded) return false;

  const isExpired = Date.now() >= decoded.exp * 1000;
  if (isExpired) return false;

  // If userId is provided, verify it matches the token
  if (userId && decoded.user_id !== userId) return false;

  return true;
};
