export type UserRole = "admin" | "client";

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}