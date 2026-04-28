import type { CartItem } from "./Cart";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
}