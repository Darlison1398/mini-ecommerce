import { api } from "./api";
import type { User } from "../types/User";

export const userService = {
  async getAll(): Promise<User[]> {
    const response = await api.get<any[]>("/users");

    // simulando role
    const users: User[] = response.data.map((u) => ({
      id: u.id,
      username: u.username,
      password: u.password,
      role:
        u.username === "mor_2314"
          ? "admin"
          : "client",
    }));

    return users;
  },
};