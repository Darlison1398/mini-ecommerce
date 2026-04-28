import type { User } from "../types/User";

const STORAGE_KEY = "users";

const getLocalUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLocalUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const userService = {
  async getAll(): Promise<User[]> {
    const local = getLocalUsers();

    if (local.length > 0) return local;

    const res = await fetch("https://fakestoreapi.com/users");
    const data = await res.json();

    // 👇 adiciona role fake
    const usersWithRole: User[] = data.map((u: any) => ({
      id: u.id,
      username: u.username,
      password: u.password,
      role:
        u.username === "mor_2314" ? "admin" : "client",
    }));

    saveLocalUsers(usersWithRole);

    return usersWithRole;
  },

  create(user: Omit<User, "id">): User {
    const users = getLocalUsers();

    const newUser: User = {
      ...user,
      id: Date.now(),
    };

    const updated = [...users, newUser];
    saveLocalUsers(updated);

    return newUser;
  },

  update(updatedUser: User): User {
    const users = getLocalUsers();

    const updated = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );

    saveLocalUsers(updated);

    return updatedUser;
  },

  delete(id: number) {
    const users = getLocalUsers();

    const updated = users.filter((u) => u.id !== id);

    saveLocalUsers(updated);
  },
};