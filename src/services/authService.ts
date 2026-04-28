import { userService } from "./userService";
import type { User } from "../types/User";

export const authService = {
  async login(username: string, password: string): Promise<User | null> {
    const users = await userService.getAll();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) return null;

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  },

  logout(): void {
    localStorage.removeItem("user");
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};