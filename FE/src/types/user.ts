export type UserRole = "admin" | "user";

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthLoginPayload {
  username: string;
  password: string;
}

export interface AuthLoginResponse {
  token: string;
  user: User;
}
