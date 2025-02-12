export interface User {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  email: string;
  role: "USER" | "ADMIN";
  token: string;
  userId: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
}
